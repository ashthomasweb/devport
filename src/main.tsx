import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import MainState, { MainContext } from './context/main/MainState'
import GlobalState, { GlobalContext } from './context/global/GlobalState'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GlobalState>
      <MainState>
        <App />
      </MainState>
    </GlobalState>
)
