import React from 'react';
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

interface SignaturePreview {
    sketch_residence: string | null;
    sketch_residence_comaker: string | null;
    applicant_signature: string | null;
    spouse_signature: string | null;
    comaker_signature: string | null;
}

interface Props {
    formData: {
        // Step 1 data
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

        // Step 2 data
        // Contact Information
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
        // Dependents Information
        dependentsInfo: {
            id: string;
            name: string;
            officePhone: string;
            gradeOccupation: string;
            schoolCompany: string;
            age: string;
        }[];
        // Applicant's Parents
        applicantFatherName: string;
        applicantMotherName: string;
        applicantOccupation: string;
        applicantMobileNo: string;
        applicantAddress: string;
        // Spouse's Parents
        spouseFatherName: string;
        spouseMotherName: string;
        spouseOccupation: string;
        spouseMobileNo: string;
        spouseAddress: string;
        
        // Step 3 data
        // Credit References
        creditStoreBank: string;
        creditItemLoanAmount: string;
        creditTerm: string;
        creditDate: string;
        creditBalance: string;
        // Personal References
        referencesFullName: string;
        referencesRelationship: string;
        referencesTelNo: string;
        referencesAddress: string;
        // Source of Income
        sourceOfIncome: string[];

        // Step 4 data
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

        // Step 5 data
        coMakers: CoMaker[];

        // Step 6 data - these are File objects in the main form, but we'll use previews here
        // The actual File objects are handled during submission in form.tsx
        // We rely on signaturePreview for display purposes
        sketch_residence: File | null; // Keep for completeness if needed, but UI uses preview
        sketch_residence_comaker: File | null;
        applicant_signature: File | null;
        spouse_signature: File | null;
        comaker_signature: File | null;
    };
    signaturePreview: SignaturePreview;
    isSubmitting: boolean;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    goToPreviousStep: () => void;
}

