import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleUserUpdate = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/home" element={
          user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/auth" replace />
        } />
        <Route path="/profile" element={
          user ? <Profile user={user} onUpdateProfile={handleUserUpdate} /> : <Navigate to="/auth" replace />
        } />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
