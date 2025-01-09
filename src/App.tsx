import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { VerificationPending } from './components/auth/VerificationPending';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore(state => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <SignupForm /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              user.isAdmin ? (
                <AdminDashboard />
              ) : user.isVerified ? (
                <UserDashboard />
              ) : (
                <VerificationPending />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;