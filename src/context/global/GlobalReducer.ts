/******************************************************************************
* FILENAME:
*   MainReducer.ts

* DESCRIPTION:
*   Primary reducer for React useContext Hook pattern.

* NOTES:
*   - Needs to be parsed into task-specific context's

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/


import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

export const GlobalReducer = (state: any, action: any) => {
  /* Helper functions to setup, package, and return the notes array */


  switch (action.type) {


    case 'SET_CURRENT_USER_TO_STATE': {
      // console.log(`Trace: SET_CURRENT_USER_TO_STATE()`)
      let data = action.payload.userObj
      let userObj = data
      return {
        ...state,
        userObj: userObj,
      }
    }

    case 'SIGN_USER_OUT': {
      // console.log(`Trace: SIGN_USER_OUT()`)
      let userObj = null
      return {
        ...state,
        userObj: userObj,
      }
    }

  //   /* DISPLAY PANE */

    case 'ADMIN_PAGE_ON': {
      // console.log(`Trace: ADMIN_PAGE_ON()`)
      let globalDisplay = {
        ...state.globalDisplay,
        isBoardPage: false,
        isWelcomePage: false,
        isAdminPage: true,
      }
      return {
        ...state,
        globalDisplay: globalDisplay,
      }
    }

    case 'WELCOME_PAGE_ON': {
      // console.log(`Trace: WELCOME_PAGE_ON()`)
      let globalDisplay = {
        ...state.globalDisplay,
        isBoardPage: false,
        isWelcomePage: true,
        isAdminPage: false,
      }
      return {
        ...state,
        globalDisplay: globalDisplay,
      }
    }

    case 'BOARD_PAGE_ON': {
      // console.log(`Trace: BOARD_PAGE_ON()`)
      let globalDisplay = {
        ...state.globalDisplay,
        isBoardPage: true,
        isWelcomePage: false,
        isAdminPage: false,
      }
      return {
        ...state,
        globalDisplay: globalDisplay,
      }
    }

    default: {
      return state
    }
  }
}

/* END of document ***********************************************************/
