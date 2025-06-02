import { useEffect } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "../../components/UserBreadcrums";
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";
import ProfileImage from "../../assets/photos/user-avatar.png";
import api from "../../api/axios";

interface FormData {  
  firstName: string;
  email: string;
  birthdate: string;
  photo?: File | null;
}

const initialFormData: FormData = {
  firstName: "",
  email: "",
  birthdate: "",
  photo: null,
};

const CustomToast = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
  <div className={`flex items-center gap-3 p-4 rounded-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white`}>
    {type === 'success' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
    {message}
  </div>
);

function Profiles2() {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null });
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user");
        const userData = response.data;
        setFormData({
          firstName: userData.name,
          email: userData.email,
          birthdate: userData.birthdate,
          photo: null,
        });
      } catch (error) {
        toast(<CustomToast message="Failed to fetch user data" type="error" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.put("/profile", {
        name: formData.firstName,
        email: formData.email,
        birthdate: formData.birthdate,
      });
      
      const updatedUser = response.data.user;
      setFormData({
        firstName: updatedUser.name,
        email: updatedUser.email,
        birthdate: updatedUser.birthdate,
        photo: null,
      });

      toast(<CustomToast message="Profile updated successfully!" type="success" />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error("Failed to update profile", error);
      toast(<CustomToast message="Failed to update profile. Please try again." type="error" />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Header/>
      <Sidemenu />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb title="Profile Details" active="Profile Details" />

          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4 flex items-start gap-4">
                      <span className="avatar avatar-xxl">
                        <img src={ProfileImage} alt="Profile" id="profile-img" className="rounded-full" />
                      </span>
                        <div className="mt-2">
                          <label className="block font-medium mb-2">Profile Picture</label>
                          <div className="flex gap-2">
                              <label className="bg-gray-300 text-dark px-4 py-2 rounded cursor-pointer">
                                  <i className="bi bi-upload"></i>
                                  <span className="px-2">Upload</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                              </label>
                              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={handleRemoveImage}>
                                  <i className="bi bi-trash-fill"></i>
                              </button>
                          </div>
                        </div>
                    </div>
                    <hr className="mt-3 mb-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                        ["Name", "firstName", "bi bi-person"],
                        ["Email", "email", "bi bi-envelope-at", "email"],
                        ["Birthdate", "birthdate", "bi bi-calendar", "date"],
                        ].map(([label, name, icon, type = "text"]) => (
                        <div key={name} className="relative">
                          <label className="block font-medium mb-2 text-gray-700" htmlFor={name}>
                          {label}
                          </label>
                          <div className="relative">
                          <input
                            type={type}
                            id={name}
                            name={name}
                            value={
                            name === "birthdate" && formData[name as keyof FormData]
                              ? String(formData[name as keyof FormData]).split("T")[0]
                              : formData[name as keyof FormData] != null
                              ? String(formData[name as keyof FormData])
                              : ""
                            }
                            onChange={handleChange}
                            onBlur={(e) => {
                              if (name === "birthdate" && isNaN(Date.parse(e.target.value))) {
                                toast(<CustomToast message="Please enter a valid date." type="error" />, {
                                  position: "top-right",
                                  autoClose: 3000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                });
                                setFormData({ ...formData, birthdate: "" });
                              }
                            }}
                            className="ti-form-input rounded-lg ps-11 focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                            placeholder={`Enter ${label}`}
                          />
                          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <i className={`${icon} text-gray-500`}></i>
                          </div>
                          </div>
                        </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                          isLoading 
                            ? 'bg-green-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save"></i>
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profiles2;
