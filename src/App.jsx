import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FlowWave from './FlowWave'
import MatrixRain from './MatrixRain'
import ContentSections from './ContentSections'
import NfcProductPage from './NfcProductPage'

function HomePage() {
  return (
    <div>
      <FlowWave />
      <MatrixRain />
      <ContentSections />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nfc-product" element={<NfcProductPage />} />
      </Routes>
    </Router>
  )
}

export default App
