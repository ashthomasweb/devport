import React from 'react'
import { useContext, useEffect } from 'react'
import MainState, { MainContext } from './context/main/MainState'
import GlobalState, { GlobalContext } from './context/global/GlobalState'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import {
  /* Assets */
  /* Database */
  userInitializationHandler,
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

  return (
    <>
      <GlobalState>
        <MainState>
          <DisplayPane />
        </MainState>
      </GlobalState>
    </>
  )
}

export default App
