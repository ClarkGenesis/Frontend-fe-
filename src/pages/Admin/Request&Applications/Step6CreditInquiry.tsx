import React from 'react';
import ImageWithFallback from '../../../components/ImageWithFallback';

interface Step6Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app: any; // We'll use the ApplicationRequest type from the parent
}

const Step6CreditInquiry: React.FC<Step6Props> = ({ app }) => {
    const renderFinalImage = (label: string, imageType: string, altText: string) => {
        const urlField = app[`${imageType}_url`];
        const pathField = app[`${imageType}_path`];
        const fileType = imageType.includes('sketch') ? 'sketches' : 'signatures';
        
        if (!urlField && !pathField) {
            return (
                <div className="mb-4">
                    <span className="font-medium">{label}:</span> 
                    <span className="ml-2 italic text-gray-500">No image provided</span>
                </div>
            );
        }
        
        return (
            <div className="mb-4">
                <span className="font-medium">{label}:</span>
                <div className="mt-2">
                    <ImageWithFallback
                        urlField={urlField}
                        pathField={pathField}
                        fileType={fileType as 'signatures' | 'sketches'}
                        alt={altText}
                        className="border border-gray-300 rounded"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '150px',
                            height: 'auto',
                            display: 'block',
                            margin: '8px auto'
                        }}
                    />
                </div>
            </div>
        );
    };
    
    return (
        <>
            <tr>
                <th colSpan={4} className="p-2 border border-black bg-gray-200 font-semibold text-left">Credit Inquiry Authorization</th>
            </tr>
            <tr>
                <td colSpan={4} className="p-2 border border-black">
                    <div className="grid grid-cols-2 gap-4 mb-9">
                        <div>
                            {renderFinalImage("Upload Sketch of Your Residence or Business Address (Applicant):", "sketch_residence", "Sketch of Residence")}
                        </div>
                        <div>
                            {renderFinalImage("Upload Sketch of Your Co-Maker's Residence:", "sketch_residence_comaker", "Sketch of Co-maker Residence")}
                        </div>
                        <div></div>
                    </div>
                    
                    <div className="my-6 text-center">
                        <p className="font-medium">This is to authorize Premio and its representative to perform the credit inquiries and verify the data written above.</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            {renderFinalImage("Applicant's Signature", "applicant_signature", "Applicant's Signature")}
                        </div>
                        <div>
                            {renderFinalImage("Spouse's Signature", "spouse_signature", "Spouse's Signature")}
                        </div>
                        <div>
                            {renderFinalImage("Co-maker's Signature", "comaker_signature", "Co-maker's Signature")}
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Step6CreditInquiry;
