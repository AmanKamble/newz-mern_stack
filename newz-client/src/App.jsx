import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';

import Header from "./components/Layouts/Header/Header";
import Home from './components/Home/Home';
import News from './components/News/News';
import Login from './components/Login/Login';

const App = () => {
  const { isAuthenticated, user, message, error, loading } = useSelector((state) => state.user);
  
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/news/:id' element={<News/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App