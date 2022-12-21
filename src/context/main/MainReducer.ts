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



export const MainReducer = (state: any, action: any) => {
  /* Helper functions to setup, package, and return the notes array */


  switch (action.type) {

    case 'TOG_USER_DROP_DOWN': {
      // console.log(`Trace: TOG_USER_DROP_DOWN()`)
      let display = {
        ...state.display,
        isUserDropDown: !state.display.isUserDropDown,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_ADD_PANE': {
      // console.log(`Trace: TOG_ADD_PANE()`)
      let display = {
        ...state.display,
        isAddPane: !state.display.isAddPane,
        isAddPrimary: action.payload.isAddPrimary
      }
      return {
        ...state,
        display: display,
      }
    }
    
    case 'CREATE_PRIMARY': {
      // console.log(`Trace: CREATE_PRIMARY()`)
      let primaryCategories = [...state.primaryCategories]
      primaryCategories.push(action.payload.entry)
      return {
        ...state,
        primaryCategories: primaryCategories,
      }
    }

    case 'SET_PRIMARY_CATEGORIES': {
      let primaryCategories = [...action.payload.primaryCategories]
      return {
        ...state,
        primaryCategories: primaryCategories
      }
    }

    case 'SET_WORKING_OBJECT': {
      let workingObject = action.payload.workingObject
      return {
        ...state,
        workingObject: workingObject
      }
    }
    
    case 'OPEN_PRIMARY_PANE': {
      console.log('1')
      let display = {
        ...state.display,
        isPrimaryPaneOpen: true,
        currentPrimary: action.payload?.category
      }
      return {
        ...state,
        display: display,
      }
    }

    
    case 'TOG_PRIMARY_PANE': {
      let display = {
        ...state.display,
        isPrimaryPaneOpen: !state.display.isPrimaryPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    default: {
      return state
    }
  }
}

/* END of document ***********************************************************/
