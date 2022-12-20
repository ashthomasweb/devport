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
  /* Helper Functions */
  /* Components */
  PrimaryCategory
  /* Icons */
} from '../../export-hub'

import './sub-header.styles.scss'

const SubHeader = (props: any): JSX.Element => {
  const {
    state: { primaryCategories },
    dispatch,
  } = useContext(MainContext)
  const {
    state: {},
    globalDispatch,
  } = useContext(GlobalContext)

  const toggleAddPane = () => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: true }
    })
  }

  // useEffect(() => {
  //   function namedFunction(e: any) {

  //   }
  //   window.addEventListener('event', namedFunction)

  //   return function cleanupEvListener() {
  //     window.removeEventListener('event', namedFunction)
  //   }
  // }, [])

  return (
    <div className='sub-header-container'>
      {primaryCategories.map((category: string | null, index: number) => {
        return <PrimaryCategory key={index} data={category}/>
      })}
      <button onClick={toggleAddPane}>Add</button>
    </div>
  )
}

export default SubHeader

// END of document
