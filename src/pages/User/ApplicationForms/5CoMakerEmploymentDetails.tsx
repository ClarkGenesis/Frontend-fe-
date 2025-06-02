import React, { useEffect, useState, useRef } from 'react';
import Header from "../../../layouts/UserLayouts/UserHeader";
import Breadcrumb from "../../../components/UserBreadcrums";

interface CoMaker {
    id: string;
    firstName: string;
    age: string;
    sex: string;
    // Present Address
    blockStreet: string;
    zonePurok: string;
    barangay: string;
    municipalityCity: string;
    province: string;
    lengthOfStay: string;
    // Maker Information Address
    makerBlockStreet: string;
    makerZonePurok: string;
    makerBarangay: string;
    makerMunicipalityCity: string;
    makerProvince: string;
    // Other Fields
    residence: string;
    civilStatus: string;
    // Additional Information
    relationshipWithApplicant: string;
    birthday: string;
    tin: string;
    mobileNo: string;
    presentEmployer: string;
    dateHired: string;
    position: string;
    grossIncome: string;
    employerAddress: string;
    employmentStatus: string;
    // Credit References
    creditReferences: string;
}

interface Props {
    formData: {
        coMakers: CoMaker[];
    };
    handleCoMakerChange: (id: string, field: keyof CoMaker, value: string) => void;
    addCoMaker: () => void;
    removeCoMaker: (id: string) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Interface for validation errors for a single CoMaker
interface CoMakerValidationErrors {
    [key: string]: string | undefined;
}

// Interface for validation errors for all CoMakers (array of CoMakerValidationErrors)
type AllCoMakerValidationErrors = CoMakerValidationErrors[];


const CoMakerEmploymentDetails: React.FC<Props> = ({
    formData,
    handleCoMakerChange,
    addCoMaker,
    removeCoMaker,
    goToNextStep,
    goToPreviousStep
}) => {
    const [errors, setErrors] = useState<AllCoMakerValidationErrors>([]);
    const errorFieldRef = useRef<HTMLDivElement>(null);

    // Ensure there's always at least one Co-Maker displayed
    useEffect(() => {
        if (formData.coMakers.length === 0) {
            addCoMaker();
        }
    }, [formData.coMakers, addCoMaker]);


    // Clear errors when fields are filled
    useEffect(() => {
        const newErrors: AllCoMakerValidationErrors = formData.coMakers.map((coMaker, index) => {
            const coMakerErrors: CoMakerValidationErrors = errors[index] || {};
            const updatedCoMakerErrors: CoMakerValidationErrors = { ...coMakerErrors };

            if (coMaker.firstName.trim()) delete updatedCoMakerErrors.firstName;
            if (coMaker.age.trim()) delete updatedCoMakerErrors.age;
            if (coMaker.sex.trim()) delete updatedCoMakerErrors.sex;
            if (coMaker.blockStreet.trim()) delete updatedCoMakerErrors.blockStreet;
            if (coMaker.zonePurok.trim()) delete updatedCoMakerErrors.zonePurok;
            if (coMaker.barangay.trim()) delete updatedCoMakerErrors.barangay;
            if (coMaker.municipalityCity.trim()) delete updatedCoMakerErrors.municipalityCity;
            if (coMaker.province.trim()) delete updatedCoMakerErrors.province;
            if (coMaker.lengthOfStay.trim()) delete updatedCoMakerErrors.lengthOfStay;
            if (coMaker.makerBlockStreet.trim()) delete updatedCoMakerErrors.makerBlockStreet;
            if (coMaker.makerZonePurok.trim()) delete updatedCoMakerErrors.makerZonePurok;
            if (coMaker.makerBarangay.trim()) delete updatedCoMakerErrors.makerBarangay;
            if (coMaker.makerMunicipalityCity.trim()) delete updatedCoMakerErrors.makerMunicipalityCity;
            if (coMaker.makerProvince.trim()) delete updatedCoMakerErrors.makerProvince;
            if (coMaker.residence.trim()) delete updatedCoMakerErrors.residence;
            if (coMaker.civilStatus.trim()) delete updatedCoMakerErrors.civilStatus;
            if (coMaker.relationshipWithApplicant.trim()) delete updatedCoMakerErrors.relationshipWithApplicant;
            if (coMaker.birthday.trim()) delete updatedCoMakerErrors.birthday;
            if (coMaker.tin.trim()) delete updatedCoMakerErrors.tin;
            if (coMaker.mobileNo.trim()) delete updatedCoMakerErrors.mobileNo;
            if (coMaker.presentEmployer.trim()) delete updatedCoMakerErrors.presentEmployer;
            if (coMaker.dateHired.trim()) delete updatedCoMakerErrors.dateHired;
            if (coMaker.position.trim()) delete updatedCoMakerErrors.position;
            if (coMaker.grossIncome.trim()) delete updatedCoMakerErrors.grossIncome;
            if (coMaker.employerAddress.trim()) delete updatedCoMakerErrors.employerAddress;
            if (coMaker.employmentStatus.trim()) delete updatedCoMakerErrors.employmentStatus;
            if (coMaker.creditReferences.trim()) delete updatedCoMakerErrors.creditReferences;
            
            return updatedCoMakerErrors;
        });

        // Only update if there's a change to prevent infinite loops
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }
    }, [formData.coMakers, errors]);


