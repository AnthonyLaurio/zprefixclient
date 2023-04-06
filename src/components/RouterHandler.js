import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import PersonalInventory from './PersonalInventory'


const RouterHandler = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/personal" element={<PersonalInventory />} />
    </Routes>
  )
}

export default RouterHandler