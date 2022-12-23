import React from 'react'
import { useContext, useEffect } from 'react'
import MainState, { MainContext } from './context/main/MainState'
import GlobalState, { GlobalContext } from './context/global/GlobalState'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import {
  /* Assets */
  /* Database */
  authListener,
  /* Helper Functions */
  /* Components */
  DisplayPane,
  /* Icons */
} from './export-hub.js'

const App = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Request for 'ace' object comes from cdn, therefore not available for the typecheck on compilation - no actual functional error
    if (window.ace) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Request for 'ace' object comes from cdn, therefore not available for the typecheck on compilation - no actual functional error
      let editor = window.ace
      dispatch({
        type: 'SET_ACE',
        payload: { aceObj: editor },
      })
    }
  }, [dispatch])

  let userAuth = getAuth()
  useEffect(() => {
    authListener(display, dispatch, globalDispatch, userAuth)
  }, [])

  return <DisplayPane />
}

export default App
