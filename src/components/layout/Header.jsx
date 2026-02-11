import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import logo from "./logo.jpg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-linear-to-br from-white via-white to-blue-900 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <Link to="/" className="flex w-20 h-20 items-center space-x-2">
            {/* <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-gold-500 font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">PROPX</span> */}
            <img src={logo} className='rounded-full'  alt="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-900'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-gold-500 bottom-[-4px]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* User/Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-blue-900 hover:text-gold-500 transition-colors"
                >
                  <FaUserCircle className="text-2xl" />
                  <span className="hidden lg:inline">{user.fullName || user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-blue-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaEnvelope className="mr-3" />
                      Submit Form
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-blue-900 hover:text-gold-500 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="hidden sm:inline bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium ${
                    location.pathname === item.path
                      ? 'text-blue-900'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  {user ? (
                    <>
                      <div className="px-2">
                        <p className="text-sm font-medium text-blue-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-gray-600 hover:text-blue-900 py-2"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-center bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;