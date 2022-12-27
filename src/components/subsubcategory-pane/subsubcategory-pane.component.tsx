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
  indexFinder,
  /* Components */
  SubCategory,
  /* Icons */
} from '../../export-hub'

import './subsubcategory-pane.styles.scss'

const SubSubcategoryPane = (props: any): JSX.Element => {
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
      type: 'TOG_SUBSUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_FINAL_PANE',
    })
  }

  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false, category: 'subsub' },
    })
  }

  return (
    <div className='subsubcategory-pane-container' onDoubleClick={addItem}>
      <h3>{display.currentPaneParentTitle}</h3>
      <p>{display.currentPaneParentSubtitle}</p>
      {workingObject?.entries[
        indexFinder(workingObject.entries, display.currentPaneParentId)
      ].entries.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return <SubCategory key={index} data={entry} pane='subsub' />
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

export default SubSubcategoryPane

/* END of document ***********************************************************/
