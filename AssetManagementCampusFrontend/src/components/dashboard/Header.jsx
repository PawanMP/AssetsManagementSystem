import React, { useState } from 'react';
import { Bell, Menu, LogOut, User, Settings } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();          // Call logout logic (clear tokens, etc)
      setShowProfileMenu(false); // Close menu
      navigate('/login');       // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally notify user
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="ml-2 lg:ml-0 text-lg font-semibold text-gray-900">
            Welcome back, <span className="text-cyan-600">{user?.name}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {notifications}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover border-2 border-cyan-400"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700">
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
