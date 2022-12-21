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

    let dataPacket = {
      ...props.data,
      deletedAt: new Date().getTime()
    }
    await savePrimaryCategoryToDB(dataPacket)
    gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
  }
  }

  const openPrimaryPane = async () => {
    console.log('2')
    await gatherSinglePrimaryCategoryFromDB(userObj.auth, dispatch, props.data.id)
    dispatch({
      type: 'OPEN_PRIMARY_PANE',
      payload: {category: props.data.title}
    })
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
    <div className='primary-category-container' onClick={openPrimaryPane}>
      <button onClick={deleteCategory}>X</button>
      <h4>{props.data.title}</h4>
      <p>{props.data.subtitle}</p>
    </div>
  )
}

export default PrimaryCategory

// END of document
