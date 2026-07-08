import React from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import App from './App.jsx'

// No StrictMode: the canvas effects attach native listeners / build offscreen
// canvases, and double-invoking them in dev adds noise without catching real bugs.
createRoot(document.getElementById('root')).render(<App />)
