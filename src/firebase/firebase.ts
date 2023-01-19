/******************************************************************************
* FILENAME:
*   firebase.js

* DESCRIPTION:
*   Primary database layer. All direct interaction with the firebase websocket
*   for authentication or FireStore database resides in this file.

* NOTES:
*   - dispatch() is passed to several functions in this file, setting state
*     directly from this layer.
*   - Any change in the key/value structure of a UI boardObj must be reflected 
*     in savePrimaryCategoryToDB().

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import { newEntry } from '../components/add-pane/add-pane.component'
import cloneDeep from 'lodash.clonedeep'
import { entryType } from '../components/add-pane/add-pane.component'

import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'

import { firebaseConfig } from '../../keys'

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)

const db = getFirestore()

let domainBasedCollectionName

export const userInitializationHandler = async (
  userAuth,
  dispatch,
  globalDispatch,
  additionalData: any = null,
  callback,
  isInitialModal = false
) => {
  if (!userAuth) return // prevent firing during lifecycle, before userAuth obj is obtained
  // console.log(`Trace: userInitializationHandler()`)

  let domain = userAuth.email
  domainBasedCollectionName = domain

  onSnapshot(doc(db, 'users', domainBasedCollectionName), async (document) => {
    if (!document.exists()) {
      // if no record of user in DB, create record
      const createdAt = new Date()
      const { displayName, email, photoURL, uid } = userAuth
      let user = {
        displayName,
        email,
        photoURL,
        uid,
        createdAt,
        ...additionalData,
      }
      try {
        await setDoc(doc(db, 'users', domainBasedCollectionName), user)
        await globalDispatch({
          type: 'SET_CURRENT_USER_TO_STATE',
          payload: { userObj: user },
        })
        toast('User created!')
        // await unSubFirestore()
      } catch (error) {
        console.log('error creating user', error.message)
      }
    } else if (document.exists()) {
      // if record already created, retrieve from DB and add current Auth packet to user for this session
      let userObjFromDB = document.data()
      userObjFromDB = {
        ...userObjFromDB,
        auth: userAuth,
      }

      globalDispatch({
        type: 'SET_CURRENT_USER_TO_STATE',
        payload: { userObj: userObjFromDB },
      })
      gatherUserPrimaryCategoriesFromDB(userAuth, dispatch)
      toast('User logged in')
    }
  })
}

const backwardCompat = (entryArray) => {
  let newClone = cloneDeep(newEntry)
  let array: any[] = []
  entryArray.forEach((entry: entryType) => {
    entry = {
      ...newClone,
      ...entry
    }
   
    array.push(entry)
  })
  return array
}

export const gatherUserPrimaryCategoriesFromDB = async (userAuth, dispatch) => {
  // console.log(`Trace: gatherUserPrimaryCategoriesFromDB()`)
  if (!userAuth) return
  let primaryCategories: any = []
  let parsedArray: any[] = []
  const userCategoryFirestoreRef = await collection(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories'
  )
  const userCategoryQuery = query(userCategoryFirestoreRef)
  const userCategorySnapshot = await getDocs(userCategoryQuery)
  userCategorySnapshot.forEach((doc) => {
    primaryCategories.push(doc.data())
  })
  let compatibileArray = backwardCompat(primaryCategories)
  compatibileArray.forEach((doc) => {
    doc.deletedAt === null && parsedArray.push(doc)
  })
  dispatch({
    type: 'SET_PRIMARY_CATEGORIES',
    payload: { primaryCategories: parsedArray },
  })
}

export const gatherSinglePrimaryCategoryFromDB = async (userAuth, id) => {
  // console.log(`Trace: gatherSinglePrimaryCategoryFromDB()`)
  if (!userAuth) return
  let workingObject: any
  const userCategoryFirestoreRef = await collection(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories'
  )
  const userCategoryQuery = query(userCategoryFirestoreRef)
  const userCategorySnapshot = await getDocs(userCategoryQuery)
  await userCategorySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      workingObject = doc.data()
    }
  })
  return workingObject
}

export const savePrimaryCategoryToDB = async (dataPacket) => {
  if (dataPacket.title === '') return

  const { id, type, title, subtitle, deletedAt, entries, codePacket, childOfChain } = dataPacket

  const boardFireStoreRef = doc(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories',
    `${dataPacket.id}`
  )
  const boardSnapShot = await getDoc(boardFireStoreRef)

  if (!boardSnapShot.exists()) {
    // if no record of user in DB, create record
    let board = {
      id,
      type,
      title,
      subtitle,
      deletedAt,
      entries,
      codePacket,
      childOfChain
    }
    try {
      await setDoc(boardFireStoreRef, board)
      toast('New category saved successfully!')
    } catch (error) {
      console.log('error creating category', error.message)
      toast('error creating category')
    }
  } else if (boardSnapShot.exists()) {
    let board = {
      id,
      type,
      title,
      subtitle,
      deletedAt,
      entries,
      codePacket,
      childOfChain
    }
    try {
      await setDoc(boardFireStoreRef, board, { merge: true })
      toast('Category saved successfully!')
    } catch (error) {
      console.log('error creating category', error.message)
      toast('error creating category')
    }
  }
}

export const authListener = (
  display: any,
  dispatch: (input:any) => void,
  globalDispatch: (input: any) => void,
  userAuth: any
) => {
  // let userAuth = getAuth()
  const unSubAuth = onAuthStateChanged(userAuth, async (userAuth: any) => {
    if (userAuth) {
      await userInitializationHandler(
        userAuth,
        dispatch,
        globalDispatch,
        null,
        unSubAuth,
        display.isInitialModal
      )
    } else if (userAuth === null) {
      globalDispatch({
        type: 'SET_CURRENT_USER_TO_STATE',
        payload: { userObj: null },
      })
    }
  })
}

// export const deleteUserBoard = async (userAuth, boardName) => {
//   const boardFireStoreRef = doc(
//     db,
//     domainBasedCollectionName,
//     'companyData',
//     'boards',
//     boardName
//   )
//   const boardSnapShot = await getDoc(boardFireStoreRef)

//   if (boardSnapShot.exists()) {
//     try {
//       await deleteDoc(boardFireStoreRef)
//       toast('Board deleted')
//     } catch (error) {
//       console.log('error deleting board', error.message)
//       toast('Error deleting board')
//     }
//   }
// }

// export const saveChangelogToDB = async (userAuth, changelogObj, dispatch) => {
//   if (changelogObj.name === '') return

//   const {
//     boardObject,
//     boardName,
//     changelogMsg,
//     isApplied,
//     createdAt,
//     createdByUser,
//     lastEdited,
//     lastEditedByUser,
//     codeFileArray,
//     isPlanRun,
//     isPlanRunSuccess,
//     isPlanInitiated,
//     isReviewRequested,
//     reviewMessage,
//     requestedBy,
//     isApproved
//   } = changelogObj

//   const changelogFireStoreRef = doc(
//     db,
//     domainBasedCollectionName,
//     'companyData',
//     `versions`,
//     `${changelogObj.boardName}`,
//     `${changelogObj.isApplied ? 'applied' : 'changelog'}`,
//     `${changelogObj.lastEdited}`
//   )
//   const changelogSnapShot = await getDoc(changelogFireStoreRef)

//   if (!changelogSnapShot.exists()) {
//     let changelog = {
//       boardObject,
//       boardName,
//       changelogMsg,
//       isApplied,
//       createdAt,
//       createdByUser,
//       lastEdited,
//       lastEditedByUser,
//       codeFileArray,
//       isPlanRun,
//       isPlanRunSuccess,
//       isPlanInitiated,
//       isReviewRequested,
//       reviewMessage,
//       requestedBy,
//       isApproved
//     }
//     try {
//       await setDoc(changelogFireStoreRef, changelog)
//       toast('New changelog Saved Successfully!')
//       dispatch({
//         type: 'SAVE_MODAL_OFF',
//       })
//     } catch (error) {
//       console.log('error creating changelog', error.message)
//       toast('error creating changelog')
//     }
//   } else if (changelogSnapShot.exists()) {
//     let changelog = {
//       boardObject,
//       boardName,
//       changelogMsg,
//       isApplied,
//       createdAt,
//       createdByUser,
//       lastEdited,
//       lastEditedByUser,
//       codeFileArray,
//       isPlanRun,
//       isPlanRunSuccess,
//       isPlanInitiated,
//       isReviewRequested,
//       reviewMessage,
//       requestedBy,
//       isApproved
//     }
//     try {
//       await setDoc(changelogFireStoreRef, changelog, { merge: true })
//       toast('changelog Saved Successfully!')
//     } catch (error) {
//       console.log('error creating board', error.message)
//       toast('error creating changelog')
//     }
//   }
//   await gatherChangelogFromDB(userAuth, dispatch, boardName)
// }

// export const gatherChangelogFromDB = async (userAuth, dispatch, boardName) => {
//   if (!userAuth) return
// //   console.log('gather init')

//   let domain = userAuth.email
//   let symbolDividerIndex = domain.indexOf('@')
//   domainBasedCollectionName = domain.substring(symbolDividerIndex + 1)

//   let changelogArray = []
//   const changelogFirestoreRef = await collection(
//     db,
//     domainBasedCollectionName,
//     'companyData',
//     'versions',
//     `${boardName}`,
//     `changelog`
//   )
//   const mainFirestoreRef = await collection(
//     db,
//     domainBasedCollectionName,
//     'companyData',
//     'versions',
//     `${boardName}`,
//     `applied`
//   )

//   const changelogQuery = query(changelogFirestoreRef)
//   const changelogSnapshot = await getDocs(changelogQuery)
//   const mainQuery = query(mainFirestoreRef)
//   const mainSnapshot = await getDocs(mainQuery)

//   await changelogSnapshot.forEach((doc) => {
//     changelogArray.push(doc.data())
//   })
//   await mainSnapshot.forEach((doc) => {
//     changelogArray.push(doc.data())
//   })
//   await dispatch({
//     type: 'SET_CHANGELOG',
//     payload: { changelogArray: changelogArray },
//   })
// }

/* END of document ***********************************************************/
