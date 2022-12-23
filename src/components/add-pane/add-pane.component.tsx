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

  /* Primary Category Actions */
  const createPrimaryCat = (e: any) => {
    let dataPacket: entryType = {
      id: Math.random() * 10e18,
      childOfChain: [0],
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
  
  const editPrimaryCat = async (e: any) => {
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

  /* Subcategory Actions */

  const createSubcat = (e: any) => {
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

  
  const editSubcat = async (e: any) => {
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

  /* SubSubcategory Actions */

  const createSubSubcat = (e: any) => {
    let workingEntry =
      workingObject.entries[
        indexFinder(workingObject.entries, display.currentPaneParentId)
      ]

    let dataPacket = cloneDeep(newEntry)
    dataPacket.title = primaryRef.current.value
    dataPacket.subtitle = subtitleRef.current.value
    dataPacket.id = Math.random() * 10e18
    dataPacket.childOfChain.push(...workingEntry.childOfChain, workingEntry.id)
    workingEntry.entries.push(dataPacket)
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: workingObject },
    })
    savePrimaryCategoryToDB(workingObject)
  }

  
  const editSubSubcat = async (e: any) => {
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



  /* Final Category Actions */

  const createFinalEntry = (e: any) => {
    let workingEntry =
      workingObject.entries[
        indexFinder(workingObject.entries, display.currentPaneParentId)
      ].entries[
        indexFinder(
          workingObject.entries[
            indexFinder(workingObject.entries, display.currentPaneParentId)
          ].entries,
          display.finalPaneParentId
        )
      ]

    let dataPacket = cloneDeep(newEntry)
    dataPacket.title = primaryRef.current.value
    dataPacket.subtitle = subtitleRef.current.value
    dataPacket.id = Math.random() * 10e18
    dataPacket.childOfChain.push(...workingEntry.childOfChain, workingEntry.id)
    workingEntry.entries.push(dataPacket)
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: workingObject },
    })
    savePrimaryCategoryToDB(workingObject)
  }

  
  const editFinalcat = async (e: any) => {
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
        defaultValue={`${
          display.isEdit ? display.editSubtitle : ''
        }`}></textarea>
      <button onClick={closePane}>Cancel</button>
      <button onClick={createPrimaryCat}>Create Primary</button>
      <button onClick={createSubcat}>Create Sub</button>
      <button onClick={createSubSubcat}>Create SubSub</button>
      <button onClick={createFinalEntry}>Create Final</button>

      {display.isEdit && <button onClick={editPrimaryCat}>editP</button>}
      {display.isEdit && <button onClick={editSubcat}>editsub</button>}
      {display.isEdit && <button onClick={editSubSubcat}>editsubsub</button>}
      {display.isEdit && <button onClick={editSubSubcat}>editFinal</button>}
    </div>
  )
}

export default AddPane

/* END of document ***********************************************************/
