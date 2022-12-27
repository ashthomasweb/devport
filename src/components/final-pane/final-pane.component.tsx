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

import './final-pane.styles.scss'

const FinalPane = (props: any): JSX.Element => {
  const {
    state: { display, workingObject },
    dispatch,
  } = useContext(MainContext)
  
  const closePane = (e: any) => {
    dispatch({
      type: 'TOG_FINAL_PANE',
    })
  }

  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false, category: 'final' },
    })
  }

  return (
    <div className='final-pane-container' onDoubleClick={addItem}>
      <h3>{display.finalPaneParentTitle}</h3>
      <p>{display.finalPaneParentSubtitle}</p>

      {workingObject?.entries[
        indexFinder(workingObject.entries, display.currentPaneParentId)
      ].entries[
        indexFinder(
          workingObject.entries[
            indexFinder(workingObject.entries, display.currentPaneParentId)
          ].entries,
          display.finalPaneParentId
        )
      ].entries.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return <SubCategory key={index} data={entry} pane='final'/>
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

export default FinalPane

/* END of document ***********************************************************/
