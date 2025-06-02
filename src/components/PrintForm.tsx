import { getFallbackUrls } from '../utils/imageUtils';

interface StatusEntryDetails {
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
    source_of_income: string[] | string;
    
    other_properties: string[];
    spouse_first_name: string | null;
    spouse_age: number | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    co_makers: any; // Allow both string and array types for parsing
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

export const printApplicationForm = (details: StatusEntryDetails | undefined) => {
    if (!details) return;

    const backendBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"; // Fallback if VITE_API_URL is not set


    // Update the image tags to include all fallback URLs 
    const generateImgWithFallbacks = (path: string | null, type: 'sketches' | 'signatures', alt: string): string => {
        const maxHeight = type === 'sketches' ? '200px' : '150px';
        
        if (!path) {
            console.log(`Print form: No path provided for ${alt}`);
            return `<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="${alt}" style="width: 100%; max-height: ${maxHeight}; object-fit: contain;">`;
        }
        
        const urls = getFallbackUrls(null, path, type);
        console.log(`Print form: Generated URLs for ${alt}:`, urls);
        
        if (urls.length === 0) {
            console.log(`Print form: No URLs generated for ${alt}`);
            return `<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="${alt}" style="width: 100%; max-height: ${maxHeight}; object-fit: contain;">`;
        }
        
        // Create a unique ID for this image
        const uniqueId = `img_${Math.random().toString(36).substring(2, 15)}`;
        
        // Try multiple approaches for images - use direct file access as primary
        const cleanPath = path.replace(/^\/+/, '').trim(); // Remove leading slashes
        const normalizedPath = cleanPath.startsWith(type) ? cleanPath : `${type}/${cleanPath}`;
        
        // Direct access and fallback URLs
        const serveImageUrl = `${backendBaseUrl}/serve-image.php?path=${encodeURIComponent(normalizedPath)}`;
        const directStorageUrl = `${backendBaseUrl}/storage/${normalizedPath}`;
        const directAccessUrl = `${backendBaseUrl}/direct-access/${normalizedPath}`;
        
        // Store all URLs as data attributes - include additional URLs for more chances
        const allUrls = [directStorageUrl, serveImageUrl, directAccessUrl, ...urls];
        const uniqueUrls = Array.from(new Set(allUrls)); // Remove duplicates
        const urlsJson = JSON.stringify(uniqueUrls);
        
        // Style for error message and loading indicator
        const errorStyle = 'color: #e53e3e; margin-top: 8px; text-align: center; font-size: 12px;';
        
        return `
            <div style="position: relative; min-height: 100px;">
                <img 
                    id="${uniqueId}"
                    src="${directStorageUrl}" 
                    alt="${alt}" 
                    style="width: 100%; max-height: ${maxHeight}; object-fit: contain;" 
                    data-fallback-urls='${urlsJson}'
                    data-original-path="${path}"
                    data-file-type="${type}"
                    data-attempt="0"
                />
                <div id="${uniqueId}_error" style="${errorStyle}; display: none;">Failed to load image</div>
                <div id="${uniqueId}_loading" class="loading-indicator" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background-color: rgba(255,255,255,0.7);">
                    <div style="text-align: center;">
                        <div>Loading...</div>
                        <div style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 10px auto;"></div>
                    </div>
                </div>
            </div>
        `;
    };

    const tdStyle = 'style="padding: 6px; border: 1px solid #ccc; vertical-align: top;"';
    const thStyle = 'style="padding: 8px; border: 1px solid #ccc; text-align: left; background-color: #f0f0f0; font-weight: bold;"'; // th style

    // Map field names from snake_case to camelCase for compatibility
    const creditStoreBank = details.credit_store_bank;
    const creditItemLoanAmount = details.credit_item_loan_amount;
    const creditTerm = details.credit_term;
    const creditDate = details.credit_date;
    const creditBalance = details.credit_balance;
    const referencesFullName = details.references_full_name;
    const referencesRelationship = details.references_relationship;
    const referencesTelNo = details.references_tel_no;
    const referencesAddress = details.references_address;

    // Parse co-makers data
    let coMakers = [];
    try {
        if (details.co_makers) {
            if (typeof details.co_makers === 'string') {
                coMakers = JSON.parse(details.co_makers);
            } else if (Array.isArray(details.co_makers)) {
                coMakers = details.co_makers;
            }
        }
    } catch (e) {
        console.error('Error parsing co_makers:', e);
        coMakers = [];
    }

    // Parse present_other_properties data
    let presentOtherProperties: string[] = [];
    try {
        if (details.present_other_properties) {
            if (typeof details.present_other_properties === 'string') {
                presentOtherProperties = JSON.parse(details.present_other_properties);
            } else if (Array.isArray(details.present_other_properties)) {
                presentOtherProperties = details.present_other_properties;
            }
        }
    } catch (e) {
        console.error('Error parsing present_other_properties:', e);
        presentOtherProperties = [];
    }

    // Parse dependents_info data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dependentsInfo: Array<any> = [];
    try {
        if (details.dependents_info) {
            if (typeof details.dependents_info === 'string') {
                dependentsInfo = JSON.parse(details.dependents_info);
            } else if (Array.isArray(details.dependents_info)) {
                dependentsInfo = details.dependents_info;
            }
        }
    } catch (e) {
        console.error('Error parsing dependents_info:', e);
        dependentsInfo = [];
    }

    // Parse source of income data
    let sourceOfIncome: string[] = [];
    try {
        if (details.source_of_income) {
            if (typeof details.source_of_income === 'string') {
                try {
                    sourceOfIncome = JSON.parse(details.source_of_income);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    // If it can't be parsed as JSON, treat it as a single string
                    sourceOfIncome = [details.source_of_income as string];
                }
            } else if (Array.isArray(details.source_of_income)) {
                sourceOfIncome = details.source_of_income;
            }
        }
    } catch (e) {
        console.error('Error parsing source_of_income:', e);
        sourceOfIncome = [];
    }

    // Check if we have source of income data
    const hasSourceOfIncome = sourceOfIncome.length > 0;
    
    // Generate co-makers HTML
    const coMakersHtml = Array.isArray(coMakers) && coMakers.length > 0
        ? `
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                    ${coMakers.map((coMaker, index) => `
                        <tr>
                            <th ${thStyle} style="text-align: left; background-color: #f8f9fa; border: 1px solid #ccc;" colspan="4">
                                Co-Maker #${index + 1}
                            </th>
                        </tr>
                        
                        <!-- Co-Maker Information -->
                        <tr>
                            <th ${thStyle} style="text-align: left; background-color: #f0f0f0; font-size: 9pt;" colspan="4">
                                Co-Maker Information
                            </th>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">First Name: ${coMaker.firstName || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Middle Name: ${coMaker.middleName || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Last Name: ${coMaker.lastName || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Age: ${coMaker.age || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Sex: ${coMaker.sex || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Civil Status: ${coMaker.civilStatus || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Birthday: ${coMaker.birthday ? new Date(coMaker.birthday).toLocaleDateString() : 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">TIN: ${coMaker.tin || 'N/A'}</td>
                        </tr>
                        
                        <!-- Present Address -->
                        <tr>
                            <th ${thStyle} style="text-align: left; background-color: #f0f0f0; font-size: 9pt;" colspan="4">
                                Present Address
                            </th>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Block/Street: ${coMaker.blockStreet || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Zone/Purok: ${coMaker.zonePurok || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Barangay: ${coMaker.barangay || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Municipality/City: ${coMaker.municipalityCity || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Province: ${coMaker.province || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Length of Stay: ${coMaker.lengthOfStay || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Residence Type: ${coMaker.residence || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Mobile No: ${coMaker.mobileNo || 'N/A'}</td>
                        </tr>
                        
                        <!-- Employment Information -->
                        <tr>
                            <th ${thStyle} style="text-align: left; background-color: #f0f0f0; font-size: 9pt;" colspan="4">
                                Employment Information
                            </th>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Present Employer: ${coMaker.presentEmployer || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Position: ${coMaker.position || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Date Hired: ${coMaker.dateHired ? new Date(coMaker.dateHired).toLocaleDateString() : 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Employment Status: ${coMaker.employmentStatus || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Gross Income: ${coMaker.grossIncome || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;" colspan="3">Employer Address: ${coMaker.employerAddress || 'N/A'}</td>
                        </tr>
                        
                        <!-- Additional Information -->
                        <tr>
                            <th ${thStyle} style="text-align: left; background-color: #f0f0f0; font-size: 9pt;" colspan="4">
                                Additional Information
                            </th>
                        </tr>
                        <tr>
                            <td ${tdStyle} style="border: 1px solid #ccc;">Relationship: ${coMaker.relationshipWithApplicant || 'N/A'}</td>
                            <td ${tdStyle} style="border: 1px solid #ccc;" colspan="3">Credit References: ${coMaker.creditReferences || 'N/A'}</td>
                        </tr>
                        
                        ${index < coMakers.length - 1 ? '<tr><td colspan="4" style="height: 16px;"></td></tr>' : ''}
                    `).join('')}
                </tbody>
            </table>
        `
        : `<tr><td ${tdStyle} colSpan="4">No co-makers added</td></tr>`;

    // Format present_other_properties array for display and only show if there are items
    const hasOtherProperties = presentOtherProperties.length > 0;
    const presentOtherPropertiesDisplay = hasOtherProperties
        ? presentOtherProperties.join(', ')
        : '';
        
    // Generate other properties HTML - only if there are properties
    const otherPropertiesHtml = hasOtherProperties
        ? `<tr>
            <td ${tdStyle} colSpan="4">Other Properties: ${presentOtherPropertiesDisplay}</td>
          </tr>`
        : '';

    // Generate dependents info HTML
    const dependentsInfoHtml = Array.isArray(dependentsInfo) && dependentsInfo.length > 0
        ? `
            <tr>
                <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Dependents Information</th>
            </tr>
            ${dependentsInfo.map((dependent, index) => `
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f0f0f0; text-align: left;">
                        Dependents Information #${index + 1}
                    </th>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="2">Name: ${dependent.name || 'N/A'}</td>
                    <td ${tdStyle} colSpan="2">Office Phone: ${dependent.officePhone || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="2">Grade/Occupation: ${dependent.gradeOccupation || 'N/A'}</td>
                    <td ${tdStyle} colSpan="2">School/Company: ${dependent.schoolCompany || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">Age: ${dependent.age || 'N/A'}</td>
                </tr>
            `).join('')}
        `
        : '';

    // Generate credit references HTML using individual fields
    const creditReferencesHtml = `
        <tr>
            <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Credit References</th>
        </tr>
        <tr>
            <td ${tdStyle} colSpan="2">Store/Bank: ${creditStoreBank || 'N/A'}</td>
            <td ${tdStyle} colSpan="2">Item/Loan Amount: ${creditItemLoanAmount || 'N/A'}</td>
        </tr>
        <tr>
            <td ${tdStyle} colSpan="2">Term: ${creditTerm || 'N/A'}</td>
            <td ${tdStyle} colSpan="2">Date: ${creditDate || 'N/A'}</td>
        </tr>
        <tr>
            <td ${tdStyle} colSpan="4">Balance: ${creditBalance || 'N/A'}</td>
        </tr>
    `;

    // Generate personal references HTML using individual fields
    const personalReferencesHtml = `
        <tr>
            <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Personal References</th>
        </tr>
        <tr>
            <td ${tdStyle} colSpan="2">Full Name: ${referencesFullName || 'N/A'}</td>
            <td ${tdStyle} colSpan="2">Relationship: ${referencesRelationship || 'N/A'}</td>
        </tr>
        <tr>
            <td ${tdStyle} colSpan="2">Tel No: ${referencesTelNo || 'N/A'}</td>
            <td ${tdStyle} colSpan="2">Address: ${referencesAddress || 'N/A'}</td>
        </tr>
    `;

    // Generate source of income HTML
    const sourceOfIncomeHtml = `
        <tr>
            <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Source of Income</th>
        </tr>
        ${hasSourceOfIncome ? 
        `<tr>
            <td ${tdStyle} colSpan="4">${sourceOfIncome.join(', ')}</td>
        </tr>` : ''}
    `;

    // Update the printContent template to include a more robust helper script for image loading
    const printContent = `
        <html>
        <head>
            <title>Credit Application Form</title>
            <style>
                @media print {
                    body { font-size: 11pt; }
                    table { page-break-inside: auto; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    thead { display: table-header-group; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                /* Hide all loading indicators when printing */
                @media print {
                    .loading-indicator {
                        display: none !important;
                    }
                }
            </style>
            <script>
                // Track image loading progress
                let totalImages = 0;
                let loadedImages = 0;
                let maxLoadAttempts = 3;
                let loadAttempt = 0;
                
                // Enhanced image loading
                window.addEventListener('DOMContentLoaded', function() {
                    console.log('Print window loaded, initializing image handlers...');
                    
                    // Count total images that need loading
                    const images = document.querySelectorAll('img[data-original-path]');
                    totalImages = images.length;
                    console.log('Total images to load:', totalImages);
                    
                    // Function to handle image errors with multiple fallback strategies
                    const handleImageError = function(img) {
                        const imgId = img.id;
                        const errorDiv = document.getElementById(imgId + '_error');
                        const loadingDiv = document.getElementById(imgId + '_loading');
                        
                        console.error('Image failed to load:', img.src, img.alt);
                        
                        // Get current attempt count and increment
                        let attempts = parseInt(img.getAttribute('data-attempt') || '0');
                        attempts++;
                        img.setAttribute('data-attempt', attempts.toString());
                        
                        // Get fallback URLs from data attribute
                        let fallbacks = [];
                        try {
                            fallbacks = JSON.parse(img.getAttribute('data-fallback-urls') || '[]');
                        } catch(e) {
                            console.error('Error parsing fallbacks:', e);
                            fallbacks = [];
                        }
                        
                        // Try the next URL if available
                        if (fallbacks.length > 0 && attempts < 10) { // Limit to 10 attempts
                            const nextUrl = fallbacks.shift();
                            console.log('Trying next URL for ' + img.alt + ':', nextUrl);
                            img.setAttribute('data-fallback-urls', JSON.stringify(fallbacks));
                            
                            // Add cache-busting parameter
                            const cacheBuster = '_t=' + new Date().getTime();
                            const urlWithCache = nextUrl + (nextUrl.includes('?') ? '&' : '?') + cacheBuster;
                            
                            // Keep loading indicator visible
                            if (loadingDiv) loadingDiv.style.display = 'flex';
                            
                            // Try next URL
                            img.src = urlWithCache;
                        } else {
                            // We've exhausted all fallbacks, try one more direct approach
                            const path = img.getAttribute('data-original-path');
                            const type = img.getAttribute('data-file-type');
                            
                            if (path && type && attempts < 12) {
                                // Try a few last-resort approaches
                                const baseUrl = "${backendBaseUrl}";
                                const lastResorts = [
                                    baseUrl + '/storage/' + type + '/' + path.replace(/^.*[\\\\/]/, ''),
                                    baseUrl + '/serve-image.php?path=' + encodeURIComponent(type + '/' + path),
                                    baseUrl + '/direct-access/' + type + '/' + path.replace(/^.*[\\\\/]/, '')
                                ];
                                
                                const lastResortUrl = lastResorts[attempts % 3] + '?_last=' + new Date().getTime();
                                console.log('Last resort attempt ' + attempts + ' for ' + img.alt + ':', lastResortUrl);
                                img.src = lastResortUrl;
                            } else {
                                // All attempts failed, but still count as "loaded" to allow printing
                                console.error('All attempts to load image failed:', img.alt);
                                if (errorDiv) errorDiv.style.display = 'block';
                                if (loadingDiv) loadingDiv.style.display = 'none';
                                
                                // Mark as loaded anyway to allow printing to proceed
                                loadedImages++;
                                checkAllImagesLoaded();
                            }
                        }
                    };
                    
                    // Handle successful image load
                    const handleImageLoad = function(img) {
                        const imgId = img.id;
                        const errorDiv = document.getElementById(imgId + '_error');
                        const loadingDiv = document.getElementById(imgId + '_loading');
                        
                        console.log('Image loaded successfully:', img.alt, img.src);
                        
                        // Hide error and loading messages
                        if (errorDiv) errorDiv.style.display = 'none';
                        if (loadingDiv) loadingDiv.style.display = 'none';
                        
                        // Increment counter and check if all images are loaded
                        loadedImages++;
                        checkAllImagesLoaded();
                    };
                    
                    // Check if all images are loaded and proceed with printing
                    function checkAllImagesLoaded() {
                        console.log('Images loaded: ' + loadedImages + '/' + totalImages);
                        
                        // If all images are loaded, or we've hit max attempts, print
                        if (loadedImages >= totalImages) {
                            console.log('All images loaded or accounted for, preparing to print...');
                            // Give a very short delay to ensure any final rendering completes
                            setTimeout(function() {
                                window.print();
                            }, 200);
                        }
                    }
                    
                    // Setup error handlers and attempt preloading for all images
                    document.querySelectorAll('img[data-original-path]').forEach(function(img) {
                        // Add error event listener to each image
                        img.addEventListener('error', function() {
                            handleImageError(this);
                        });
                        
                        // Add load success event listener
                        img.addEventListener('load', function() {
                            handleImageLoad(this);
                        });
                        
                        // Initialize with the first URL attempt including cache-busting
                        const currentSrc = img.src;
                        const forceReload = currentSrc + (currentSrc.includes('?') ? '&' : '?') + '_t=' + new Date().getTime();
                        
                        // Use timeout to stagger loading and reduce server load
                        setTimeout(() => {
                            img.src = forceReload;
                        }, Math.random() * 200);
                    });
                });
                
                // Force reload all images function - will be called after a timeout
                function reloadAllImages() {
                    console.log("Reloading any unloaded images...");
                    loadAttempt++;
                    
                    // Only try a few times then proceed with printing anyway
                    if (loadAttempt >= maxLoadAttempts) {
                        console.log("Reached maximum load attempts, printing anyway.");
                        window.print();
                        return;
                    }
                    
                    let stillLoading = 0;
                    
                    document.querySelectorAll('img[data-original-path]').forEach(function(img, index) {
                        if (img.complete && img.naturalHeight > 0) {
                            // Image already loaded, nothing to do
                        } else {
                            stillLoading++;
                            
                            // Get original path and type
                            const path = img.getAttribute('data-original-path');
                            const type = img.getAttribute('data-file-type');
                            
                            if (path && type) {
                                // Reset attempt counter
                                img.setAttribute('data-attempt', '0');
                                
                                // Try multiple direct approaches with cache busting
                                const baseUrl = "${backendBaseUrl}";
                                const timestamp = new Date().getTime();
                                
                                // Stagger loading to prevent server overload
                                setTimeout(() => {
                                    // Choose a different initial strategy based on current attempt
                                    const strategies = [
                                        baseUrl + '/storage/' + (path.startsWith(type) ? path : type + '/' + path),
                                        baseUrl + '/serve-image.php?path=' + encodeURIComponent(path.startsWith(type) ? path : type + '/' + path),
                                        baseUrl + '/direct-access/' + (path.startsWith(type) ? path : type + '/' + path)
                                    ];
                                    
                                    img.src = strategies[loadAttempt % 3] + '?_reload=' + timestamp;
                                }, index * 100);
                            }
                        }
                    });
                    
                    console.log("Still loading " + stillLoading + " images, attempt " + loadAttempt);
                    
                    // If no images are still loading, print now
                    if (stillLoading === 0) {
                        // All images loaded, print now
                        window.print();
                    } else {
                        // Try again after a delay if not max attempts
                        if (loadAttempt < maxLoadAttempts) {
                            setTimeout(reloadAllImages, 1500);
                        }
                    }
                }
                
                // Try to reload images after a delay and eventually print
                setTimeout(reloadAllImages, 1000);
                
                // Hook into the print event
                window.addEventListener('beforeprint', function() {
                    // Hide any visible loading indicators 
                    document.querySelectorAll('.loading-indicator').forEach(function(el) {
                        el.style.display = 'none';
                    });
                });
            </script>
        </head>
        <body>
        <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 10pt;">
            <thead>
                <tr>
                    <th colSpan="4" style="padding: 10px; border: 1px solid #ccc; text-align: center; background-color: #e0e0e0; font-size: 14pt; font-weight: bold;">Credit Application Form</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th colSpan="4" ${thStyle}> Personal & Address Info</th>
                </tr>
                
                <!-- Personal Information - 4 fields per row -->
                <tr>
                    <td ${tdStyle}>First Name: ${details.personal_first_name}</td>
                    <td ${tdStyle}>Middle Name: ${details.personal_middle_name || 'N/A'}</td>
                    <td ${tdStyle}>Last Name: ${details.personal_last_name}</td>
                    <td ${tdStyle}>Age: ${details.personal_age}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>NB or RB: ${details.personal_nb_rb || 'N/A'}</td>
                    <td ${tdStyle}>Sex: ${details.personal_sex || 'N/A'}</td>
                    <td ${tdStyle}>Citizenship: ${details.personal_citizenship || 'N/A'}</td>
                    <td ${tdStyle}>Birth Date: ${details.personal_birth_date ? new Date(details.personal_birth_date).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Religion: ${details.personal_religion || 'N/A'}</td>
                    <td ${tdStyle}>Civil Status: ${details.personal_civil_status || 'N/A'}</td>
                    <td ${tdStyle}>TIN No.: ${details.personal_tin || 'N/A'}</td>
                    <td ${tdStyle}>Res. Cert. No.: ${details.personal_res_cert_no || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Date Issued: ${details.personal_date_issued ? new Date(details.personal_date_issued).toLocaleDateString() : 'N/A'}</td>
                    <td ${tdStyle}>Place Issued: ${details.personal_place_issued || 'N/A'}</td>
                    <td ${tdStyle} colSpan="2"></td>
                </tr>

                <!-- Present Address - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Present Address</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Block/Street: ${details.present_block_street || 'N/A'}</td>
                    <td ${tdStyle}>Zone/Purok: ${details.present_zone_purok || 'N/A'}</td>
                    <td ${tdStyle}>Barangay: ${details.present_barangay || 'N/A'}</td>
                    <td ${tdStyle}>Municipality/City: ${details.present_municipality_city || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Province: ${details.present_province || 'N/A'}</td>
                    <td ${tdStyle}>Length of Stay: ${details.present_length_of_stay || 'N/A'}</td>
                    <td ${tdStyle}>House: ${details.present_house_ownership || 'N/A'}</td>
                    <td ${tdStyle}>Lot: ${details.present_lot_ownership || 'N/A'}</td>
                </tr>
                ${otherPropertiesHtml}

                <!-- Provincial Address - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Provincial Address</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Block/Street: ${details.provincial_block_street || 'N/A'}</td>
                    <td ${tdStyle}>Zone/Purok: ${details.provincial_zone_purok || 'N/A'}</td>
                    <td ${tdStyle}>Barangay: ${details.provincial_barangay || 'N/A'}</td>
                    <td ${tdStyle}>Municipality/City: ${details.provincial_municipality_city || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Province: ${details.provincial_province || 'N/A'}</td>
                    <td ${tdStyle} colSpan="3"></td>
                </tr>

                <!-- Step 2 - Contact Information - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle}>Personal & Family Profile</th>
                </tr>
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Contact Information</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Home Phone: ${details.contact_home_phone || 'N/A'}</td>
                    <td ${tdStyle}>Office Phone: ${details.contact_office_phone || 'N/A'}</td>
                    <td ${tdStyle}>Mobile Phone: ${details.contact_mobile_phone ? details.contact_mobile_phone : 'N/A'}</td>
                    <td ${tdStyle}>Email: ${details.contact_email || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Name of Spouse: ${details.contact_spouse_name || 'N/A'}</td>
                    <td ${tdStyle}>Age: ${details.contact_age || 'N/A'}</td>
                    <td ${tdStyle}>Number of Dependents: ${details.contact_dependents || 'N/A'}</td>
                    <td ${tdStyle}>Provincial Spouse: ${details.contact_provincial_spouse || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Mobile No: ${details.contact_mobile_no ? details.contact_mobile_no : 'N/A'}</td>
                    <td ${tdStyle}>Information Email: ${details.information_email || 'N/A'}</td>
                    <td ${tdStyle} colSpan="2"></td>
                </tr>

                ${dependentsInfoHtml}

                <!-- Applicant's Parents - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Applicant's Parents (First/Middle/Last)</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Name of Father: ${details.applicant_father_name || 'N/A'}</td>
                    <td ${tdStyle}>Name of Mother: ${details.applicant_mother_name || 'N/A'}</td>
                    <td ${tdStyle}>Occupation: ${details.applicant_occupation || 'N/A'}</td>
                    <td ${tdStyle}>Mobile No: ${details.applicant_mobile_no ? details.applicant_mobile_no : 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">Address: ${details.applicant_address || 'N/A'}</td>
                </tr>

                <!-- Spouse's Parents - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Spouse's Parents (First/Middle/Last)</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Name of Father: ${details.spouse_father_name || 'N/A'}</td>
                    <td ${tdStyle}>Name of Mother: ${details.spouse_mother_name || 'N/A'}</td>
                    <td ${tdStyle}>Occupation: ${details.spouse_occupation || 'N/A'}</td>
                    <td ${tdStyle}>Mobile No: ${details.spouse_mobile_no ? details.spouse_mobile_no : 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">Address: ${details.spouse_address || 'N/A'}</td>
                </tr>

                <!-- Step 3 - Credit Information -->
                <tr>
                    <th colSpan="4" ${thStyle}>Parental & Credit Information</th>
                </tr>
                ${creditReferencesHtml}
                ${personalReferencesHtml}
                ${sourceOfIncomeHtml}

                <!-- Step 4 - Employment Information -->
                <tr>
                    <th colSpan="4" ${thStyle}>Employment & Payment Details Form</th>
                </tr>
                
                <!-- Applicant Employer Information - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Applicant Employer Information</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Employer/Business Name: ${details.applicant_employer || 'N/A'}</td>
                    <td ${tdStyle}>Position: ${details.applicant_position || 'N/A'}</td>
                    <td ${tdStyle}>Block Street: ${details.applicant_block_street || 'N/A'}</td>
                    <td ${tdStyle}>Zone/Purok: ${details.applicant_zone_purok || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Barangay: ${details.applicant_barangay || 'N/A'}</td>
                    <td ${tdStyle}>Municipality/City: ${details.applicant_municipality_city || 'N/A'}</td>
                    <td ${tdStyle}>Province: ${details.applicant_province || 'N/A'}</td>
                    <td ${tdStyle}>Tel No.: ${details.applicant_telno || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Date Started: ${details.applicant_date_started ? new Date(details.applicant_date_started).toLocaleDateString() : 'N/A'}</td>
                    <td ${tdStyle}>Name of Supervisor: ${details.applicant_name_immediate || 'N/A'}</td>
                    <td ${tdStyle}>Mobile No.: ${details.applicant_employer_mobile_no ? details.applicant_employer_mobile_no : '12345'}</td>
                    <td ${tdStyle}>Salary Gross: ${details.applicant_salary_gross || 'N/A'}</td>
                </tr>

                <!-- Spouse Employer Information - 4 fields per row -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Spouse Employer Information</th>
                </tr>
                <tr>
                    <td ${tdStyle}>Employer/Business Name: ${details.spouse_employer || 'N/A'}</td>
                    <td ${tdStyle}>Position: ${details.spouse_position || 'N/A'}</td>
                    <td ${tdStyle}>Block Street: ${details.spouse_block_street || 'N/A'}</td>
                    <td ${tdStyle}>Zone/Purok: ${details.spouse_zone_purok || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Barangay: ${details.spouse_barangay || 'N/A'}</td>
                    <td ${tdStyle}>Municipality/City: ${details.spouse_municipality || 'N/A'}</td>
                    <td ${tdStyle}>Province: ${details.spouse_province || 'N/A'}</td>
                    <td ${tdStyle}>Tel No.: ${details.spouse_telno || 'N/A'}</td>
                </tr>
                <tr>
                    <td ${tdStyle}>Date Started: ${details.spouse_date_started ? new Date(details.spouse_date_started).toLocaleDateString() : 'N/A'}</td>
                    <td ${tdStyle}>Name of Supervisor: ${details.spouse_name_immediate || 'N/A'}</td>
                    <td ${tdStyle}>Mobile No.: ${details.spouse_employer_mobile_no ? details.spouse_employer_mobile_no : '12345'}</td>
                    <td ${tdStyle}>Salary Gross: ${details.spouse_salary_gross || 'N/A'}</td>
                </tr>

                <!-- Unit Usage and Payment Mode -->
                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Unit to be Used For</th>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">
                        <span style="font-weight: 500;">Unit to be Used For: </span>
                        <span>
                            ${[
                                (details.personal_use === true || details.personal_use === '1') ? 'Personal Use' : null,
                                (details.business_use === true || details.business_use === '1') ? 'Business Use' : null,
                                (details.gift === true || details.gift === '1') ? 'Gift' : null,
                                (details.use_by_relative === true || details.use_by_relative === '1') ? 'Use by Relative / Friend' : null
                            ].filter(Boolean).join(', ') || 'None'}
                        </span>
                    </td>
                </tr>

                <tr>
                    <th colSpan="4" ${thStyle} style="background-color: #f8f9fa;">Mode of Payment</th>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">
                        <span style="font-weight: 500;">Mode of Payment: </span>
                        <span>
                            ${[
                                (details.post_dated_checks === true || details.post_dated_checks === '1') ? 'Post Dated Checks' : null,
                                (details.cash_paid_to_office === true || details.cash_paid_to_office === '1') ? 'Cash Paid to Office' : null,
                                (details.cash_for_collection === true || details.cash_for_collection === '1') ? 'Cash for Collection' : null,
                                (details.credit_card === true || details.credit_card === '1') ? 'Credit Card' : null
                            ].filter(Boolean).join(', ') || 'None'}
                        </span>
                    </td>
                </tr>

                <!-- Step 5 - Co-Maker Information -->
                <tr>
                    <th colSpan="4" ${thStyle}>Co-Maker & Employment Details</th>
                </tr>
                <tr>
                    <td colSpan="4" style="padding: 0;">
                        ${coMakersHtml}
                    </td>
                </tr>

                <!-- Step 6 - Credit Inquiry Authorization -->
                <tr>
                    <th colSpan="4" ${thStyle}>Credit Inquiry Authorization</th>
                </tr>
                <tr>
                    <td ${tdStyle} colSpan="4">
                        <!-- Sketches Section -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
                            <div style="text-align: center;">
                                <p style="margin-bottom: 8px; font-weight: 500; font-size: 10pt;">Sketch of Residence or Business Address (Applicant)</p>
                                <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px; background-color: #f8fafc;">
                                        ${generateImgWithFallbacks(details.sketch_residence_path, 'sketches', 'Sketch of Residence')}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <p style="margin-bottom: 8px; font-weight: 500; font-size: 10pt;">Sketch of Residence (Co-Maker)</p>
                                <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px; background-color: #f8fafc;">
                                        ${generateImgWithFallbacks(details.sketch_residence_comaker_path, 'sketches', 'Sketch of Co-maker Residence')}
                                </div>
                            </div>
                            <div></div>
                        </div>
                        
                        <!-- Authorization Text -->
                        <div style="margin: 24px 0; text-align: center; padding: 12px; background-color: #f8fafc; border-radius: 4px;">
                            <p style="font-weight: 500; font-size: 11pt;">This is to authorize Premio and its representative to perform the credit inquiries and verify the data written above.</p>
                        </div>
                        
                        <!-- Signatures Section -->
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div style="text-align: center;">
                                <p style="margin-bottom: 8px; font-weight: 500; font-size: 10pt;">Applicant's Signature</p>
                                <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px; background-color: #f8fafc;">
                                        ${generateImgWithFallbacks(details.applicant_signature_path, 'signatures', 'Applicant\'s Signature')}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <p style="margin-bottom: 8px; font-weight: 500; font-size: 10pt;">Spouse's Signature</p>
                                <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px; background-color: #f8fafc;">
                                        ${generateImgWithFallbacks(details.spouse_signature_path, 'signatures', 'Spouse\'s Signature')}
                                </div>
                            </div>
                            <div style="grid-column: span 2; text-align: center;">
                                <p style="margin-bottom: 8px; font-weight: 500; font-size: 10pt;">Co-maker's Signature</p>
                                <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px; background-color: #f8fafc;">
                                        ${generateImgWithFallbacks(details.comaker_signature_path, 'signatures', 'Co-maker\'s Signature')}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </body>
        </html>
    `;

    // For debugging
    console.log('Co-makers data:', details.co_makers);
    console.log('Parsed co-makers:', coMakers);
    console.log('Present other properties:', details.present_other_properties);
    console.log('Parsed present other properties:', presentOtherProperties);
    console.log('Present address:', {
        block_street: details.present_block_street,
        zone_purok: details.present_zone_purok,
        barangay: details.present_barangay,
        municipality_city: details.present_municipality_city,
        province: details.present_province
    });
    console.log('Provincial address:', {
        block_street: details.provincial_block_street,
        zone_purok: details.provincial_zone_purok,
        barangay: details.provincial_barangay,
        municipality_city: details.provincial_municipality_city,
        province: details.provincial_province
    });
    console.log('Applicant parents information:', {
        father_name: details.applicant_father_name,
        mother_name: details.applicant_mother_name,
        occupation: details.applicant_occupation,
        mobile_no: details.applicant_mobile_no,
        address: details.applicant_address
    });
    console.log('Spouse parents information:', {
        father_name: details.spouse_father_name,
        mother_name: details.spouse_mother_name,
        occupation: details.spouse_occupation,
        mobile_no: details.spouse_mobile_no,
        address: details.spouse_address
    });
    console.log('Credit references:', {
        creditStoreBank,
        creditItemLoanAmount,
        creditTerm,
        creditDate,
        creditBalance
    });
    console.log('Personal references:', {
        referencesFullName,
        referencesRelationship,
        referencesTelNo,
        referencesAddress
    });
    console.log('Source of income:', {
        raw: details.source_of_income,
        parsed: sourceOfIncome
    });

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        // No need for additional timeout - the script in the print window 
        // will automatically trigger printing when images are loaded
        console.log('Print window opened. Printing will start automatically when images are loaded.');
    } else {
        alert('Failed to open print window. Please check your browser pop-up settings.');
    }
};