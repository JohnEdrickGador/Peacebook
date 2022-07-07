import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact = {true} path = "/" element = {<Home />} />
          <Route exact = {true} path = "/dashboard" element = {<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
