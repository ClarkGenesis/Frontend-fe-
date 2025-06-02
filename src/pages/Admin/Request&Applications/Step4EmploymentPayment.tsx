import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

interface Step4Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app: any; // We'll use the ApplicationRequest type from the parent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate?: (updatedData: any) => void;
}

interface EditableFieldProps {
    label: string;
    value: string | number;
    name: string;
    type?: string;
    onChange: (name: string, value: string) => void;
}

interface MobileFieldProps {
    label: string;
    value: string;
    name: string;
    onChange: (name: string, value: string) => void;
}

interface FormData {
    [key: string]: string | number | boolean; // Add index signature
    applicant_employer: string;
    applicant_position: string;
    applicant_block_street: string;
    applicant_zone_purok: string;
    applicant_barangay: string;
    applicant_municipality_city: string;
    applicant_province: string;
    applicant_telno: string;
    applicant_date_started: string;
    applicant_name_immediate: string;
    applicant_employer_mobile_no: string; // This should match backend field name
    applicant_salary_gross: string | number;
    spouse_employer: string;
    spouse_position: string;
    spouse_block_street: string;
    spouse_zone_purok: string;
    spouse_barangay: string;
    spouse_municipality: string;
    spouse_province: string;
    spouse_telno: string;
    spouse_date_started: string;
    spouse_name_immediate: string;
    spouse_employer_mobile_no: string; // This should match backend field name
    spouse_salary_gross: string | number;
    personal_use: boolean;
    business_use: boolean;
    gift: boolean;
    use_by_relative: boolean;
    post_dated_checks: boolean;
    cash_paid_to_office: boolean;
    cash_for_collection: boolean;
    credit_card: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, name, type = 'text', onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState<string | number>(value);

    // Update internal state when parent value changes
    useEffect(() => {
        setEditValue(value);
    }, [value]);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(name, String(editValue));
    };

    // Display function for all values
    const displayValue = () => {
        if (value === null || value === undefined || value === '') {
            return <span className="text-gray-400">-</span>;
        }
        
        // For date fields, format to remove time portion
        if (type === 'date' && typeof value === 'string' && value.includes('T')) {
            return value.split('T')[0];
        }
        
        return value;
    };

    return (
        <td 
            className="p-2 border border-black" 
            onClick={handleClick}
        >
            <div className="font-semibold text-sm text-gray-600">{label}</div>
            {isEditing ? (
                <input
                    type={type}
                    value={type === 'date' && typeof editValue === 'string' && editValue.includes('T')
                        ? editValue.split('T')[0]
                        : editValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-full p-1 border rounded"
                />
            ) : (
                <div className="mt-1">
                    {displayValue()}
                </div>
            )}
        </td>
    );
};

