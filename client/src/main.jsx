import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import EthProvider from './contexts/EthProvider.jsx'

// import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EthProvider>
  </React.StrictMode>
)
