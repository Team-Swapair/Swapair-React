import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Alert from './screens/Alert';
import Signup from './screens/Signup';
import NavBarElements from './components/NavBarElements';
import Signin from './screens/Signin';

function App() {
  return (
    <Router>
      <NavBarElements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/Profile" element = {<Profile/>} />
        <Route path="/Alert" element={<Alert />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
