/******************************************************************************
* FILENAME:
*   display-pane.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import { useContext, useEffect } from 'react'

import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  Header,
  SubHeader,
  AddPane,
  SubcategoryPane,
  SubSubcategoryPane,
  PaneContainer,
  FinalPane,
  CodePane
  /* Icons */
} from '../../export-hub'

import './display-pane.styles.scss'

const DisplayPane = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  // const { state: { userObj, globalDisplay }, globalDispatch } = useContext(GlobalContext)


  return (
    <div className='display-pane'>
      <Header />
      <SubHeader />
      <PaneContainer>
        {display.isSubcategoryPaneOpen && <SubcategoryPane />}
        {display.isSubSubcategoryPaneOpen && <SubSubcategoryPane />}
        {display.isFinalPaneOpen && <FinalPane />}
      </PaneContainer>
      {display.isCodePaneOpen && <CodePane />}

      {display.isAddPane && <AddPane />}
    </div>
  )
}

export default DisplayPane

/* END of document ***********************************************************/
