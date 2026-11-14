import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store.js"
import { ChakraProvider, theme } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store} >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