    const validateForm = () => {
        const newAllErrors: AllCoMakerValidationErrors = [];
        let firstErrorFieldIndex: { coMakerIndex: number; fieldName: string } | null = null;

        formData.coMakers.forEach((coMaker, index) => {
            const coMakerErrors: CoMakerValidationErrors = {};
            if (!coMaker.firstName.trim()) {
                coMakerErrors.firstName = "First Name is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'firstName' };
            }
            if (!coMaker.age.trim()) {
                coMakerErrors.age = "Age is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'age' };
            }
            if (!coMaker.sex.trim()) {
                coMakerErrors.sex = "Sex is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'sex' };
            }
            // Present Address
            if (!coMaker.blockStreet.trim()) {
                coMakerErrors.blockStreet = "Block/Street is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'blockStreet' };
            }
            if (!coMaker.zonePurok.trim()) {
                coMakerErrors.zonePurok = "Zone/Purok is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'zonePurok' };
            }
            if (!coMaker.barangay.trim()) {
                coMakerErrors.barangay = "Barangay is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'barangay' };
            }
            if (!coMaker.municipalityCity.trim()) {
                coMakerErrors.municipalityCity = "Municipality/City is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'municipalityCity' };
            }
            if (!coMaker.province.trim()) {
                coMakerErrors.province = "Province is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'province' };
            }
            if (!coMaker.lengthOfStay.trim()) {
                coMakerErrors.lengthOfStay = "Length of Stay is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'lengthOfStay' };
            }
            // Maker Information Address
            if (!coMaker.makerBlockStreet.trim()) {
                coMakerErrors.makerBlockStreet = "Block/Street is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'makerBlockStreet' };
            }
            if (!coMaker.makerZonePurok.trim()) {
                coMakerErrors.makerZonePurok = "Zone/Purok is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'makerZonePurok' };
            }
            if (!coMaker.makerBarangay.trim()) {
                coMakerErrors.makerBarangay = "Barangay is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'makerBarangay' };
            }
            if (!coMaker.makerMunicipalityCity.trim()) {
                coMakerErrors.makerMunicipalityCity = "Municipality/City is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'makerMunicipalityCity' };
            }
            if (!coMaker.makerProvince.trim()) {
                coMakerErrors.makerProvince = "Province is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'makerProvince' };
            }
            // Other Information
            if (!coMaker.residence.trim()) {
                coMakerErrors.residence = "Residence is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'residence' };
            }
            if (!coMaker.civilStatus.trim()) {
                coMakerErrors.civilStatus = "Civil Status is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'civilStatus' };
            }
            if (!coMaker.relationshipWithApplicant.trim()) {
                coMakerErrors.relationshipWithApplicant = "Relationship with Applicant is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'relationshipWithApplicant' };
            }
            if (!coMaker.birthday.trim()) {
                coMakerErrors.birthday = "Birthday is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'birthday' };
            }
            if (!coMaker.tin.trim()) {
                coMakerErrors.tin = "TIN is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'tin' };
            }
            if (!coMaker.mobileNo.trim()) {
                coMakerErrors.mobileNo = "Mobile No. is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'mobileNo' };
            }
            // Employment Information
            if (!coMaker.presentEmployer.trim()) {
                coMakerErrors.presentEmployer = "Present Employer is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'presentEmployer' };
            }
            if (!coMaker.dateHired.trim()) {
                coMakerErrors.dateHired = "Date Hired is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'dateHired' };
            }
            if (!coMaker.position.trim()) {
                coMakerErrors.position = "Position is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'position' };
            }
            if (!coMaker.grossIncome.trim()) {
                coMakerErrors.grossIncome = "Gross Income is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'grossIncome' };
            }
            if (!coMaker.employerAddress.trim()) {
                coMakerErrors.employerAddress = "Employer Address is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'employerAddress' };
            }
            if (!coMaker.employmentStatus.trim()) {
                coMakerErrors.employmentStatus = "Employment Status is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'employmentStatus' };
            }
            // Credit References
            if (!coMaker.creditReferences.trim()) {
                coMakerErrors.creditReferences = "Installment/Banking Institutions is required";
                if (!firstErrorFieldIndex) firstErrorFieldIndex = { coMakerIndex: index, fieldName: 'creditReferences' };
            }
            newAllErrors.push(coMakerErrors);
        });

        setErrors(newAllErrors);
        const isValid = newAllErrors.every(coMakerErrors => Object.keys(coMakerErrors).length === 0);

        if (!isValid && firstErrorFieldIndex && errorFieldRef.current) {
            // This scrolling logic might need refinement for multiple co-makers
            // For simplicity, scrolling to the top of the form for now if there's any error
             const firstErrorElement = document.querySelector(`[data-co-maker-index="${(firstErrorFieldIndex as { coMakerIndex: number; fieldName: string }).coMakerIndex}"] [data-field-name="${(firstErrorFieldIndex as { coMakerIndex: number; fieldName: string }).fieldName}"]`);
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (errorFieldRef.current){ // Fallback to form top
                 errorFieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return isValid;
    };

    const handleNextStepClick = () => {
        if (validateForm()) {
            goToNextStep();
        }
    };

    const getFieldClass = (coMakerIndex: number, fieldName: keyof CoMaker): string => {
        return `w-full p-2 border rounded ${errors[coMakerIndex]?.[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
    };
    

    return (
        <>
            <Header />
            <Breadcrumb title="Credit Application Form" active="Credit Application Form" />
            <div className="max-w-4xl mx-auto p-6" ref={errorFieldRef}>
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
                                    step === 5 ? "bg-green-500 text-white" : "border border-black text-black"
                                }`}>
                                    {step}
                                </div>
                                <p className={`text-center text-black text-xs mt-1 px-2 py-1 rounded-lg shadow-sm ${
                                    step === 5 ? "bg-green-500 text-white" : "bg-gray-300"
                                }`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />
                    <div className="space-y-4">
                        {formData.coMakers.map((coMaker, index) => (
                            <div key={coMaker.id} className="border p-4 rounded relative" data-co-maker-index={index}>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-medium">Co-Maker #{index + 1}</h3>
                                    {formData.coMakers.length > 1 && ( // Only show remove if more than one co-maker
                                        <button
                                            type="button"
                                            onClick={() => removeCoMaker(coMaker.id)}
                                            className="text-red-500 hover:text-red-700 bg-white border border-red-500 px-2 py-1 rounded text-sm"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                
                                {/* Co-Maker Information */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Co-Maker Information</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div data-field-name="firstName">
                                            <label className="block mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={coMaker.firstName}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'firstName', e.target.value)}
                                                className={getFieldClass(index, 'firstName')}
                                                placeholder="Enter first name"
                                            />
                                            {errors[index]?.firstName && <p className="text-red-500 text-xs mt-1">{errors[index]?.firstName}</p>}
                                        </div>
                                        <div data-field-name="age">
                                            <label className="block mb-2">Age</label>
                                            <input
                                                type="number"
                                                value={coMaker.age}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'age', e.target.value)}
                                                className={getFieldClass(index, 'age')}
                                                placeholder="Enter age"
                                            />
                                            {errors[index]?.age && <p className="text-red-500 text-xs mt-1">{errors[index]?.age}</p>}
                                        </div>
                                        <div data-field-name="sex">
                                            <label className="block mb-2">Sex</label>
                                            <select
                                                value={coMaker.sex}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'sex', e.target.value)}
                                                className={getFieldClass(index, 'sex')}
                                            >
                                                <option value="">Select sex</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            {errors[index]?.sex && <p className="text-red-500 text-xs mt-1">{errors[index]?.sex}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Present Address */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Present Address</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div data-field-name="blockStreet">
                                            <label className="block mb-2">Block/Street</label>
                                            <input
                                                type="text"
                                                value={coMaker.blockStreet}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'blockStreet', e.target.value)}
                                                className={getFieldClass(index, 'blockStreet')}
                                                placeholder="Enter block/street"
                                            />
                                            {errors[index]?.blockStreet && <p className="text-red-500 text-xs mt-1">{errors[index]?.blockStreet}</p>}
                                        </div>
                                        <div data-field-name="zonePurok">
                                            <label className="block mb-2">Zone/Purok</label>
                                            <input
                                                type="text"
                                                value={coMaker.zonePurok}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'zonePurok', e.target.value)}
                                                className={getFieldClass(index, 'zonePurok')}
                                                placeholder="Enter zone/purok"
                                            />
                                            {errors[index]?.zonePurok && <p className="text-red-500 text-xs mt-1">{errors[index]?.zonePurok}</p>}
                                        </div>
                                        <div data-field-name="barangay">
                                            <label className="block mb-2">Barangay</label>
                                            <input
                                                type="text"
                                                value={coMaker.barangay}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'barangay', e.target.value)}
                                                className={getFieldClass(index, 'barangay')}
                                                placeholder="Enter barangay"
                                            />
                                            {errors[index]?.barangay && <p className="text-red-500 text-xs mt-1">{errors[index]?.barangay}</p>}
                                        </div>
                                        <div data-field-name="municipalityCity">
                                            <label className="block mb-2">Municipality/City</label>
                                            <input
                                                type="text"
                                                value={coMaker.municipalityCity}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'municipalityCity', e.target.value)}
                                                className={getFieldClass(index, 'municipalityCity')}
                                                placeholder="Enter municipality/city"
                                            />
                                            {errors[index]?.municipalityCity && <p className="text-red-500 text-xs mt-1">{errors[index]?.municipalityCity}</p>}
                                        </div>
                                        <div data-field-name="province">
                                            <label className="block mb-2">Province</label>
                                            <input
                                                type="text"
                                                value={coMaker.province}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'province', e.target.value)}
                                                className={getFieldClass(index, 'province')}
                                                placeholder="Enter province"
                                            />
                                            {errors[index]?.province && <p className="text-red-500 text-xs mt-1">{errors[index]?.province}</p>}
                                        </div>
                                        <div data-field-name="lengthOfStay">
                                            <label className="block mb-2">Length of Stay</label>
                                            <input
                                                type="text"
                                                value={coMaker.lengthOfStay}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'lengthOfStay', e.target.value)}
                                                className={getFieldClass(index, 'lengthOfStay')}
                                                placeholder="Enter length of stay"
                                            />
                                            {errors[index]?.lengthOfStay && <p className="text-red-500 text-xs mt-1">{errors[index]?.lengthOfStay}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Maker Information Address */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Information Address</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div data-field-name="makerBlockStreet">
                                            <label className="block mb-2">Block/Street</label>
                                            <input
                                                type="text"
                                                value={coMaker.makerBlockStreet}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'makerBlockStreet', e.target.value)}
                                                className={getFieldClass(index, 'makerBlockStreet')}
                                                placeholder="Enter block/street"
                                            />
                                            {errors[index]?.makerBlockStreet && <p className="text-red-500 text-xs mt-1">{errors[index]?.makerBlockStreet}</p>}
                                        </div>
                                        <div data-field-name="makerZonePurok">
                                            <label className="block mb-2">Zone/Purok</label>
                                            <input
                                                type="text"
                                                value={coMaker.makerZonePurok}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'makerZonePurok', e.target.value)}
                                                className={getFieldClass(index, 'makerZonePurok')}
                                                placeholder="Enter zone/purok"
                                            />
                                            {errors[index]?.makerZonePurok && <p className="text-red-500 text-xs mt-1">{errors[index]?.makerZonePurok}</p>}
                                        </div>
                                        <div data-field-name="makerBarangay">
                                            <label className="block mb-2">Barangay</label>
                                            <input
                                                type="text"
                                                value={coMaker.makerBarangay}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'makerBarangay', e.target.value)}
                                                className={getFieldClass(index, 'makerBarangay')}
                                                placeholder="Enter barangay"
                                            />
                                            {errors[index]?.makerBarangay && <p className="text-red-500 text-xs mt-1">{errors[index]?.makerBarangay}</p>}
                                        </div>
                                        <div data-field-name="makerMunicipalityCity">
                                            <label className="block mb-2">Municipality/City</label>
                                            <input
                                                type="text"
                                                value={coMaker.makerMunicipalityCity}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'makerMunicipalityCity', e.target.value)}
                                                className={getFieldClass(index, 'makerMunicipalityCity')}
                                                placeholder="Enter municipality/city"
                                            />
                                            {errors[index]?.makerMunicipalityCity && <p className="text-red-500 text-xs mt-1">{errors[index]?.makerMunicipalityCity}</p>}
                                        </div>
                                        <div data-field-name="makerProvince">
                                            <label className="block mb-2">Province</label>
                                            <input
                                                type="text"
                                                value={coMaker.makerProvince}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'makerProvince', e.target.value)}
                                                className={getFieldClass(index, 'makerProvince')}
                                                placeholder="Enter province"
                                            />
                                            {errors[index]?.makerProvince && <p className="text-red-500 text-xs mt-1">{errors[index]?.makerProvince}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Other Information */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Other Information</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div data-field-name="residence">
                                            <label className="block mb-2">Residence</label>
                                            <select
                                                value={coMaker.residence}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'residence', e.target.value)}
                                                className={getFieldClass(index, 'residence')}
                                            >
                                                <option value="">Select residence type</option>
                                                <option value="Owned">Owned</option>
                                                <option value="Rented">Rented</option>
                                                <option value="Mortgaged">Mortgaged</option>
                                            </select>
                                            {errors[index]?.residence && <p className="text-red-500 text-xs mt-1">{errors[index]?.residence}</p>}
                                        </div>
                                        <div data-field-name="civilStatus">
                                            <label className="block mb-2">Civil Status</label>
                                            <select
                                                value={coMaker.civilStatus}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'civilStatus', e.target.value)}
                                                className={getFieldClass(index, 'civilStatus')}
                                            >
                                                <option value="">Select civil status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Widowed">Widowed</option>
                                            </select>
                                            {errors[index]?.civilStatus && <p className="text-red-500 text-xs mt-1">{errors[index]?.civilStatus}</p>}
                                        </div>
                                        <div data-field-name="relationshipWithApplicant">
                                            <label className="block mb-2">Relationship with Applicant</label>
                                            <input
                                                type="text"
                                                value={coMaker.relationshipWithApplicant}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'relationshipWithApplicant', e.target.value)}
                                                className={getFieldClass(index, 'relationshipWithApplicant')}
                                                placeholder="Enter relationship"
                                            />
                                            {errors[index]?.relationshipWithApplicant && <p className="text-red-500 text-xs mt-1">{errors[index]?.relationshipWithApplicant}</p>}
                                        </div>
                                        <div data-field-name="birthday">
                                            <label className="block mb-2">Birthday</label>
                                            <input
                                                type="date"
                                                value={coMaker.birthday}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'birthday', e.target.value)}
                                                className={getFieldClass(index, 'birthday')}
                                                placeholder="Enter birthday"
                                            />
                                            {errors[index]?.birthday && <p className="text-red-500 text-xs mt-1">{errors[index]?.birthday}</p>}
                                        </div>
                                        <div data-field-name="tin">
                                            <label className="block mb-2">TIN</label>
                                            <input
                                                type="text"
                                                value={coMaker.tin}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'tin', e.target.value)}
                                                className={getFieldClass(index, 'tin')}
                                                placeholder="Enter TIN number"
                                            />
                                            {errors[index]?.tin && <p className="text-red-500 text-xs mt-1">{errors[index]?.tin}</p>}
                                        </div>
                                        <div data-field-name="mobileNo">
                                            <label className="block mb-2">Mobile No</label>
                                            <input
                                                type="text"
                                                value={coMaker.mobileNo}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'mobileNo', e.target.value)}
                                                className={getFieldClass(index, 'mobileNo')}
                                                placeholder="Enter mobile number"
                                            />
                                            {errors[index]?.mobileNo && <p className="text-red-500 text-xs mt-1">{errors[index]?.mobileNo}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Employment Information */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Employment Information</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div data-field-name="presentEmployer">
                                            <label className="block mb-2">Present Employer</label>
                                            <input
                                                type="text"
                                                value={coMaker.presentEmployer}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'presentEmployer', e.target.value)}
                                                className={getFieldClass(index, 'presentEmployer')}
                                                placeholder="Enter employer name"
                                            />
                                            {errors[index]?.presentEmployer && <p className="text-red-500 text-xs mt-1">{errors[index]?.presentEmployer}</p>}
                                        </div>
                                        <div data-field-name="dateHired">
                                            <label className="block mb-2">Date Hired</label>
                                            <input
                                                type="date"
                                                value={coMaker.dateHired}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'dateHired', e.target.value)}
                                                className={getFieldClass(index, 'dateHired')}
                                                placeholder="Enter hire date"
                                            />
                                            {errors[index]?.dateHired && <p className="text-red-500 text-xs mt-1">{errors[index]?.dateHired}</p>}
                                        </div>
                                        <div data-field-name="position">
                                            <label className="block mb-2">Position</label>
                                            <input
                                                type="text"
                                                value={coMaker.position}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'position', e.target.value)}
                                                className={getFieldClass(index, 'position')}
                                                placeholder="Enter position"
                                            />
                                            {errors[index]?.position && <p className="text-red-500 text-xs mt-1">{errors[index]?.position}</p>}
                                        </div>
                                        <div data-field-name="grossIncome">
                                            <label className="block mb-2">Gross Income</label>
                                            <input
                                                type="number"
                                                value={coMaker.grossIncome}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'grossIncome', e.target.value)}
                                                className={getFieldClass(index, 'grossIncome')}
                                                placeholder="Enter gross income"
                                            />
                                            {errors[index]?.grossIncome && <p className="text-red-500 text-xs mt-1">{errors[index]?.grossIncome}</p>}
                                        </div>
                                        <div className="col-span-1 sm:col-span-2 md:col-span-4" data-field-name="employerAddress">
                                            <label className="block mb-2">Employer Address</label>
                                            <input
                                                type="text"
                                                value={coMaker.employerAddress}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'employerAddress', e.target.value)}
                                                className={getFieldClass(index, 'employerAddress')}
                                                placeholder="Enter employer address"
                                            />
                                            {errors[index]?.employerAddress && <p className="text-red-500 text-xs mt-1">{errors[index]?.employerAddress}</p>}
                                        </div>
                                        <div data-field-name="employmentStatus">
                                            <label className="block mb-2">Employment Status</label>
                                            <input
                                                type="text"
                                                value={coMaker.employmentStatus}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'employmentStatus', e.target.value)}
                                                className={getFieldClass(index, 'employmentStatus')}
                                                placeholder="Enter employment status"
                                            />
                                            {errors[index]?.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors[index]?.employmentStatus}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Credit References */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-6">Credit References</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="col-span-1 sm:col-span-2 md:col-span-4" data-field-name="creditReferences">
                                            <label className="block mb-2">Installment/Banking Institutions</label>
                                            <input
                                                type="text"
                                                value={coMaker.creditReferences}
                                                onChange={(e) => handleCoMakerChange(coMaker.id, 'creditReferences', e.target.value)}
                                                className={getFieldClass(index, 'creditReferences')}
                                                placeholder="Enter banking institutions"
                                            />
                                            {errors[index]?.creditReferences && <p className="text-red-500 text-xs mt-1">{errors[index]?.creditReferences}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCoMaker}
                            className="w-full p-2 border-2 border-dashed border-gray-300 rounded hover:border-gray-400 text-gray-600 hover:text-gray-700"
                        >
                            + Add Co-Maker
                        </button>
                        {errors.some(coMakerSpecificErrors => Object.keys(coMakerSpecificErrors).length > 0) && (
                            <p className="text-sm text-red-600">
                                Please fill out all required fields for all co-makers before proceeding.
                            </p>
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
                                Back to Employment & Payment Details Form
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    handleNextStepClick();
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

export default CoMakerEmploymentDetails; 