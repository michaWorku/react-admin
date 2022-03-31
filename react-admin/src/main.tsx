import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { DarkModeContextProvider } from './context/darkMode/darkModeContext'
import { AuthContextProvider } from './context/auth/authContext'

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
