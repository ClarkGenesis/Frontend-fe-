import { useEffect, useState, useRef } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import { printApplicationForm } from '../../components/PrintForm';
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";
import Breadcrumb from "../../components/UserBreadcrums";
import PageLoading from '../../components/PageLoading';

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

interface StatusEntry {
    id: string;
    status: 'Approved' | 'Disapproved' | 'Pending';
    updated_at: string;
    details?: {
        personal_first_name: string;
        personal_middle_name: string | null;
        personal_last_name: string;
        personal_age: string;
        personal_nb_rb: string | null;
        personal_sex: string | null;
        personal_citizenship: string | null;
        personal_birth_date: string | null;
        personal_religion: string | null;
        personal_civil_status: string | null;
        personal_tin: string | null;
        personal_res_cert_no: string | null;
        personal_date_issued: string | null;
        personal_place_issued: string | null;
        // Present Address
        present_block_street: string | null;
        present_zone_purok: string | null;
        present_barangay: string | null;
        present_municipality_city: string | null;
        present_province: string | null;
        present_length_of_stay: string | null;
        present_house_ownership: string | null;
        present_lot_ownership: string | null;
        present_other_properties: string[];
        // Provincial Address
        provincial_block_street: string | null;
        provincial_zone_purok: string | null;
        provincial_barangay: string | null;
        provincial_municipality_city: string | null;
        provincial_province: string | null;
        
        // Contact Information (Step 2)
        contact_home_phone: string;
        contact_office_phone: string;
        contact_mobile_phone: string;
        contact_email: string;
        contact_spouse_name: string | null;
        contact_age: string | null;
        contact_dependents: string | null;
        contact_provincial_spouse: string | null;
        contact_mobile_no: string;
        information_email: string;
        dependents_info: Array<{
            id: string;
            name: string;
            officePhone: string;
            gradeOccupation: string;
            schoolCompany: string;
            age: string;
        }>;
        
        // Applicant's Parents
        applicant_father_name: string | null;
        applicant_mother_name: string | null;
        applicant_occupation: string | null;
        applicant_mobile_no: string | null;
        applicant_address: string | null;
        
        // Spouse's Parents
        spouse_father_name: string | null;
        spouse_mother_name: string | null;
        spouse_occupation: string | null;
        spouse_mobile_no: string | null;
        spouse_address: string | null;
        
        // Step 3 - Parental & Credit Information - updated to individual fields
        credit_store_bank: string | null;
        credit_item_loan_amount: string | null;
        credit_term: string | null;
        credit_date: string | null;
        credit_balance: string | null;
        references_full_name: string | null;
        references_relationship: string | null;
        references_tel_no: string | null;
        references_address: string | null;
        source_of_income: string[];
        
        other_properties: string[];
        spouse_first_name: string | null;
        spouse_age: number | null;
        co_makers: CoMaker[];
        sketch_residence_path: string | null;
        sketch_residence_comaker_path: string | null;
        applicant_signature_path: string | null;
        spouse_signature_path: string | null;
        comaker_signature_path: string | null;
        
        // Step 4 - Employment & Payment Details Form
        // Applicant Employer Information
        applicant_employer: string | null;
        applicant_position: string | null;
        applicant_block_street: string | null;
        applicant_zone_purok: string | null;
        applicant_barangay: string | null;
        applicant_municipality_city: string | null;
        applicant_province: string | null;
        applicant_telno: string | null;
        applicant_date_started: string | null;
        applicant_name_immediate: string | null;
        applicant_employer_mobile_no: string | null;
        applicant_salary_gross: number | null;
        
        // Spouse Employer Information
        spouse_employer: string | null;
        spouse_position: string | null;
        spouse_block_street: string | null;
        spouse_zone_purok: string | null;
        spouse_barangay: string | null;
        spouse_municipality: string | null;
        spouse_province: string | null;
        spouse_telno: string | null;
        spouse_date_started: string | null;
        spouse_name_immediate: string | null;
        spouse_employer_mobile_no: string | null;
        spouse_salary_gross: number | null;
        
        // Unit to be Used For
        personal_use: boolean;
        business_use: boolean;
        gift: boolean;
        use_by_relative: boolean;
        
        // Mode of Payment
        post_dated_checks: boolean;
        cash_paid_to_office: boolean;
        cash_for_collection: boolean;
        credit_card: boolean;
    };
}

