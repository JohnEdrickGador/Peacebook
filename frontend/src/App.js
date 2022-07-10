import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import "./styles/login.css";

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact = {true} path = "/" element = {<Navigate to = "/login"/>} />
          <Route exact = {true} path = "/dashboard" element = {<Dashboard />} />
          <Route exact = {true} path = "/login" element = {<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
