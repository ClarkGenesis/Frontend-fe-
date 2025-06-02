import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";


interface Props {
    formData: {
        personalFirstName: string;
        personalMiddleName: string;
        personalLastName: string;
        personalAge: string;
        personalNBRB: string;
        personalSex: string;
        personalCitizenship: string;
        personalBirthDate: string;
        personalReligion: string;
        personalCivilStatus: string;
        personalTIN: string;
        personalResCertNo: string;
        personalDateIssued: string;
        personalPlaceIssued: string;
        // Present Address
        presentBlockStreet: string;
        presentZonePurok: string;
        presentBarangay: string;
        presentMunicipalityCity: string;
        presentProvince: string;
        presentLengthOfStay: string;
        presentHouseOwnership: string;
        presentLotOwnership: string;
        presentOtherProperties: string[];
        // Provincial Address
        provincialBlockStreet: string;
        provincialZonePurok: string;
        provincialBarangay: string;
        provincialMunicipalityCity: string;
        provincialProvince: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    goToNextStep: () => void;
}

// Create an interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const PersonalAddressInfo: React.FC<Props> = ({ formData, handleChange, handleCheckboxChange, goToNextStep }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const errorFieldRef = useRef<HTMLDivElement>(null);

    // Revalidate fields when values change to clear errors
    useEffect(() => {
        // Create a new errors object based on current state
        const newErrors = { ...errors };

        // Check each field and remove errors for filled fields
        if (formData.personalFirstName.trim()) delete newErrors.personalFirstName;
        if (formData.personalMiddleName.trim()) delete newErrors.personalMiddleName;
        if (formData.personalLastName.trim()) delete newErrors.personalLastName;
        if (formData.personalAge.trim()) delete newErrors.personalAge;
        if (formData.personalNBRB.trim()) delete newErrors.personalNBRB;
        if (formData.personalSex) delete newErrors.personalSex;
        if (formData.personalCitizenship.trim()) delete newErrors.personalCitizenship;
        if (formData.personalBirthDate) delete newErrors.personalBirthDate;
        if (formData.personalReligion.trim()) delete newErrors.personalReligion;
        if (formData.personalCivilStatus) delete newErrors.personalCivilStatus;
        if (formData.personalTIN.trim()) delete newErrors.personalTIN;
        if (formData.personalResCertNo.trim()) delete newErrors.personalResCertNo;
        if (formData.personalDateIssued.trim()) delete newErrors.personalDateIssued;
        if (formData.personalPlaceIssued.trim()) delete newErrors.personalPlaceIssued;

        // Present Address
        if (formData.presentBlockStreet.trim()) delete newErrors.presentBlockStreet;
        if (formData.presentZonePurok.trim()) delete newErrors.presentZonePurok;
        if (formData.presentBarangay.trim()) delete newErrors.presentBarangay;
        if (formData.presentMunicipalityCity.trim()) delete newErrors.presentMunicipalityCity;
        if (formData.presentProvince.trim()) delete newErrors.presentProvince;
        if (formData.presentLengthOfStay.trim()) delete newErrors.presentLengthOfStay;
        if (formData.presentHouseOwnership) delete newErrors.presentHouseOwnership;
        if (formData.presentLotOwnership) delete newErrors.presentLotOwnership;

        // Provincial Address
        if (formData.provincialBlockStreet.trim()) delete newErrors.provincialBlockStreet;
        if (formData.provincialZonePurok.trim()) delete newErrors.provincialZonePurok;
        if (formData.provincialBarangay.trim()) delete newErrors.provincialBarangay;
        if (formData.provincialMunicipalityCity.trim()) delete newErrors.provincialMunicipalityCity;
        if (formData.provincialProvince.trim()) delete newErrors.provincialProvince;
        
        // Update errors state if changes were made
        if (Object.keys(newErrors).length !== Object.keys(errors).length) {
            setErrors(newErrors);
        }
    }, [errors, formData]);

    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        
        // Personal Information validation
        if (!formData.personalFirstName.trim()) newErrors.personalFirstName = "First Name is required";
        if (!formData.personalMiddleName.trim()) newErrors.personalMiddleName = "Middle Name is required";
        if (!formData.personalLastName.trim()) newErrors.personalLastName = "Last Name is required";
        if (!formData.personalAge.trim()) newErrors.personalAge = "Age is required";
        if (!formData.personalNBRB.trim()) newErrors.personalNBRB = "NB or RB is required";
        if (!formData.personalSex) newErrors.personalSex = "Sex is required";
        if (!formData.personalCitizenship.trim()) newErrors.personalCitizenship = "Citizenship is required";
        if (!formData.personalBirthDate) newErrors.personalBirthDate = "Birth Date is required";
        if (!formData.personalReligion.trim()) newErrors.personalReligion = "Religion is required";
        if (!formData.personalCivilStatus) newErrors.personalCivilStatus = "Civil Status is required";
        if (!formData.personalTIN.trim()) newErrors.personalTIN = "TIN No. is required";
        if (!formData.personalResCertNo.trim()) newErrors.personalResCertNo = "Res. Cert. No. is required";
        if (!formData.personalDateIssued.trim()) newErrors.personalDateIssued = "Date Issued is required";
        if (!formData.personalPlaceIssued.trim()) newErrors.personalPlaceIssued = "Place Issued is required";
        
