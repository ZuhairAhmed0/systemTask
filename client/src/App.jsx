import { useState, useEffect, useCallback } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginMock from "./pages/LoginMock";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Not authenticated");
      const data = await response.json();

      setUser(data.username);
      return true;
    } catch {
      setUser("");
      return false;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  if (loading && !user) {
    return (
      <div className="flex h-screen items-center justify-center text-mauve-300 bg-gray-900">
        Loading...
      </div>
    );
  }

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout failed");

    navigate("/logout");
    setUser("");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginMock checkAuth={checkAuth} />
          )
        }
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard username={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
