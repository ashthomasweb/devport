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
  /* Components */
  /* Icons */
} from '../../export-hub'

import './primary-category.styles.scss'

const PrimaryCategory = (props: any): JSX.Element => {
  const {
    state: { workingObject, display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  let [activeBorder, setActiveBorder]: any = useState(false)
  let [borderSwitch, setBorderSwitch]: any = useState(false)

  const clickHandler = (e: any) => {
    setBorderSwitch(!borderSwitch)
    // props.data.codePacket.length > 0 ? openCodePane(e) : openPane()
  }

  useEffect(() => {
      if (
        workingObject.id === props.data.id &&
        display.isSubcategoryPaneOpen
      ) {
        setActiveBorder(true)
      } else {
        setActiveBorder(false)
      }
      if (display.isSubcategoryPaneOpen === false) {
        setActiveBorder(false)
      }
  }, [workingObject, borderSwitch, display.isSubcategoryPaneOpen])

  const deleteCategory = async (e: any) => {
    e.stopPropagation()

    dispatch({
      type: 'CLOSE_SUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_SUBSUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_FINAL_PANE',
    })

    if (window.confirm('Are you sure you want to mark as deleted?')) {
      if (
        window.confirm(
          'This will remove all nested entries from file view. Proceed?'
        )
      ) {
        let dataPacket = {
          ...props.data,
          deletedAt: new Date().getTime(),
        }
        await savePrimaryCategoryToDB(dataPacket)
        gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
      }
    }
  }

  








  const openSubcategoryPane = async (e: any) => {
    setBorderSwitch(!borderSwitch)

    let obj = await gatherSinglePrimaryCategoryFromDB(
      userObj.auth,
      props.data.id
    )
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: obj },
    })
    let entryPacket = cloneDeep(obj)
    delete entryPacket.entries
    delete entryPacket.codePacket
    dispatch({
      type: 'OPEN_PRIMARY_PANE',
      payload: { entryData: entryPacket },
    })
    if (display.isSubcategoryPaneOpen && display.currentPrimaryEntryData.id === props.data.id) {
      dispatch({
        type: 'CLOSE_SUBCAT_PANE'
      })
    }
  }

  const updateCategory = async (e: any) => {
    e.preventDefault()
    let obj = await gatherSinglePrimaryCategoryFromDB(
      userObj.auth,
      props.data.id
    )
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: obj },
    })
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: {
        isAddPrimary: true,
        isEdit: true,
        editId: props.data.id,
        currentPrimaryId: props.data.id,
        title: props.data.title,
        subtitle: props.data.subtitle,
        idChain: props.data.childOfChain,
        category: 'primary',
      },
    })
  }

  return (
    <div
      className='primary-category-container'
      style={{
        outline: `${activeBorder ? '2px solid #4c4c84' : 'inherit'}`,
        backgroundColor: `${activeBorder ? '#1e1e1e' : '#252525'}`,
      }}
      onClick={openSubcategoryPane}
      onContextMenu={updateCategory}>
      <button onClick={deleteCategory}>X</button>
      <h4>{props.data.title}</h4>
      <p>{props.data.subtitle}</p>
    </div>
  )
}

export default PrimaryCategory

// END of document