const ConfirmApplication: React.FC<Props> = ({ formData, signaturePreview, isSubmitting, handleSubmit, goToPreviousStep }) => {
    // Helper function to render image or a placeholder
    const renderImage = (src: string | null | undefined, altText: string) => {
        if (src) {
            return <img src={src} alt={altText} className="max-h-40 max-w-full object-contain border border-gray-300 rounded-md" />;
        }
        return <div className="h-40 w-full flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 text-gray-500">Not Provided</div>;
    };

    return (
        <>
            <Header />
            <Breadcrumb title="Credit Application Form" active="Confirm Application" />
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white p-3 rounded-lg shadow-md">
                    <div className="border-b border-gray-300 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-center mb-6">Confirm Application</h2>
                        <p className="text-gray-600 text-center">
                            Please review your information before final submission
                        </p>
                    </div>

                    {/* STEP 1 - PERSONAL INFO */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Step 1: Personal Information</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">First Name: {formData.personalFirstName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Middle Name: {formData.personalMiddleName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Last Name: {formData.personalLastName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Age: {formData.personalAge}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">NB or RB: {formData.personalNBRB}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Sex: {formData.personalSex}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Citizenship: {formData.personalCitizenship}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Birth Date: {formData.personalBirthDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Religion: {formData.personalReligion}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Civil Status: {formData.personalCivilStatus}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">TIN No.: {formData.personalTIN}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Res. Cert. No.: {formData.personalResCertNo}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Date Issued: {formData.personalDateIssued}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Place Issued: {formData.personalPlaceIssued}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300" colSpan={2}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Present Address</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Block/Street: {formData.presentBlockStreet}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Zone/Purok: {formData.presentZonePurok}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Barangay: {formData.presentBarangay}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Municipality/City: {formData.presentMunicipalityCity}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Province: {formData.presentProvince}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Length of Stay: {formData.presentLengthOfStay}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">House: {formData.presentHouseOwnership}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Lot: {formData.presentLotOwnership}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Other Properties: {formData.presentOtherProperties.length > 0 ? formData.presentOtherProperties.join(", ") : "None"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Provincial Address</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Block/Street: {formData.provincialBlockStreet}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Zone/Purok: {formData.provincialZonePurok}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Barangay: {formData.provincialBarangay}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Municipality/City: {formData.provincialMunicipalityCity}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Province: {formData.provincialProvince}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300" colSpan={3}></td> {/* Empty cells to fill the row */}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* STEP 2 - PERSONAL & FAMILY PROFILE */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Step 2: Contact Information</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Home Phone: {formData.contactHomePhone}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Office Phone: {formData.contactOfficePhone}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile Phone: {formData.contactMobilePhone}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Email: {formData.contactEmail}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Spouse: {formData.contactSpouseName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Age (Spouse): {formData.contactAge}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Number of Dependents: {formData.contactDependents}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Provincial Spouse Address: {formData.contactProvincialSpouse}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile No (Spouse): {formData.contactMobileNo}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Alternate Email: {formData.informationEmail}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300" colSpan={2}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {formData.dependentsInfo.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-2">
                            <h3 className="text-xl font-semibold mb-1">Dependents Information</h3>
                            {formData.dependentsInfo.map((dependent, index) => (
                                <div key={dependent.id} className="mb-2 pb-1 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Dependent #{index + 1}</h4>
                                    <table className="w-full border-collapse border border-gray-300 mb-1">
                                        <tbody>
                                            <tr>
                                                <td className="p-1 border border-gray-300 w-1/3">
                                                    <p className="font-medium text-gray-700">Name: {dependent.name}</p>
                                                </td>
                                                <td className="p-1 border border-gray-300 w-1/3">
                                                    <p className="font-medium text-gray-700">Office Phone: {dependent.officePhone}</p>
                                                </td>
                                                <td className="p-1 border border-gray-300 w-1/3">
                                                    <p className="font-medium text-gray-700">Grade/Occupation: {dependent.gradeOccupation}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-1 border border-gray-300">
                                                    <p className="font-medium text-gray-700">School/Company: {dependent.schoolCompany}</p>
                                                </td>
                                                <td className="p-1 border border-gray-300">
                                                    <p className="font-medium text-gray-700">Age: {dependent.age}</p>
                                                </td>
                                                <td className="p-1 border border-gray-300"></td> {/* Empty cell to fill row */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Applicant's Parents</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Father: {formData.applicantFatherName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Mother: {formData.applicantMotherName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Occupation: {formData.applicantOccupation}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile No: {formData.applicantMobileNo}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Address: {formData.applicantAddress}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Spouse's Parents</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Father: {formData.spouseFatherName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Mother: {formData.spouseMotherName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Occupation: {formData.spouseOccupation}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile No: {formData.spouseMobileNo}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Address: {formData.spouseAddress}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* STEP 3 - PARENTAL & CREDIT INFORMATION */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Step 3: Credit References</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Store/Bank: {formData.creditStoreBank}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Item/Loan Amount: {formData.creditItemLoanAmount}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Term: {formData.creditTerm}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Date: {formData.creditDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Balance: {formData.creditBalance}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300" colSpan={3}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Personal References</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Full Name: {formData.referencesFullName}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Relationship: {formData.referencesRelationship}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Tel No: {formData.referencesTelNo}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Address: {formData.referencesAddress}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Source of Income</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Selected Sources: {formData.sourceOfIncome.length > 0 ? formData.sourceOfIncome.join(", ") : "None"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* STEP 4 - EMPLOYMENT & PAYMENT DETAILS */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Step 4: Applicant Employer Information</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Employer/Business Name: {formData.applicantEmployer}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Position: {formData.applicantPosition}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Block Street: {formData.applicantBlockStreet}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Zone/Purok: {formData.applicantZonePurok}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Barangay: {formData.applicantBarangay}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Municipality/City: {formData.applicantMunicipalityCity}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Province: {formData.applicantProvince}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Tel No.: {formData.applicantTelno}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Date Started: {formData.applicantDateStarted}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Immediate Supervisor: {formData.applicantNameImmediate}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile No.: {formData.applicantEmployerMobileNo}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Salary Gross: {formData.applicantSalaryGross}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Spouse Employer Information</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Employer/Business Name: {formData.spouseEmployer}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Position: {formData.spousePosition}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Block Street: {formData.spouseBlockStreet}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Zone/Purok: {formData.spouseZonePurok}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Barangay: {formData.spouseBarangay}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Municipality/City: {formData.spouseMunicipality}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Province: {formData.spouseProvince}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Tel No.: {formData.spouseTelno}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Date Started: {formData.spouseDateStarted}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Name of Immediate Supervisor: {formData.spouseNameImmediate}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Mobile No.: {formData.spouseEmployerMobileNo}</p>
                                    </td>
                                    <td className="p-1 border border-gray-300">
                                        <p className="font-medium text-gray-700">Salary Gross: {formData.spouseSalaryGross}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Unit to be Used For</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Selected Options: {[
                                            formData.personalUse ? 'Personal Use' : null,
                                            formData.businessUse ? 'Business Use' : null, 
                                            formData.gift ? 'Gift' : null,
                                            formData.useByRelative ? 'Use by Relative / Friend' : null
                                        ].filter(Boolean).join(", ") || "None"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Mode of Payment</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="p-1 border border-gray-300" colSpan={4}>
                                        <p className="font-medium text-gray-700">Selected Options: {[
                                            formData.postDatedChecks ? 'Post Dated Checks' : null,
                                            formData.cashPaidToOffice ? 'Cash Paid to Office' : null,
                                            formData.cashForCollection ? 'Cash for Collection' : null,
                                            formData.creditCard ? 'Credit Card' : null
                                        ].filter(Boolean).join(", ") || "None"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* STEP 5 - CO-MAKER & EMPLOYMENT DETAILS */}
                    {formData.coMakers.map((coMaker, index) => (
                        <div key={coMaker.id} className="bg-gray-50 p-4 rounded-lg mb-2">
                            <h3 className="text-xl font-semibold mb-1">Step 5: Co-Maker #{index + 1} Information</h3>
                            
                            <div className="mb-2">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">Co-Maker Personal Information</h4>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">First Name: {coMaker.firstName}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Age: {coMaker.age}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Sex: {coMaker.sex}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mb-2">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">Present Address</h4>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Block/Street: {coMaker.blockStreet}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Zone/Purok: {coMaker.zonePurok}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Barangay: {coMaker.barangay}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Municipality/City: {coMaker.municipalityCity}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Province: {coMaker.province}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Length of Stay: {coMaker.lengthOfStay}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mb-2">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">Maker Information Address</h4>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Block/Street: {coMaker.makerBlockStreet}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Zone/Purok: {coMaker.makerZonePurok}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Barangay: {coMaker.makerBarangay}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Municipality/City: {coMaker.makerMunicipalityCity}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Province: {coMaker.makerProvince}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Residence: {coMaker.residence}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Civil Status: {coMaker.civilStatus}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300" colSpan={2}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mb-2">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">Additional Information</h4>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Relationship with Applicant: {coMaker.relationshipWithApplicant}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Birthday: {coMaker.birthday}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">TIN: {coMaker.tin}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Mobile No: {coMaker.mobileNo}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Present Employer: {coMaker.presentEmployer}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Date Hired: {coMaker.dateHired}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Position: {coMaker.position}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Gross Income: {coMaker.grossIncome}</p>
                                            </td>
                                            <td className="p-1 border border-gray-300">
                                                <p className="font-medium text-gray-700">Employment Status: {coMaker.employmentStatus}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border border-gray-300" colSpan={3}>
                                                <p className="font-medium text-gray-700">Employer Address: {coMaker.employerAddress}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mb-1"> {/* Adjusted mb for the last section within a co-maker block */} 
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">Credit References</h4>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border border-gray-300" colSpan={3}>
                                                <p className="font-medium text-gray-700">Installment/Banking Institutions: {coMaker.creditReferences}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/* STEP 6 - CREDIT INQUIRY AUTHORIZATION */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <h3 className="text-xl font-semibold mb-1">Step 6: Credit Inquiry Authorization</h3>
                        
                        {/* Sketch uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-gray-700 mb-1">Sketch of Residence (Applicant)</p>
                                {renderImage(signaturePreview?.sketch_residence, "Sketch of Residence (Applicant) Preview")}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-gray-700 mb-1">Sketch of Residence (Co-Maker)</p>
                                {renderImage(signaturePreview?.sketch_residence_comaker, "Sketch of Residence (Co-Maker) Preview")}
                            </div>
                        </div>

                        {/* Signature uploads */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-gray-700 mb-1">Applicant's Signature</p>
                                {renderImage(signaturePreview?.applicant_signature, "Applicant's Signature Preview")}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-gray-700 mb-1">Spouse's Signature</p>
                                {renderImage(signaturePreview?.spouse_signature, "Spouse's Signature Preview")}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-gray-700 mb-1">Co-Maker's Signature</p>
                                {renderImage(signaturePreview?.comaker_signature, "Co-Maker's Signature Preview")}
                            </div>
                        </div>
                    </div>

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
                            Back to Previous Step
                        </button>
                        <button
                            type="submit"
                            onClick={(e) => {
                                handleSubmit(e);
                                window.scrollTo({ top: 0 });
                            }}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-lg flex items-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    Submitting...
                                    <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Confirm Application
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmApplication;
