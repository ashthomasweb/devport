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
  const charRef1: any = useRef(null)
  const charRef2: any = useRef(null)
  const charRef3: any = useRef(null)
  const charRef4: any = useRef(null)
  const charRef5: any = useRef(null)
  const charRef6: any = useRef(null)
  const charRef7: any = useRef(null)
  const charRef8: any = useRef(null)
  const charRef9: any = useRef(null)
  const charRef10: any = useRef(null)
  const charRef11: any = useRef(null)

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

  const titleAnimator = () => {

    let letterDelay = 80

    let charArray = [
      charRef1,
      charRef2,
      charRef3,
      charRef4,
      charRef5,
      charRef6,
      charRef7,
      charRef8,
      charRef9,
      charRef10,
      charRef11,
    ]

    let animationArray = ['X', 'Y', 'Z']
    let choosenAnimation = animationArray[Math.floor(Math.random() * 3)]
    function rotateCharAtIndex(index: number) {
      charArray[index].current.className = `animate-${choosenAnimation}`
    }
    function changeCharAtIndex(index: number) {
      charArray[index].current.style.color = 'lightblue'
      charArray[index].current.style.webkitTextStroke = '3px lightblue'


    }
    function resetCharAtIndex(index: number) {
      let prefix = charArray[index].current.style
      prefix.color = 'white'
      prefix.webkitTextStroke = '0'

    }
    
    function resetAnimationAtIndex(index) {
      charArray[index].current.className = ''
    }

    function blinkTitle(index) {
      charArray[index].current.style.webkitTextStroke = '3px lightblue'
      setTimeout(()=> {
      charArray[index].current.style.webkitTextStroke = '0'
      }, 400)
      setTimeout(() => {
        charArray[index].current.style.webkitTextStroke = '3px yellow'
      }, 800)
       setTimeout(() => {
         charArray[index].current.style.webkitTextStroke = '0'
       }, 2000)
    }

    for (let i = 0; i < 11; i++) {
      setTimeout(() => {
        rotateCharAtIndex(i)
      }, letterDelay * i)
       setTimeout(() => {
         changeCharAtIndex(i)
       }, letterDelay * i)
      setTimeout(() => {
        resetCharAtIndex(i)
      }, 700 + letterDelay * i)
      setTimeout(() => {
        resetAnimationAtIndex(i)
      }, 1000 + letterDelay * i)
      setTimeout(() => {
        blinkTitle(i)
      }, 700 + letterDelay * i)
    }
 
  }

  
  return (
    <div
      className='header'
      style={{ height: `${display.headerHeight}px` }}
      ref={headerRef}>
      <div className='title-control-wrapper'>
        <h1
         onMouseOver={titleAnimator}
        >
          <span
            ref={charRef1}
            style={{ position: 'absolute', top: 0, left: 48 }}
            >
            C
          </span>
          <span
            ref={charRef2}
            style={{ position: 'absolute', top: 0, left: 80 }}
            >
            o
          </span>
          <span
            ref={charRef3}
            style={{ position: 'absolute', top: 0, left: 118 }}
            >
            d
          </span>
          <span
            ref={charRef4}
            style={{ position: 'absolute', top: 0, left: 156 }}
            >
            e
          </span>
          <span
            ref={charRef5}
            style={{ position: 'absolute', top: 0, left: 190 }}
            >
            s
          </span>
          <span
            ref={charRef6}
            style={{ position: 'absolute', top: 0, left: 222 }}
            >
            t
          </span>
          <span
            ref={charRef7}
            style={{ position: 'absolute', top: 0, left: 254 }}
            >
            a
          </span>
          <span
            ref={charRef8}
            style={{ position: 'absolute', top: 0, left: 291 }}
            >
            s
          </span>
          <span
            ref={charRef9}
            style={{ position: 'absolute', top: 0, left: 324 }}
            >
            h
          </span>
          <span
            ref={charRef10}
            style={{ position: 'absolute', top: 0, left: 363 }}
            >
            e
          </span>
          <span
            ref={charRef11}
            style={{ position: 'absolute', top: 0, left: 396 }}
            >
            r
          </span>
        </h1>
        {/* <h1>CodeStasher</h1> */}
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
