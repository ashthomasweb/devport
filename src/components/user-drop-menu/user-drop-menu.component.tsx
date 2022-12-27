/******************************************************************************
* FILENAME:
*   user-drop-menu.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/


import React, { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import { getAuth } from 'firebase/auth'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './user-drop-menu.styles.scss'

const UserDropMenu = (props: any): JSX.Element => {
  const { dispatch } = useContext(MainContext)
  const { globalDispatch } = useContext(GlobalContext)


  // function accountSettings() {
  //   alert('Open Account Settings Pane')
  // }

  function signOutHandler() {
    const auth = getAuth()
    auth.signOut()
    globalDispatch({ type: 'WELCOME_PAGE_ON' })
    dispatch({ type: 'TOG_USER_DROP_DOWN' })
    globalDispatch({ type: 'SIGN_USER_OUT' })
  }

  return (
    <div className='user-drop-menu'>
      {/* <button
        className='drop-item drop-down-button'
        type='button'
        onClick={accountSettings}>
        Account Settings
      </button> */}
      <button
        className='drop-item drop-down-button'
        type='button'
        onClick={signOutHandler}>
        Log Out
      </button>
    </div>
  )
}

export default UserDropMenu

/* END of document ***********************************************************/
