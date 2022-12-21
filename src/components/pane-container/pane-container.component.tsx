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
  /* Icons */
} from '../../export-hub'

import './pane-container.styles.scss'

const PaneContainer = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)


  const closePane = (e: any) => {
    dispatch({
      type: 'TOG_PRIMARY_PANE'
    })
  }

  
  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: {isAddPrimary: false}
    })
  }

  // useEffect(() => {
   
  // }, [])  


  return (
    <div className='pane-container' style={{height: `calc(100vh - ${display.headerHeight + display.subheaderHeight}px)`}}>
      <div className='inner-wrapper'>
        {props.children}

        <button onClick={closePane}>X</button>
        <button onClick={addItem} style={{right: `30px`, backgroundColor: 'lightgreen'}}>+</button>


      </div>
    </div>
  )
}

export default PaneContainer

/* END of document ***********************************************************/
