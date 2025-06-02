import Breadcrumb from "../../components/UserBreadcrums";
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true';
    }
    return false;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.post('/change-password', {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        confirm_password: passwordData.confirmPassword
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Password has been changed successfully',
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
        setIsOpen(false);
        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = 'Failed to change password';
      
      // Handle validation errors
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors as {
          current_password?: string[];
          new_password?: string[];
          confirm_password?: string[];
        };
        
        if (validationErrors) {
          // Update the errors state with the validation errors
          const newErrors = {
            currentPassword: validationErrors.current_password?.[0] || "",
            newPassword: validationErrors.new_password?.[0] || "",
            confirmPassword: validationErrors.confirm_password?.[0] || ""
          };
          setErrors(newErrors);
          
          // Show the first error message in Swal
          const firstErrorArray = Object.values(validationErrors)[0];
          if (firstErrorArray && firstErrorArray.length > 0) {
            errorMessage = firstErrorArray[0];
          }
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container-fluid">
          <Breadcrumb title="Settings" active="Settings" />
          <div className="xxl:col-span-9 col-span-12">
            <div className="box overflow-hidden main-content-card bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-200">
              <div className="box-body p-5">
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Dark Mode</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Toggle dark mode for better viewing in low light</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Change Password
                  </button>
                </div>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 transition-colors duration-200">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Change Password</h2>
                      <div className="space-y-4">
                        <div>
                          <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Current Password"
                            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                          />
                          {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
                            placeholder="New Password"
                            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                          />
                          {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:bg-blue-400"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Changing...' : 'Confirm'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;