        // Present Address validation
        if (!formData.presentBlockStreet.trim()) newErrors.presentBlockStreet = "Block/Street is required";
        if (!formData.presentZonePurok.trim()) newErrors.presentZonePurok = "Zone/Purok is required";
        if (!formData.presentBarangay.trim()) newErrors.presentBarangay = "Barangay is required";
        if (!formData.presentMunicipalityCity.trim()) newErrors.presentMunicipalityCity = "Municipality/City is required";
        if (!formData.presentProvince.trim()) newErrors.presentProvince = "Province is required";
        if (!formData.presentLengthOfStay.trim()) newErrors.presentLengthOfStay = "Length of Stay is required";
        if (!formData.presentHouseOwnership) newErrors.presentHouseOwnership = "House ownership selection is required";
        if (!formData.presentLotOwnership) newErrors.presentLotOwnership = "Lot ownership selection is required";
        
        // Provincial Address validation
        if (!formData.provincialBlockStreet.trim()) newErrors.provincialBlockStreet = "Block/Street is required";
        if (!formData.provincialZonePurok.trim()) newErrors.provincialZonePurok = "Zone/Purok is required";
        if (!formData.provincialBarangay.trim()) newErrors.provincialBarangay = "Barangay is required";
        if (!formData.provincialMunicipalityCity.trim()) newErrors.provincialMunicipalityCity = "Municipality/City is required";
        if (!formData.provincialProvince.trim()) newErrors.provincialProvince = "Province is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        const isValid = validateForm();
        if (isValid) {
            goToNextStep();
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

    // Function to determine input class based on error state
    const getFieldClass = (fieldName: string) => {
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
                                    step === 1 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 1 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />

                    <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div ref={firstErrorField === 'personalFirstName' ? errorFieldRef : null}>
                            <label className="block mb-2">First Name</label>
                            <input
                                type="text"
                                name="personalFirstName"
                                value={formData.personalFirstName}
                                onChange={handleChange}
                                className={getFieldClass('personalFirstName')}
                                placeholder="Enter first name"
                            />
                            {errors.personalFirstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalFirstName}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalMiddleName' ? errorFieldRef : null}>
                            <label className="block mb-2">Middle Name</label>
                            <input
                                type="text"
                                name="personalMiddleName"
                                value={formData.personalMiddleName}
                                onChange={handleChange}
                                className={getFieldClass('personalMiddleName')}
                                placeholder="Enter middle name"
                            />
                            {errors.personalMiddleName && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalMiddleName}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalLastName' ? errorFieldRef : null}>
                            <label className="block mb-2">Last Name</label>
                            <input
                                type="text"
                                name="personalLastName"
                                value={formData.personalLastName}
                                onChange={handleChange}
                                className={getFieldClass('personalLastName')}
                                placeholder="Enter last name"
                            />
                            {errors.personalLastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalLastName}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalAge' ? errorFieldRef : null}>
                            <label className="block mb-2">Age</label>
                            <input
                                type="number"
                                name="personalAge"
                                value={formData.personalAge}
                                onChange={handleChange}
                                className={getFieldClass('personalAge')}
                                placeholder="Enter age"
                            />
                            {errors.personalAge && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalAge}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalNBRB' ? errorFieldRef : null}>
                            <label className="block mb-2">NB or RB</label>
                            <input
                                type="text"
                                name="personalNBRB"
                                value={formData.personalNBRB}
                                onChange={handleChange}
                                className={getFieldClass('personalNBRB')}
                                placeholder="Enter NB or RB"
                            />
                            {errors.personalNBRB && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalNBRB}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalSex' ? errorFieldRef : null}>
                            <label className="block mb-2">Sex</label>
                            <select
                                name="personalSex"
                                value={formData.personalSex}
                                onChange={handleChange}
                                className={getFieldClass('personalSex')}
                            >
                                <option value="">Select sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.personalSex && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalSex}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalCitizenship' ? errorFieldRef : null}>
                            <label className="block mb-2">Citizenship</label>
                            <input
                                type="text"
                                name="personalCitizenship"
                                value={formData.personalCitizenship}
                                onChange={handleChange}
                                className={getFieldClass('personalCitizenship')}
                                placeholder="Enter citizenship"
                            />
                            {errors.personalCitizenship && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalCitizenship}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalBirthDate' ? errorFieldRef : null}>
                            <label className="block mb-2">Birth Date</label>
                            <input
                                type="date"
                                name="personalBirthDate"
                                value={formData.personalBirthDate}
                                onChange={handleChange}
                                className={getFieldClass('personalBirthDate')}
                                placeholder="Enter birth date"
                            />
                            {errors.personalBirthDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalBirthDate}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalReligion' ? errorFieldRef : null}>
                            <label className="block mb-2">Religion</label>
                            <input
                                type="text"
                                name="personalReligion"
                                value={formData.personalReligion}
                                onChange={handleChange}
                                className={getFieldClass('personalReligion')}
                                placeholder="Enter religion"
                            />
                            {errors.personalReligion && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalReligion}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalCivilStatus' ? errorFieldRef : null}>
                            <label className="block mb-2">Civil Status</label>
                            <select
                                name="personalCivilStatus"
                                value={formData.personalCivilStatus}
                                onChange={handleChange}
                                className={getFieldClass('personalCivilStatus')}
                            >
                                <option value="">Select civil status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Separated">Separated</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                            {errors.personalCivilStatus && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalCivilStatus}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalTIN' ? errorFieldRef : null}>
                            <label className="block mb-2">TIN No.</label>
                            <input
                                type="text"
                                name="personalTIN"
                                value={formData.personalTIN}
                                onChange={handleChange}
                                className={getFieldClass('personalTIN')}
                                placeholder="Enter TIN number"
                            />
                            {errors.personalTIN && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalTIN}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalResCertNo' ? errorFieldRef : null}>
                            <label className="block mb-2">Res. Cert. No.</label>
                            <input
                                type="text"
                                name="personalResCertNo"
                                value={formData.personalResCertNo}
                                onChange={handleChange}
                                className={getFieldClass('personalResCertNo')}
                                placeholder="Enter residence certificate number"
                            />
                            {errors.personalResCertNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalResCertNo}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalDateIssued' ? errorFieldRef : null}>
                            <label className="block mb-2">Date Issued</label>
                            <input
                                type="date"
                                name="personalDateIssued"
                                value={formData.personalDateIssued}
                                onChange={handleChange}
                                className={getFieldClass('personalDateIssued')}
                                placeholder="Enter date issued"
                            />
                            {errors.personalDateIssued && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalDateIssued}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'personalPlaceIssued' ? errorFieldRef : null}>
                            <label className="block mb-2">Place Issued</label>
                            <input
                                type="text"
                                name="personalPlaceIssued"
                                value={formData.personalPlaceIssued}
                                onChange={handleChange}
                                className={getFieldClass('personalPlaceIssued')}
                                placeholder="Enter place issued"
                            />
                            {errors.personalPlaceIssued && (
                                <p className="text-red-500 text-xs mt-1">{errors.personalPlaceIssued}</p>
                            )}
                        </div>
                        
