import React from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { UserProvider, useUser } from './contexts/UserContext';

function AppContent() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <LoginPage onLogin={() => { /* no need to set anything here */ }} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
