import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token"); // check token here

  return (
    <Router>
      {/* Show navbar only if user is logged in */}
      {token && <NavBar />}

      <Routes>
        {/* Redirect root to login or dashboard */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:token" element={<Reset />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/dashboard" />}
        />

        {/* Fallback for unknown routes */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
