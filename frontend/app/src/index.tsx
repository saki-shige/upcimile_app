import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { CreatorAuthProvider } from './components/providers/CreatorAuthProvider'
import { CompanyAuthProvider } from './components/providers/CompanyAuthProvider'
import { MessageProvider } from './components/providers/MessageProvider'

ReactDOM.render(
  <React.StrictMode>
    <CreatorAuthProvider>
      <CompanyAuthProvider>
        <MessageProvider>
         <App />
        </MessageProvider>
      </CompanyAuthProvider>
    </CreatorAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
