import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import "./styles/login.css";
import "./styles/signup.css"
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact = {true} path = "/" element = {<Navigate to = "/login"/>} />
          <Route exact = {true} path = "/dashboard" element = {<Dashboard />} />
          <Route exact = {true} path = "/login" element = {<Login />} />
          <Route exact = {true} path = "/signup" element = {<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
