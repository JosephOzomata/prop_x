import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus, 
  FaGoogle,
  FaIdCard,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [nin, setNin] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNin, setShowNin] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // const [signedIn, setSigned]

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } else {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (nin.length !== 11) {
        toast.error('Please enter a valid 11-digit NIN');
        return;
      }
      const success = await signup(email, password, fullName, nin);
      if (success) {
        navigate('/');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const formatNIN = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 11) {
      return digitsOnly;
    }
    return digitsOnly.slice(0, 11);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-gold-500 font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">PROPX</span>
          </Link>
          <h1 className="text-3xl font-bold text-blue-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to access property verification services' : 'Join PROPX to verify your properties'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-900 hover:text-blue-900 transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    11-Digit National Identification Number (NIN) *
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showNin ? "text" : "password"}
                      value={nin}
                      onChange={(e) => setNin(formatNIN(e.target.value))}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                      placeholder="12345678901"
                      required={!isLogin}
                      maxLength={11}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNin(!showNin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold-500"
                    >
                      {showNin ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-500">
                      Format: {nin ? nin.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1-$2-$3-$4') : 'XXX-XXX-XXX-XX'}
                    </span>
                    <span className={`text-sm ${nin.length === 11 ? 'text-green-600' : 'text-red-600'}`}>
                      {nin.length}/11 digits
                    </span>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              {isLogin ? (
                <>
                  <FaSignInAlt /> Sign In
                </>
              ) : (
                <>
                  <FaUserPlus /> Sign Up
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail('');
                setPassword('');
                setFullName('');
                setNin('');
                setConfirmPassword('');
                setShowPassword(false);
                setShowConfirmPassword(false);
                setShowNin(false);
              }}
              className="text-blue-900 hover:text-gold-500 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-gray-600 text-sm">
              By {isLogin ? 'signing in' : 'signing up'}, you agree to our{' '}
              <Link to="/privacy" className="text-blue-900 hover:underline">Privacy Policy</Link>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              🔒 Your NIN is stored securely and encrypted
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;