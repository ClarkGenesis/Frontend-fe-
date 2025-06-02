import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";

interface Props {
    formData: {
        // Applicant Employer Information
        applicantEmployer: string;
        applicantPosition: string;
        applicantBlockStreet: string;
        applicantZonePurok: string;
        applicantBarangay: string;
        applicantMunicipalityCity: string;
        applicantProvince: string;
        applicantTelno: string;
        applicantDateStarted: string;
        applicantNameImmediate: string;
        applicantEmployerMobileNo: string;
        applicantSalaryGross: string;
        
        // Spouse Employer Information
        spouseEmployer: string;
        spousePosition: string;
        spouseBlockStreet: string;
        spouseZonePurok: string;
        spouseBarangay: string;
        spouseMunicipality: string;
        spouseProvince: string;
        spouseTelno: string;
        spouseDateStarted: string;
        spouseNameImmediate: string;
        spouseEmployerMobileNo: string;
        spouseSalaryGross: string;
        
        // Unit to be Used For
        personalUse: boolean;
        businessUse: boolean;
        gift: boolean;
        useByRelative: boolean;
        
        // Mode of Payment
        postDatedChecks: boolean;
        cashPaidToOffice: boolean;
        cashForCollection: boolean;
        creditCard: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Interface for validation errors
interface ValidationErrors {
    [key: string]: string | undefined;
}

const EmploymentPaymentDetailsForm: React.FC<Props> = ({ formData, handleChange, handleCheckboxChange, goToNextStep, goToPreviousStep }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const errorFieldRef = useRef<HTMLDivElement>(null);

    // Clear errors when fields are filled
    useEffect(() => {
        const newErrors = { ...errors };
        
        // Applicant Employer Information validation
        if (formData.applicantEmployer.trim()) delete newErrors.applicantEmployer;
        if (formData.applicantPosition.trim()) delete newErrors.applicantPosition;
        if (formData.applicantBlockStreet.trim()) delete newErrors.applicantBlockStreet;
        if (formData.applicantZonePurok.trim()) delete newErrors.applicantZonePurok;
        if (formData.applicantBarangay.trim()) delete newErrors.applicantBarangay;
        if (formData.applicantMunicipalityCity.trim()) delete newErrors.applicantMunicipalityCity;
        if (formData.applicantProvince.trim()) delete newErrors.applicantProvince;
        if (formData.applicantTelno.trim()) delete newErrors.applicantTelno;
        if (formData.applicantDateStarted.trim()) delete newErrors.applicantDateStarted;
        if (formData.applicantNameImmediate.trim()) delete newErrors.applicantNameImmediate;
        if (formData.applicantEmployerMobileNo.trim()) delete newErrors.applicantEmployerMobileNo;
        if (formData.applicantSalaryGross.trim()) delete newErrors.applicantSalaryGross;
        
        // Spouse Employer Information validation
        if (formData.spouseEmployer.trim()) delete newErrors.spouseEmployer;
        if (formData.spousePosition.trim()) delete newErrors.spousePosition;
        if (formData.spouseBlockStreet.trim()) delete newErrors.spouseBlockStreet;
        if (formData.spouseZonePurok.trim()) delete newErrors.spouseZonePurok;
        if (formData.spouseBarangay.trim()) delete newErrors.spouseBarangay;
        if (formData.spouseMunicipality.trim()) delete newErrors.spouseMunicipality;
        if (formData.spouseProvince.trim()) delete newErrors.spouseProvince;
        if (formData.spouseTelno.trim()) delete newErrors.spouseTelno;
        if (formData.spouseDateStarted.trim()) delete newErrors.spouseDateStarted;
        if (formData.spouseNameImmediate.trim()) delete newErrors.spouseNameImmediate;
        if (formData.spouseEmployerMobileNo.trim()) delete newErrors.spouseEmployerMobileNo;
        if (formData.spouseSalaryGross.trim()) delete newErrors.spouseSalaryGross;
        
        // Unit to be Used For validation
        if (formData.personalUse || formData.businessUse || formData.gift || formData.useByRelative) {
            delete newErrors.unitUsedFor;
        }
        
        // Mode of Payment validation
        if (formData.postDatedChecks || formData.cashPaidToOffice || formData.cashForCollection || formData.creditCard) {
            delete newErrors.modeOfPayment;
        }
        
        // Update errors state if changes were made
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [errors, formData]);

    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        
        // Applicant Employer Information validation
        if (!formData.applicantEmployer.trim()) newErrors.applicantEmployer = "Employer/Business Name is required";
        if (!formData.applicantPosition.trim()) newErrors.applicantPosition = "Position is required";
        if (!formData.applicantBlockStreet.trim()) newErrors.applicantBlockStreet = "Block Street is required";
        if (!formData.applicantZonePurok.trim()) newErrors.applicantZonePurok = "Zone/Purok is required";
        if (!formData.applicantBarangay.trim()) newErrors.applicantBarangay = "Barangay is required";
        if (!formData.applicantMunicipalityCity.trim()) newErrors.applicantMunicipalityCity = "Municipality/City is required";
        if (!formData.applicantProvince.trim()) newErrors.applicantProvince = "Province is required";
        if (!formData.applicantTelno.trim()) newErrors.applicantTelno = "Tel No. is required";
        if (!formData.applicantDateStarted.trim()) newErrors.applicantDateStarted = "Date Started is required";
        if (!formData.applicantNameImmediate.trim()) newErrors.applicantNameImmediate = "Immediate Supervisor is required";
        if (!formData.applicantEmployerMobileNo.trim()) newErrors.applicantEmployerMobileNo = "Mobile No. is required";
        if (!formData.applicantSalaryGross.trim()) newErrors.applicantSalaryGross = "Salary Gross is required";
        
        // Spouse Employer Information validation
        if (!formData.spouseEmployer.trim()) newErrors.spouseEmployer = "Employer/Business Name is required";
        if (!formData.spousePosition.trim()) newErrors.spousePosition = "Position is required";
        if (!formData.spouseBlockStreet.trim()) newErrors.spouseBlockStreet = "Block Street is required";
        if (!formData.spouseZonePurok.trim()) newErrors.spouseZonePurok = "Zone/Purok is required";
        if (!formData.spouseBarangay.trim()) newErrors.spouseBarangay = "Barangay is required";
        if (!formData.spouseMunicipality.trim()) newErrors.spouseMunicipality = "Municipality/City is required";
        if (!formData.spouseProvince.trim()) newErrors.spouseProvince = "Province is required";
        if (!formData.spouseTelno.trim()) newErrors.spouseTelno = "Tel No. is required";
        if (!formData.spouseDateStarted.trim()) newErrors.spouseDateStarted = "Date Started is required";
        if (!formData.spouseNameImmediate.trim()) newErrors.spouseNameImmediate = "Immediate Supervisor is required";
        if (!formData.spouseEmployerMobileNo.trim()) newErrors.spouseEmployerMobileNo = "Mobile No. is required";
        if (!formData.spouseSalaryGross.trim()) newErrors.spouseSalaryGross = "Salary Gross is required";
        
        // Unit to be Used For validation
        if (!formData.personalUse && !formData.businessUse && !formData.gift && !formData.useByRelative) {
            newErrors.unitUsedFor = "At least one Unit to be Used For option must be selected";
        }
        
        // Mode of Payment validation
        if (!formData.postDatedChecks && !formData.cashPaidToOffice && !formData.cashForCollection && !formData.creditCard) {
            newErrors.modeOfPayment = "At least one Mode of Payment option must be selected";
        }
        
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
                                    step === 4 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 4 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />
            
                    {/* Applicant Employer Information */}
                    <h2 className="text-xl font-semibold mb-6">Applicant Employer Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'applicantEmployer' ? errorFieldRef : null}>
                            <label className="block mb-2">Employer/Business Name</label>
                            <input
                                type="text"
                                name="applicantEmployer"
                                value={formData.applicantEmployer}
                                onChange={handleChange}
                                className={getFieldClass('applicantEmployer')}
                                placeholder="Enter employer/business name"
                            />
                            {errors.applicantEmployer && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantEmployer}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantPosition' ? errorFieldRef : null}>
                            <label className="block mb-2">Position</label>
                            <input
                                type="text"
                                name="applicantPosition"
                                value={formData.applicantPosition}
                                onChange={handleChange}
                                className={getFieldClass('applicantPosition')}
                                placeholder="Enter position"
                            />
                            {errors.applicantPosition && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantPosition}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantBlockStreet' ? errorFieldRef : null}>
                            <label className="block mb-2">Block Street</label>
                            <input
                                type="text"
                                name="applicantBlockStreet"
                                value={formData.applicantBlockStreet}
                                onChange={handleChange}
                                className={getFieldClass('applicantBlockStreet')}
                                placeholder="Enter block/street"
                            />
                            {errors.applicantBlockStreet && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantBlockStreet}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantZonePurok' ? errorFieldRef : null}>
                            <label className="block mb-2">Zone/Purok</label>
                            <input
                                type="text"
                                name="applicantZonePurok"
                                value={formData.applicantZonePurok}
                                onChange={handleChange}
                                className={getFieldClass('applicantZonePurok')}
                                placeholder="Enter zone/purok"
                            />
                            {errors.applicantZonePurok && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantZonePurok}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantBarangay' ? errorFieldRef : null}>
                            <label className="block mb-2">Barangay</label>
                            <input
                                type="text"
                                name="applicantBarangay"
                                value={formData.applicantBarangay}
                                onChange={handleChange}
                                className={getFieldClass('applicantBarangay')}
                                placeholder="Enter barangay"
                            />
                            {errors.applicantBarangay && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantBarangay}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantMunicipalityCity' ? errorFieldRef : null}>
                            <label className="block mb-2">Municipality/City</label>
                            <input
                                type="text"
                                name="applicantMunicipalityCity"
                                value={formData.applicantMunicipalityCity}
                                onChange={handleChange}
                                className={getFieldClass('applicantMunicipalityCity')}
                                placeholder="Enter municipality/city"
                            />
                            {errors.applicantMunicipalityCity && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantMunicipalityCity}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantProvince' ? errorFieldRef : null}>
                            <label className="block mb-2">Province</label>
                            <input
                                type="text"
                                name="applicantProvince"
                                value={formData.applicantProvince}
                                onChange={handleChange}
                                className={getFieldClass('applicantProvince')}
                                placeholder="Enter province"
                            />
                            {errors.applicantProvince && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantProvince}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantTelno' ? errorFieldRef : null}>
                            <label className="block mb-2">Tel No.</label>
                            <input
                                type="text"
                                name="applicantTelno"
                                value={formData.applicantTelno}
                                onChange={handleChange}
                                className={getFieldClass('applicantTelno')}
                                placeholder="Enter telephone number"
                            />
                            {errors.applicantTelno && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantTelno}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantDateStarted' ? errorFieldRef : null}>
                            <label className="block mb-2">Date Started</label>
                            <input
                                type="date"
                                name="applicantDateStarted"
                                value={formData.applicantDateStarted}
                                onChange={handleChange}
                                className={getFieldClass('applicantDateStarted')}
                                placeholder="Enter start date"
                            />
                            {errors.applicantDateStarted && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantDateStarted}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantNameImmediate' ? errorFieldRef : null}>
                            <label className="block mb-2">Immediate Supervisor</label>
                            <input
                                type="text"
                                name="applicantNameImmediate"
                                value={formData.applicantNameImmediate}
                                onChange={handleChange}
                                className={getFieldClass('applicantNameImmediate')}
                                placeholder="Enter supervisor name"
                            />
                            {errors.applicantNameImmediate && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantNameImmediate}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantEmployerMobileNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Mobile No.</label>
                            <input
                                type="text"
                                name="applicantEmployerMobileNo"
                                value={formData.applicantEmployerMobileNo}
                                onChange={handleChange}
                                className={getFieldClass('applicantEmployerMobileNo')}
                                placeholder="Enter mobile number"
                            />
                            {errors.applicantEmployerMobileNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantEmployerMobileNo}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'applicantSalaryGross' ? errorFieldRef : null}>
                            <label className="block mb-2">Salary Gross</label>
                            <input
                                type="number"
                                name="applicantSalaryGross"
                                value={formData.applicantSalaryGross}
                                onChange={handleChange}
                                className={getFieldClass('applicantSalaryGross')}
                                placeholder="Enter gross salary"
                            />
                            {errors.applicantSalaryGross && (
                                <p className="text-red-500 text-xs mt-1">{errors.applicantSalaryGross}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Spouse Employer Information */}
                    <h2 className="text-xl font-semibold mb-6">Spouse Employer Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'spouseEmployer' ? errorFieldRef : null}>
                            <label className="block mb-2">Employer/Business Name</label>
                            <input
                                type="text"
                                name="spouseEmployer"
                                value={formData.spouseEmployer}
                                onChange={handleChange}
                                className={getFieldClass('spouseEmployer')}
                                placeholder="Enter employer/business name"
                            />
                            {errors.spouseEmployer && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseEmployer}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spousePosition' ? errorFieldRef : null}>
                            <label className="block mb-2">Position</label>
                            <input
                                type="text"
                                name="spousePosition"
                                value={formData.spousePosition}
                                onChange={handleChange}
                                className={getFieldClass('spousePosition')}
                                placeholder="Enter position"
                            />
                            {errors.spousePosition && (
                                <p className="text-red-500 text-xs mt-1">{errors.spousePosition}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseBlockStreet' ? errorFieldRef : null}>
                            <label className="block mb-2">Block Street</label>
                            <input
                                type="text"
                                name="spouseBlockStreet"
                                value={formData.spouseBlockStreet}
                                onChange={handleChange}
                                className={getFieldClass('spouseBlockStreet')}
                                placeholder="Enter block/street"
                            />
                            {errors.spouseBlockStreet && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseBlockStreet}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseZonePurok' ? errorFieldRef : null}>
                            <label className="block mb-2">Zone/Purok</label>
                            <input
                                type="text"
                                name="spouseZonePurok"
                                value={formData.spouseZonePurok}
                                onChange={handleChange}
                                className={getFieldClass('spouseZonePurok')}
                                placeholder="Enter zone/purok"
                            />
                            {errors.spouseZonePurok && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseZonePurok}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseBarangay' ? errorFieldRef : null}>
                            <label className="block mb-2">Barangay</label>
                            <input
                                type="text"
                                name="spouseBarangay"
                                value={formData.spouseBarangay}
                                onChange={handleChange}
                                className={getFieldClass('spouseBarangay')}
                                placeholder="Enter barangay"
                            />
                            {errors.spouseBarangay && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseBarangay}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseMunicipality' ? errorFieldRef : null}>
                            <label className="block mb-2">Municipality/City</label>
                            <input
                                type="text"
                                name="spouseMunicipality"
                                value={formData.spouseMunicipality}
                                onChange={handleChange}
                                className={getFieldClass('spouseMunicipality')}
                                placeholder="Enter municipality/city"
                            />
                            {errors.spouseMunicipality && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseMunicipality}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseProvince' ? errorFieldRef : null}>
                            <label className="block mb-2">Province</label>
                            <input
                                type="text"
                                name="spouseProvince"
                                value={formData.spouseProvince}
                                onChange={handleChange}
                                className={getFieldClass('spouseProvince')}
                                placeholder="Enter province"
                            />
                            {errors.spouseProvince && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseProvince}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseTelno' ? errorFieldRef : null}>
                            <label className="block mb-2">Tel No.</label>
                            <input
                                type="text"
                                name="spouseTelno"
                                value={formData.spouseTelno}
                                onChange={handleChange}
                                className={getFieldClass('spouseTelno')}
                                placeholder="Enter telephone number"
                            />
                            {errors.spouseTelno && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseTelno}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseDateStarted' ? errorFieldRef : null}>
                            <label className="block mb-2">Date Started</label>
                            <input
                                type="date"
                                name="spouseDateStarted"
                                value={formData.spouseDateStarted}
                                onChange={handleChange}
                                className={getFieldClass('spouseDateStarted')}
                                placeholder="Enter start date"
                            />
                            {errors.spouseDateStarted && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseDateStarted}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseNameImmediate' ? errorFieldRef : null}>
                            <label className="block mb-2">Immediate Supervisor</label>
                            <input
                                type="text"
                                name="spouseNameImmediate"
                                value={formData.spouseNameImmediate}
                                onChange={handleChange}
                                className={getFieldClass('spouseNameImmediate')}
                                placeholder="Enter supervisor name"
                            />
                            {errors.spouseNameImmediate && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseNameImmediate}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseEmployerMobileNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Mobile No.</label>
                            <input
                                type="text"
                                name="spouseEmployerMobileNo"
                                value={formData.spouseEmployerMobileNo}
                                onChange={handleChange}
                                className={getFieldClass('spouseEmployerMobileNo')}
                                placeholder="Enter mobile number"
                            />
                            {errors.spouseEmployerMobileNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseEmployerMobileNo}</p>
                            )}
                        </div>
                        
                        <div ref={firstErrorField === 'spouseSalaryGross' ? errorFieldRef : null}>
                            <label className="block mb-2">Salary Gross</label>
                            <input
                                type="number"
                                name="spouseSalaryGross"
                                value={formData.spouseSalaryGross}
                                onChange={handleChange}
                                className={getFieldClass('spouseSalaryGross')}
                                placeholder="Enter gross salary"
                            />
                            {errors.spouseSalaryGross && (
                                <p className="text-red-500 text-xs mt-1">{errors.spouseSalaryGross}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Unit to be Used For */}
                    <div className={`bg-gray-100 p-4 rounded-lg mb-6 ${errors.unitUsedFor ? 'border border-red-500' : ''}`}
                        ref={firstErrorField === 'unitUsedFor' ? errorFieldRef : null}>
                        <h2 className="text-xl font-semibold mb-3">UNIT TO BE USED FOR</h2>
                        <div className="mb-3 font-medium">
                            Unit to be Used For: {[
                                formData.personalUse ? 'Personal Use' : null,
                                formData.businessUse ? 'Business Use' : null, 
                                formData.gift ? 'Gift' : null,
                                formData.useByRelative ? 'Use by Relative / Friend' : null
                            ].filter(Boolean).join(', ') || 'None'}
                        </div>
                        {/* Hidden checkboxes for form submission */}
                        <div className="hidden">
                            <input type="checkbox" name="personalUse" checked={formData.personalUse} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="businessUse" checked={formData.businessUse} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="gift" checked={formData.gift} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="useByRelative" checked={formData.useByRelative} onChange={handleCheckboxChange} />
                        </div>
                        {/* User-friendly controls to update values */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'personalUse', checked: !formData.personalUse}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.personalUse ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Personal Use
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'businessUse', checked: !formData.businessUse}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.businessUse ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Business Use
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'gift', checked: !formData.gift}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.gift ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Gift
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'useByRelative', checked: !formData.useByRelative}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.useByRelative ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Use by Relative / Friend
                            </button>
                        </div>
                        {errors.unitUsedFor && (
                            <p className="text-red-500 text-xs mt-2">{errors.unitUsedFor}</p>
                        )}
                    </div>
                    
                    {/* Mode of Payment */}
                    <div className={`bg-gray-100 p-4 rounded-lg mb-6 ${errors.modeOfPayment ? 'border border-red-500' : ''}`}
                        ref={firstErrorField === 'modeOfPayment' ? errorFieldRef : null}>
                        <h2 className="text-xl font-semibold mb-3">MODE OF PAYMENT</h2>
                        <div className="mb-3 font-medium">
                            Mode of Payment: {[
                                formData.postDatedChecks ? 'Post Dated Checks' : null,
                                formData.cashPaidToOffice ? 'Cash Paid to Office' : null,
                                formData.cashForCollection ? 'Cash for Collection' : null,
                                formData.creditCard ? 'Credit Card' : null
                            ].filter(Boolean).join(', ') || 'None'}
                        </div>
                        {/* Hidden checkboxes for form submission */}
                        <div className="hidden">
                            <input type="checkbox" name="postDatedChecks" checked={formData.postDatedChecks} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="cashPaidToOffice" checked={formData.cashPaidToOffice} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="cashForCollection" checked={formData.cashForCollection} onChange={handleCheckboxChange} />
                            <input type="checkbox" name="creditCard" checked={formData.creditCard} onChange={handleCheckboxChange} />
                        </div>
                        {/* User-friendly controls to update values */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'postDatedChecks', checked: !formData.postDatedChecks}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.postDatedChecks ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Post Dated Checks
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'cashPaidToOffice', checked: !formData.cashPaidToOffice}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.cashPaidToOffice ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Cash Paid to Office
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'cashForCollection', checked: !formData.cashForCollection}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.cashForCollection ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Cash for Collection
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleCheckboxChange({target: {name: 'creditCard', checked: !formData.creditCard}} as React.ChangeEvent<HTMLInputElement>)} 
                                className={`px-3 py-1 rounded text-sm ${formData.creditCard ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Credit Card
                            </button>
                        </div>
                        {errors.modeOfPayment && (
                            <p className="text-red-500 text-xs mt-2">{errors.modeOfPayment}</p>
                        )}
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
                                Back to Parental & Credit Information
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

export default EmploymentPaymentDetailsForm; 