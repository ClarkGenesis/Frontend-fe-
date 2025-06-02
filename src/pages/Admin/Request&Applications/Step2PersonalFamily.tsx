import React, { useState } from 'react';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

interface Step2Props {
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

const Step2PersonalFamily: React.FC<Step2Props> = ({ app, onUpdate }) => {
    const [formData, setFormData] = useState({
        contact_home_phone: app.contact_home_phone || '',
        contact_office_phone: app.contact_office_phone || '',
        contact_mobile_phone: app.contact_mobile_phone || '',
        contact_email: app.contact_email || '',
        contact_spouse_name: app.contact_spouse_name || '',
        contact_age: app.contact_age || '',
        contact_dependents: app.contact_dependents || '',
        contact_provincial_spouse: app.contact_provincial_spouse || '',
        contact_mobile_no: app.contact_mobile_no || '',
        information_email: app.information_email || '',
        dependents_info: app.dependents_info || [],
        applicant_father_name: app.applicant_father_name || '',
        applicant_mother_name: app.applicant_mother_name || '',
        applicant_occupation: app.applicant_occupation || '',
        applicant_mobile_no: app.applicant_mobile_no || '',
        applicant_address: app.applicant_address || '',
        spouse_father_name: app.spouse_father_name || '',
        spouse_mother_name: app.spouse_mother_name || '',
        spouse_occupation: app.spouse_occupation || '',
        spouse_mobile_no: app.spouse_mobile_no || '',
        spouse_address: app.spouse_address || ''
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

            const response = await api.put(`/application-requests/${app.id}/personal-family`, formData);
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
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">Personal & Family Profile</th>
            </tr>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Contact Information</th>
            </tr>
            <tr>
                <EditableField 
                    label="Home Phone"
                    value={formData.contact_home_phone}
                    name="contact_home_phone"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Office Phone"
                    value={formData.contact_office_phone}
                    name="contact_office_phone"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Mobile Phone"
                    value={formData.contact_mobile_phone}
                    name="contact_mobile_phone"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Email"
                    value={formData.contact_email}
                    name="contact_email"
                    type="email"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Name of Spouse"
                    value={formData.contact_spouse_name}
                    name="contact_spouse_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Age"
                    value={formData.contact_age}
                    name="contact_age"
                    type="number"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Number of Dependents"
                    value={formData.contact_dependents}
                    name="contact_dependents"
                    type="number"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Provincial Spouse"
                    value={formData.contact_provincial_spouse}
                    name="contact_provincial_spouse"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Mobile No"
                    value={formData.contact_mobile_no}
                    name="contact_mobile_no"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Information Email"
                    value={formData.information_email}
                    name="information_email"
                    type="email"
                    onChange={handleFieldChange}
                />
                <td className="p-2 border border-black" colSpan={2}></td>
            </tr>

            {/* Dependents Information */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Dependents Information</th>
            </tr>
            
            {(() => {
                let parsedDependentsInfo = [];
                try {
                    if (formData.dependents_info) {
                        if (typeof formData.dependents_info === 'string') {
                            parsedDependentsInfo = JSON.parse(formData.dependents_info);
                        } else if (Array.isArray(formData.dependents_info)) {
                            parsedDependentsInfo = formData.dependents_info;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing dependents_info:', e);
                }

                if (!Array.isArray(parsedDependentsInfo) || parsedDependentsInfo.length === 0) {
                    return (
                        <tr>
                            <td colSpan={4} className="p-2 border border-black text-center text-gray-500 italic">
                                No dependents information added
                            </td>
                        </tr>
                    );
                }

                return parsedDependentsInfo.map((dependent, index) => (
                    <React.Fragment key={dependent.id || index}>
                        <tr>
                            <th colSpan={4} className="p-2 border border-black bg-gray-50 font-semibold text-left">
                                Dependents Information #{index + 1}
                            </th>
                        </tr>
                        <tr>
                            <EditableField 
                                label="Name"
                                value={dependent.name || ''}
                                name={`dependents_info.${index}.name`}
                                onChange={(_name, value) => {
                                    const newDependents = [...parsedDependentsInfo];
                                    newDependents[index] = { ...dependent, name: value };
                                    setFormData(prev => ({ ...prev, dependents_info: newDependents }));
                                }}
                            />
                            <EditableField 
                                label="Age"
                                value={dependent.age || ''}
                                name={`dependents_info.${index}.age`}
                                type="number"
                                onChange={(_name, value) => {
                                    const newDependents = [...parsedDependentsInfo];
                                    newDependents[index] = { ...dependent, age: value };
                                    setFormData(prev => ({ ...prev, dependents_info: newDependents }));
                                }}
                            />
                            <EditableField 
                                label="Grade/Occupation"
                                value={dependent.gradeOccupation || ''}
                                name={`dependents_info.${index}.gradeOccupation`}
                                onChange={(_name, value) => {
                                    const newDependents = [...parsedDependentsInfo];
                                    newDependents[index] = { ...dependent, gradeOccupation: value };
                                    setFormData(prev => ({ ...prev, dependents_info: newDependents }));
                                }}
                            />
                            <EditableField 
                                label="School/Company"
                                value={dependent.schoolCompany || ''}
                                name={`dependents_info.${index}.schoolCompany`}
                                onChange={(_name, value) => {
                                    const newDependents = [...parsedDependentsInfo];
                                    newDependents[index] = { ...dependent, schoolCompany: value };
                                    setFormData(prev => ({ ...prev, dependents_info: newDependents }));
                                }}
                            />
                        </tr>
                        <tr>
                            <EditableField 
                                label="Office Phone"
                                value={dependent.officePhone || ''}
                                name={`dependents_info.${index}.officePhone`}
                                onChange={(_name, value) => {
                                    const newDependents = [...parsedDependentsInfo];
                                    newDependents[index] = { ...dependent, officePhone: value };
                                    setFormData(prev => ({ ...prev, dependents_info: newDependents }));
                                }}
                            />
                            <td className="p-2 border border-black" colSpan={3}></td>
                        </tr>
                    </React.Fragment>
                ));
            })()}

            {/* Applicant's Parents Section */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Applicant's Parents (First/Middle/Last)</th>
            </tr>
            <tr>
                <EditableField 
                    label="Name of Father"
                    value={formData.applicant_father_name || ''}
                    name="applicant_father_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Name of Mother"
                    value={formData.applicant_mother_name || ''}
                    name="applicant_mother_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Occupation"
                    value={formData.applicant_occupation || ''}
                    name="applicant_occupation"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Mobile No"
                    value={formData.applicant_mobile_no || ''}
                    name="applicant_mobile_no"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Address"
                    value={formData.applicant_address}
                    name="applicant_address"
                    onChange={handleFieldChange}
                />
                <td className="p-2 border border-black" colSpan={3}></td>
            </tr>

            {/* Spouse's Parents Section */}
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-100 font-semibold text-left">Spouse's Parents (First/Middle/Last)</th>
            </tr>
            <tr>
                <EditableField 
                    label="Name of Father"
                    value={formData.spouse_father_name || ''}
                    name="spouse_father_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Name of Mother"
                    value={formData.spouse_mother_name || ''}
                    name="spouse_mother_name"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Occupation"
                    value={formData.spouse_occupation || ''}
                    name="spouse_occupation"
                    onChange={handleFieldChange}
                />
                <EditableField 
                    label="Mobile No"
                    value={formData.spouse_mobile_no || ''}
                    name="spouse_mobile_no"
                    onChange={handleFieldChange}
                />
            </tr>
            <tr>
                <EditableField 
                    label="Address"
                    value={formData.spouse_address}
                    name="spouse_address"
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
                        Save Changes in Step 2 - Personal & Family Profile
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Step2PersonalFamily;
