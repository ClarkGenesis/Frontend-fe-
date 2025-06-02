import Breadcrumb from "../../../components/AdminBreadcrums";
import Header from "../../../layouts/AdminLayouts/AdminHeader";
import Sidemenu from "../../../layouts/AdminLayouts/AdminSidemenu";
import { useState, ChangeEvent, FormEvent } from "react";

// Interface for form data structure
interface FormData {
    modelName: string;
    brandName: string;
    price: string;
    downpayment: string;
    monthly: string;
    description: string;
    motorcycleImage?: File | null;
    specificationTableImage?: File | null;
    relatedMotorcycleImage?: File | null;
}

const initialFormData: FormData = {
    modelName: "",
    brandName: "",
    price: "",
    downpayment: "",
    monthly: "",
    description: "",
    motorcycleImage: null,
    specificationTableImage: null,
    relatedMotorcycleImage: null,
};

function Details() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [motorcycleImagePreview, setMotorcycleImagePreview] = useState<string | null>(null);
    const [specificationTableImagePreview, setSpecificationTableImagePreview] = useState<string | null>(null);
    const [relatedMotorcycleImagePreview, setRelatedMotorcycleImagePreview] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData, setPreview: (preview: string | null) => void) => {
        const file = e.target.files?.[0];

        if (file) {
            setFormData({ ...formData, [fieldName]: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [fieldName]: null });
            setPreview(null);
        }
    };

    const handleRemoveImage = (fieldName: keyof FormData, setPreview: (preview: string | null) => void) => {
        setFormData({ ...formData, [fieldName]: null });
        setPreview(null);
        const inputElement = document.getElementById(fieldName.toString()) as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // Here you would typically send the data to your backend
    };

    const ImageUploadSection = ({ label, fieldName, preview, setPreview }: {
        label: string;
        fieldName: keyof FormData;
        preview: string | null;
        setPreview: (preview: string | null) => void;
    }) => {
        const inputId = fieldName.toString();

        return (
            <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-6 w-full flex flex-col items-center transition-all hover:border-blue-400 hover:bg-blue-50">
                <label className="block font-semibold text-lg mb-4 text-gray-700 text-center">
                    {label}
                    <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    className="hidden"
                    id={inputId}
                    name={fieldName}
                    onChange={(e) => handleFileChange(e, fieldName, setPreview)}
                    required
                />

                {preview ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="relative group">
                            <img 
                                src={preview} 
                                alt={`${label} Preview`} 
                                className="rounded-lg shadow-md w-full h-64 object-contain bg-gray-100 border border-gray-200" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button 
                                    type="button" 
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    onClick={() => handleRemoveImage(fieldName, setPreview)}
                                >
                                    <i className="bi bi-trash3-fill text-lg"></i>
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Click on image to change</p>
                    </div>
                ) : (
                    <label 
                        htmlFor={inputId} 
                        className="flex flex-col items-center justify-center w-full h-64 cursor-pointer"
                    >
                        <div className="flex flex-col items-center justify-center w-full h-full rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border-2 border-gray-300 border-dashed">
                            <i className="bi bi-cloud-arrow-up text-4xl text-blue-500 mb-3"></i>
                            <p className="text-gray-600 font-medium">Drag & drop your image here</p>
                            <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                            <p className="text-gray-400 text-xs mt-3">Supports: JPG, PNG, WEBP (Max 5MB)</p>
                        </div>
                    </label>
                )}
            </div>
        );
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid mx-auto px-4 max-w-7xl">
                    <Breadcrumb
                        title="Edit Motorcycle Details"
                        links={[{ text: "Motorcycles", link: "/admin-motorcycles" }]}
                        active="Edit Motorcycle Details"
                    />
                    
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information Section */}
                                <div className="bg-blue-50 rounded-lg p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                        {[
                                            { label: "Model Name", name: "modelName", icon: "bi bi-bicycle", type: "text", placeholder: "Enter Model Name", required: true },
                                            { label: "Brand Name", name: "brandName", icon: "bi bi-tag", type: "text", placeholder: "Enter Brand Name", required: true },
                                            { label: "Price ($)", name: "price", icon: "bi bi-currency-dollar", type: "number", placeholder: "Enter Price", required: true },
                                            { label: "Downpayment ($)", name: "downpayment", icon: "bi bi-cash-stack", type: "number", placeholder: "Enter Downpayment", required: true },
                                            { label: "Monthly Payment ($)", name: "monthly", icon: "bi bi-calendar2-week", type: "number", placeholder: "Enter Monthly Payment", required: true },
                                        ].map(({ label, name, icon, type, placeholder, required }) => (
                                            <div key={name} className="space-y-1">
                                                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                                                    {label}
                                                    {required && <span className="text-red-500 ml-1">*</span>}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <i className={`${icon} text-gray-400`}></i>
                                                    </div>
                                                    <input
                                                        type={type}
                                                        id={name}
                                                        name={name}
                                                        placeholder={placeholder}
                                                        value={formData[name as keyof FormData] as string}
                                                        onChange={handleChange}
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required={required}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Description */}
                                    <div className="mt-5">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            placeholder="Enter detailed description about the motorcycle (features, specifications, etc.)"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                {/* Images Section */}
                                <div className="space-y-6">
                                    <div className="bg-blue-50 rounded-lg p-5">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                                            <i className="bi bi-images mr-2"></i>
                                            Motorcycle Images
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <ImageUploadSection
                                                label="Main Motorcycle Image"
                                                fieldName="motorcycleImage"
                                                preview={motorcycleImagePreview}
                                                setPreview={setMotorcycleImagePreview}
                                            />
                                            
                                            <ImageUploadSection
                                                label="Specification Table"
                                                fieldName="specificationTableImage"
                                                preview={specificationTableImagePreview}
                                                setPreview={setSpecificationTableImagePreview}
                                            />
                                            
                                            <ImageUploadSection
                                                label="Related Motorcycle"
                                                fieldName="relatedMotorcycleImage"
                                                preview={relatedMotorcycleImagePreview}
                                                setPreview={setRelatedMotorcycleImagePreview}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Form Actions */}
                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-white bg-red-500 hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                                    >
                                        <i className="bi bi-trash mr-2"></i>
                                        Delete Motorcycle
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center"
                                    >
                                        <i className="bi bi-save2-fill mr-2"></i>
                                        Save Motorcycle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;