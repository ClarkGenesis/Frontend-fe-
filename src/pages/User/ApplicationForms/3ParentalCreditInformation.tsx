import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";

interface Props {
    formData: {
        // Fixed fields for Credit References
        creditStoreBank: string;
        creditItemLoanAmount: string;
        creditTerm: string;
        creditDate: string;
        creditBalance: string;
        
        // Fixed fields for Personal References
        referencesFullName: string;
        referencesRelationship: string;
        referencesTelNo: string;
        referencesAddress: string;
        
        // Source of Income checkboxes
        sourceOfIncome: string[];
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

const ParentalCreditInformation: React.FC<Props> = ({ 
    formData, 
    handleChange,
    handleCheckboxChange,
    goToNextStep,
    goToPreviousStep
}) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const errorFieldRef = useRef<HTMLDivElement>(null);

    // Clear errors when fields are filled
    useEffect(() => {
        const newErrors = { ...errors };
        
        // Credit References validation
        if (formData.creditStoreBank.trim()) delete newErrors.creditStoreBank;
        if (formData.creditItemLoanAmount.trim()) delete newErrors.creditItemLoanAmount;
        if (formData.creditTerm.trim()) delete newErrors.creditTerm;
        if (formData.creditDate.trim()) delete newErrors.creditDate;
        if (formData.creditBalance.trim()) delete newErrors.creditBalance;
        
        // Personal References validation
        if (formData.referencesFullName.trim()) delete newErrors.referencesFullName;
        if (formData.referencesRelationship.trim()) delete newErrors.referencesRelationship;
        if (formData.referencesTelNo.trim()) delete newErrors.referencesTelNo;
        if (formData.referencesAddress.trim()) delete newErrors.referencesAddress;
        
        // Source of Income validation
        if (formData.sourceOfIncome.length > 0) delete newErrors.sourceOfIncome;
        
        // Update errors state if changes were made
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [errors, formData]);

    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        
        // Credit References validation
        if (!formData.creditStoreBank.trim()) newErrors.creditStoreBank = "Credit Store/Bank is required";
        if (!formData.creditItemLoanAmount.trim()) newErrors.creditItemLoanAmount = "Credit Item/Loan Amount is required";
        if (!formData.creditTerm.trim()) newErrors.creditTerm = "Credit Term is required";
        if (!formData.creditDate.trim()) newErrors.creditDate = "Credit Date is required";
        if (!formData.creditBalance.trim()) newErrors.creditBalance = "Balance is required";
        
        // Personal References validation
        if (!formData.referencesFullName.trim()) newErrors.referencesFullName = "Full Name is required";
        if (!formData.referencesRelationship.trim()) newErrors.referencesRelationship = "Relationship is required";
        if (!formData.referencesTelNo.trim()) newErrors.referencesTelNo = "Tel No is required";
        if (!formData.referencesAddress.trim()) newErrors.referencesAddress = "Address is required";
        
        // Source of Income validation
        if (formData.sourceOfIncome.length === 0) newErrors.sourceOfIncome = "At least one source of income must be selected";
        
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
                                    step === 3 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 3 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />
            
                    {/* Credit References Section - Fixed fields */}
                    <h2 className="text-xl font-semibold mb-6">Credit References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'creditStoreBank' ? errorFieldRef : null}>
                            <label className="block mb-2">Store/Bank</label>
                            <input
                                type="text"
                                name="creditStoreBank"
                                value={formData.creditStoreBank}
                                onChange={handleChange}
                                className={getFieldClass('creditStoreBank')}
                                placeholder="Enter store/bank name"
                            />
                            {errors.creditStoreBank && (
                                <p className="text-red-500 text-xs mt-1">{errors.creditStoreBank}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'creditItemLoanAmount' ? errorFieldRef : null}>
                            <label className="block mb-2">Item/Loan Amount</label>
                            <input
                                type="text"
                                name="creditItemLoanAmount"
                                value={formData.creditItemLoanAmount}
                                onChange={handleChange}
                                className={getFieldClass('creditItemLoanAmount')}
                                placeholder="Enter item/loan amount"
                            />
                            {errors.creditItemLoanAmount && (
                                <p className="text-red-500 text-xs mt-1">{errors.creditItemLoanAmount}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'creditTerm' ? errorFieldRef : null}>
                            <label className="block mb-2">Term</label>
                            <input
                                type="text"
                                name="creditTerm"
                                value={formData.creditTerm}
                                onChange={handleChange}
                                className={getFieldClass('creditTerm')}
                                placeholder="Enter credit term"
                            />
                            {errors.creditTerm && (
                                <p className="text-red-500 text-xs mt-1">{errors.creditTerm}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'creditDate' ? errorFieldRef : null}>
                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                name="creditDate"
                                value={formData.creditDate}
                                onChange={handleChange}
                                className={getFieldClass('creditDate')}
                                placeholder="Enter credit date"
                            />
                            {errors.creditDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.creditDate}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'creditBalance' ? errorFieldRef : null}>
                            <label className="block mb-2">Balance</label>
                            <input
                                type="number"
                                name="creditBalance"
                                value={formData.creditBalance}
                                onChange={handleChange}
                                className={getFieldClass('creditBalance')}
                                placeholder="Enter balance amount"
                            />
                            {errors.creditBalance && (
                                <p className="text-red-500 text-xs mt-1">{errors.creditBalance}</p>
                            )}
                        </div>
                    </div>

                    {/* Personal References Section - Fixed fields */}
                    <h2 className="text-xl font-semibold mb-6">Personal References</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div ref={firstErrorField === 'referencesFullName' ? errorFieldRef : null}>
                            <label className="block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="referencesFullName"
                                value={formData.referencesFullName}
                                onChange={handleChange}
                                className={getFieldClass('referencesFullName')}
                                placeholder="Enter full name"
                            />
                            {errors.referencesFullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.referencesFullName}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'referencesRelationship' ? errorFieldRef : null}>
                            <label className="block mb-2">Relationship</label>
                            <input
                                type="text"
                                name="referencesRelationship"
                                value={formData.referencesRelationship}
                                onChange={handleChange}
                                className={getFieldClass('referencesRelationship')}
                                placeholder="Enter relationship"
                            />
                            {errors.referencesRelationship && (
                                <p className="text-red-500 text-xs mt-1">{errors.referencesRelationship}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'referencesTelNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Tel No</label>
                            <input
                                type="text"
                                name="referencesTelNo"
                                value={formData.referencesTelNo}
                                onChange={handleChange}
                                className={getFieldClass('referencesTelNo')}
                                placeholder="Enter telephone number"
                            />
                            {errors.referencesTelNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.referencesTelNo}</p>
                            )}
                        </div>
                        <div ref={firstErrorField === 'referencesAddress' ? errorFieldRef : null}>
                            <label className="block mb-2">Address</label>
                            <input
                                type="text"
                                name="referencesAddress"
                                value={formData.referencesAddress}
                                onChange={handleChange}
                                className={getFieldClass('referencesAddress')}
                                placeholder="Enter address"
                            />
                            {errors.referencesAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.referencesAddress}</p>
                            )}
                        </div>
                    </div>

