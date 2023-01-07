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

    case 'SET_DRAG_ID': {
      console.log(`Trace: SET_DRAG_ID()`)
      let globalDragData = {
        ...state.globalDragData,
        currentDropPaneId: null,
        currentDropId: action.payload.currentDropId,
        currentDropChain: [...action.payload.chain],
        currentDropPaneChain: null
      }
      // console.log(action.payload.currentDropId)
      return {
        ...state,
        globalDragData: globalDragData,
      }
    }

    case 'SET_DRAGGING_ID': {
      console.log(`Trace: SET_DRAGGING_ID()`)
      let globalDragData = {
        ...state.globalDragData,
        currentDraggingId: action.payload.currentDraggingId,
      }
      // console.log(action.payload.currentDropId)
      return {
        ...state,
        globalDragData: globalDragData,
      }
    }

    case 'SET_DRAG_PANE': {
      console.log(`Trace: SET_DRAG_PANE()`)
      let globalDragData = {
        ...state.globalDragData,
        currentDropPaneId: action.payload.currentDropPaneId,
        currentDropId: null,
        currentDropPaneChain: [action.payload.chain],
        currentDropChain: null
      }
      // console.log(action.payload.currentDropId)
      return {
        ...state,
        globalDragData: globalDragData,
      }
    }

    case 'SET_SUBSUB_ENTRY': {
      console.log(`Trace: SET_SUBSUB_ENTRY()`)
      let subSubEntry = action.payload.subSubEntry
      return {
        ...state,
        subSubPaneEntry: subSubEntry,
      }
    }

    case 'SET_SUB_ENTRY': {
      console.log(`Trace: SET_SUB_ENTRY()`)
      let subEntry = action.payload.subEntry
      return {
        ...state,
        subPaneEntry: subEntry,
      }
    }

    default: {
      return state
    }
  }
}

/* END of document ***********************************************************/
