import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Footer  from './components/Footer'
import Resources from './pages/Resources'
import UpdateEntry from './pages/UpdateEntry'

export default function App() {
  return (
   <BrowserRouter >
    <Header />
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/resources" element={<Resources />} />
      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/update-entry/:entryId" element={<UpdateEntry />} />
      </Route>
    </Routes>
    <Footer />
   </BrowserRouter>
  )
}
