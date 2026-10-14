import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FlowWave from './FlowWave'
import MatrixRain from './MatrixRain'
import ContentSections from './ContentSections'
import NfcProductPage from './NfcProductPage'

function App() {
  return (
    <Router>
      {/* Global Background Animation - Sits behind ALL pages */}
      <FlowWave />
      <MatrixRain />
      
      {/* Page Content Routes */}
      <Routes>
        <Route path="/" element={<ContentSections />} />
        <Route path="/nfc-product" element={<NfcProductPage />} />
      </Routes>
    </Router>
  )
}

export default App
