/******************************************************************************
* FILENAME:
*   sign-in-up.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/


import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'

import React from 'react'
import { signInWithPopup, GoogleAuthProvider,getAuth, onAuthStateChanged  } from 'firebase/auth'

import { 
  /* Assets */
  /* Database */
  authentication,
  userInitializationHandler,
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './sign-in-up.styles.scss'

const SignInUp = () => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  const firebaseSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(authentication, provider)
      .then((result) => {
        globalDispatch({
          type: 'SET_CURRENT_USER_TO_STATE',
          payload: { userObj: result.user },
        })
        let userAuth = getAuth()
        const unSubAuth = onAuthStateChanged(userAuth, async (userAuth: any) => {
          if (result.user) {
            await userInitializationHandler(
              userAuth,
              dispatch,
              globalDispatch,
              null,
              unSubAuth,
              display.isInitialModal
            )
          } else if (result.user == null) {
            globalDispatch({
              type: 'SET_CURRENT_USER_TO_STATE',
              payload: { userObj: null },
            })
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>Create a Free Account</h2>
      <span>
        Welcome to DevPort. Save your code.<br/>Organize your process.
      </span>
      <button
        type='button'
        onClick={firebaseSignIn}
        className='google-sign-in custom-button'>
        Sign Up With Google
      </button>
    </div>
  )
}

export default SignInUp

/* END of document ***********************************************************/
