import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'
import { store } from './store'
import { AppEnvProvider } from './services/AppEnv/AppEnvProvider'
import { buildAppEnv } from './services/AppEnv/buildAppEnv'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppEnvProvider appEnv={buildAppEnv()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppEnvProvider>
    </Provider>
  </React.StrictMode>,
)
