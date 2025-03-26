import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Login = ({ handleUserLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error('Failed to login: ', response.statusText);
        alert('Failed to login: ' + response.statusText);
        return;
      }

      const data = await response.json();

      if (data.token) {
        console.log('Token received:', data.token);
        localStorage.setItem('token', data.token);
        alert('Login Successful');
        handleUserLogin(data.token);  
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md  pt-4"
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-8">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-black p-2 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
              <motion.h1 
                className="text-3xl font-light tracking-tight text-gray-900 "
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Sign in
              </motion.h1>
              <motion.p 
                className="mt-2 text-sm text-gray-500"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Enter your details below
              </motion.p>
            </div>
            
            <motion.form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 
                      <EyeOffIcon className="h-5 w-5" /> : 
                      <EyeIcon className="h-5 w-5" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 bg-black text-white rounded-xl transition-all duration-200 ${isLoading ? 'opacity-75' : 'hover:bg-gray-800'}`}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
        
        <motion.p 
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Don't have an account?{' '}
          <a href="#" className="font-medium text-black hover:text-gray-800 transition-colors">
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Login;