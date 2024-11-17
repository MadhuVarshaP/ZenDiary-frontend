import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure BrowserRouter is imported
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
   <div className='font-jost bg-beige'>
        <AuthProvider>

     <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </AuthProvider>

    </div>
  );
}

export default App;
