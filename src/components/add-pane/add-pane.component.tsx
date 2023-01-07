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

import React, { useContext, useEffect, useRef, useState } from 'react'
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

  let [lengthAlert, setLengthAlert]: any = useState(false)

  const closePane = () => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: true, category: null },
    })
  }

  let primaryRef: any = useRef(null)
  let subtitleRef: any = useRef(null)

  /* Primary Category Actions */
  const createPrimaryCat = (e: any) => {
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
        indexFinder(workingObject.entries, display.currentSubEntryData.id)
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
        indexFinder(workingObject.entries, display.currentSubEntryData.id)
      ].entries[
        indexFinder(
          workingObject.entries[
            indexFinder(workingObject.entries, display.currentSubEntryData.id)
          ].entries,
          display.finalPaneEntryData.id
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

  const lengthListener = () => {
    if (primaryRef.current.value === null) return
    if (primaryRef?.current?.value.length > 62) {
      setLengthAlert(true)
    }
  }

  return (
    <div className='add-pane-container'>
      <h2 className='title'>{`Add ${
        display.isAddPrimary ? 'Primary ' : 'Sub-'
      }Category`}</h2>
      <span style={{ display: 'inline-block' }}>Primary Title</span>
      {lengthAlert && (
        <span
          style={{
            display: 'inline-block',
            position: 'absolute',
            right: 30,
            color: 'red',
            fontWeight: 900,
          }}>
          Too long!
        </span>
      )}
      <textarea
        ref={primaryRef}
        defaultValue={`${display.isEdit ? display.editTitle : ''}`}
        style={{ color: `${lengthAlert ? 'red' : 'white'}` }}
        onInput={lengthListener}></textarea>
      <span>Sub-Title</span>
      <textarea
        ref={subtitleRef}
        defaultValue={`${
          display.isEdit ? display.editSubtitle : ''
        }`}></textarea>
      <button onClick={closePane}>Cancel</button>

      {display.category === 'primary' && !display.isEdit && (
        <button onClick={createPrimaryCat}>Create Primary</button>
      )}
      {display.category === 'sub' && !display.isEdit && (
        <button onClick={createSubcat}>Create Sub</button>
      )}
      {display.category === 'subsub' && !display.isEdit && (
        <button onClick={createSubSubcat}>Create SubSub</button>
      )}
      {display.category === 'final' && !display.isEdit && (
        <button onClick={createFinalEntry}>Create Final</button>
      )}

      {display.isEdit && display.category === 'primary' && <button onClick={editPrimaryCat}>editP</button>}
      {display.isEdit && display.category === 'sub' && <button onClick={editSubcat}>editsub</button>}
      {display.isEdit && display.category === 'subsub' && <button onClick={editSubSubcat}>editsubsub</button>}
      {display.isEdit && display.category === 'final' && <button onClick={editSubSubcat}>editFinal</button>}
    </div>
  )
}

export default AddPane

/* END of document ***********************************************************/
