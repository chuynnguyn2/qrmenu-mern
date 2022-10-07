import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'

import NaviSideBar from './screens/NaviSideBar'

function App() {
  return (
    <BrowserRouter>
    <NaviSideBar/>
      <Routes>        
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
