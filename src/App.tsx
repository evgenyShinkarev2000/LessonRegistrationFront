import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage'

function App()
{
  return (
    <Routes>
      <Route Component={MainPage} path='index/*'></Route>
      <Route path='/' element={<Navigate to="index" />}></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  )
}

export default App
