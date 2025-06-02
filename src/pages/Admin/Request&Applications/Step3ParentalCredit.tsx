/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

interface Step3Props {
    app: any; // We'll use the ApplicationRequest type from the parent
    onUpdate?: (updatedData: any) => void;
}

interface EditableFieldProps {
    label: string;
    value: string | number;
    name: string;
    type?: string;
    onChange: (name: string, value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, name, type = 'text', onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(name, editValue.toString());
    };

    return (
        <td className="p-2 border border-black" onClick={handleClick}>
            <div className="font-semibold text-sm text-gray-600">{label}</div>
            {isEditing ? (
                <input
                    type={type}
                    value={editValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-full p-1 border rounded"
                />
            ) : (
                <div className="mt-1">{value || '-'}</div>
            )}
        </td>
    );
};

const Step3ParentalCredit: React.FC<Step3Props> = ({ app, onUpdate }) => {
    const [formData, setFormData] = useState({
        credit_store_bank: app.credit_store_bank || '',
        credit_item_loan_amount: app.credit_item_loan_amount || '',
        credit_term: app.credit_term || '',
        credit_date: app.credit_date || '',
        credit_balance: app.credit_balance || '',
        references_full_name: app.references_full_name || '',
        references_relationship: app.references_relationship || '',
        references_tel_no: app.references_tel_no || '',
        references_address: app.references_address || '',
        source_of_income: app.source_of_income || []
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

            const response = await api.put(`/application-requests/${app.id}/parental-credit`, formData);
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

    // Parse Source of Income (still JSON)
    const getSourceOfIncome = () => {
        try {
            if (formData.source_of_income) {
                if (typeof formData.source_of_income === 'string') {
                    return JSON.parse(formData.source_of_income);
                }
                return formData.source_of_income;
            }
            return [];
        } catch (e) {
            console.error('Error parsing source_of_income:', e);
            return [];
        }
    };

    const sourceOfIncome = getSourceOfIncome();

    return (
        <>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">Parental & Credit Information</th>
            </tr>

            {/* Credit References */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Credit References</th>
            </tr>
            <tr>
                <EditableField 
                    label="Store/Bank"
                    value={formData.credit_store_bank}
                    name="credit_store_bank"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Item/Loan Amount"
                    value={formData.credit_item_loan_amount}
                    name="credit_item_loan_amount"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Term"
                    value={formData.credit_term}
                    name="credit_term"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Date"
                    value={formData.credit_date}
                    name="credit_date"
                    type="date"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Balance"
                    value={formData.credit_balance}
                    name="credit_balance"
                    onChange={handleFieldChange}
                />
                <td className="p-2 border border-black" colSpan={3}></td>
            </tr>

            {/* Personal References */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Personal References</th>
            </tr>
            <tr>
                <EditableField 
                    label="Full Name"
                    value={formData.references_full_name}
                    name="references_full_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Relationship"
                    value={formData.references_relationship}
                    name="references_relationship"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Tel No"
                    value={formData.references_tel_no}
                    name="references_tel_no"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Address"
                    value={formData.references_address}
                    name="references_address"
                    onChange={handleFieldChange}
                />
            </tr>

            {/* Source of Income */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Source of Income</th>
            </tr>
            <tr>
                <td className="p-2 border border-black" colSpan={4}>
                    {sourceOfIncome.length === 0 ? (
                        <span className="text-gray-500 italic">None selected</span>
                    ) : (
                        sourceOfIncome.join(', ')
                    )}
                </td>
            </tr>

            {/* Save Button */}
            <tr>
                <td colSpan={4} className="p-2 border border-black">
                    <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save Changes in Step 3 - Parental & Credit Information
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Step3ParentalCredit; 