interface ApplicationResponse { 
    id: number; 
    status: string; 
    personal_first_name: string;
    personal_middle_name: string | null;
    personal_last_name: string;
    personal_age: string;
    personal_nb_rb: string | null;
    personal_sex: string | null;
    personal_citizenship: string | null;
    personal_birth_date: string | null;
    personal_religion: string | null;
    personal_civil_status: string | null;
    personal_tin: string | null;
    personal_res_cert_no: string | null;
    personal_date_issued: string | null;
    personal_place_issued: string | null;
    // Present Address
    present_block_street: string | null;
    present_zone_purok: string | null;
    present_barangay: string | null;
    present_municipality_city: string | null;
    present_province: string | null;
    present_length_of_stay: string | null;
    present_house_ownership: string | null;
    present_lot_ownership: string | null;
    present_other_properties: string[] | string;
    // Provincial Address
    provincial_block_street: string | null;
    provincial_zone_purok: string | null;
    provincial_barangay: string | null;
    provincial_municipality_city: string | null;
    provincial_province: string | null;
    // Contact Information (replacing old fields)
    contact_home_phone: string;
    contact_office_phone: string;
    contact_mobile_phone: string;
    contact_email: string;
    contact_spouse_name: string | null;
    contact_age: string | null;
    contact_dependents: string | null;
    contact_provincial_spouse: string | null;
    contact_mobile_no: string;
    information_email: string;
    dependents_info: Array<{
        id: string;
        name: string;
        officePhone: string;
        gradeOccupation: string;
        schoolCompany: string;
        age: string;
    }> | string;
    // Applicant's Parents
    applicant_father_name: string | null;
    applicant_mother_name: string | null;
    applicant_occupation: string | null;
    applicant_mobile_no: string | null;
    applicant_address: string | null;
    // Spouse's Parents
    spouse_father_name: string | null;
    spouse_mother_name: string | null;
    spouse_occupation: string | null;
    spouse_mobile_no: string | null;
    spouse_address: string | null;
    // Step 3 - Parental & Credit Information - updated to individual fields
    credit_store_bank: string | null;
    credit_item_loan_amount: string | null;
    credit_term: string | null;
    credit_date: string | null;
    credit_balance: string | null;
    references_full_name: string | null;
    references_relationship: string | null;
    references_tel_no: string | null;
    references_address: string | null;
    source_of_income: string[] | string;
    // Other properties
    other_properties: string[];
    spouse_first_name: string | null; 
    spouse_age: number | null; 
    sketch_residence_path: string | null;
    sketch_residence_comaker_path: string | null;
    applicant_signature_path: string | null;
    spouse_signature_path: string | null;
    comaker_signature_path: string | null;
    co_makers: CoMaker[] | string;
    
    // Step:4 - Employment & Payment Details Form
    // Applicant Employer Information
    applicant_employer: string | null;
    applicant_position: string | null;
    applicant_block_street: string | null;
    applicant_zone_purok: string | null;
    applicant_barangay: string | null;
    applicant_municipality_city: string | null;
    applicant_province: string | null;
    applicant_telno: string | null;
    applicant_date_started: string | null;
    applicant_name_immediate: string | null;
    applicant_employer_mobile_no: string | null;
    applicant_salary_gross: number | null;
    
    // Spouse Employer Information
    spouse_employer: string | null;
    spouse_position: string | null;
    spouse_block_street: string | null;
    spouse_zone_purok: string | null;
    spouse_barangay: string | null;
    spouse_municipality: string | null;
    spouse_province: string | null;
    spouse_telno: string | null;
    spouse_date_started: string | null;
    spouse_name_immediate: string | null;
    spouse_employer_mobile_no: string | null;
    spouse_salary_gross: number | null;
    
