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

import {
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './add-pane.styles.scss'

const AddPane = (props: any): JSX.Element => {
  const {
    state: { display },
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
    let dataPacket = {
      title: primaryRef.current.value,
      subtitle: subtitleRef.current.value,
      deletedAt: null
    }
    dispatch({
      type: 'CREATE_PRIMARY',
      payload: { entry: dataPacket },
    })
    console.log(userObj.auth)
    savePrimaryCategoryToDB(dataPacket)
  }

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
      <textarea ref={primaryRef}></textarea>
      <span>Sub-Title</span>
      <textarea ref={subtitleRef}></textarea>
      <button onClick={closePane}>Cancel</button>
      <button onClick={createCategory}>Create</button>
    </div>
  )
}

export default AddPane

/* END of document ***********************************************************/
