import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
// Import layout components
import Header from '../../layouts/AdminLayouts/AdminHeader';
import Sidemenu from '../../layouts/AdminLayouts/AdminSidemenu';
import Breadcrumb from '../../components/AdminBreadcrums';
import PageLoading from '../../components/PageLoading';
// Import step components
import Step1PersonalAddress from './Request&Applications/Step1PersonalAddress';
import Step2PersonalFamily from './Request&Applications/Step2PersonalFamily';
import Step3ParentalCredit from './Request&Applications/Step3ParentalCredit';
import Step4EmploymentPayment from './Request&Applications/Step4EmploymentPayment';
import Step5CoMaker from './Request&Applications/Step5CoMaker';
import Step6CreditInquiry from './Request&Applications/Step6CreditInquiry';

//Define the Application Request Interface:Add personalFirstName and personalAge to the ApplicationRequest interface.
interface ApplicationRequest {
    id: number;
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
    
    // Step 3 - Parental & Credit Information
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
    personal_use: boolean | string;
    business_use: boolean | string;
    gift: boolean | string;
    use_by_relative: boolean | string;
    
    // Mode of Payment
    post_dated_checks: boolean | string;
    cash_paid_to_office: boolean | string;
    cash_for_collection: boolean | string;
    credit_card: boolean | string;
    
    co_makers: Array<{
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
    }>;
    sketch_residence_path: string | null;
    sketch_residence_comaker_path: string | null;
    applicant_signature_path: string | null;
    spouse_signature_path: string | null;
    comaker_signature_path: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    status?: string;
}

