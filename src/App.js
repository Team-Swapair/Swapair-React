import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Alert from './screens/Alert';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/Profile" element = {<Profile/>} />
        <Route path = "/Alert" element = {<Alert/>} />
      </Routes>
    </Router>
  );
}

export default App;
