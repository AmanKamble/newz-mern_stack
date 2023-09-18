import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from "protected-route-react";

import Header from "./components/Layouts/Header/Header";
import Home from './components/Home/Home';
import News from './components/News/News';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import { loadUser } from './redux/actions/user';
import UpdateProfile from './components/Profile/updateProfile';
import ChangePassword from './components/Profile/ChangePassword';

const App = () => {
  const { isAuthenticated, user, message, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/news/:id' element={<News />} />

        <Route path='/login' element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
            <Login />
          </ProtectedRoute>
        } />

        <Route path='/profile' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <Profile user={user} />
          </ProtectedRoute>
        } />

        <Route path='/updateprofile' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}  >
            <UpdateProfile user={user} />
          </ProtectedRoute>
        } />

        <Route path='/changepassword' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}  >
            <ChangePassword />
          </ProtectedRoute>
        } />

      </Routes>
      <Toaster />
    </Router>
  )
}

export default App