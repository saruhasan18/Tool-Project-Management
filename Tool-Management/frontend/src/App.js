// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Analytics from "./components/Analytics";

function App() {
  return (
    // Remove <Router> here, it's already in index.js
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoutes>
            <Analytics />
          </ProtectedRoutes>
        }
      />

      {/* Catch-All Redirect to Home or Login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export function ProtectedRoutes({ children }) {
  const isAuthenticated = localStorage.getItem("user");
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
