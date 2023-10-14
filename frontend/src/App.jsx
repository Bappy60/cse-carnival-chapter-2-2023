import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import MemberRegister from './Members/Registration/MemberRegistyer'
import MemberLogin from './Members/Registration/MemberLogin'
import Questions from './Members/Questions'
import { Route, Routes } from 'react-router-dom'
import CompleteandEditProfile from './Members/Profile/CompleteandEditProfile'
import MemberDashboard from './Members/Profile/MemberDashboard'
import Redirection from './Common/Redirection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
     <Route path="/member" element={<MemberDashboard />}></Route>
     <Route path="/allblogs" element={<AllBlogs />}></Route>
  <Route path="/viewblog/:id" element={<ViewBlog />}></Route>
<Route path="/" element={<Redirection/>}></Route>
  <Route path="/member/register" element={<MemberRegister />}></Route>
  <Route path="/member/login" element={<MemberLogin />}></Route>
  <Route path="/member/onboarding" element={<CompleteandEditProfile />}></Route>
</Routes>
    </>
  )
}

export default App
