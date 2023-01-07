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

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  indexFinder,
  /* Components */
  Entry,
  /* Icons */
} from '../../export-hub'

import './subsubcategory-pane.styles.scss'

const SubSubcategoryPane = (props: any): JSX.Element => {
  const {
    state: { display, workingObject },
    dispatch,
  } = useContext(MainContext)
    const {
      state: { globalDragData, subSubPaneEntry },
      globalDispatch,
    } = useContext(GlobalContext)

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

  const dragIdHandler = () => {
    globalDispatch({
      type: 'SET_DRAG_PANE',
      payload: {
        currentDropPaneId: display.currentSubEntryData.id,
        chain: display.currentSubEntryData.childOfChain,
      },
    })
  }

  return (
    <div
      className='subsubcategory-pane-container'
      onDoubleClick={addItem}
      onDragOver={dragIdHandler}
      style={{
        outline: `${
          display.currentSubEntryData.id === globalDragData.currentDropPaneId
            ? '3px solid yellow'
            : 'none'
        }`,
      }}>
      <h3>{display.currentSubEntryData.id}</h3>
      <h3>{display.currentSubEntryData.title}</h3>
      <p>{display.currentSubEntryData.subtitle}</p>
      {workingObject?.entries[
        indexFinder(workingObject.entries, display.currentSubEntryData.id)
      ].entries.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return <Entry key={index} data={entry} parentChain={display.currentSubEntryData.chain} pane='subsub' />
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
