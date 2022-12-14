import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//import App from './App'
import reportWebVitals from './reportWebVitals'
import Header from './Component/Header'
import Connection from './Component/Connection'
import Information from './Component/Information'
import Client from './Component/Clients'
import ChampionMastery from './Component/ChampMastery'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/Information" element={<Information game />} />
        <Route path="/client" element={<Client />} />
        <Route path="/ChampMastery" element={<ChampionMastery />} />
      </Routes>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