const ApplicationRequest = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState<ApplicationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewingDetails, setViewingDetails] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (!user || user.role !== 'admin') {
                    setError('Unauthorized access');
                    return;
                }

                const response = await api.get('/application-requests');
                setApplications(response.data);
            } catch (err) {
                setError('Failed to fetch applications');
                console.error('Error fetching applications:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]); 

    // Filter applications
    const filteredApplications = applications.filter(app => {
        const matchesSearch = 
            app.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.personal_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (app.personal_last_name && app.personal_last_name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (statusFilter === "all") return matchesSearch;
        
        if (!app.status) return statusFilter === "Pending" && matchesSearch;
        
        const statusEntries = app.status.split(',');
        const latestEntry = statusEntries[statusEntries.length - 1].trim();
        
        return latestEntry.startsWith(statusFilter) && matchesSearch;
    });
    
    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    
    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleStatusUpdate = async (id: number, status: 'Approved' | 'Disapproved') => {
        const isApproved = status === 'Approved';
        
        Swal.fire({
            title: isApproved ? 'Approve Application' : 'Disapprove Application',
            text: isApproved 
                ? 'Are you sure you want to approve this application?' 
                : 'Are you sure you want to disapprove this application?',
            icon: isApproved ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonColor: isApproved ? '#3CB371' : '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: isApproved ? 'Yes, approve it!' : 'Yes, disapprove it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
        try {
            const response = await api.put(`/application-requests/${id}/status`, { status });
            setApplications((prev) =>
                prev.map((app) =>
                    app.id === id ? { ...app, status: response.data.status } : app
                )
            );
                    
                    Swal.fire({
                        title: isApproved ? 'Approved!' : 'Disapproved!',
                        text: isApproved 
                            ? 'The application has been approved successfully.' 
                            : 'The application has been disapproved.',
                        icon: isApproved ? 'success' : 'info',
                        confirmButtonColor: isApproved ? '#3CB371' : '#3085d6'
                    }).then(() => {
                        // Return to user information page
                        toggleViewDetails(null);
                    });
        } catch (err) {
            console.error(`Failed to update status to ${status}:`, err);
                    Swal.fire({
                        title: 'Error!',
                        text: `Failed to update application status. Please try again.`,
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            }
        });
    };

    const toggleViewDetails = (id: number | null) => {
        setViewingDetails(id);
    };

    const getStatusColor = (status: string | undefined): string => {
        if (!status) return 'bg-yellow-100 text-yellow-800'; // Pending
        
        const statusEntries = status.split(',');
        const latestEntry = statusEntries[statusEntries.length - 1].trim();
        
        if (latestEntry.startsWith('Approved')) {
            return 'bg-green-100 text-green-800';
        } else if (latestEntry.startsWith('Disapproved')) {
            return 'bg-red-100 text-red-800';
        } else {
            return 'bg-yellow-100 text-yellow-800'; // Pending
        }
    };
    
    const getStatusText = (status: string | undefined): string => {
        if (!status) return 'Pending';
        
        const statusEntries = status.split(',');
        const latestEntry = statusEntries[statusEntries.length - 1].trim();
        
        return latestEntry.split('|')[0].trim();
    };

    const renderContent = () => {
        if (loading) {
            return <PageLoading />;
        }
    
        if (error) {
            return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>;
        }
    
        if (!user || user.role !== 'admin') {
            return (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Access Denied!</strong>
                    <span className="block sm:inline"> You must be an admin to view this page.</span>
                </div>
            );
        }
    
        if (viewingDetails !== null) {
            const app = applications.find(app => app.id === viewingDetails);
            
            if (!app) {
                return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> Application not found</span>
                </div>;
            }
    
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const handleApplicationUpdate = (updatedData: any) => {
                setApplications(prevApplications => 
                    prevApplications.map(prevApp => 
                        prevApp.id === updatedData.id ? { ...prevApp, ...updatedData } : prevApp
                    )
                );
            };

            return (
                <div>
                    <h1 className="text-2xl font-bold mb-6">Credit Application Form Details</h1>
                    <table className="w-full border border-collapse border-black mb-6">
                        <tbody>
                            <Step1PersonalAddress app={app} onUpdate={handleApplicationUpdate} />
                            <Step2PersonalFamily app={app} />
                            <Step3ParentalCredit app={app} />
                            <Step4EmploymentPayment app={app} />
                            <Step5CoMaker app={app} />
                            <Step6CreditInquiry app={app} />
                        </tbody>
                        
                    </table>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button
                            onClick={() => toggleViewDetails(null)}
                            className="px-6 py-3 rounded-lg border-2 border-black bg-white text-gray-700 font-semibold shadow-md"
                        >
                            ← Back to User Information
                        </button>

                        <button
                            onClick={() => handleStatusUpdate(app.id, 'Approved')}
                            className="px-6 py-3 rounded-lg bg-green-500 border-2 border-black text-white font-semibold shadow-md"
                        >
                             Approve
                        </button>

                        <button
                            onClick={() => handleStatusUpdate(app.id, 'Disapproved')}
                            className="px-6 py-3 rounded-lg bg-red-500 border-2 border-black text-white font-semibold shadow-md"
                        >
                             Disapprove
                        </button>
                    </div>
                </div>
            );
        }
    
        return (
            <div>
                {/* Search and Filter Bar */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                placeholder="Search name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="block w-40 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Disapproved">Disapproved</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
                
                {filteredApplications.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No applications found matching your criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-red-500">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date Submitted</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentItems.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(app.created_at).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                                {getStatusText(app.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => toggleViewDetails(app.id)} 
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                            >
                                                <i className="ri-file-list-line mr-1"></i>
                                                View Application Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* Pagination */}
                {filteredApplications.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                                    currentPage === 1 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                                    currentPage === totalPages 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">{indexOfFirstItem + 1}</span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                    {Math.min(indexOfLastItem, filteredApplications.length)}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">{filteredApplications.length}</span>{' '}
                                    results
                                </p>
                            </div>

                            <div className="flex items-center">
                                <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => paginate(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                currentPage === index + 1
                                                    ? 'z-10 bg-red-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                            currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Application Requests"
                        active="Application Requests"
                    />
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
        </>
    );
};

export default ApplicationRequest;