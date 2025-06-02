/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

interface Step5Props {
    app: any; // We'll use the ApplicationRequest type from the parent
    onUpdate?: (updatedData: any) => void;
}

interface EditableFieldProps {
    label: string;
    value: string | number;
    name: string;
    type?: string;
    onChange: (name: string, value: string) => void;
    wrapInTd?: boolean; // New prop to control whether to wrap in td
}

interface EditableContentProps {
    label: string;
    value: string | number;
    name: string;
    type?: string;
    onChange: (name: string, value: string) => void;
}

interface CoMakerData {
    id?: string;
    firstName: string;
    age: string;
    sex: string;
    civilStatus: string;
    blockStreet: string;
    zonePurok: string;
    barangay: string;
    municipalityCity: string;
    province: string;
    lengthOfStay: string;
    residence: string;
    makerBlockStreet: string;
    makerZonePurok: string;
    makerBarangay: string;
    makerMunicipalityCity: string;
    makerProvince: string;
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
    creditReferences: string;
}

// Extracted the editable content without td wrapper
const EditableContent: React.FC<EditableContentProps> = ({ label, value, name, type = 'text', onChange }) => {
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
        <div onClick={handleClick} className="w-full">
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
        </div>
    );
};

// Standard editable field wrapped in td
const EditableField: React.FC<EditableFieldProps> = ({ label, value, name, type = 'text', onChange, wrapInTd = true }) => {
    if (wrapInTd) {
        return (
            <td className="p-2 border border-black">
                <EditableContent 
                    label={label}
                    value={value}
                    name={name}
                    type={type}
                    onChange={onChange}
                />
            </td>
        );
    }
    
    return (
        <EditableContent 
            label={label}
            value={value}
            name={name}
            type={type}
            onChange={onChange}
        />
    );
};

