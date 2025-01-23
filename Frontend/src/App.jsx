import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import CaptainSignup from './pages/CaptainSignup'
import { UserContext } from './context/UserContext'
import UserProtectorWrapper from './components/UserProtectorWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectorWrapper from './components/CaptainProtectorWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {

  const {user, setUser} = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}></Route>

        <Route path='/home' element={
          <UserProtectorWrapper>
            <Home/>
          </UserProtectorWrapper>
        }></Route>

        <Route path='/captain-home' element={
          <CaptainProtectorWrapper>
            <CaptainHome/>
          </CaptainProtectorWrapper>
        }>
        </Route>

        <Route path='/login' element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignup/>}></Route>
        <Route path='/captain-login' element={<CaptainLogin/>}></Route>
        <Route path='/captain-signup' element={<CaptainSignup/>}></Route>

        <Route path='/user/logout' element={
          <UserProtectorWrapper>
            <UserLogout/>
          </UserProtectorWrapper>
        }></Route>

        <Route path='/captain/logout' element={
          <CaptainProtectorWrapper>
            <CaptainLogout/>
          </CaptainProtectorWrapper>
        }></Route>

        <Route path='/riding' element={<Riding/>}></Route>
      
        <Route path='/captain-riding' element={<CaptainRiding/>}></Route>
      </Routes>
    </div>
  )
}

export default App