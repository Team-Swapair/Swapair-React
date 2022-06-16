import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Alert from './screens/Alert';
import Signup from './screens/Signup';
import NavBarElements from './components/NavBarElements';
import Signin from './screens/Signin';
import Post from './screens/Post';
import PhoneSignUp from './screens/PhoneSignUp';

function App() {
  return (
    <Router>
      <NavBarElements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Alert" element={<Alert />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/PhoneSignUp" element={<PhoneSignUp />} />
      </Routes>
    </Router>
  );
}
export default App;
