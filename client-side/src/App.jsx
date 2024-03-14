import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Mainpage from './Pages/Mainpage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/*" element={<Homepage/>} />
          <Route path="/mainPage" element={<Mainpage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
