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


  // useEffect(() => {
   
  // }, [])  


  return (
    <div className='pane-container' style={{height: `calc(100vh - ${display.headerHeight + display.subheaderHeight + 10}px)`}}>
      <div className='inner-wrapper'>
        {props.children}

      

      </div>
    </div>
  )
}

export default PaneContainer

/* END of document ***********************************************************/