    // Unit to be Used For
    personal_use: boolean | string;
    business_use: boolean | string;
    gift: boolean | string;
    use_by_relative: boolean | string;
    
    // Mode of Payment
    post_dated_checks: boolean | string;
    cash_paid_to_office: boolean | string;
    cash_for_collection: boolean | string;
    credit_card: boolean | string;
}

const Status = () => {
    const { user } = useAuth();
    const [statusHistory, setStatusHistory] = useState<StatusEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const statusRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Function to scroll to status with highlight effect
    const scrollToStatus = (status: string) => {
        const element = statusRefs.current[status];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add highlight effect
            element.style.backgroundColor = '#e6f3ff';
            element.style.transition = 'background-color 0.5s ease';
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 2000);
        }
    };

    // Handle scroll to status when page loads
    useEffect(() => {
        if (!loading) {
            const targetStatus = sessionStorage.getItem('scrollToStatus');
            if (targetStatus) {
                sessionStorage.removeItem('scrollToStatus');
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    scrollToStatus(targetStatus);
                }, 100);
            }
        }
    }, [loading]);

    useEffect(() => {
        const fetchStatusHistory = async () => {
            try {
                if (!user) return;

                const response = await api.get('/user/application-requests');
                if (response.data.length > 0) {
                    const statuses = response.data.flatMap((application: ApplicationResponse) => {
                        // Parse co_makers if it's a string
                        let parsedCoMakers = application.co_makers;
                        if (typeof application.co_makers === 'string') {
                            try {
                                parsedCoMakers = JSON.parse(application.co_makers);
                            } catch (e) {
                                console.error('Error parsing co_makers:', e);
                                parsedCoMakers = [];
                            }
                        }

                        // Parse present_other_properties if it's a string
                        let parsedPresentOtherProperties = application.present_other_properties;
                        if (typeof application.present_other_properties === 'string') {
                            try {
                                parsedPresentOtherProperties = JSON.parse(application.present_other_properties);
                            } catch (e) {
                                console.error('Error parsing present_other_properties:', e);
                                parsedPresentOtherProperties = [];
                            }
                        } else if (!Array.isArray(application.present_other_properties)) {
                            parsedPresentOtherProperties = [];
                        }

                        // Parse dependents_info if it's a string
                        let parsedDependentsInfo = application.dependents_info;
                        if (typeof application.dependents_info === 'string') {
                            try {
                                parsedDependentsInfo = JSON.parse(application.dependents_info);
                            } catch (e) {
                                console.error('Error parsing dependents_info:', e);
                                parsedDependentsInfo = [];
                            }
                        } else if (!Array.isArray(application.dependents_info)) {
                            parsedDependentsInfo = [];
                        }

                        // Parse source_of_income if it's a string
                        let parsedSourceOfIncome = application.source_of_income;
                        if (typeof application.source_of_income === 'string') {
                            try {
                                parsedSourceOfIncome = JSON.parse(application.source_of_income);
                            } catch (e) {
                                console.error('Error parsing source_of_income:', e);
                                parsedSourceOfIncome = [];
                            }
                        } else if (!Array.isArray(application.source_of_income)) {
                            parsedSourceOfIncome = [];
                        }

                        // Extract contact information
                        const contactFields = {
                            contact_home_phone: application.contact_home_phone,
                            contact_office_phone: application.contact_office_phone,
                            contact_mobile_phone: application.contact_mobile_phone,
                            contact_email: application.contact_email,
                            contact_spouse_name: application.contact_spouse_name,
                            contact_age: application.contact_age,
                            contact_dependents: application.contact_dependents,
                            contact_provincial_spouse: application.contact_provincial_spouse,
                            contact_mobile_no: application.contact_mobile_no,
                            information_email: application.information_email
                        };

                        // Extract applicant's parents information with default values
                        const applicantParentsFields = {
                            applicant_father_name: application.applicant_father_name || '',
                            applicant_mother_name: application.applicant_mother_name || '',
                            applicant_occupation: application.applicant_occupation || '',
                            applicant_mobile_no: application.applicant_mobile_no || '',
                            applicant_address: application.applicant_address || ''
                        };

                        // Extract spouse's parents information with default values
                        const spouseParentsFields = {
                            spouse_father_name: application.spouse_father_name || '',
                            spouse_mother_name: application.spouse_mother_name || '',
                            spouse_occupation: application.spouse_occupation || '',
                            spouse_mobile_no: application.spouse_mobile_no || '',
                            spouse_address: application.spouse_address || ''
                        };

                        // Log mobile numbers for debugging
                        console.log('Mobile numbers in API response:', {
                            applicant_mobile_no: application.applicant_mobile_no,
                            spouse_mobile_no: application.spouse_mobile_no
                        });

                        if (application.status) {
                            const statusEntries = application.status.split(',').map((statusEntry: string, index: number) => {
                                const [status, timestamp] = statusEntry.split('|');
                                const trimmedStatus = status.trim();
                                const trimmedTimestamp = timestamp.trim();
                                
                                return {
                                    id: `${application.id}-${index}`,
                                    status: trimmedStatus as 'Approved' | 'Disapproved' | 'Pending',
                                    updated_at: trimmedTimestamp,
                                    details: {
                                        personal_first_name: application.personal_first_name,
                                        personal_middle_name: application.personal_middle_name,
                                        personal_last_name: application.personal_last_name,
                                        personal_age: application.personal_age,
                                        personal_nb_rb: application.personal_nb_rb,
                                        personal_sex: application.personal_sex,
                                        personal_citizenship: application.personal_citizenship,
                                        personal_birth_date: application.personal_birth_date,
                                        personal_religion: application.personal_religion,
                                        personal_civil_status: application.personal_civil_status,
                                        personal_tin: application.personal_tin,
                                        personal_res_cert_no: application.personal_res_cert_no,
                                        personal_date_issued: application.personal_date_issued,
                                        personal_place_issued: application.personal_place_issued,
                                        
                                        // Present Address
                                        present_block_street: application.present_block_street,
                                        present_zone_purok: application.present_zone_purok,
                                        present_barangay: application.present_barangay,
                                        present_municipality_city: application.present_municipality_city,
                                        present_province: application.present_province,
                                        present_length_of_stay: application.present_length_of_stay,
                                        present_house_ownership: application.present_house_ownership,
                                        present_lot_ownership: application.present_lot_ownership,
                                        present_other_properties: parsedPresentOtherProperties,
                                        
                                        // Provincial Address
                                        provincial_block_street: application.provincial_block_street,
                                        provincial_zone_purok: application.provincial_zone_purok,
                                        provincial_barangay: application.provincial_barangay,
                                        provincial_municipality_city: application.provincial_municipality_city,
                                        provincial_province: application.provincial_province,
                                        
                                        // Contact Information
                                        contact_home_phone: contactFields.contact_home_phone,
                                        contact_office_phone: contactFields.contact_office_phone,
                                        contact_mobile_phone: contactFields.contact_mobile_phone,
                                        contact_email: contactFields.contact_email,
                                        contact_spouse_name: contactFields.contact_spouse_name,
                                        contact_age: contactFields.contact_age,
                                        contact_dependents: contactFields.contact_dependents,
                                        contact_provincial_spouse: contactFields.contact_provincial_spouse,
                                        contact_mobile_no: contactFields.contact_mobile_no,
                                        information_email: contactFields.information_email,
                                        dependents_info: parsedDependentsInfo,
                                        
                                        // Applicant's Parents
                                        applicant_father_name: applicantParentsFields.applicant_father_name,
                                        applicant_mother_name: applicantParentsFields.applicant_mother_name,
                                        applicant_occupation: applicantParentsFields.applicant_occupation,
                                        applicant_mobile_no: applicantParentsFields.applicant_mobile_no,
                                        applicant_address: applicantParentsFields.applicant_address,
                                        
                                        // Spouse's Parents
                                        spouse_father_name: spouseParentsFields.spouse_father_name,
                                        spouse_mother_name: spouseParentsFields.spouse_mother_name,
                                        spouse_occupation: spouseParentsFields.spouse_occupation,
                                        spouse_mobile_no: spouseParentsFields.spouse_mobile_no,
                                        spouse_address: spouseParentsFields.spouse_address,
                                        
                                        // Step 3 - Parental & Credit Information - updated to individual fields
                                        credit_store_bank: application.credit_store_bank,
                                        credit_item_loan_amount: application.credit_item_loan_amount,
                                        credit_term: application.credit_term,
                                        credit_date: application.credit_date,
                                        credit_balance: application.credit_balance,
                                        references_full_name: application.references_full_name,
                                        references_relationship: application.references_relationship,
                                        references_tel_no: application.references_tel_no,
                                        references_address: application.references_address,
                                        source_of_income: parsedSourceOfIncome,
                                        
                                        other_properties: application.other_properties,
                                        spouse_first_name: application.spouse_first_name,
                                        spouse_age: application.spouse_age,
                                        sketch_residence_path: application.sketch_residence_path,
                                        sketch_residence_comaker_path: application.sketch_residence_comaker_path,
                                        applicant_signature_path: application.applicant_signature_path,
                                        spouse_signature_path: application.spouse_signature_path,
                                        comaker_signature_path: application.comaker_signature_path,
                                        co_makers: parsedCoMakers,
                                        
                                        // Step 4 - Employment & Payment Details Form
                                        // Applicant Employer Information
                                        applicant_employer: application.applicant_employer,
                                        applicant_position: application.applicant_position,
                                        applicant_block_street: application.applicant_block_street,
                                        applicant_zone_purok: application.applicant_zone_purok,
                                        applicant_barangay: application.applicant_barangay,
                                        applicant_municipality_city: application.applicant_municipality_city,
                                        applicant_province: application.applicant_province,
                                        applicant_telno: application.applicant_telno,
                                        applicant_date_started: application.applicant_date_started,
                                        applicant_name_immediate: application.applicant_name_immediate,
                                        applicant_employer_mobile_no: application.applicant_employer_mobile_no,
                                        applicant_salary_gross: application.applicant_salary_gross,
                                        
                                        // Spouse Employer Information
                                        spouse_employer: application.spouse_employer,
                                        spouse_position: application.spouse_position,
                                        spouse_block_street: application.spouse_block_street,
                                        spouse_zone_purok: application.spouse_zone_purok,
                                        spouse_barangay: application.spouse_barangay,
                                        spouse_municipality: application.spouse_municipality,
                                        spouse_province: application.spouse_province,
                                        spouse_telno: application.spouse_telno,
                                        spouse_date_started: application.spouse_date_started,
                                        spouse_name_immediate: application.spouse_name_immediate,
                                        spouse_employer_mobile_no: application.spouse_employer_mobile_no,
                                        spouse_salary_gross: application.spouse_salary_gross,
                                        
                                        // Unit to be Used For
                                        personal_use: application.personal_use === true || application.personal_use === '1',
                                        business_use: application.business_use === true || application.business_use === '1',
                                        gift: application.gift === true || application.gift === '1',
                                        use_by_relative: application.use_by_relative === true || application.use_by_relative === '1',
                                        
                                        // Mode of Payment
                                        post_dated_checks: application.post_dated_checks === true || application.post_dated_checks === '1',
                                        cash_paid_to_office: application.cash_paid_to_office === true || application.cash_paid_to_office === '1',
                                        cash_for_collection: application.cash_for_collection === true || application.cash_for_collection === '1',
                                        credit_card: application.credit_card === true || application.credit_card === '1',
                                    }
                                };
                            });
                            return statusEntries.slice(-1);
                        }
                        return [];
                    });
                    setStatusHistory(statuses);
                }
            } catch (err) {
                setError('Failed to load status history');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatusHistory();
    }, [user]);

    const renderContent = () => {
        if (loading) {
            return <PageLoading />;
        }

        if (error) {
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            );
        }

        if (statusHistory.length === 0) {
            return (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No application status updates available</p>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {statusHistory.map((entry) => (
                    <div
                        key={entry.id}
                        ref={(el) => {
                            if (el) {
                                statusRefs.current[entry.status] = el;
                            }
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-all duration-300"
                        data-status={entry.status}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Application Status</h2>
                            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                entry.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                entry.status === 'Disapproved' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                                {entry.status}
                            </span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                            {entry.status === 'Approved' && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <i className="bi bi-check-circle-fill text-2xl"></i>
                                        <span className="font-medium">Approval Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-green-800 font-semibold">Congratulations! Your registration has been approved.</p>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h5 className="text-blue-800 mb-2">Next Steps:</h5>
                                        <p className="text-blue-700">
                                            Please visit our office at Zone-12 Poblacion Tagoloan Misamis Oriental with the
                                            necessary documents to complete the process,
                                            bring the credit requirements, and print the Credit Application Form.
                                        </p>
                                    </div>
                                    
                                    <button
                                        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 shadow-md"
                                        onClick={() => printApplicationForm(entry.details)}
                                    >
                                        <i className="bi bi-printer-fill"></i>
                                        Print Credit Application Form
                                    </button>
                                    
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                            <i className="bi bi-journal-text text-blue-600"></i> 
                                            Credit Requirements
                                        </h3>
                                        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                                            <ul className="space-y-3">
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                    <span><b>2x2 ID Picture</b> (For both Buyer and Co-maker)</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                                        <i className="bi bi-cash-stack"></i>
                                                    </div>
                                                    <span><b>Proof of Income</b> (Payslips, Certificate of Employment, or Income Tax Return)</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                                                        <i className="bi bi-house-door-fill"></i>
                                                    </div>
                                                    <span><b>Residence Certificate / Cedula</b> (Issued by your local government unit)</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                                        <i className="bi bi-receipt"></i>
                                                    </div>
                                                    <span><b>Proof of Billing</b> (Latest utility bill showing your current address)</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                                                        <i className="bi bi-geo-alt-fill"></i>
                                                    </div>
                                                    <span><b>Driver's License</b> (if applicable)</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                                                        <i className="bi bi-card-checklist"></i>
                                                    </div>
                                                    <span><b>Government-Issued IDs</b> (e.g., Passport, Voter's ID, or UMID)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {entry.status === 'Disapproved' && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-red-600">
                                        <i className="bi bi-x-circle-fill text-2xl"></i>
                                        <span className="font-medium">Disapproval Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <p className="text-red-800 font-semibold">We regret to inform you that your registration has been disapproved.</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
                                        <h3 className="text-gray-800 font-semibold mb-2">Next Steps:</h3>
                                        <p className="text-gray-700">
                                            Please contact our office for further assistance and information about reapplying.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mt-4 p-3 bg-blue-50 rounded-lg">
                                        <i className="bi bi-telephone-fill text-blue-600 text-xl"></i>
                                        <div>
                                            <p className="font-medium">Contact our support team:</p>
                                            <p className="text-blue-600">+63 - 09213873372</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {entry.status === 'Pending' && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-yellow-600">
                                        <i className="bi bi-hourglass-split text-2xl"></i>
                                        <span className="font-medium">Submitted Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <p className="text-yellow-800 font-semibold">Your registration is currently under review.</p>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                        <h6 className="text-gray-800 mb-2">Next Steps:</h6>
                                        <p className="text-gray-700">
                                            Please wait for further updates. Our team is reviewing your application.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
                                        <div className="flex items-center gap-2">
                                            <i className="bi bi-clock-history text-gray-600"></i>
                                            <span className="text-gray-600">Typical response time: 1-3 business days</span>
                                        </div>
                                        <div className="bg-yellow-200 w-32 h-2 rounded-full overflow-hidden">
                                            <div className="bg-yellow-500 w-1/2 h-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content mt-0">
                <div className="container-fluid">
                    <div className="flex flex-col gap-4">
                        <Breadcrumb title="Application Status History" active="Application Status History" />
                        
                        {/* Main Content */}
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xxl:col-span-12 col-span-12">
                                <div className="box overflow-hidden main-content-card">
                                    <div className="box-body p-5">
                                        {renderContent()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Status;