// Special component for mobile number fields to ensure they always display properly
const MobileField: React.FC<MobileFieldProps> = ({ label, value, name, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState<string>(value || '');
    
    // Update internal state when parent value changes
    useEffect(() => {
        setEditValue(value || '');
    }, [value, name]);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(name, editValue);
    };

    return (
        <td 
            className="p-2 border border-black bg-blue-50" 
            onClick={handleClick}
        >
            <div className="font-semibold text-sm text-gray-600">{label}</div>
            {isEditing ? (
                <input
                    type="text"
                    value={editValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    placeholder="Enter mobile number"
                    className="w-full p-1 border rounded"
                />
            ) : (
                <div className="mt-1">
                    {value ? (
                        <span className="font-medium">{value}</span>
                    ) : (
                        <span className="text-gray-500">-</span>
                    )}
                </div>
            )}
        </td>
    );
};

const Step4EmploymentPayment: React.FC<Step4Props> = ({ app, onUpdate }) => {
    // Helper function to ensure consistent string value
    const ensureString = (value: any): string => {
        // If value is null, undefined, or the string "null", return empty string
        if (value === null || value === undefined || value === 'null') return '';
        // Otherwise convert to string
        return String(value);
    };

    // Helper function to get the mobile number field value using both snake_case and camelCase

    // Initialize form data with consistent handling for all fields
    const initialFormData = {
        applicant_employer: app.applicant_employer || '',
        applicant_position: app.applicant_position || '',
        applicant_block_street: app.applicant_block_street || '',
        applicant_zone_purok: app.applicant_zone_purok || '',
        applicant_barangay: app.applicant_barangay || '',
        applicant_municipality_city: app.applicant_municipality_city || '',
        applicant_province: app.applicant_province || '',
        applicant_telno: app.applicant_telno || '',
        applicant_date_started: app.applicant_date_started || '',
        applicant_name_immediate: app.applicant_name_immediate || '',
        // TEST VALUE: Using "12345" for testing display functionality
        applicant_employer_mobile_no: "12345", // Test value to verify field display
        applicant_salary_gross: app.applicant_salary_gross || '',
        spouse_employer: app.spouse_employer || '',
        spouse_position: app.spouse_position || '',
        spouse_block_street: app.spouse_block_street || '',
        spouse_zone_purok: app.spouse_zone_purok || '',
        spouse_barangay: app.spouse_barangay || '',
        spouse_municipality: app.spouse_municipality || '',
        spouse_province: app.spouse_province || '',
        spouse_telno: app.spouse_telno || '',
        spouse_date_started: app.spouse_date_started || '',
        spouse_name_immediate: app.spouse_name_immediate || '',
        // TEST VALUE: Using "12345" for testing display functionality
        spouse_employer_mobile_no: "12345", // Test value to verify field display
        spouse_salary_gross: app.spouse_salary_gross || '',
        personal_use: app.personal_use === true || app.personal_use === '1',
        business_use: app.business_use === true || app.business_use === '1',
        gift: app.gift === true || app.gift === '1',
        use_by_relative: app.use_by_relative === true || app.use_by_relative === '1',
        post_dated_checks: app.post_dated_checks === true || app.post_dated_checks === '1',
        cash_paid_to_office: app.cash_paid_to_office === true || app.cash_paid_to_office === '1',
        cash_for_collection: app.cash_for_collection === true || app.cash_for_collection === '1',
        credit_card: app.credit_card === true || app.credit_card === '1'
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleFieldChange = (name: string, value: string) => {
        // Special handling for mobile number fields to ensure they're always treated as strings
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: value
            };
            
            return newData;
        });
    };

    const handleSave = async () => {
        try {
            // Show loading indicator
            Swal.fire({
                title: 'Saving changes...',
                text: 'Please wait',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await api.put(`/application-requests/${app.id}/employment-payment`, formData);
            
            if (response.data.success) {
                if (onUpdate) {
                    // Update state with the response data - include proper handling for mobile fields
                    const updatedData = {
                        ...response.data.data,
                        applicant_employer_mobile_no: ensureString(response.data.data.applicant_employer_mobile_no),
                        spouse_employer_mobile_no: ensureString(response.data.data.spouse_employer_mobile_no),
                        // Also provide camelCase versions for compatibility
                        applicantEmployerMobileNo: ensureString(response.data.data.applicant_employer_mobile_no),
                        spouseEmployerMobileNo: ensureString(response.data.data.spouse_employer_mobile_no)
                    };
                    
                    onUpdate(updatedData);
                }
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Changes saved successfully!',
                    showConfirmButton: true,
                    timer: 2000,
                    timerProgressBar: true
                });
            } else {
                throw new Error(response.data.message || 'Failed to save changes');
            }
        } catch (error: any) {
            console.error('Error saving changes:', error);
            
            // Show error message with specific error if available
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Failed to save changes. ${error.response?.data?.message || error.message || 'Please try again.'}`,
                showConfirmButton: true
            });
        }
    };

    // Helper functions to format checkbox values
    const getUnitToBeUsedFor = () => {
        const options = [
            app.personal_use === true || app.personal_use === '1' ? 'Personal Use' : null,
            app.business_use === true || app.business_use === '1' ? 'Business Use' : null,
            app.gift === true || app.gift === '1' ? 'Gift' : null,
            app.use_by_relative === true || app.use_by_relative === '1' ? 'Use by Relative / Friend' : null
        ];
        return options.filter(Boolean).join(', ') || 'None';
    };

    const getModeOfPayment = () => {
        const options = [
            app.post_dated_checks === true || app.post_dated_checks === '1' ? 'Post Dated Checks' : null,
            app.cash_paid_to_office === true || app.cash_paid_to_office === '1' ? 'Cash Paid to Office' : null,
            app.cash_for_collection === true || app.cash_for_collection === '1' ? 'Cash for Collection' : null,
            app.credit_card === true || app.credit_card === '1' ? 'Credit Card' : null
        ];
        return options.filter(Boolean).join(', ') || 'None';
    };

    return (
        <>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">Employment & Payment Details Form</th>
            </tr>

            {/* Applicant Employer Information */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Applicant Employer Information</th>
            </tr>
            <tr>
                <EditableField 
                    label="Employer/Business Name"
                    value={formData.applicant_employer}
                    name="applicant_employer"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Position"
                    value={formData.applicant_position}
                    name="applicant_position"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Block Street"
                    value={formData.applicant_block_street}
                    name="applicant_block_street"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Zone/Purok"
                    value={formData.applicant_zone_purok}
                    name="applicant_zone_purok"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Barangay"
                    value={formData.applicant_barangay}
                    name="applicant_barangay"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Municipality/City"
                    value={formData.applicant_municipality_city}
                    name="applicant_municipality_city"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Province"
                    value={formData.applicant_province}
                    name="applicant_province"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Tel No"
                    value={formData.applicant_telno}
                    name="applicant_telno"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Date Started"
                    value={formData.applicant_date_started}
                    name="applicant_date_started"
                    type="date"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Name of Supervisor"
                    value={formData.applicant_name_immediate}
                    name="applicant_name_immediate"
                    onChange={handleFieldChange}
                />
                <MobileField 
                    label="Mobile No"
                    value={formData.applicant_employer_mobile_no}
                    name="applicant_employer_mobile_no"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Salary Gross"
                    value={formData.applicant_salary_gross}
                    name="applicant_salary_gross"
                    type="number"
                    onChange={handleFieldChange}
                />
            </tr>
            
            {/* Spouse Employer Information */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Spouse Employer Information</th>
            </tr>
            <tr>
                <EditableField 
                    label="Employer/Business Name"
                    value={formData.spouse_employer}
                    name="spouse_employer"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Position"
                    value={formData.spouse_position}
                    name="spouse_position"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Block Street"
                    value={formData.spouse_block_street}
                    name="spouse_block_street"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Zone/Purok"
                    value={formData.spouse_zone_purok}
                    name="spouse_zone_purok"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Barangay"
                    value={formData.spouse_barangay}
                    name="spouse_barangay"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Municipality/City"
                    value={formData.spouse_municipality}
                    name="spouse_municipality"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Province"
                    value={formData.spouse_province}
                    name="spouse_province"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Tel No"
                    value={formData.spouse_telno}
                    name="spouse_telno"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Date Started"
                    value={formData.spouse_date_started}
                    name="spouse_date_started"
                    type="date"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Name of Supervisor"
                    value={formData.spouse_name_immediate}
                    name="spouse_name_immediate"
                    onChange={handleFieldChange}
                />
                <MobileField 
                    label="Mobile No"
                    value={formData.spouse_employer_mobile_no}
                    name="spouse_employer_mobile_no"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Salary Gross"
                    value={formData.spouse_salary_gross}
                    name="spouse_salary_gross"
                    type="number"
                    onChange={handleFieldChange}
                />
            </tr>

            {/* Unit to be Used For */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Unit to be Used For</th>
            </tr>
            <tr>
                <td className="p-2 border border-black" colSpan={4}>
                    <span className="font-medium">Unit to be Used For: </span>
                    <span>{getUnitToBeUsedFor()}</span>
                </td>
            </tr>
            
            {/* Mode of Payment */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Mode of Payment</th>
            </tr>
            <tr>
                <td className="p-2 border border-black" colSpan={4}>
                    <span className="font-medium">Mode of Payment: </span>
                    <span>{getModeOfPayment()}</span>
                </td>
            </tr>

            {/* Save Button */}
            <tr>
                <td colSpan={4} className="p-2 border border-black">
                    <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save Changes in Step 4 - Employment & Payment Details
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Step4EmploymentPayment; 