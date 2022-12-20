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
  AddPane
  /* Icons */
} from '../../export-hub'

const DisplayPane = (props: any): JSX.Element => {

    const { state: { display }, dispatch } = useContext(MainContext)
    // const { state: { userObj, globalDisplay }, globalDispatch } = useContext(GlobalContext)

    // function pageHandler() {
      // if (globalDisplay.isBoardPage) {
      //   return <MainBoard currentUser={userObj} />
      // }
      // if (globalDisplay.isAdminPage) {
      //   return <AdminPage currentUser={userObj} />
      // } 
      // if (globalDisplay.isWelcomePage) {
      //   return <WelcomePage currentUser={userObj} />
      // }
    // }

    // useEffect(() => {
    //   if (userObj) {
    //     globalDispatch({ type: 'ADMIN_PAGE_ON' })
    //   }
    // }, [globalDispatch, userObj])


    // let displayConditional = {
    //   height: globalDisplay.isWelcomePage ? '100vh' : '0',
    // }

    // useEffect(() => {
    //   if (display.deviceScaling) {
    //     dispatch({ type: 'SET_UIZOOM', payload: {uiZoom: 0.5}})
    //   }
    // }, [dispatch, display.deviceScaling])

    // useEffect(()=> {
      
    // })



    return (
      <div
        className='display-pane'
        >
          <Header />
          <SubHeader />
          
        { display.isAddPane && <AddPane /> }
      </div>
    )

}

export default DisplayPane

/* END of document ***********************************************************/
