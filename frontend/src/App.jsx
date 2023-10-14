import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import MemberRegister from './Members/Registration/MemberRegistyer'
import MemberLogin from './Members/Registration/MemberLogin'
import Questions from './Members/Questions'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
  <Route path="/member/register" element={<MemberRegister />}></Route>
  <Route path="/member/login" element={<MemberLogin />}></Route>
</Routes>
    </>
  )
}

export default App
