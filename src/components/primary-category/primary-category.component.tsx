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

import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'

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
    state: { workingObject },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  const deleteCategory = async (e: any) => {
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

  const openSubcategoryPane = async () => {
    let obj = await gatherSinglePrimaryCategoryFromDB(
      userObj.auth,
      props.data.id
    )
    dispatch({
      type: 'SET_WORKING_OBJECT',
      payload: { workingObject: obj },
    })
    dispatch({
      type: 'OPEN_PRIMARY_PANE',
      payload: { category: props.data.title, subtitle: props.data.subtitle },
    })
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
      payload: { isAddPrimary: true, isEdit: true, editId: props.data.id, title: props.data.title, subtitle: props.data.subtitle, idChain: props.data.childOfChain },
    })
  }

  return (
    <div
      className='primary-category-container'
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
