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
import { user } from 'firebase-functions/v1/auth'

const App = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  let userAuth = getAuth()
  useEffect(() => {
    authListener(display, dispatch, globalDispatch, userAuth)
  }, [])

  return <DisplayPane />
}

export default App
