import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../Auth/LoginModal';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/ask');
    }
  };

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <button className="lg:hidden text-gray-400 hover:text-white">
                <Menu className="h-6 w-6" />
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-md font-bold text-lg">
                  StackIt
                </div>
              </Link>

              <nav className="hidden lg:flex space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </nav>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAskQuestion}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Ask Question
              </button>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Bell className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </button>
                    {showNotifications && <NotificationDropdown />}
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.username}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                      <span className="hidden md:block">{user?.username}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}