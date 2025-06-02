import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

// Import step components
import PersonalAddressInfo from './ApplicationForms/1PersonalAddressInfo';
import PersonalFamilyProfile from './ApplicationForms/2PersonalFamilyProfile';
import ParentalCreditInformation from './ApplicationForms/3ParentalCreditInformation';
import EmploymentPaymentDetailsForm from './ApplicationForms/4EmploymentPaymentDetailsForm';
import CoMakerEmploymentDetails from './ApplicationForms/5CoMakerEmploymentDetails';
import CreditInquiryAuthorization from './ApplicationForms/6CreditInquiryAuthorization';
import ConfirmApplication from './ApplicationForms/ConfirmApplication';

//1.	Define the Form Data Interface:Correct: You define the FormData interface to structure the form data.
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

interface Dependent {
    id: string;
    name: string;
    officePhone: string;
    gradeOccupation: string;
    schoolCompany: string;
    age: string;
}

interface FormData {
    // Step:1 - Personal & Address Info
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

    //Step:2 - Personal & Family Profile (Contact Information)
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
    // Applicant's Parents (First/Middle/Last)
    applicantFatherName: string;
    applicantMotherName: string;
    applicantOccupation: string;
    applicantMobileNo: string;
    applicantAddress: string;
    // Spouse's Parents (First/Middle/Last)
    spouseFatherName: string;
    spouseMotherName: string;
    spouseOccupation: string;
    spouseMobileNo: string;
    spouseAddress: string;

    // Step:3 - Parental & Credit Information
    // Fixed Credit Reference Fields
    creditStoreBank: string;
    creditItemLoanAmount: string;
    creditTerm: string;
    creditDate: string;
    creditBalance: string;
    
    // Fixed Personal Reference Fields
    referencesFullName: string;
    referencesRelationship: string;
    referencesTelNo: string;
    referencesAddress: string;
    
    // Source of Income checkboxes
    sourceOfIncome: string[];

    // Step:4 - Employment & Payment Details Form
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
    
    // Step:5 - Co-Maker & Employment Details
    coMakers: CoMaker[];

    // Step:6 - Credit Inquiry Authorization
    sketch_residence: File | null;
    sketch_residence_comaker: File | null;
    applicant_signature: File | null;
    spouse_signature: File | null;
    comaker_signature: File | null;
}

