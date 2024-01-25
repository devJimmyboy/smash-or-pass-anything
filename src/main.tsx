import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SmashProvider from './SmashContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SmashProvider>
      <App />
    </SmashProvider>
  </React.StrictMode>
)
