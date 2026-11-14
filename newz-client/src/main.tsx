import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store.ts'
import { ConfigProvider } from 'antd'
import appTheme from './theme/theme'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConfigProvider theme={appTheme}>
        <App />
      </ConfigProvider>
    </ReduxProvider>
  </React.StrictMode>,
)