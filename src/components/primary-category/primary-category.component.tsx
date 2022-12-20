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
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './primary-category.styles.scss'

const PrimaryCategory = (props: any): JSX.Element => {
  const {
    state: {},
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)



  const deleteCategory = (e: any) => {
    let dataPacket = {
      ...props.data,
      deletedAt: new Date().getTime()
    }
    console.log(dataPacket)
    savePrimaryCategoryToDB(dataPacket)
    gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
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
    <div className='primary-category-container'>
      <button onClick={deleteCategory}>X</button>
      {props.data.title}<br/>{props.data.subtitle}
    </div>
  )
}

export default PrimaryCategory

// END of document
