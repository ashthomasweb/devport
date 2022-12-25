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
        isAddPrimary: action.payload.isAddPrimary,
        isEdit: action.payload?.isEdit,
        editId: action.payload?.editId,
        idChain: action.payload?.idChain,
        editTitle: action.payload?.title,
        editSubtitle: action.payload?.subtitle,
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
        primaryCategories: primaryCategories,
      }
    }

    case 'SET_WORKING_OBJECT': {
      let workingObject = action.payload.workingObject
      return {
        ...state,
        workingObject: workingObject,
      }
    }

    case 'OPEN_PRIMARY_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: true,
        currentPrimary: action.payload?.category,
        currentPrimarySubtitle: action.payload?.subtitle,
        isSubSubcategoryPaneOpen: false,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_SUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: !state.display.isSubcategoryPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }
    case 'CLOSE_SUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: true,
        isSubSubcategoryPaneOpen: true,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubSubcategoryPaneOpen: !state.display.isSubSubcategoryPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'CLOSE_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubSubcategoryPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: !state.display.isFinalPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: true,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'CLOSE_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SET_CURRENT_PARENT_ID': {
      let display = {
        ...state.display,
        currentPaneParentId: action.payload.id,
        currentPaneParentTitle: action.payload.title,
        currentPaneParentSubtitle: action.payload.subtitle,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SET_FINAL_ID': {
      let display = {
        ...state.display,
        finalPaneParentId: action.payload.id,
        finalPaneParentTitle: action.payload.title,
        finalPaneParentSubtitle: action.payload.subtitle,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SEND_ENTRY_TO_EDITOR': {
      console.log(action.payload)
      let editorPacket = {
        ...action.payload.editorPacket,
      }
      return {
        ...state,
        editorPacket: editorPacket,
      }
    }

    case 'SET_ACE': {
      // console.log(`Trace: SET_ACE()`)
      return {
        ...state,
        aceObj: action.payload.aceObj,
      }
    }

    case 'OPEN_CODE_PANE': {
      let display = {
        ...state.display,
        isCodePaneOpen: true,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_CODE_PANE': {
      let display = {
        ...state.display,
        isCodePaneOpen: !state.display.isCodePaneOpen,
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
