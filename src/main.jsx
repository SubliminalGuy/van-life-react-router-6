import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Navbar from "./pages/Navbar"
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"

import "./index.css";
import "./server"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans/:id" element={<VanDetail />} />
      </Routes>
    </BrowserRouter>
  )
}



ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>
  );