/******************************************************************************
* FILENAME:
*   export-hub.ts

* DESCRIPTION:
*   Provides centralized location for all files to route through. This makes 
*   changing assets that populate across the application much easier, and 
*   prevents spaghettification.

* NOTES:
*   - React Context cannot be routed through this file.
*   - Assets included in static object arrays must be loaded into the 
*     declaration file directly. ie. /gcp-services-array.ts

* (c) Copyright Kloudlog LLC 
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

/* IMPORTS *********************************************************/
/* Types */ 
// import { entryType } from './types/main-types'
// import { codePackType } from './types/codePack-type'

/* Firebase */
import {
  authentication,
  userInitializationHandler,
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  authListener,
  gatherSinglePrimaryCategoryFromDB
} from './firebase/firebase'

/* Components */
import App from './App'
import Header from './components/header/header.component'
import DisplayPane from './components/display-pane/display-pane.component'
import SignInUp from './components/sign-in-up/sign-in-up.component'
import SignInUpModal from './components/sign-in-up-modal/sign-in-up-modal.component'
import UserDropMenu from './components/user-drop-menu/user-drop-menu.component'
import SubHeader from './components/sub-header/sub-header.component'
import PrimaryCategory from './components/primary-category/primary-category.component'
import AddPane from './components/add-pane/add-pane.component'
import PrimaryPane from './components/primary-pane/primary-pane.component'
import PaneContainer from './components/pane-container/pane-container.component'
import SubCategory from './components/sub-category/sub-category.component'

/* Mapped Assets */

/* Initial Assets */

/* Helper Methods */
import { indexFinder, treeSearchAndUpdateInPlace } from './utilities/look-up-methods'
/* Icons */

/* EXPORTS *********************************************************/

/* Types */ 
// export { entryType, codePackType }

/* Firebase */
export {
  authentication,
  userInitializationHandler,
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  authListener,
  gatherSinglePrimaryCategoryFromDB
}

/* Components */
export {
  App,
  DisplayPane,
  Header,
  SignInUp,
  SignInUpModal,
  UserDropMenu,
  SubHeader,
  PrimaryCategory,
  AddPane,
  PrimaryPane,
  PaneContainer,
  SubCategory
}

/* Mapped Assets */

/* Initial Assets */

/* Helper Methods */
export { indexFinder, treeSearchAndUpdateInPlace }
/* Icons */

/* END OF DOCUMENT ***********************************************************/