                    {/* Source of Income Section - Updated styling */}
                    <div className={`bg-gray-100 p-4 rounded-lg mb-6 ${errors.sourceOfIncome ? 'border border-red-500' : ''}`}
                        ref={firstErrorField === 'sourceOfIncome' ? errorFieldRef : null}>
                        <h3 className="text-lg font-semibold mb-3">Source of Income</h3>
                        <div className="mb-3 font-medium">
                            Selected: {formData.sourceOfIncome.length > 0 
                                ? formData.sourceOfIncome.join(', ') 
                                : 'None'}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {['Self-Employed/Business', 'Employed', 'Allotment'].map((source) => (
                                <button
                                    key={source}
                                    type="button"
                                    onClick={() => handleCheckboxChange({
                                        target: {
                                            name: 'sourceOfIncome',
                                            value: source,
                                            checked: !formData.sourceOfIncome.includes(source)
                                        }
                                    } as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.sourceOfIncome.includes(source) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {source}
                                </button>
                            ))}
                        </div>
                        {/* Hidden checkboxes for form submission */}
                        <div className="hidden">
                            {['Self-Employed/Business', 'Employed', 'Allotment'].map((source) => (
                                <input
                                    key={source}
                                    type="checkbox"
                                    name="sourceOfIncome"
                                    value={source}
                                    checked={formData.sourceOfIncome.includes(source)}
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </div>
                        {errors.sourceOfIncome && (
                            <p className="text-red-500 text-xs mt-2">{errors.sourceOfIncome}</p>
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
                                Back to Personal & Family Profile
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

export default ParentalCreditInformation; 