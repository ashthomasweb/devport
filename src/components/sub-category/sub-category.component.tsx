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

import {
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  gatherSinglePrimaryCategoryFromDB,
  /* Helper Functions */
  indexFinder,
  treeSearchAndUpdateInPlace,
  /* Components */
  /* Icons */
} from '../../export-hub'

import './sub-category.styles.scss'

const SubCategory = (props: any): JSX.Element => {
  const {
    state: { workingObject, display, editorPacket },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  let [isCodeVisible, setIsCodeVisible]: any = useState(false)
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

  // const openSubcategoryPane = async () => {
  //   dispatch({
  //     type: 'OPEN_PRIMARY_PANE',
  //     payload: {category: props.data.title}
  //   })
  //   gatherSinglePrimaryCategoryFromDB(userObj.auth, dispatch, props.data.title)
  // }

  const updateSubcategory = async (e: any) => {
    e.preventDefault()
    let obj = await gatherSinglePrimaryCategoryFromDB(
      userObj.auth,
      props.data.id
    )
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
    if (props.pane === 'sub') {
      dispatch({
        type: 'SET_CURRENT_PARENT_ID',
        payload: {
          id: props.data.id,
          title: props.data.title,
          subtitle: props.data.subtitle,
        },
      })
      if (props.data.id === display.currentPaneParentId) {
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
          id: props.data.id,
          title: props.data.title,
          subtitle: props.data.subtitle,
        },
      })
      if (props.data.id === display.finalPaneParentId) {
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
        display.currentPaneParentId === props.data.id &&
        display.isSubSubcategoryPaneOpen
      ) {
        console.log('1 t')
        setActiveBorder(true)
      } else {
        console.log('1 f')
        setActiveBorder(false)
      }
    }

    if (props.pane === 'subsub') {
      if (
        display.finalPaneParentId === props.data.id &&
        display.isFinalPaneOpen
      ) {
        setActiveBorder(true)
      } else {
        setActiveBorder(false)
      }
    }
  }, [display.currentPaneParentId, display.finalPaneParentId, borderSwitch])


  return (
    <div
      className='sub-category-container'
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
      onContextMenu={updateSubcategory}
      onClick={clickHandler}>
      <div
        style={{
          borderTop: `${
            props.data.codePacket.length === 0 &&
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
            props.data.codePacket.length === 0 &&
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

        <h4>{props.data.title}</h4>
        <p>{props.data.subtitle.substring(0, 120)}</p>
      </div>
    </div>
  )
}

export default SubCategory

// END of document

{
  /* <div style={{}} className='top-left-corner' />
      <div style={{}} className='bottom-right-corner' />
      <div style={{}} className='bottom-left-corner' /> */
}
