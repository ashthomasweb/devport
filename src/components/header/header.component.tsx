/******************************************************************************
* FILENAME:
*   header.component.tsx

* DESCRIPTION:
*   This Header component exists throughout the application. Conditional 
*   rendering of elements is based on which page the user is on.

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/
import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'

import { ToastContainer, toast } from 'react-toastify'
// import cloneDeep from 'lodash.clonedeep'

import {
  /* Assets */
  /* Database */
  /* Helper Function */

  /* Components */
  SignInUpModal,
  UserDropMenu,
  /* Icons */
} from '../../export-hub'

import 'react-toastify/dist/ReactToastify.css'
import './header.styles.scss'

const modalToggle = () => {
  // NEEDS DISPLAY REDUCER - no DOM queries!
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let el: any = document.querySelector('.sign-modal').style
  el.display === 'block' ? (el.display = 'none') : (el.display = 'block')
}

const Header = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj, globalDisplay },
    globalDispatch,
  } = useContext(GlobalContext)

  const diagramTitle: any = useRef(null)
  const headerRef: any = useRef(null)

  let [devBarOut, setDevBarOut] = useState(false)

  const devBarTog = () => {
    setDevBarOut(!devBarOut)
  }

  // const displayResourcesObject = () => {
  //   console.log(boardObj.resourcesObjectArray)
  // }

  function signOutDropDown() {
    dispatch({ type: 'TOG_USER_DROP_DOWN' })
  }

  // function notificationsDropDown() {
  //   dispatch({ type: 'TOG_NOTIF_DROP_DOWN' })
  // }

  return (
    <div
      className='header'
      style={{ height: `${display.headerHeight}px` }}
      ref={headerRef}>
      <div className='title-control-wrapper'>
        <h1>Codioli</h1>
      </div>
      {
        <ToastContainer
          position='bottom-right'
          autoClose={1700}
          theme='dark'
          limit={3}
        />
      }
      {/* {globalDisplay.isAdminPage && <SearchBar />} */}

      {/* {globalDisplay.isBoardPage && (
        <div style={{ position: 'relative' }}>
          <EnvironmentMenu />
        </div>
      )} */}

      {display.isUserDropDown && <UserDropMenu />}

      {/* USER ACCOUNT BUTTON */}
      {userObj && (
        <button
          className='user-photo'
          data-text='User Options'
          onClick={signOutDropDown}>
          <img
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '100%',
              cursor: 'pointer',
              margin: '0 5px',
            }}
            src={`${userObj.photoURL}`}
            alt='userimg'
          />
        </button>
      )}

      {/* SIGN UP - WELCOME PAGE ONLY */}
      {userObj === null && (
        <div>
          <button
            type='button'
            className='sign-up-btn'
            onClick={() => modalToggle()}>
            Sign Up Free
          </button>
        </div>
      )}

      <div className='sign-modal'>
        <SignInUpModal />
      </div>
    </div>
  )
}

export default Header

/* END of document ***********************************************************/
