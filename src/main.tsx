import '@mantine/core/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SmashProvider from './SmashContext.tsx'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <SmashProvider>
        <App />
      </SmashProvider>
    </MantineProvider>
  </React.StrictMode>
)
