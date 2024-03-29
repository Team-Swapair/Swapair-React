import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Alert from './screens/Alert';
import Signup from './screens/Signup';
import NavBarElements from './components/NavBarElements';
import Signin from './screens/Signin';
import Post from './screens/Post';
import PhoneSignUp from './screens/PhoneSignUp';
import PostWrite from './screens/Postwrite';
import Chat from './screens/Chat';
import Chatlist from './screens/ChatList';
import ChatOrigin from './screens/ChatOrigin';

function App() {
  return (
    <Router>
      <NavBarElements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Alert" element={<Alert />} />
        <Route path="/PostView/:no" element={<Post />} component={Post} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/PhoneSignUp" element={<PhoneSignUp />} />
        <Route path="/PostWrite" element={<PostWrite />} />
        <Route path="/Chat/:no" element={<Chat />} component={Chat} />
        <Route path="/ChatList" element={<Chatlist />} component={Chatlist} />
        <Route path="/ChatPage/:no" element={<ChatOrigin />} component={ChatOrigin} />
      </Routes>
    </Router>
  );
}
export default App;
