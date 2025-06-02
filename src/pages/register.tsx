import Header from '../layouts/HomeHeader';
import Footer from "../layouts/HomeFooter";
import Background from "../assets/photos/bg2.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, error, clearError, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required!';
    if (!formData.email) newErrors.email = 'Email is required!';
    if (!formData.password) newErrors.password = 'Password is required!';
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required!';
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords must match!';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(formData);
      navigate('/user'); // Redirect after successful registration
    } catch (err) {
      console.error(err);
      // Error is already handled in the auth context
    }
  };

  return (
    <>
      <div
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat pt-8"
        style={{ backgroundImage: `url(${Background})` }}>
        <div className="flex flex-col min-h-screen mt-6">
          <Header />
          <div className="flex-1 flex justify-center items-center">
            <div className="max-w-md w-full p-4 rounded-lg shadow-lg border-black bg-white">
              <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input    
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                  {errors.name && <p className="mt-1 text-[10px]" style={{color: 'red'}}>{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                  {errors.email && <p className="mt-1 mt-1 text-[10px]" style={{color: 'red'}}>{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                  {errors.birthdate && <p className="mt-1 text-[10px]" style={{color: 'red'}}>{errors.birthdate}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                    {errors.password && <p className="mt-1 text-[10px]" style={{color: 'red'}}>{errors.password}</p>}
                    <i className="absolute right-2 top-2 cursor-pointer fa fa-eye-slash"></i>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirm-password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                    {errors.password_confirmation && (
                      <p className="mt-1 text-[10px]" style={{color: 'red'}}>{errors.password_confirmation}</p>
                    )}
                    <i className="absolute right-2 top-2 cursor-pointer fa fa-eye-slash"></i>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 text-white bg-red-600 rounded-lg focus:ring-red-500 mt-2"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
              <p className="text-center mt-4 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
