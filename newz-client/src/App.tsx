import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from "protected-route-react";
import { message as antdMessage } from 'antd';

import Header from "./components/Layouts/Header/Header";
import Layout from "./Layout";
import Home from './components/Home/Home';
import News from './components/News/News';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import { loadUser } from './redux/actions/user';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import CreateNews from './components/Admin/CreateNews/CreateNews';
import Register from './components/Auth/Register';
import AdminNews from './components/Admin/AdminNews/AdminNews';
import Users from './components/Admin/Users/Users';
import WriterRequests from './components/Admin/WriterRequests/WriterRequests';
import SendWriterRequest from './components/SendWriterRequest/SendWriterRequest';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';

const App = () => {
  const { isAuthenticated, user, message: successMessage, error, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch({ type: "clearError" });
    }
    if (successMessage) {
      antdMessage.success(successMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, successMessage, error]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Layout>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/news/:id' element={<News />} />

            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/contactus' element={<ContactUs />} />

            <Route path='/sendwriterrequest' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} >
                <SendWriterRequest />
              </ProtectedRoute>
            } />

            <Route path='/login' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <Login loading={loading} />
              </ProtectedRoute>
            } />

            <Route path='/register' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                <Register loading={loading} />
              </ProtectedRoute>}
            />

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

            <Route path='/forgetpassword' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/" >
                <ForgetPassword />
              </ProtectedRoute>
            } />

            <Route path='/resetpassword/:token' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/" >
                <ResetPassword />
              </ProtectedRoute>
            } />

            <Route path='/admin/createnews' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && (user.role === "admin" || user.role === "writer")}>
                <CreateNews />
              </ProtectedRoute>
            } />

            <Route path='/admin/news' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && (user.role === "admin" || user.role === "writer")}>
                <AdminNews />
              </ProtectedRoute>
            } />

            <Route path='/admin/users' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"} >
                <Users />
              </ProtectedRoute>
            } />

            <Route path='/admin/writerrequest' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"} >
                <WriterRequests />
              </ProtectedRoute>
            } />

          </Routes>
      </Layout>
    </Router>
  )
}

export default App