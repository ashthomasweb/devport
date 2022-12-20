/******************************************************************************
* FILENAME:
*   MainState.tsx

* DESCRIPTION:
*   Primary State File.

* NOTES:
*   - Needs to be parsed into several task-specific context's

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { createContext, useReducer, useMemo } from 'react'
import { GlobalReducer } from './GlobalReducer'
// import cloneDeep from 'lodash.clonedeep'

import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

/** INITIAL TYPE DECLARATION ***************************************/

interface initialStateType {
  userObj: any
 
  globalDisplay: {
  
    isAdminPage: boolean
    isWelcomePage: boolean
    isBoardPage: boolean
  }
}

/** INITIAL STATE DECLARATION **************************************/

const initialState = {
  userObj: null,
  globalDisplay: {
  
    isAdminPage: false,
    isWelcomePage: true,
    isBoardPage: false,
  
  },
}

export const GlobalContext = createContext<{
  state: initialStateType
  globalDispatch: React.Dispatch<any>
}>({ state: initialState, globalDispatch: () => null })

const GlobalState = (props: any) => {
  const [state, globalDispatch] = useReducer(GlobalReducer, initialState)

  const value = useMemo(
    () => ({
      state,
      globalDispatch,
    }),
    [state]
  )

  return (
    <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
  )
}

export default GlobalState

/* END of document ***********************************************************/