                        {/* Present Address */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-4">
                            <h2 className="text-xl font-semibold mb-4 mt-4">Present Address</h2>
                        </div>

                        <div ref={firstErrorField === 'presentBlockStreet' ? errorFieldRef : null}>
                            <label className="block mb-2">Block/Street</label>
                            <input
                                type="text"
                                name="presentBlockStreet"
                                value={formData.presentBlockStreet}
                                onChange={handleChange}
                                className={getFieldClass('presentBlockStreet')}
                                placeholder="Enter block/street"
                            />
                            {errors.presentBlockStreet && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentBlockStreet}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'presentZonePurok' ? errorFieldRef : null}>
                            <label className="block mb-2">Zone/Purok</label>
                            <input
                                type="text"
                                name="presentZonePurok"
                                value={formData.presentZonePurok}
                                onChange={handleChange}
                                className={getFieldClass('presentZonePurok')}
                                placeholder="Enter zone/purok"
                            />
                            {errors.presentZonePurok && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentZonePurok}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'presentBarangay' ? errorFieldRef : null}>
                            <label className="block mb-2">Barangay</label>
                            <input
                                type="text"
                                name="presentBarangay"
                                value={formData.presentBarangay}
                                onChange={handleChange}
                                className={getFieldClass('presentBarangay')}
                                placeholder="Enter barangay"
                            />
                            {errors.presentBarangay && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentBarangay}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'presentMunicipalityCity' ? errorFieldRef : null}>
                            <label className="block mb-2">Municipality/City</label>
                            <input
                                type="text"
                                name="presentMunicipalityCity"
                                value={formData.presentMunicipalityCity}
                                onChange={handleChange}
                                className={getFieldClass('presentMunicipalityCity')}
                                placeholder="Enter municipality/city"
                            />
                            {errors.presentMunicipalityCity && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentMunicipalityCity}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'presentProvince' ? errorFieldRef : null}>
                            <label className="block mb-2">Province</label>
                            <input
                                type="text"
                                name="presentProvince"
                                value={formData.presentProvince}
                                onChange={handleChange}
                                className={getFieldClass('presentProvince')}
                                placeholder="Enter province"
                            />
                            {errors.presentProvince && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentProvince}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'presentLengthOfStay' ? errorFieldRef : null}>
                            <label className="block mb-2">Length of Stay</label>
                            <input
                                type="text"
                                name="presentLengthOfStay"
                                value={formData.presentLengthOfStay}
                                onChange={handleChange}
                                className={getFieldClass('presentLengthOfStay')}
                                placeholder="Enter length of stay"
                            />
                            {errors.presentLengthOfStay && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentLengthOfStay}</p>
                            )}
                        </div>

                        {/* House Ownership - Updated styling */}
                        <div className={`col-span-1 sm:col-span-2 md:col-span-4 bg-gray-100 p-4 rounded-lg mb-4 ${errors.presentHouseOwnership ? 'border border-red-500' : ''}`}
                            ref={firstErrorField === 'presentHouseOwnership' ? errorFieldRef : null}>
                            <h3 className="text-lg font-semibold mb-3">House</h3>
                            <div className="mb-3 font-medium">
                                Selected: {formData.presentHouseOwnership || 'None'}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentHouseOwnership', value: 'Owned'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentHouseOwnership === 'Owned' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Owned
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentHouseOwnership', value: 'Rented'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentHouseOwnership === 'Rented' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Rented
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentHouseOwnership', value: 'Mortgaged'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentHouseOwnership === 'Mortgaged' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Mortgaged
                                </button>
                            </div>
                            {/* Hidden radio buttons for form submission */}
                            <div className="hidden">
                                <input
                                    type="radio"
                                    name="presentHouseOwnership"
                                    value="Owned"
                                    checked={formData.presentHouseOwnership === "Owned"}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="presentHouseOwnership"
                                    value="Rented"
                                    checked={formData.presentHouseOwnership === "Rented"}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="presentHouseOwnership"
                                    value="Mortgaged"
                                    checked={formData.presentHouseOwnership === "Mortgaged"}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.presentHouseOwnership && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentHouseOwnership}</p>
                            )}
                        </div>

                        {/* Lot Ownership - Updated styling */}
                        <div className={`col-span-1 sm:col-span-2 md:col-span-4 bg-gray-100 p-4 rounded-lg mb-4 ${errors.presentLotOwnership ? 'border border-red-500' : ''}`}
                            ref={firstErrorField === 'presentLotOwnership' ? errorFieldRef : null}>
                            <h3 className="text-lg font-semibold mb-3">Lot</h3>
                            <div className="mb-3 font-medium">
                                Selected: {formData.presentLotOwnership || 'None'}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentLotOwnership', value: 'Owned'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentLotOwnership === 'Owned' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Owned
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentLotOwnership', value: 'Rented'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentLotOwnership === 'Rented' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Rented
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleChange({target: {name: 'presentLotOwnership', value: 'Mortgaged'}} as React.ChangeEvent<HTMLInputElement>)}
                                    className={`px-3 py-1 rounded text-sm ${formData.presentLotOwnership === 'Mortgaged' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Mortgaged
                                </button>
                            </div>
                            {/* Hidden radio buttons for form submission */}
                            <div className="hidden">
                                <input
                                    type="radio"
                                    name="presentLotOwnership"
                                    value="Owned"
                                    checked={formData.presentLotOwnership === "Owned"}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="presentLotOwnership"
                                    value="Rented"
                                    checked={formData.presentLotOwnership === "Rented"}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="presentLotOwnership"
                                    value="Mortgaged"
                                    checked={formData.presentLotOwnership === "Mortgaged"}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.presentLotOwnership && (
                                <p className="text-red-500 text-xs mt-1">{errors.presentLotOwnership}</p>
                            )}
                        </div>

                        {/* Other Properties - Updated styling */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-4 bg-gray-100 p-4 rounded-lg mb-4">
                            <h3 className="text-lg font-semibold mb-3">Other Properties</h3>
                            <div className="mb-3 font-medium">
                                Selected: {formData.presentOtherProperties.length > 0 
                                    ? formData.presentOtherProperties.join(', ') 
                                    : 'None'}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["TV", "Ref", "Stereo/Component", "Gas Range", "Motorcycle", "Computers"].map((prop) => (
                                    <button
                                        key={prop}
                                        type="button"
                                        onClick={() => handleCheckboxChange({
                                            target: {
                                                name: 'presentOtherProperties',
                                                value: prop,
                                                checked: !formData.presentOtherProperties.includes(prop)
                                            }
                                        } as React.ChangeEvent<HTMLInputElement>)}
                                        className={`px-3 py-1 rounded text-sm ${formData.presentOtherProperties.includes(prop) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    >
                                        {prop}
                                    </button>
                                ))}
                            </div>
                            {/* Hidden checkboxes for form submission */}
                            <div className="hidden">
                                {["TV", "Ref", "Stereo/Component", "Gas Range", "Motorcycle", "Computers"].map((prop) => (
                                    <input
                                        key={prop}
                                        type="checkbox"
                                        name="presentOtherProperties"
                                        value={prop}
                                        checked={formData.presentOtherProperties.includes(prop)}
                                        onChange={handleCheckboxChange}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Provincial Address */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-4">
                            <h2 className="text-xl font-semibold mb-4 mt-4">Provincial Address</h2>
                        </div>

                        <div ref={firstErrorField === 'provincialBlockStreet' ? errorFieldRef : null}>
                            <label className="block mb-2">Block/Street</label>
                            <input
                                type="text"
                                name="provincialBlockStreet"
                                value={formData.provincialBlockStreet}
                                onChange={handleChange}
                                className={getFieldClass('provincialBlockStreet')}
                                placeholder="Enter block/street"
                            />
                            {errors.provincialBlockStreet && (
                                <p className="text-red-500 text-xs mt-1">{errors.provincialBlockStreet}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'provincialZonePurok' ? errorFieldRef : null}>
                            <label className="block mb-2">Zone/Purok</label>
                            <input
                                type="text"
                                name="provincialZonePurok"
                                value={formData.provincialZonePurok}
                                onChange={handleChange}
                                className={getFieldClass('provincialZonePurok')}
                                placeholder="Enter zone/purok"
                            />
                            {errors.provincialZonePurok && (
                                <p className="text-red-500 text-xs mt-1">{errors.provincialZonePurok}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'provincialBarangay' ? errorFieldRef : null}>
                            <label className="block mb-2">Barangay</label>
                            <input
                                type="text"
                                name="provincialBarangay"
                                value={formData.provincialBarangay}
                                onChange={handleChange}
                                className={getFieldClass('provincialBarangay')}
                                placeholder="Enter barangay"
                            />
                            {errors.provincialBarangay && (
                                <p className="text-red-500 text-xs mt-1">{errors.provincialBarangay}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'provincialMunicipalityCity' ? errorFieldRef : null}>
                            <label className="block mb-2">Municipality/City</label>
                            <input
                                type="text"
                                name="provincialMunicipalityCity"
                                value={formData.provincialMunicipalityCity}
                                onChange={handleChange}
                                className={getFieldClass('provincialMunicipalityCity')}
                                placeholder="Enter municipality/city"
                            />
                            {errors.provincialMunicipalityCity && (
                                <p className="text-red-500 text-xs mt-1">{errors.provincialMunicipalityCity}</p>
                            )}
                        </div>

                        <div ref={firstErrorField === 'provincialProvince' ? errorFieldRef : null}>
                            <label className="block mb-2">Province</label>
                            <input
                                type="text"
                                name="provincialProvince"
                                value={formData.provincialProvince}
                                onChange={handleChange}
                                className={getFieldClass('provincialProvince')}
                                placeholder="Enter province"
                            />
                            {errors.provincialProvince && (
                                <p className="text-red-500 text-xs mt-1">{errors.provincialProvince}</p>
                            )}
                        </div>

                        <div className="col-span-1 sm:col-span-2 md:col-span-4 mt-4">
                            {Object.keys(errors).length > 0 && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    Please fill out all required fields before proceeding.
                                </div>
                            )}
                            <div className="mt-6 flex justify-end">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        handleNextStep();
                                        window.scrollTo({ top: 0 });
                                    }}
                                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg flex items-center gap-2"
                                >
                                    Save & Next
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalAddressInfo; 