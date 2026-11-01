import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { LogoMark } from "./components/Logo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import History from "./pages/History";

const AppRoutes = ({ user, onLogin, onUpdateUser }) => {
  const location = useLocation();

  return (
    <main id="main" key={location.pathname} className="flex-1 animate-fade-in">
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={onLogin} defaultIsRegister={false} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={onLogin} defaultIsRegister />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onUpdateUser={onUpdateUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleUpdateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-base-950">
        <div className="flex flex-col items-center gap-4">
          <LogoMark className="h-10 w-10 rounded-xl" />
          <span className="sr-only">Loading contentRepurp</span>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500/60 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex min-h-dvh flex-col bg-base-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-base-950"
        >
          Skip to content
        </a>
        <Navbar user={user} onLogout={handleLogout} />
        <AppRoutes
          user={user}
          onLogin={handleLogin}
          onUpdateUser={handleUpdateUser}
        />
      </div>
    </Router>
  );
}

export default App;
