/******************************************************************************
* FILENAME:
*   new.mjs

* DESCRIPTION:
*   

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import cloneDeep from 'lodash.clonedeep'

import {
  gatherUserPrimaryCategoriesFromDB,
  indexFinder,
  /* Types */
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  /* Helper Functions */
  treeSearchAndUpdateInPlace,
  /* Components */
  /* Icons */
} from '../../export-hub'

import './add-pane.styles.scss'

export interface entryType {
  id: number
  childOfChain: number[]
  type: string
  title: string
  subtitle: string
  deletedAt: number | null
  entries: any[]
  codePacket: any[]
}

export const newEntry: entryType = {
  id: 0,
  childOfChain: [],
  type: '',
  title: '',
  subtitle: '',
  deletedAt: null,
  entries: [],
  codePacket: [],
}

interface codePackType {
  title: string
  languageExt: string
  content: string
}

const AddPane = (props: any): JSX.Element => {
  const {
    state: { display, workingObject },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  const closePane = () => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: true },
    })
  }

  let primaryRef: any = useRef(null)
  let subtitleRef: any = useRef(null)

  const createCategory = (e: any) => {
    let dataPacket: entryType = {
      id: Math.random() * 10e18,
      childOfChain: [],
      type: 'category',
      title: primaryRef.current.value,
      subtitle: subtitleRef.current.value,
      deletedAt: null,
      entries: [],
      codePacket: [],
    }
    dispatch({
      type: 'CREATE_PRIMARY',
      payload: { entry: dataPacket },
    })
    savePrimaryCategoryToDB(dataPacket)
  }

  const addToCategory = (e: any) => {
    let workingEntries = workingObject.entries

    let dataPacket = cloneDeep(newEntry)
    dataPacket.title = primaryRef.current.value
    dataPacket.subtitle = subtitleRef.current.value
    dataPacket.id = Math.random() * 10e18
    dataPacket.childOfChain.push(workingObject.id)
    workingEntries.push(dataPacket)
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: workingObject },
    })
    savePrimaryCategoryToDB(workingObject)
  }

  const editCategory = async (e: any) => {
    workingObject.title = primaryRef.current.value
    workingObject.subtitle = subtitleRef.current.value

    await savePrimaryCategoryToDB(workingObject)
    gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
  }

   const editSubcategory = async (e: any) => {
    let dataPack = {
      title: primaryRef.current.value,
      subtitle: subtitleRef.current.value,
    }
    let newWorkingObject = treeSearchAndUpdateInPlace(
         workingObject,
         display.editId,
         display.idChain,
         dataPack
       )

     await savePrimaryCategoryToDB(newWorkingObject)
     gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
   }

  // const test = (e: any) => {
  //   let newEntry: any = { ...workingObject }

  //   let newFile: codePackType = {
  //     title: 'App.tsx',
  //     languageExt: 'tsx',
  //     content: subtitleRef.current.value,
  //   }

  //   workingObject?.entries.push(newFile)

  //   console.log(newEntry)
  // }
  // useEffect(() => {

  // }, [])

  // useEffect(() => {
  //   function namedFunction(e: any) {

  //   }
  //   window.addEventListener('event', namedFunction)

  //   return function cleanupEvListener() {
  //     window.removeEventListener('event', namedFunction)
  //   }
  // }, [])

  return (
    <div className='add-pane-container'>
      <h2 className='title'>{`Add ${
        display.isAddPrimary ? 'Primary ' : 'Sub-'
      }Category`}</h2>
      <span>Primary Title</span>
      <textarea
        ref={primaryRef}
        defaultValue={`${display.isEdit ? display.editTitle : ''}`}></textarea>
      <span>Sub-Title</span>
      <textarea
        ref={subtitleRef}
        defaultValue={`${display.isEdit ? display.editSubtitle : ''}`}></textarea>
      <button onClick={closePane}>Cancel</button>
      <button onClick={createCategory}>Create</button>
      <button onClick={addToCategory}>add</button>
      {display.isEdit && <button onClick={editCategory}>edit</button>}
      {display.isEdit && <button onClick={editSubcategory}>editsub</button>}
    </div>
  )
}

export default AddPane

/* END of document ***********************************************************/
