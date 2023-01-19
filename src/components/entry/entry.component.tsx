/******************************************************************************
* FILENAME:
*   new.mjs

* DESCRIPTION:
*   

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import cloneDeep from 'lodash.clonedeep'

import {
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  gatherSinglePrimaryCategoryFromDB,
  /* Helper Functions */
  indexFinder,
  treeSearchAndUpdateInPlace,
  moveEntry,
  findTreeEntry,
  findTreeEntryParent,
  removeEntryFromArray,
  /* Components */
  /* Icons */
} from '../../export-hub'

import './entry.styles.scss'
import { toast } from 'react-toastify'

const Entry = (props: any): JSX.Element => {
  const {
    state: { workingObject, display, editorPacket },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj, globalDragData },
    globalDispatch,
  } = useContext(GlobalContext)

  let [activeBorder, setActiveBorder]: any = useState(false)
  let [borderSwitch, setBorderSwitch]: any = useState(false)

  const deleteSubcategory = async (e: any) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to mark as deleted?')) {
      let newWorkingObject = treeSearchAndUpdateInPlace(
        workingObject,
        props.data.id,
        props.data.childOfChain,
        {},
        true
      )

      await savePrimaryCategoryToDB(newWorkingObject)
      gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
      if (props.pane === 'subsub') {
        dispatch({
          type: 'CLOSE_FINAL_PANE',
        })
      }
      if (props.pane === 'sub') {
        dispatch({
          type: 'CLOSE_SUBSUBCAT_PANE',
        })
      }
    }
  }

  const updateEntry = async (e: any) => {
    e.preventDefault()

    dispatch({
      type: 'TOG_ADD_PANE',
      payload: {
        isAddPrimary: false,
        isEdit: true,
        editId: props.data.id,
        idChain: props.data.childOfChain,
        title: props.data.title,
        subtitle: props.data.subtitle,
        category: props.pane,
      },
    })
  }

  const openCodePane = (e: any) => {
    e.stopPropagation()

    dispatch({
      type: 'SEND_ENTRY_TO_EDITOR',
      payload: { editorPacket: props.data },
    })
    if (props.data.id === editorPacket.id) {
      dispatch({
        type: 'TOG_CODE_PANE',
      })
    } else {
      dispatch({
        type: 'OPEN_CODE_PANE',
      })
    }
  }

  const openPane = () => {
    let entryPacket = cloneDeep(props.data)
    delete entryPacket.entries
    delete entryPacket.codePacket
    if (props.pane === 'sub') {
      dispatch({
        type: 'SET_CURRENT_SUB_ENTRY',
        payload: {
          currentSubEntryData: entryPacket,
        },
      })
      if (props.data.id === display.currentSubEntryData?.id) {
        dispatch({
          type: 'TOG_SUBSUBCAT_PANE',
        })
      } else {
        dispatch({
          type: 'OPEN_SUBSUBCAT_PANE',
        })
      }
    } else if (props.pane === 'subsub') {
      dispatch({
        type: 'SET_FINAL_ID',
        payload: {
          finalPaneEntryData: entryPacket,
        },
      })
      if (props.data.id === display.finalPaneEntryData?.id) {
        dispatch({
          type: 'TOG_FINAL_PANE',
        })
      } else {
        dispatch({
          type: 'OPEN_FINAL_PANE',
        })
      }
    }
  }

  const clickHandler = (e: any) => {
    setBorderSwitch(!borderSwitch)
    props.data.codePacket.length > 0 ? openCodePane(e) : openPane()
  }

  useEffect(() => {
    if (props.pane === 'sub') {
      if (
        display.currentSubEntryData?.id === props.data.id &&
        display.isSubSubcategoryPaneOpen
      ) {
        setActiveBorder(true)
      } else {
        setActiveBorder(false)
      }
    }
    if (props.pane === 'subsub') {
      if (
        display.finalPaneEntryData?.id === props.data.id &&
        display.isFinalPaneOpen
      ) {
        setActiveBorder(true)
      } else {
        setActiveBorder(false)
      }
    }
  }, [
    display.currentSubEntryData,
    display.finalPaneEntryData?.id,
    workingObject,
    borderSwitch,
    props.data.childOfChain,
  ])

  const fireDropEvent = (e: any) => {
    if (
      globalDragData.currentDraggingId === globalDragData.currentDropId ||
      globalDragData.currentDraggingId === globalDragData.currentDropPaneId
    ) {
      return
    }
    if (
      globalDragData.currentDropPaneId ===
      props.data.childOfChain[props.data.childOfChain.length - 1]
    ) {
      return
    }
    let entry = findTreeEntry(
      workingObject,
      props.data.id,
      props.data.childOfChain
    )
    let nestedEntryIds: any[] = []
    entry.entries.forEach((nested1Entry: any) => {
      nestedEntryIds.push(nested1Entry.id)
      nested1Entry.entries.forEach((nested2Entry: any) => {
        nestedEntryIds.push(nested2Entry.id)
        nested2Entry.entries.forEach((nested3Entry: any) => {
          nestedEntryIds.push(nested3Entry.id)
        })
      })
    })
    if (
      nestedEntryIds.includes(globalDragData.currentDropId) ||
      nestedEntryIds.includes(globalDragData.currentDropPaneId)
    ) {
      toast('Cannot drop into child entry')
      return
    }

    moveEntry(globalDragData, workingObject, props.data)
    let chain: any =
      globalDragData.currentDropChain === null
        ? globalDragData.currentDropPaneChain
        : globalDragData.currentDropChain
    let id: any =
      globalDragData.currentDropPaneId === null
        ? globalDragData.currentDropId
        : globalDragData.currentDropPaneId
    let newChain = [...chain, id]

    let parent = findTreeEntryParent(workingObject, props.data.childOfChain)
    let parentDepth = parent.childOfChain.length
    parent.entries = removeEntryFromArray(entry, parent)
    entry.childOfChain = newChain // need recursive lookup for all children - fun/ouch

    entry.entries.forEach((nested1Entry: any) => {
      nested1Entry.childOfChain = [...entry.childOfChain, entry.id]
      nested1Entry.entries.forEach((nested2Entry: any) => {
        nested2Entry.childOfChain = [...entry.childOfChain, entry.id]
        nested2Entry.entries.forEach((nested3Entry: any) => {
          nested3Entry.childOfChain = [...entry.childOfChain, entry.id]
        })
      })
    })

    if (parentDepth === 1) {
      if (
        globalDragData.currentDraggingId === display?.finalPaneEntryData?.id
      ) {
        dispatch({
          type: 'CLOSE_FINAL_PANE',
        })
      }
    }
    if (parentDepth === 2) {
      if (
        globalDragData.currentDraggingId === display?.finalPaneEntryData?.id
      ) {
        dispatch({
          type: 'CLOSE_FINAL_PANE',
        })
      }
    }
    if (parentDepth === 3) {
      alert('No more levels of nesting available')
    }
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: workingObject },
    })
    savePrimaryCategoryToDB(workingObject)
  }

  const dragIdHandler = (e: any) => {
    // if (globalDragData.currentDropId === e.target.id) return
    e.stopPropagation()
    globalDispatch({
      type: 'SET_DRAG_ID',
      payload: {
        currentDropId: props.data.id,
        chain: props.data.childOfChain,
        parentChain: props.parentChain,
      },
    })
  }

  const setDraggingId = () => {
    globalDispatch({
      type: 'SET_DRAGGING_ID',
      payload: { currentDraggingId: props.data.id },
    })
  }

  return (
    <div
      className='entry-container'
      id={props.data.id}
      style={{
        outline: `${
          display.isCodePaneOpen && editorPacket?.id === props.data.id
            ? '4px solid green'
            : activeBorder
            ? '2px solid #525ca8'
            : 'none'
        }`,
        border: `${props.data.codePacket.length > 0 && 'none'}`,
      }}
      onContextMenu={updateEntry}
      onClick={clickHandler}
      draggable
      onDragOver={dragIdHandler}
      // onDragExit={dragEntryReset}
      // onDragExit
      onDragStart={setDraggingId}
      onDragEnd={fireDropEvent}>
      <div
        style={{
          borderTop: `${
            props.data.id === globalDragData.currentDropId
              ? '4px solid yellow'
              : props.data.codePacket.length === 0 &&
                props.data.entries.length === 0
              ? 'none'
              : props.data.codePacket.length > 0
              ? display.isCodePaneOpen && editorPacket?.id === props.data.id
                ? '4px solid green'
                : '4px solid #4c4c84'
              : display.isCodePaneOpen && editorPacket?.id === props.data.id
              ? '4px solid green'
              : '4px solid grey'
          }`,
          borderRight: `${
            props.data.id === globalDragData.currentDropId
              ? '4px solid yellow'
              : props.data.codePacket.length === 0 &&
                props.data.entries.length === 0
              ? 'none'
              : props.data.codePacket.length > 0
              ? display.isCodePaneOpen && editorPacket?.id === props.data.id
                ? '4px solid green'
                : '4px solid #4c4c84'
              : display.isCodePaneOpen && editorPacket?.id === props.data.id
              ? '4px solid green'
              : '4px solid grey'
          }`,
          top: `${props.data.codePacket.length > 0 && '-3px'}`,
          right: `${props.data.codePacket.length > 0 && '-3px'}`,
        }}
        className='top-right-corner'
      />
      {activeBorder && <div className='is-open-arrow' />}
      <div
        className='inner-wrapper'
        style={{
          backgroundColor: `${
            props.data.codePacket.length > 0
              ? '#161616'
              : props.data.entries.length > 0
              ? '#2d2d32'
              : '#4f5059'
          }`,
          border: `${props.data.codePacket.length > 0 && 'none'}`,
        }}>
        <button onClick={deleteSubcategory}>X</button>
        {props.data.entries.length === 0 && (
          <button
            style={{
              top: 5,
              backgroundColor: `${
                props.data.codePacket.length > 0
                  ? display.isCodePaneOpen && editorPacket?.id === props.data.id
                    ? 'green'
                    : '#4c4c84'
                  : display.isCodePaneOpen && editorPacket?.id === props.data.id
                  ? 'green'
                  : 'grey'
              }`,
            }}
            onClick={openCodePane}>{`<>`}</button>
        )}
        {/* <h6>{props.data.id}</h6> */}
        <h4>{props.data.title}</h4>
        <p>{props.data.subtitle.substring(0, 120)}</p>
      </div>
    </div>
  )
}

export default Entry

// END of document
