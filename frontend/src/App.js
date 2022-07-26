import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import "./styles/login.css";
import "./styles/signup.css"
import "./styles/header.css";
import "./styles/profile.css";
import "./styles/content.css";
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact = {true} path = "/" element = {<Navigate to = "/login"/>} />
          <Route exact = {true} path = "/home" element = {<Home />} />
          <Route exact = {true} path = "/login" element = {<Login />} />
          <Route exact = {true} path = "/signup" element = {<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
