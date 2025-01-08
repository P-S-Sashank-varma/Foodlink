import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Request from './pages/Request';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Donate from './pages/Donate';
import ErrorBoundary from './ErrorBoundary';

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('authToken');
  console.log('ProtectedRoute: Checking user token', userToken); // Debugging
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    console.log('App: Checking stored token', userToken); // Debugging
    if (userToken) {
      setUser(userToken);
    }
  }, []);

  const handleUserLogin = (userToken) => {
    console.log('App: Handling user login with token:', userToken); // Debugging
    localStorage.setItem('authToken', userToken);
    setUser(userToken);
    navigate('/donate');
  };

  const handleLogout = () => {
    console.log('App: User logged out, token removed'); // Debugging
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <ErrorBoundary>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login handleUserLogin={handleUserLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
