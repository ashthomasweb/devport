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

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  SubCategory,
  /* Icons */
} from '../../export-hub'

import './subcategory-pane.styles.scss'

const SubcategoryPane = (props: any): JSX.Element => {
  const {
    state: { display, workingObject },
    dispatch,
  } = useContext(MainContext)

  // const myFunction = (e: any) => {

  // }

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

  
  const closePane = (e: any) => {
    dispatch({
      type: 'TOG_SUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_SUBSUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_FINAL_PANE',
    })
  }

  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false },
    })
  }

  return (
    <div className='subcategory-pane-container'>
      {display.currentPrimary}
      <br />
      {display.currentPrimarySubtitle}

      {workingObject?.entries.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return <SubCategory key={index} data={entry} pane='sub' />
        } else return
      })}
      <button onClick={closePane}>X</button>
      <button
        onClick={addItem}
        style={{ right: `30px`, backgroundColor: 'lightgreen' }}>
        +
      </button>
    </div>
  )
}

export default SubcategoryPane

/* END of document ***********************************************************/
