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
import { MainReducer } from './MainReducer'

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
  display: any
  primaryCategories: any[]
}

/** INITIAL STATE DECLARATION **************************************/

const initialState = {
  userObj: null,
  primaryCategories: [
  ],
  display: {
    isAddPane: false,
    isUserDropDown: false,
    isAddPrimary: false
  }
}

export const MainContext = createContext<{
  state: initialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const MainState = (props: any) => {
  const [state, dispatch] = useReducer(MainReducer, initialState)

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  )
}

export default MainState

/* END of document ***********************************************************/
