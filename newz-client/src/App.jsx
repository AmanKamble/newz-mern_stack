import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Header from "./components/Layouts/Header/Header";
import Home from './components/Home/Home';
import News from './components/News/News';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/news/:id' element={<News/>} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App