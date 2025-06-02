import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";

interface Props {
    formData: {
        sketch_residence: File | null;
        sketch_residence_comaker: File | null;
        applicant_signature: File | null;
        spouse_signature: File | null;
        comaker_signature: File | null;
    };
    signaturePreview: {
        sketch_residence: string | null;
        sketch_residence_comaker: string | null;
        applicant_signature: string | null;
        spouse_signature: string | null;
        comaker_signature: string | null;
        [key: string]: string | null;
    };
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSignaturePreview: React.Dispatch<React.SetStateAction<any>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    isSubmitting: boolean;
    goToPreviousStep: () => void;
    goToNextStep: () => void;
}

// Create an interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const CreditInquiryAuthorization: React.FC<Props> = ({ 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formData: _formData, 
    signaturePreview, 
    handleFileChange, 
    setSignaturePreview, 
    setFormData,
    isSubmitting,
    goToPreviousStep,
    goToNextStep
}) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const errorFieldRef = useRef<HTMLDivElement>(null);
    
    // Revalidate fields when values change to clear errors
    useEffect(() => {
        // Create a new errors object based on current state
        const newErrors = { ...errors };
        
        // Check each field and remove errors for filled fields
        if (signaturePreview.sketch_residence) delete newErrors.sketch_residence;
        if (signaturePreview.sketch_residence_comaker) delete newErrors.sketch_residence_comaker;
        if (signaturePreview.applicant_signature) delete newErrors.applicant_signature;
        if (signaturePreview.spouse_signature) delete newErrors.spouse_signature;
        if (signaturePreview.comaker_signature) delete newErrors.comaker_signature;
        
        // Update errors state if changes were made
        if (Object.keys(newErrors).length !== Object.keys(errors).length) {
            setErrors(newErrors);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signaturePreview]);
    
    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        
        // Validate all required image uploads
        if (!signaturePreview.sketch_residence) {
            newErrors.sketch_residence = "Sketch of Residence (Applicant) is required";
        }
        
        if (!signaturePreview.sketch_residence_comaker) {
            newErrors.sketch_residence_comaker = "Sketch of Residence (Co-Maker) is required";
        }
        
        if (!signaturePreview.applicant_signature) {
            newErrors.applicant_signature = "Applicant's Signature is required";
        }
        
        if (!signaturePreview.spouse_signature) {
            newErrors.spouse_signature = "Spouse's Signature is required";
        }
        
        if (!signaturePreview.comaker_signature) {
            newErrors.comaker_signature = "Co-Maker's Signature is required";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleContinueToConfirmation = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        
        if (isValid) {
            // If validation passes, go to confirmation page
            goToNextStep();
            window.scrollTo({ top: 0 });
        } else {
            // Find the first error field for scrolling
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                setTimeout(() => {
                    if (errorFieldRef.current) {
                        errorFieldRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 100);
            }
        }
    };
    
    // Function to determine container class based on error state
    const getUploadContainerClass = (fieldName: string) => {
        return `border-2 border-dashed ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4`;
    };
    
    const handleImageRemove = (field: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSignaturePreview((prev: any) => ({ ...prev, [field]: null }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [field]: null }));
    };

    // Find the first error field to attach the ref
    const firstErrorField = Object.keys(errors)[0];

    const renderImageUploader = (field: string, title: string) => {
        return (
            <div className="mb-6" ref={firstErrorField === field ? errorFieldRef : null}>
                <label className="block mb-2 font-medium">{title}</label>
                <div className={getUploadContainerClass(field)}>
                    {signaturePreview[field] ? (
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img 
                                    src={signaturePreview[field]} 
                                    alt={`${field} Preview`} 
                                    className="max-w-[300px] h-auto rounded border border-gray-200"
                                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                                />
                                <button 
                                    type="button"
                                    onClick={() => handleImageRemove(field)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <input
                                type="file"
                                name={field}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpg, image/jpeg"
                                id={`${field}-input`}
                            />
                            <label
                                htmlFor={`${field}-input`}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                            >
                                Change image
                            </label>
                        </div>
                    ) : (
                        <div className="text-center">
                            <input
                                type="file"
                                name={field}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpg, image/jpeg"
                                id={`${field}-input`}
                            />
                            <label
                                htmlFor={`${field}-input`}
                                className="cursor-pointer flex flex-col items-center"
                            >
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                    Click to upload image
                                </span>
                                <span className="mt-1 block text-sm text-gray-500">
                                    PNG, JPG, JPEG up to 5MB
                                </span>
                            </label>
                        </div>
                    )}
                    {errors[field] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <Breadcrumb title="Credit Application Form" active="Credit Application Form" />
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between relative">
                        {[
                            { step: 1, label: "Personal & Address Info" },
                            { step: 2, label: "Personal & Family Profile" },
                            { step: 3, label: "Parental & Credit Information" },
                            { step: 4, label: "Employment & Payment Details Form" },
                            { step: 5, label: "Co-Maker & Employment Details" },
                            { step: 6, label: "Credit Inquiry Authorization" },
                        ].map(({ step, label }) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                    step === 6 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 6 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />
                    
                    <h2 className="text-xl font-semibold mb-6">Credit Inquiry Authorization</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="col-span-1">
                            {renderImageUploader("sketch_residence", "Upload Sketch of Residence (Applicant)")}
                        </div>
                        <div className="col-span-1">
                            {renderImageUploader("sketch_residence_comaker", "Upload Sketch of Residence (Co-Maker)")}
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-4 text-center">
                            This is to authorize Premio and its representative to perform the credit inquiries and verify the data written above.
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="col-span-1">
                            {renderImageUploader("applicant_signature", "Applicant's Signature")}
                        </div>
                        <div className="col-span-1">
                            {renderImageUploader("spouse_signature", "Spouse's Signature")}
                        </div>
                        <div className="col-span-1">
                            {renderImageUploader("comaker_signature", "Co-Maker's Signature")}
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            Please upload all required images before proceeding.
                        </div>
                    )}
                    
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                goToPreviousStep();
                                window.scrollTo({ top: 0 });
                            }}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg flex items-center gap-2"
                        >
                            <span>←</span>
                            Back to Co-Maker & Employment Details
                        </button>
                        <button
                            type="button"
                            onClick={handleContinueToConfirmation}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-lg flex items-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Continue to Review
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreditInquiryAuthorization; 