const Step5CoMaker: React.FC<Step5Props> = ({ app, onUpdate }) => {
    const [coMakers, setCoMakers] = useState<CoMakerData[]>(() => {
        try {
            return app.co_makers ? (
                typeof app.co_makers === 'string' ? 
                    JSON.parse(app.co_makers) : 
                    app.co_makers
            ) : [];
        } catch (e) {
            console.error('Error parsing co_makers:', e);
            return [];
        }
    });

    const handleFieldChange = (index: number, name: string, value: string) => {
        setCoMakers(prevCoMakers => {
            const updatedCoMakers = [...prevCoMakers];
            updatedCoMakers[index] = {
                ...updatedCoMakers[index],
                [name]: value
            };
            return updatedCoMakers;
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

            const response = await api.put(`/application-requests/${app.id}/co-maker`, {
                co_makers: coMakers
            });
            
            if (response.data.success) {
                if (onUpdate) {
                    onUpdate(response.data.data);
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

    return (
        <>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">Co-Maker & Employment Details</th>
            </tr>
            {coMakers.length > 0 ? (
                <>
                    {coMakers.map((coMaker, index) => (
                        <React.Fragment key={coMaker.id || index}>
                            <tr>
                                <th colSpan={4} className="p-2 border border-black bg-gray-100 text-left">
                                    Co-Maker #{index + 1}
                                </th>
                            </tr>
                            
                            {/* Co-Maker Information */}
                            <tr>
                                <th colSpan={4} className="p-1 border border-black bg-gray-50 text-left pl-4">
                                    Co-Maker Information (First/Middle/Last)
                                </th>
                            </tr>
                            <tr>
                                <EditableField 
                                    label="First Name"
                                    value={coMaker.firstName}
                                    name="firstName"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Age"
                                    value={coMaker.age}
                                    name="age"
                                    type="number"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Sex"
                                    value={coMaker.sex}
                                    name="sex"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Civil Status"
                                    value={coMaker.civilStatus}
                                    name="civilStatus"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                            </tr>
                            
                            {/* Present Address */}
                            <tr>
                                <th colSpan={4} className="p-1 border border-black bg-gray-50 text-left pl-4">
                                    Present Address
                                </th>
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Block/Street"
                                    value={coMaker.blockStreet}
                                    name="blockStreet"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Zone/Purok"
                                    value={coMaker.zonePurok}
                                    name="zonePurok"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Barangay"
                                    value={coMaker.barangay}
                                    name="barangay"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Municipality/City"
                                    value={coMaker.municipalityCity}
                                    name="municipalityCity"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Province"
                                    value={coMaker.province}
                                    name="province"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Length of Stay"
                                    value={coMaker.lengthOfStay}
                                    name="lengthOfStay"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Residence"
                                    value={coMaker.residence}
                                    name="residence"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <td className="p-2 border border-black"></td>
                            </tr>
                            
                            {/* Maker Information Address */}
                            <tr>
                                <th colSpan={4} className="p-1 border border-black bg-gray-50 text-left pl-4">
                                    Information Address
                                </th>
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Block/Street"
                                    value={coMaker.makerBlockStreet}
                                    name="makerBlockStreet"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Zone/Purok"
                                    value={coMaker.makerZonePurok}
                                    name="makerZonePurok"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Barangay"
                                    value={coMaker.makerBarangay}
                                    name="makerBarangay"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Municipality/City"
                                    value={coMaker.makerMunicipalityCity}
                                    name="makerMunicipalityCity"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Province"
                                    value={coMaker.makerProvince}
                                    name="makerProvince"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <td className="p-2 border border-black" colSpan={3}></td>
                            </tr>
                            
                            {/* Additional Information */}
                            <tr>
                                <th colSpan={4} className="p-1 border border-black bg-gray-50 text-left pl-4">
                                    Additional Information
                                </th>
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Relationship"
                                    value={coMaker.relationshipWithApplicant}
                                    name="relationshipWithApplicant"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Birthday"
                                    value={coMaker.birthday}
                                    name="birthday"
                                    type="date"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="TIN"
                                    value={coMaker.tin}
                                    name="tin"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Mobile No"
                                    value={coMaker.mobileNo}
                                    name="mobileNo"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Present Employer"
                                    value={coMaker.presentEmployer}
                                    name="presentEmployer"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Date Hired"
                                    value={coMaker.dateHired}
                                    name="dateHired"
                                    type="date"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Position"
                                    value={coMaker.position}
                                    name="position"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Gross Income"
                                    value={coMaker.grossIncome}
                                    name="grossIncome"
                                    type="number"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                            </tr>
                            <tr>
                                <EditableField 
                                    label="Employer Address"
                                    value={coMaker.employerAddress}
                                    name="employerAddress"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <EditableField 
                                    label="Employment Status"
                                    value={coMaker.employmentStatus}
                                    name="employmentStatus"
                                    onChange={(name, value) => handleFieldChange(index, name, value)}
                                />
                                <td className="p-2 border border-black" colSpan={2}></td>
                            </tr>
                            
                            {/* Credit References - Fixed to avoid nesting td elements */}
                            <tr>
                                <th colSpan={4} className="p-1 border border-black bg-gray-50 text-left pl-4">
                                    Credit References
                                </th>
                            </tr>
                            <tr>
                                <td className="p-2 border border-black" colSpan={4}>
                                    <div className="font-semibold text-sm text-gray-600">Installment/Banking Institutions</div>
                                    <div className="mt-1" onClick={() => {
                                        const newValue = prompt("Enter credit references", coMaker.creditReferences);
                                        if (newValue !== null) {
                                            handleFieldChange(index, "creditReferences", newValue);
                                        }
                                    }}>
                                        {coMaker.creditReferences || '-'}
                                    </div>
                                </td>
                            </tr>
                            
                            {index < coMakers.length - 1 && (
                                <tr>
                                    <td colSpan={4} className="h-4"></td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    {/* Save Button */}
                    <tr>
                        <td colSpan={4} className="p-2 border border-black">
                            <button
                                onClick={handleSave}
                                className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Save Changes in Step 5 - Co-Maker & Employment Details
                            </button>
                        </td>
                    </tr>
                </>
            ) : (
                <tr>
                    <td colSpan={4} className="p-6 border border-black text-center text-gray-500">
                        <div className="py-4">No co-maker information available</div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default Step5CoMaker; 