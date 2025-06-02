import Header from '../layouts/HomeHeader';
import Footer from "../layouts/HomeFooter";
import Background from "../assets/photos/bg2.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from "lucide-react";


function Login () {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await login(email, password);

      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
      }
      else if (user?.role === 'user') {
        navigate('/user');
      }
      else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}>
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-md w-full mx-auto p-4 rounded-lg shadow-lg border border-black bg-white">
            <h2 className="text-center text-2xl mb-4 font-bold text-gray-800">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900" 
                  onClick={() => window.scrollTo({ top: 0})}>
                  Password
                </label>
                <div className='relative'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting}
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-[50px]"
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                    )}
                </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 text-white rounded-lg mt-4} ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 focus:ring-red-500 focus:border-red-500'
                } flex items-center justify-center`}
              >
                  {isSubmitting ? (
                      <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Logging in...
                      </>
                  ) : (
                      "LOGIN"
                  )}
              </button>
            </form>

            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium"
                onClick={() => window.scrollTo({ top: 0})}>
                Register
              </Link>
            </p>

            <hr className="my-6 border-gray-300" />
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
