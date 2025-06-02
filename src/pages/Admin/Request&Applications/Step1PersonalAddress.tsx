import React, { useState } from 'react';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

interface Step1Props {
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
    options?: string[];
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, name, type = 'text', onChange, options }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(name, editValue.toString());
    };
    
    // Format date values to remove time portion
    const formatValue = () => {
        if (!value) return '-';
        
        // For date type fields, format the date to remove time portion
        if (type === 'date' && typeof value === 'string' && value.includes('T')) {
            return value.split('T')[0];
        }
        
        return value;
    };

    return (
        <td className="p-2 border border-black" onClick={handleClick}>
            <div className="font-semibold text-sm text-gray-600">{label}</div>
            {isEditing ? (
                options ? (
                    <select
                        value={editValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="w-full p-1 border rounded"
                    >
                        <option value="">Select...</option>
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
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
                )
            ) : (
                <div className="mt-1">{formatValue()}</div>
            )}
        </td>
    );
};

const Step1PersonalAddress: React.FC<Step1Props> = ({ app, onUpdate }) => {
    const [formData, setFormData] = useState({
        personal_first_name: app.personal_first_name || '',
        personal_middle_name: app.personal_middle_name || '',
        personal_last_name: app.personal_last_name || '',
        personal_age: app.personal_age || '',
        personal_nb_rb: app.personal_nb_rb || '',
        personal_sex: app.personal_sex || '',
        personal_citizenship: app.personal_citizenship || '',
        personal_birth_date: app.personal_birth_date || '',
        personal_religion: app.personal_religion || '',
        personal_civil_status: app.personal_civil_status || '',
        personal_tin: app.personal_tin || '',
        personal_res_cert_no: app.personal_res_cert_no || '',
        personal_date_issued: app.personal_date_issued || '',
        personal_place_issued: app.personal_place_issued || '',
        present_block_street: app.present_block_street || '',
        present_zone_purok: app.present_zone_purok || '',
        present_barangay: app.present_barangay || '',
        present_municipality_city: app.present_municipality_city || '',
        present_province: app.present_province || '',
        present_length_of_stay: app.present_length_of_stay || '',
        present_house_ownership: app.present_house_ownership || '',
        present_lot_ownership: app.present_lot_ownership || '',
        present_other_properties: app.present_other_properties || [],
        provincial_block_street: app.provincial_block_street || '',
        provincial_zone_purok: app.provincial_zone_purok || '',
        provincial_barangay: app.provincial_barangay || '',
        provincial_municipality_city: app.provincial_municipality_city || '',
        provincial_province: app.provincial_province || ''
    });

    const handleFieldChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

            const response = await api.put(`/application-requests/${app.id}/personal-address`, formData);
            if (onUpdate) {
                onUpdate(response.data);
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
        } catch (error) {
            console.error('Error saving changes:', error);
            
            // Show error message
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save changes. Please try again.',
                showConfirmButton: true
            });
        }
    };

    return (
        <>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">
                    Personal & Address Info
                </th>
            </tr>

            {/* Personal Information */}
            <tr>
                <EditableField 
                    label="First Name"
                    value={formData.personal_first_name}
                    name="personal_first_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Middle Name"
                    value={formData.personal_middle_name}
                    name="personal_middle_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Last Name"
                    value={formData.personal_last_name}
                    name="personal_last_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Age"
                    value={formData.personal_age}
                    name="personal_age"
                    type="number"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="NB/RB"
                    value={formData.personal_nb_rb}
                    name="personal_nb_rb"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Sex"
                    value={formData.personal_sex}
                    name="personal_sex"
                    options={['Male', 'Female']}
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Citizenship"
                    value={formData.personal_citizenship}
                    name="personal_citizenship"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Birth Date"
                    value={formData.personal_birth_date}
                    name="personal_birth_date"
                    type="date"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Religion"
                    value={formData.personal_religion}
                    name="personal_religion"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Civil Status"
                    value={formData.personal_civil_status}
                    name="personal_civil_status"
                    options={['Single', 'Married', 'Separated', 'Widowed']}
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="TIN No."
                    value={formData.personal_tin}
                    name="personal_tin"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Res. Cert. No."
                    value={formData.personal_res_cert_no}
                    name="personal_res_cert_no"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Date Issued"
                    value={formData.personal_date_issued}
                    name="personal_date_issued"
                    type="date"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Place Issued"
                    value={formData.personal_place_issued}
                    name="personal_place_issued"
                    onChange={handleFieldChange}
                />
                <td className="p-2 border border-black" colSpan={2}></td>
            </tr>

            {/* Present Address */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">
                    Present Address
                </th>
            </tr>
            <tr>
                <EditableField 
                    label="Block/Street"
                    value={formData.present_block_street}
                    name="present_block_street"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Zone/Purok"
                    value={formData.present_zone_purok}
                    name="present_zone_purok"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Barangay"
                    value={formData.present_barangay}
                    name="present_barangay"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Municipality/City"
                    value={formData.present_municipality_city}
                    name="present_municipality_city"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Province"
                    value={formData.present_province}
                    name="present_province"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Length of Stay"
                    value={formData.present_length_of_stay}
                    name="present_length_of_stay"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="House"
                    value={formData.present_house_ownership}
                    name="present_house_ownership"
                    options={['Owned', 'Rented', 'Mortgaged']}
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Lot"
                    value={formData.present_lot_ownership}
                    name="present_lot_ownership"
                    options={['Owned', 'Rented', 'Mortgaged']}
                    onChange={handleFieldChange}
                />
            </tr>

            {/* Provincial Address */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">
                    Provincial Address
                </th>
            </tr>
            <tr>
                <EditableField 
                    label="Block/Street"
                    value={formData.provincial_block_street}
                    name="provincial_block_street"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Zone/Purok"
                    value={formData.provincial_zone_purok}
                    name="provincial_zone_purok"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Barangay"
                    value={formData.provincial_barangay}
                    name="provincial_barangay"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Municipality/City"
                    value={formData.provincial_municipality_city}
                    name="provincial_municipality_city"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Province"
                    value={formData.provincial_province}
                    name="provincial_province"
                    onChange={handleFieldChange}
                />
                <td className="p-2 border border-black" colSpan={3}></td>
            </tr>

            {/* Save Button */}
            <tr>
                <td colSpan={4} className="p-2 border border-black">
                    <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save Changes in Step 1 - Personal & Address Info
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Step1PersonalAddress;