const Forms = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate();
    const [signaturePreview, setSignaturePreview] = useState<{
        sketch_residence: string | null;
        sketch_residence_comaker: string | null;
        applicant_signature: string | null;
        spouse_signature: string | null;
        comaker_signature: string | null;
    }>({
        sketch_residence: null,
        sketch_residence_comaker: null,
        applicant_signature: null,
        spouse_signature: null,
        comaker_signature: null
    });
    // Add current step state
    const [currentStep, setCurrentStep] = useState(1);
    
    //Initialize the Form State: Correct: Use the useState hook to manage the form data.
    const [formData, setFormData] = useState<FormData>({
        // Step:1 - Personal & Address Info
        personalFirstName: '',
        personalMiddleName: '',
        personalLastName: '',
        personalAge: '',
        personalNBRB: '',
        personalSex: '',
        personalCitizenship: '',
        personalBirthDate: '',
        personalReligion: '',
        personalCivilStatus: '',
        personalTIN: '',
        personalResCertNo: '',
        personalDateIssued: '',
        personalPlaceIssued: '',
        // Present Address
        presentBlockStreet: '',
        presentZonePurok: '',
        presentBarangay: '',
        presentMunicipalityCity: '',
        presentProvince: '',
        presentLengthOfStay: '',
        presentHouseOwnership: '',
        presentLotOwnership: '',
        presentOtherProperties: [],
        // Provincial Address
        provincialBlockStreet: '',
        provincialZonePurok: '',
        provincialBarangay: '',
        provincialMunicipalityCity: '',
        provincialProvince: '',

        // Step:2 - Personal & Family Profile (Contact Information)
        contactHomePhone: '',
        contactOfficePhone: '',
        contactMobilePhone: '',
        contactEmail: '',
        contactSpouseName: '',
        contactAge: '',
        contactDependents: '',
        contactProvincialSpouse: '',
        contactMobileNo: '',
        informationEmail: '',
        dependentsInfo: [],
        // Applicant's Parents (First/Middle/Last)
        applicantFatherName: '',
        applicantMotherName: '',
        applicantOccupation: '',
        applicantMobileNo: '',
        applicantAddress: '',
        // Spouse's Parents (First/Middle/Last)
        spouseFatherName: '',
        spouseMotherName: '',
        spouseOccupation: '',
        spouseMobileNo: '',
        spouseAddress: '',

        // Step:3 - Parental & Credit Information
        creditStoreBank: '',
        creditItemLoanAmount: '',
        creditTerm: '',
        creditDate: '',
        creditBalance: '',
        referencesFullName: '',
        referencesRelationship: '',
        referencesTelNo: '',
        referencesAddress: '',
        sourceOfIncome: [],

        // Step:4 - Employment & Payment Details Form
        // Applicant Employer Information
        applicantEmployer: '',
        applicantPosition: '',
        applicantBlockStreet: '',
        applicantZonePurok: '',
        applicantBarangay: '',
        applicantMunicipalityCity: '',
        applicantProvince: '',
        applicantTelno: '',
        applicantDateStarted: '',
        applicantNameImmediate: '',
        applicantEmployerMobileNo: '',
        applicantSalaryGross: '',
        
        // Spouse Employer Information
        spouseEmployer: '',
        spousePosition: '',
        spouseBlockStreet: '',
        spouseZonePurok: '',
        spouseBarangay: '',
        spouseMunicipality: '',
        spouseProvince: '',
        spouseTelno: '',
        spouseDateStarted: '',
        spouseNameImmediate: '',
        spouseEmployerMobileNo: '',
        spouseSalaryGross: '',
        
        // Unit to be Used For
        personalUse: false,
        businessUse: false,
        gift: false,
        useByRelative: false,
        
        // Mode of Payment
        postDatedChecks: false,
        cashPaidToOffice: false,
        cashForCollection: false,
        creditCard: false,

        // Step:5 - Co-Maker & Employment Details
        coMakers: [],
        
        // Step:6 - Credit Inquiry Authorization
        sketch_residence: null,
        sketch_residence_comaker: null,
        applicant_signature: null,
        spouse_signature: null,
        comaker_signature: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Function to handle next step navigation
    const goToNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };
    
    // Function to handle previous step navigation
    const goToPreviousStep = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        
        if (name === 'presentOtherProperties') {
            setFormData(prev => ({
                ...prev,
                presentOtherProperties: checked
                    ? [...prev.presentOtherProperties, value]
                    : prev.presentOtherProperties.filter(item => item !== value)
            }));
        } else if (name === 'sourceOfIncome') {
            setFormData(prev => ({
                ...prev,
                sourceOfIncome: checked
                    ? [...prev.sourceOfIncome, value]
                    : prev.sourceOfIncome.filter(item => item !== value)
            }));
        } else {
            // Handle Unit to be Used For and Mode of Payment checkboxes
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const fieldName = e.target.name;
        
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should not exceed 5MB");
                return;
            }

            // Validate file type
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                alert("Only JPG, JPEG, and PNG files are allowed");
                return;
            }

            setFormData(prev => ({ ...prev, [fieldName]: file }));

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setSignaturePreview(prev => ({ ...prev, [fieldName]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Add cleanup function for preview URL
    useEffect(() => {
        return () => {
            // Clean up any URLs if needed
            Object.values(signaturePreview).forEach(preview => {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [signaturePreview]);

    const handleCoMakerChange = (id: string, field: keyof CoMaker, value: string) => {
        setFormData(prev => ({
            ...prev,
            coMakers: prev.coMakers.map(coMaker => 
                coMaker.id === id 
                    ? { ...coMaker, [field]: value }
                    : coMaker
            )
        }));
    };

    const addCoMaker = () => {
        setFormData(prev => ({
            ...prev,
            coMakers: [
                ...prev.coMakers,
                { id: crypto.randomUUID(), firstName: '', age: '', sex: '', blockStreet: '', zonePurok: '', barangay: '', municipalityCity: '', province: '', lengthOfStay: '', makerBlockStreet: '', makerZonePurok: '', makerBarangay: '', makerMunicipalityCity: '', makerProvince: '', residence: '', civilStatus: '', relationshipWithApplicant: '', birthday: '', tin: '', mobileNo: '', presentEmployer: '', dateHired: '', position: '', grossIncome: '', employerAddress: '', employmentStatus: '', creditReferences: '' }
            ]
        }));
    };

    const removeCoMaker = (id: string) => {
        setFormData(prev => ({
            ...prev,
            coMakers: prev.coMakers.filter(coMaker => coMaker.id !== id)
        }));
    };

    // Handle dependent changes
    const handleDependentChange = (id: string, field: keyof Dependent, value: string) => {
        setFormData(prev => ({
            ...prev,
            dependentsInfo: prev.dependentsInfo.map(dependent => 
                dependent.id === id 
                    ? { ...dependent, [field]: value }
                    : dependent
            )
        }));
    };

    // Add new dependent
    const addDependent = () => {
        setFormData(prev => ({
            ...prev,
            dependentsInfo: [
                ...prev.dependentsInfo,
                { 
                    id: crypto.randomUUID(), 
                    name: '', 
                    officePhone: '', 
                    gradeOccupation: '', 
                    schoolCompany: '', 
                    age: '' 
                }
            ]
        }));
    };

    // Remove dependent
    const removeDependent = (id: string) => {
        setFormData(prev => ({
            ...prev,
            dependentsInfo: prev.dependentsInfo.filter(dependent => dependent.id !== id)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                title: 'Authentication Required',
                text: 'You must be logged in to submit this form',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        setIsSubmitting(true);
        // Handle Form Submission: Use the FormData object to append the form fields and send them to the backend.
        const data = new FormData();
        // Step:1 - Personal & Address Info
        data.append('personal_first_name', formData.personalFirstName);
        data.append('personal_middle_name', formData.personalMiddleName);
        data.append('personal_last_name', formData.personalLastName);
        data.append('personal_age', formData.personalAge);
        data.append('personal_nb_rb', formData.personalNBRB);
        data.append('personal_sex', formData.personalSex);
        data.append('personal_citizenship', formData.personalCitizenship);
        data.append('personal_birth_date', formData.personalBirthDate);
        data.append('personal_religion', formData.personalReligion);
        data.append('personal_civil_status', formData.personalCivilStatus);
        data.append('personal_tin', formData.personalTIN);
        data.append('personal_res_cert_no', formData.personalResCertNo);
        data.append('personal_date_issued', formData.personalDateIssued);
        data.append('personal_place_issued', formData.personalPlaceIssued);
        
        // Present Address
        data.append('present_block_street', formData.presentBlockStreet);
        data.append('present_zone_purok', formData.presentZonePurok);
        data.append('present_barangay', formData.presentBarangay);
        data.append('present_municipality_city', formData.presentMunicipalityCity);
        data.append('present_province', formData.presentProvince);
        data.append('present_length_of_stay', formData.presentLengthOfStay);
        data.append('present_house_ownership', formData.presentHouseOwnership);
        data.append('present_lot_ownership', formData.presentLotOwnership);
        formData.presentOtherProperties.forEach(prop => data.append('present_other_properties[]', prop));
        
        // Provincial Address
        data.append('provincial_block_street', formData.provincialBlockStreet);
        data.append('provincial_zone_purok', formData.provincialZonePurok);
        data.append('provincial_barangay', formData.provincialBarangay);
        data.append('provincial_municipality_city', formData.provincialMunicipalityCity);
        data.append('provincial_province', formData.provincialProvince);

        // Step:2 - Personal & Family Profile (Contact Information)
        data.append('contact_home_phone', formData.contactHomePhone);
        data.append('contact_office_phone', formData.contactOfficePhone);
        data.append('contact_mobile_phone', formData.contactMobilePhone);
        data.append('contact_email', formData.contactEmail);
        data.append('contact_spouse_name', formData.contactSpouseName);
        data.append('contact_age', formData.contactAge);
        data.append('contact_dependents', formData.contactDependents);
        data.append('contact_provincial_spouse', formData.contactProvincialSpouse);
        data.append('contact_mobile_no', formData.contactMobileNo);
        data.append('information_email', formData.informationEmail);
        data.append('dependents_info', JSON.stringify(formData.dependentsInfo));
        
        // Applicant's Parents (First/Middle/Last)
        data.append('applicant_father_name', formData.applicantFatherName);
        data.append('applicant_mother_name', formData.applicantMotherName);
        data.append('applicant_occupation', formData.applicantOccupation);
        data.append('applicant_mobile_no', formData.applicantMobileNo);
        data.append('applicant_address', formData.applicantAddress);
        
        // Spouse's Parents (First/Middle/Last)
        data.append('spouse_father_name', formData.spouseFatherName);
        data.append('spouse_mother_name', formData.spouseMotherName);
        data.append('spouse_occupation', formData.spouseOccupation);
        data.append('spouse_mobile_no', formData.spouseMobileNo);
        data.append('spouse_address', formData.spouseAddress);

        // Step:3 - Parental & Credit Information
        data.append('creditStoreBank', formData.creditStoreBank);
        data.append('creditItemLoanAmount', formData.creditItemLoanAmount);
        data.append('creditTerm', formData.creditTerm);
        data.append('creditDate', formData.creditDate);
        data.append('creditBalance', formData.creditBalance);
        data.append('referencesFullName', formData.referencesFullName);
        data.append('referencesRelationship', formData.referencesRelationship);
        data.append('referencesTelNo', formData.referencesTelNo);
        data.append('referencesAddress', formData.referencesAddress);
        data.append('sourceOfIncome', JSON.stringify(formData.sourceOfIncome));

        // Step:4 - Employment & Payment Details Form
        // Applicant Employer Information
        data.append('applicant_employer', formData.applicantEmployer);
        data.append('applicant_position', formData.applicantPosition);
        data.append('applicant_block_street', formData.applicantBlockStreet);
        data.append('applicant_zone_purok', formData.applicantZonePurok);
        data.append('applicant_barangay', formData.applicantBarangay);
        data.append('applicant_municipality_city', formData.applicantMunicipalityCity);
        data.append('applicant_province', formData.applicantProvince);
        data.append('applicant_telno', formData.applicantTelno);
        data.append('applicant_date_started', formData.applicantDateStarted);
        data.append('applicant_name_immediate', formData.applicantNameImmediate);
        data.append('applicant_employer_mobile_no', formData.applicantEmployerMobileNo);
        data.append('applicant_salary_gross', formData.applicantSalaryGross);
        
        // Spouse Employer Information
        data.append('spouse_employer', formData.spouseEmployer);
        data.append('spouse_position', formData.spousePosition);
        data.append('spouse_block_street', formData.spouseBlockStreet);
        data.append('spouse_zone_purok', formData.spouseZonePurok);
        data.append('spouse_barangay', formData.spouseBarangay);
        data.append('spouse_municipality', formData.spouseMunicipality);
        data.append('spouse_province', formData.spouseProvince);
        data.append('spouse_telno', formData.spouseTelno);
        data.append('spouse_date_started', formData.spouseDateStarted);
        data.append('spouse_name_immediate', formData.spouseNameImmediate);
        data.append('spouse_employer_mobile_no', formData.spouseEmployerMobileNo);
        data.append('spouse_salary_gross', formData.spouseSalaryGross);
        
        // Unit to be Used For
        data.append('personal_use', formData.personalUse ? '1' : '0');
        data.append('business_use', formData.businessUse ? '1' : '0');
        data.append('gift', formData.gift ? '1' : '0');
        data.append('use_by_relative', formData.useByRelative ? '1' : '0');
        
        // Mode of Payment
        data.append('post_dated_checks', formData.postDatedChecks ? '1' : '0');
        data.append('cash_paid_to_office', formData.cashPaidToOffice ? '1' : '0');
        data.append('cash_for_collection', formData.cashForCollection ? '1' : '0');
        data.append('credit_card', formData.creditCard ? '1' : '0');
        
        // Step:5 - Co-Maker & Employment Details
        data.append('co_makers', JSON.stringify(formData.coMakers));

        // Step:6 - Credit Inquiry Authorization
        if (formData.sketch_residence) {
            data.append('sketch_residence', formData.sketch_residence);
        }
        if (formData.sketch_residence_comaker) {
            data.append('sketch_residence_comaker', formData.sketch_residence_comaker);
        }
        if (formData.applicant_signature) {
            data.append('applicant_signature', formData.applicant_signature);
        }
        if (formData.spouse_signature) {
            data.append('spouse_signature', formData.spouse_signature);
        }
        if (formData.comaker_signature) {
            data.append('comaker_signature', formData.comaker_signature);
        }

        try {
            console.log('Submitting form data:', Object.fromEntries(data));
            const response = await api.post('/application-requests', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Submission response:', response.data);
            
            // Show only success message, remove confirmation dialog
            Swal.fire({
                title: 'Application submitted successfully!',
                text: 'The status is now Pending.',
                icon: 'success',
                confirmButtonColor: '#3CB371',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/Pending');
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error submitting application:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
                Swal.fire({
                    title: 'Failed to submit application',
                    text: 'No response received from server',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Error message:', error.message);
                Swal.fire({
                    title: 'Failed to submit application',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Return the Form with Fields: Add <label> and <input> elements for personal_first_name and personal_age in the form.
        <div className="max-w-2xl">
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Render the appropriate step component based on currentStep */}
                {currentStep === 1 && (
                    <PersonalAddressInfo 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleCheckboxChange={handleCheckboxChange}
                        goToNextStep={goToNextStep}
                    />
                )}

                {currentStep === 2 && (
                    <PersonalFamilyProfile 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleDependentChange={handleDependentChange}
                        addDependent={addDependent}
                        removeDependent={removeDependent}
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}

                {currentStep === 3 && (
                    <ParentalCreditInformation 
                        formData={formData} 
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange} 
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}

                {currentStep === 4 && (
                    <EmploymentPaymentDetailsForm 
                        formData={formData} 
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange} 
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}

                {currentStep === 5 && (
                    <CoMakerEmploymentDetails 
                        formData={formData} 
                        handleCoMakerChange={handleCoMakerChange} 
                        addCoMaker={addCoMaker} 
                        removeCoMaker={removeCoMaker} 
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}

                {currentStep === 6 && (
                    <CreditInquiryAuthorization 
                        formData={formData} 
                        signaturePreview={signaturePreview} 
                        handleFileChange={handleFileChange} 
                        setSignaturePreview={setSignaturePreview} 
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        goToPreviousStep={goToPreviousStep}
                        goToNextStep={goToNextStep}
                    />
                )}

                {currentStep === 7 && (
                    <ConfirmApplication
                        formData={formData}
                        signaturePreview={signaturePreview}
                        isSubmitting={isSubmitting}
                        handleSubmit={handleSubmit}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}
            </form>
        </div>
    );
};

export default Forms;