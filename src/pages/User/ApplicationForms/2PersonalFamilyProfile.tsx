import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";

interface Dependent {
    id: string;
    name: string;
    officePhone: string;
    gradeOccupation: string;
    schoolCompany: string;
    age: string;
}

interface Props {
    formData: {
        contactHomePhone: string;
        contactOfficePhone: string;
        contactMobilePhone: string;
        contactEmail: string;
        contactSpouseName: string;
        contactAge: string;
        contactDependents: string;
        contactProvincialSpouse: string;
        contactMobileNo: string;
        informationEmail: string;
        dependentsInfo: Dependent[];
        applicantFatherName: string;
        applicantMotherName: string;
        applicantOccupation: string;
        applicantMobileNo: string;
        applicantAddress: string;
        spouseFatherName: string;
        spouseMotherName: string;
        spouseOccupation: string;
        spouseMobileNo: string;
        spouseAddress: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleDependentChange: (id: string, field: keyof Dependent, value: string) => void;
    addDependent: () => void;
    removeDependent: (id: string) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Interface for validation errors
interface ValidationErrors {
    [key: string]: string | undefined;
}

// Separate interface for dependent errors
interface DependentErrors {
    [id: string]: {
        [field: string]: string;
    }
}

const PersonalFamilyProfile: React.FC<Props> = ({ 
    formData, 
    handleChange, 
    handleDependentChange,
    addDependent,
    removeDependent,
    goToNextStep,
    goToPreviousStep
}) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [dependentErrors, setDependentErrors] = useState<DependentErrors>({});
    const errorFieldRef = useRef<HTMLDivElement>(null);

    // Helper function to validate email format
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Revalidate fields when values change to clear errors
    useEffect(() => {
        // Create a new errors object based on current state
        const newErrors = { ...errors };
        const newDependentErrors = { ...dependentErrors };
        
        // Contact Information validation
        if (formData.contactHomePhone.trim()) delete newErrors.contactHomePhone;
        if (formData.contactOfficePhone.trim()) delete newErrors.contactOfficePhone;
        if (formData.contactMobilePhone.trim()) delete newErrors.contactMobilePhone;
        
        // Email validation with format check
        if (formData.contactEmail.trim()) {
            if (isValidEmail(formData.contactEmail)) {
                delete newErrors.contactEmail;
            } else {
                newErrors.contactEmail = "Please enter a valid email address";
            }
        }
        
        if (formData.contactSpouseName.trim()) delete newErrors.contactSpouseName;
        if (formData.contactAge.trim()) delete newErrors.contactAge;
        if (formData.contactDependents.trim()) delete newErrors.contactDependents;
        if (formData.contactProvincialSpouse.trim()) delete newErrors.contactProvincialSpouse;
        if (formData.contactMobileNo.trim()) delete newErrors.contactMobileNo;
        
        // Information email validation
        if (formData.informationEmail.trim()) {
            if (isValidEmail(formData.informationEmail)) {
                delete newErrors.informationEmail;
            } else {
                newErrors.informationEmail = "Please enter a valid email address";
            }
        }
        
        // Dependents validation
        if (formData.dependentsInfo.length > 0) {
            let hasChanges = false;
            
            formData.dependentsInfo.forEach(dependent => {
                if (!newDependentErrors[dependent.id]) {
                    newDependentErrors[dependent.id] = {};
                }
                
                // Check if fields are filled and clear errors
                if (dependent.name.trim()) delete newDependentErrors[dependent.id].name;
                if (dependent.officePhone.trim()) delete newDependentErrors[dependent.id].officePhone;
                if (dependent.gradeOccupation.trim()) delete newDependentErrors[dependent.id].gradeOccupation;
                if (dependent.schoolCompany.trim()) delete newDependentErrors[dependent.id].schoolCompany;
                if (dependent.age.trim()) delete newDependentErrors[dependent.id].age;
                
                // If no errors for this dependent, remove the entry
                if (Object.keys(newDependentErrors[dependent.id]).length === 0) {
                    delete newDependentErrors[dependent.id];
                    hasChanges = true;
                }
            });
            
            // Remove errors for dependents that no longer exist
            Object.keys(newDependentErrors).forEach(id => {
                if (!formData.dependentsInfo.some(d => d.id === id)) {
                    delete newDependentErrors[id];
                    hasChanges = true;
                }
            });
            
            if (hasChanges) {
                setDependentErrors(newDependentErrors);
            }
        }
        
        // Applicant's Parents
        if (formData.applicantFatherName.trim()) delete newErrors.applicantFatherName;
        if (formData.applicantMotherName.trim()) delete newErrors.applicantMotherName;
        if (formData.applicantOccupation.trim()) delete newErrors.applicantOccupation;
        if (formData.applicantMobileNo.trim()) delete newErrors.applicantMobileNo;
        if (formData.applicantAddress.trim()) delete newErrors.applicantAddress;
        
        // Spouse's Parents
        if (formData.spouseFatherName.trim()) delete newErrors.spouseFatherName;
        if (formData.spouseMotherName.trim()) delete newErrors.spouseMotherName;
        if (formData.spouseOccupation.trim()) delete newErrors.spouseOccupation;
        if (formData.spouseMobileNo.trim()) delete newErrors.spouseMobileNo;
        if (formData.spouseAddress.trim()) delete newErrors.spouseAddress;
        
        // Update errors state if changes were made
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [dependentErrors, errors, formData]);

    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        
        // Contact Information validation
        if (!formData.contactHomePhone.trim()) newErrors.contactHomePhone = "Home phone number is required";
        if (!formData.contactOfficePhone.trim()) newErrors.contactOfficePhone = "Office phone number is required";
        if (!formData.contactMobilePhone.trim()) newErrors.contactMobilePhone = "Mobile phone number is required";
        
        // Email validation
        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = "Email address is required";
        } else if (!isValidEmail(formData.contactEmail)) {
            newErrors.contactEmail = "Please enter a valid email address";
        }
        
        if (!formData.contactSpouseName.trim()) newErrors.contactSpouseName = "Name of spouse is required";
        if (!formData.contactAge.trim()) newErrors.contactAge = "Age is required";
        if (!formData.contactDependents.trim()) newErrors.contactDependents = "Number of dependents is required";
        if (!formData.contactProvincialSpouse.trim()) newErrors.contactProvincialSpouse = "Provincial spouse is required";
        if (!formData.contactMobileNo.trim()) newErrors.contactMobileNo = "Mobile number is required";
        
        // Information Email validation
        if (!formData.informationEmail.trim()) {
            newErrors.informationEmail = "Email address is required";
        } else if (!isValidEmail(formData.informationEmail)) {
            newErrors.informationEmail = "Please enter a valid email address";
        }
        
        // Applicant's Parents validation
        if (!formData.applicantFatherName.trim()) newErrors.applicantFatherName = "Father's name is required";
        if (!formData.applicantMotherName.trim()) newErrors.applicantMotherName = "Mother's name is required";
        if (!formData.applicantOccupation.trim()) newErrors.applicantOccupation = "Occupation is required";
        if (!formData.applicantMobileNo.trim()) newErrors.applicantMobileNo = "Mobile number is required";
        if (!formData.applicantAddress.trim()) newErrors.applicantAddress = "Address is required";
        
        // Spouse's Parents validation
        if (!formData.spouseFatherName.trim()) newErrors.spouseFatherName = "Father's name is required";
        if (!formData.spouseMotherName.trim()) newErrors.spouseMotherName = "Mother's name is required";
        if (!formData.spouseOccupation.trim()) newErrors.spouseOccupation = "Occupation is required";
        if (!formData.spouseMobileNo.trim()) newErrors.spouseMobileNo = "Mobile number is required";
        if (!formData.spouseAddress.trim()) newErrors.spouseAddress = "Address is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        const isValid = validateForm();
        if (isValid) {
            goToNextStep();
        } else {
            // Find the first error field for scrolling
            setTimeout(() => {
                if (errorFieldRef.current) {
                    errorFieldRef.current.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 100);
        }
    };

    // Function to determine input class based on error state
    const getFieldClass = (fieldName: string): string => {
        return `w-full p-2 border rounded ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
    };
    
    // Function to get dependent field class
    const getDependentFieldClass = (dependentId: string, fieldName: string): string => {
        return `w-full p-2 border rounded ${
            dependentErrors[dependentId] && 
            dependentErrors[dependentId][fieldName] 
                ? 'border-red-500' 
                : 'border-gray-300'
        }`;
    };
    
    // Find the first error field to attach the ref
    const firstErrorField = Object.keys(errors)[0];

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
                                    step === 2 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 2 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />
            
                    {/* Contact Information Section */}
                    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'contactHomePhone' ? errorFieldRef : null}>
                            <label className="block mb-2">Home Phone Number</label>
                            <input
                                type="text"
                                name="contactHomePhone"
                                value={formData.contactHomePhone}
                                onChange={handleChange}
                                className={getFieldClass('contactHomePhone')}
                                placeholder="Enter home phone number"
                            />
                            {errors.contactHomePhone && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactHomePhone}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactOfficePhone' ? errorFieldRef : null}>
                            <label className="block mb-2">Office Phone Number</label>
                            <input
                                type="text"
                                name="contactOfficePhone"
                                value={formData.contactOfficePhone}
                                onChange={handleChange}
                                className={getFieldClass('contactOfficePhone')}
                                placeholder="Enter office phone number"
                            />
                            {errors.contactOfficePhone && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactOfficePhone}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactMobilePhone' ? errorFieldRef : null}>
                            <label className="block mb-2">Mobile Phone</label>
                            <input
                                type="tel"
                                name="contactMobilePhone"
                                value={formData.contactMobilePhone}
                                onChange={handleChange}
                                className={getFieldClass('contactMobilePhone')}
                                placeholder="Enter mobile number"
                                maxLength={11}
                            />
                            {errors.contactMobilePhone && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactMobilePhone}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactEmail' ? errorFieldRef : null}>
                            <label className="block mb-2">Email Address</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className={getFieldClass('contactEmail')}
                                placeholder="Enter email address"
                            />
                            {errors.contactEmail && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactSpouseName' ? errorFieldRef : null}>
                            <label className="block mb-2">Name of Spouse</label>
                            <input
                                type="text"
                                name="contactSpouseName"
                                value={formData.contactSpouseName}
                                onChange={handleChange}
                                className={getFieldClass('contactSpouseName')}
                                placeholder="Enter spouse name"
                            />
                            {errors.contactSpouseName && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactSpouseName}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactAge' ? errorFieldRef : null}>
                            <label className="block mb-2">Age</label>
                            <input
                                type="number"
                                name="contactAge"
                                value={formData.contactAge}
                                onChange={handleChange}
                                className={getFieldClass('contactAge')}
                                placeholder="Enter age"
                            />
                            {errors.contactAge && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactAge}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactDependents' ? errorFieldRef : null}>
                            <label className="block mb-2">Number of Dependents</label>
                            <input
                                type="number"
                                name="contactDependents"
                                value={formData.contactDependents}
                                onChange={handleChange}
                                className={getFieldClass('contactDependents')}
                                placeholder="Enter number of dependents"
                            />
                            {errors.contactDependents && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactDependents}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactProvincialSpouse' ? errorFieldRef : null}>
                            <label className="block mb-2">Provincial Spouse</label>
                            <input
                                type="text"
                                name="contactProvincialSpouse"
                                value={formData.contactProvincialSpouse}
                                onChange={handleChange}
                                className={getFieldClass('contactProvincialSpouse')}
                                placeholder="Enter provincial spouse"
                            />
                            {errors.contactProvincialSpouse && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactProvincialSpouse}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'contactMobileNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Mobile No</label>
                            <input
                                type="tel"
                                name="contactMobileNo"
                                value={formData.contactMobileNo}
                                onChange={handleChange}
                                className={getFieldClass('contactMobileNo')}
                                placeholder="Enter mobile number"
                                maxLength={11}
                            />
                            {errors.contactMobileNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactMobileNo}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'informationEmail' ? errorFieldRef : null}>
                            <label className="block mb-2"> Email Address</label>
                            <input
                                type="email"
                                name="informationEmail"
                                value={formData.informationEmail}
                                onChange={handleChange}
                                className={getFieldClass('informationEmail')}
                                placeholder="Enter email address"
                            />
                            {errors.informationEmail && (
                                <p className="text-red-500 text-xs mt-1">{errors.informationEmail}</p>
                            )}
                        </div>
                    </div>

                    {/* Dependents Information Section */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Dependents Information</h2>
                            <button 
                                type="button"
                                onClick={addDependent}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                            >
                                <span className="mr-2">+</span> Add Dependents Information
                            </button>
                        </div>

                        {formData.dependentsInfo.length === 0 && (
                            <p className="text-gray-500 italic">No dependents added yet. Click the button above to add.</p>
                        )}

                        {formData.dependentsInfo.map((dependent, index) => (
                            <div key={dependent.id} className="border p-4 rounded mb-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="font-medium">Dependents Information #{index + 1}</p>
                                    <button 
                                        type="button"
                                        onClick={() => removeDependent(dependent.id)}
                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block mb-2">Name of Dependents</label>
                                        <input
                                            type="text"
                                            value={dependent.name}
                                            onChange={(e) => handleDependentChange(dependent.id, 'name', e.target.value)}
                                            className={getDependentFieldClass(dependent.id, 'name')}
                                            placeholder="Enter dependent name"
                                        />
                                        {dependentErrors[dependent.id] && dependentErrors[dependent.id].name && (
                                            <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Office Phone Number</label>
                                        <input
                                            type="text"
                                            value={dependent.officePhone}
                                            onChange={(e) => handleDependentChange(dependent.id, 'officePhone', e.target.value)}
                                            className={getDependentFieldClass(dependent.id, 'officePhone')}
                                            placeholder="Enter office phone"
                                        />
                                        {dependentErrors[dependent.id] && dependentErrors[dependent.id].officePhone && (
                                            <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].officePhone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Grade/Occupation</label>
                                        <input
                                            type="text"
                                            value={dependent.gradeOccupation}
                                            onChange={(e) => handleDependentChange(dependent.id, 'gradeOccupation', e.target.value)}
                                            className={getDependentFieldClass(dependent.id, 'gradeOccupation')}
                                            placeholder="Enter grade/occupation"
                                        />
                                        {dependentErrors[dependent.id] && dependentErrors[dependent.id].gradeOccupation && (
                                            <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].gradeOccupation}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">School/Company</label>
                                        <input
                                            type="text"
                                            value={dependent.schoolCompany}
                                            onChange={(e) => handleDependentChange(dependent.id, 'schoolCompany', e.target.value)}
                                            className={getDependentFieldClass(dependent.id, 'schoolCompany')}
                                            placeholder="Enter school/company"
                                        />
                                        {dependentErrors[dependent.id] && dependentErrors[dependent.id].schoolCompany && (
                                            <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].schoolCompany}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Age</label>
                                        <input
                                            type="number"
                                            value={dependent.age}
                                            onChange={(e) => handleDependentChange(dependent.id, 'age', e.target.value)}
                                            className={getDependentFieldClass(dependent.id, 'age')}
                                            placeholder="Enter age"
                                        />
                                        {dependentErrors[dependent.id] && dependentErrors[dependent.id].age && (
                                            <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].age}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Applicant's Parents Section */}
                    <h2 className="text-xl font-semibold mb-6">Applicant's Parents (First/Middle/Last)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'applicantFatherName' ? errorFieldRef : null}>
                            <label className="block mb-2">Name of Father</label>
                            <input
                                type="text"
                                name="applicantFatherName"
                                value={formData.applicantFatherName}
                                onChange={handleChange}
                                className={getFieldClass('applicantFatherName')}
                                placeholder="Enter father's name"
                            />
                            {errors.applicantFatherName && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantFatherName}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'applicantMotherName' ? errorFieldRef : null}>
                            <label className="block mb-2">Name of Mother</label>
                            <input
                                type="text"
                                name="applicantMotherName"
                                value={formData.applicantMotherName}
                                onChange={handleChange}
                                className={getFieldClass('applicantMotherName')}
                                placeholder="Enter mother's name"
                            />
                            {errors.applicantMotherName && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantMotherName}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'applicantOccupation' ? errorFieldRef : null}>
                            <label className="block mb-2">Occupation</label>
                            <input
                                type="text"
                                name="applicantOccupation"
                                value={formData.applicantOccupation}
                                onChange={handleChange}
                                className={getFieldClass('applicantOccupation')}
                                placeholder="Enter occupation"
                            />
                            {errors.applicantOccupation && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantOccupation}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'applicantMobileNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Applicant Mobile No.</label>
                            <input
                                type="tel"
                                name="applicantMobileNo"
                                value={formData.applicantMobileNo}
                                onChange={handleChange}
                                className={getFieldClass('applicantMobileNo')}
                                placeholder="Enter mobile number"
                                maxLength={11}
                            />
                            {errors.applicantMobileNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantMobileNo}</p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2 md:col-span-4" ref={firstErrorField === 'applicantAddress' ? errorFieldRef : null}>
                            <label className="block mb-2">Address</label>
                            <input
                                type="text"
                                name="applicantAddress"
                                value={formData.applicantAddress}
                                onChange={handleChange}
                                className={getFieldClass('applicantAddress')}
                                placeholder="Enter address"
                            />
                            {errors.applicantAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantAddress}</p>
                            )}
                        </div>
                    </div>

                    {/* Spouse's Parents Section */}
                    <h2 className="text-xl font-semibold mb-6">Spouse's Parents (First/Middle/Last)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'spouseFatherName' ? errorFieldRef : null}>
                            <label className="block mb-2">Name of Father</label>
                            <input
                                type="text"
                                name="spouseFatherName"
                                value={formData.spouseFatherName}
                                onChange={handleChange}
                                className={getFieldClass('spouseFatherName')}
                                placeholder="Enter father's name"
                            />
                            {errors.spouseFatherName && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseFatherName}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'spouseMotherName' ? errorFieldRef : null}>
                            <label className="block mb-2">Name of Mother</label>
                            <input
                                type="text"
                                name="spouseMotherName"
                                value={formData.spouseMotherName}
                                onChange={handleChange}
                                className={getFieldClass('spouseMotherName')}
                                placeholder="Enter mother's name"
                            />
                            {errors.spouseMotherName && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseMotherName}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'spouseOccupation' ? errorFieldRef : null}>
                            <label className="block mb-2">Occupation</label>
                            <input
                                type="text"
                                name="spouseOccupation"
                                value={formData.spouseOccupation}
                                onChange={handleChange}
                                className={getFieldClass('spouseOccupation')}
                                placeholder="Enter occupation"
                            />
                            {errors.spouseOccupation && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseOccupation}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'spouseMobileNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Spouse Mobile No.</label>
                            <input
                                type="tel"
                                name="spouseMobileNo"
                                value={formData.spouseMobileNo}
                                onChange={handleChange}
                                className={getFieldClass('spouseMobileNo')}
                                placeholder="Enter mobile number"
                                maxLength={11}
                            />
                            {errors.spouseMobileNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseMobileNo}</p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2 md:col-span-4" ref={firstErrorField === 'spouseAddress' ? errorFieldRef : null}>
                            <label className="block mb-2">Address</label>
                            <input
                                type="text"
                                name="spouseAddress"
                                value={formData.spouseAddress}
                                onChange={handleChange}
                                className={getFieldClass('spouseAddress')}
                                placeholder="Enter address"
                            />
                            {errors.spouseAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseAddress}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                Please fill out all required fields before proceeding.
                            </div>
                        )}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    goToPreviousStep();
                                    window.scrollTo({ top: 0 });
                                }}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg  hover:shadow-lg flex items-center gap-2"
                            >
                                <span>←</span>
                                Back to Personal & Address Info
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    handleNextStep();
                                    window.scrollTo({ top: 0 });
                                }}
                                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-lg flex items-center gap-2"
                            >
                                Save & Next
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalFamilyProfile; 