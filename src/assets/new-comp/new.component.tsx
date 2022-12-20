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

import './NAME.styles.scss'

const NAME = (props: any): JSX.Element => {
  const {
    state: {},
    dispatch,
  } = useContext(MainContext)


  const myFunction = (e: any) => {
  
  }

  useEffect(() => {
   
  }, [])  

  useEffect(() => {
    function namedFunction(e: any) {

    }
    window.addEventListener('event', namedFunction)

    return function cleanupEvListener() {
      window.removeEventListener('event', namedFunction)
    }
  }, [])

  return (
    <>
    <div></div>
    </>
  )
}

export default NAME

/* END of document ***********************************************************/
