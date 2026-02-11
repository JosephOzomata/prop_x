import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { 
  FaPaperPlane, 
  FaSpinner, 
  FaFileUpload, 
  FaTimes, 
  FaUser, 
  FaIdCard,
  FaEye,
  FaEyeSlash,
  FaMailBulk,
  FaEnvelope,
  FaPhone,
  FaWhatsapp
} from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

const Contact = () => {
  const formRef = useRef();
  const fileInputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showNin, setShowNin] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const { user, userData } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    nin: '',
    identification: 'NIN',
    propertyLocation: '',
    propertyType: 'Land',
    documents: {
      coo: false,
      survey: false,
      deed: false,
      governorsConsent: false
    },
    services: {
      verification: false,
      review: false,
      facilitation: false,
      consultation: false
    },
    declarationName: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Pre-fill data from logged in user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.displayName || userData?.fullName || '',
        declarationName: user.displayName || userData?.fullName || '',
        nin: userData?.nin || ''
      }));
    }
  }, [user, userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Format NIN input (11 digits only)
    if (name === 'nin') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 11) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly
        }));
      }
      return;
    }
    
    if (name.includes('documents.')) {
      const docField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docField]: checked
        }
      }));
    } else if (name.includes('services.')) {
      const serviceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [serviceField]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/jpg', 
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type not supported: ${file.name}`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`File too large (max 10MB): ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Upload files to Cloudinary
    for (const file of validFiles) {
      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const cloudinaryData = await uploadToCloudinary(file);
        
        setUploadedFiles(prev => [...prev, {
          ...cloudinaryData,
          originalName: file.name,
          originalSize: file.size,
          originalType: file.type
        }]);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        
        toast.success(`Uploaded: ${file.name}`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload: ${file.name}`);
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = async (index) => {
    const fileToRemove = uploadedFiles[index];
    
    try {
      // Delete from Cloudinary
      if (fileToRemove.publicId) {
        await deleteFromCloudinary(fileToRemove.publicId);
      }
      
      // Remove from state
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
      toast.info('File removed successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove file');
    }
  };

  const formatNIN = (nin) => {
    if (!nin) return '';
    // Format as XXX-XXX-XXX-XX
    return nin.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1-$2-$3-$4');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate NIN if selected as identification
    if (formData.identification === 'NIN' && formData.nin.length !== 11) {
      toast.error('Please enter a valid 11-digit NIN');
      setIsSubmitting(false);
      return;
    }

    try {
      // Format documents and services for email
      const formattedDocuments = Object.entries(formData.documents)
        .filter(([_, value]) => value)
        .map(([key]) => {
          const labels = {
            coo: 'C of O',
            survey: 'Survey Plan',
            deed: 'Deed',
            governorsConsent: "Governor's Consent"
          };
          return labels[key] || key;
        })
        .join(', ') || 'None';

      const formattedServices = Object.entries(formData.services)
        .filter(([_, value]) => value)
        .map(([key]) => {
          const labels = {
            verification: 'Property Verification',
            review: 'Documentation Review',
            facilitation: 'Buyer–Seller Facilitation',
            consultation: 'Consultation'
          };
          return labels[key] || key;
        })
        .join(', ') || 'None';

      // Prepare file links for email
      const fileLinks = uploadedFiles.map(file => file.url).join('\n');
      const fileCount = uploadedFiles.length;

      // Prepare template parameters
      const templateParams = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        nin: formData.identification === 'NIN' ? formatNIN(formData.nin) : 'N/A',
        identification: formData.identification,
        propertyLocation: formData.propertyLocation,
        propertyType: formData.propertyType,
        documents: formattedDocuments,
        services: formattedServices,
        declarationName: formData.declarationName,
        date: formData.date,
        submissionDate: new Date().toLocaleString(),
        uploadedFilesCount: fileCount,
        fileLinks: fileLinks || 'No files uploaded',
        userUid: user?.uid || 'Not logged in',
        // to_email: 'contact.propx@gmail.com',
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      if (response.status === 200) {
        toast.success('Form submitted successfully! We will contact you shortly.');
        
        // Reset form but keep user data
        setFormData(prev => ({
          ...prev,
          phone: '',
          address: '',
          nin: '',
          propertyLocation: '',
          propertyType: 'Land',
          documents: {
            coo: false,
            survey: false,
            deed: false,
            governorsConsent: false
          },
          services: {
            verification: false,
            review: false,
            facilitation: false,
            consultation: false
          },
          date: new Date().toISOString().split('T')[0]
        }));
        setUploadedFiles([]);
        setUploadProgress({});
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`Failed to submit form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto my-16 p-8 bg-white rounded-xl shadow-xl relative overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <span className="text-8xl font-bold text-gold-500 rotate-45">PROPX VERIFIED</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">
              Client Intake & Property Verification Form
            </h2>
            <p className="text-gray-600">Secure • Structured • Verified</p>
          </div>
          {user && (
            <div className="flex items-center space-x-2 text-blue-900">
              <FaUser />
              <div>
                <span className="font-medium block">{user.displayName || user.email}</span>
                {userData?.nin && (
                  <span className="text-xs text-gray-500">
                    NIN: {formatNIN(userData.nin)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-1 w-32 bg-gold-500 mb-8"></div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Client Information */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Client Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="+234 812 562 0351"
                  pattern="[+0-9\s\-\(\)]+"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly={!!user}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200 ${
                    user ? 'bg-gray-50' : ''
                  }`}
                  placeholder="your@email.com"
                />
                {user && (
                  <p className="text-sm text-gray-500 mt-1">Email pre-filled from your account</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Residential Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="Your current address"
                />
              </div>
              
              {/* NIN Field - Only shown when NIN is selected */}
              {formData.identification === 'NIN' && (
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    11-Digit National Identification Number (NIN) *
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showNin ? "text" : "password"}
                      name="nin"
                      value={formData.nin}
                      onChange={handleChange}
                      required={formData.identification === 'NIN'}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                      placeholder="12345678901"
                      maxLength={11}
                      pattern="\d{11}"
                      title="Enter 11 digits only"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNin(!showNin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold-500"
                    >
                      {showNin ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Format: {formData.nin ? formatNIN(formData.nin) : 'XXX-XXX-XXX-XX'}
                    </span>
                    <span className={`text-sm ${formData.nin.length === 11 ? 'text-green-600' : 'text-red-600'}`}>
                      {formData.nin.length}/11 digits
                    </span>
                  </div>
                </div>
              )}
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Means of Identification</label>
                <select
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                >
                  <option value="NIN">National Identification Number (NIN)</option>
                  <option value="Passport">International Passport</option>
                  <option value="License">Driver's License</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Property Location *</label>
                <input
                  type="text"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="Full property address including city and state"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                >
                  <option value="Land">Land</option>
                  <option value="Residential">Residential Property</option>
                  <option value="Commercial">Commercial Property</option>
                  <option value="Off-Plan">Off-Plan Property</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 mb-4">Available Documents</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="documents.coo"
                    checked={formData.documents.coo}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span>C of O</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="documents.survey"
                    checked={formData.documents.survey}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span>Survey Plan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="documents.deed"
                    checked={formData.documents.deed}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span>Deed</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="documents.governorsConsent"
                    checked={formData.documents.governorsConsent}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span>Governor's Consent</span>
                </label>
              </div>
            </div>
          </div>

          {/* File Upload Section - Cloudinary */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Upload Documents</h3>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-4">
                Upload property documents (Photos, PDFs, Word Docs) - Max 10MB each
                <span className="text-sm text-gray-500 block mt-1">
                  Files are securely stored in Cloudinary and will be accessible in your verification report
                </span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  <FaFileUpload />
                  Choose Files to Upload
                </label>
                <p className="text-gray-500 mt-2">or drag and drop files here</p>
                <p className="text-sm text-gray-400 mt-1">
                  Supported formats: JPG, PNG, PDF, DOC, DOCX • Max 10MB per file
                </p>
              </div>
            </div>

            {/* File Preview with Cloudinary URLs */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Uploaded Files ({uploadedFiles.length})
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    • Stored in Cloudinary
                  </span>
                </h4>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <FaFileUpload className="text-gold-500" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900 truncate">
                            {file.originalName}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>
                              {(file.originalSize / 1024 / 1024).toFixed(2)} MB • {file.format}
                            </span>
                            <span className="text-green-600">
                              {uploadProgress[file.originalName] === 100 ? '✓ Uploaded' : 'Uploading...'}
                            </span>
                          </div>
                          {uploadProgress[file.originalName] < 100 && (
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[file.originalName] || 0}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900 hover:text-blue-700 text-sm"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove file"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Requested */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Services Requested</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services.verification"
                  checked={formData.services.verification}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                />
                <span>Property Verification</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services.review"
                  checked={formData.services.review}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                />
                <span>Documentation Review</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services.facilitation"
                  checked={formData.services.facilitation}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                />
                <span>Buyer–Seller Facilitation</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services.consultation"
                  checked={formData.services.consultation}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                />
                <span>Consultation</span>
              </label>
            </div>
          </div>

          {/* Declaration */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Declaration</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 italic">
                I confirm that the information provided is accurate.  
                I understand that PROPX Verified provides verification and advisory services only.
                All information will be treated with confidentiality.
                
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Client Signature Name *</label>
                <input
                  type="text"
                  name="declarationName"
                  value={formData.declarationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  placeholder="Your full name as signature"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit Verification Request
                </>
              )}
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Security Note:</strong> Your NIN and documents are securely processed. 
              Files are encrypted and stored. Form data is sent via secure email.
            </p>
          </div>
        </form>

        {/* Contact Info */}
        <div className="bg-blue-900 text-white p-6 rounded-lg mt-10 text-center">
          <p className="mb-2 flex items-center justify-center">
            <FaEnvelope className='mx-2' /> All form submissions are sent to{' '}
            <strong>contact.propx@gmail.com</strong> with file links
          </p>
          <p className='flex justify-center items-center'><FaWhatsapp className='mx-2' /> WhatsApp: +234 812 562 0351</p>
          <p className="mt-2 text-sm opacity-90">
            Response Time: Within 24 hours during business days • 
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;