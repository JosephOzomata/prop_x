import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { FaDownload, FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Initialize EmailJS (you'll need to get these from EmailJS dashboard)
      emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
      
      const templateParams = {
        ...formData,
        documents: JSON.stringify(formData.documents),
        services: JSON.stringify(formData.services),
        to_email: 'contact.propx@gmail.com'
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      toast.success('Form submitted successfully! We will contact you shortly.');
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
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
    } catch (error) {
      toast.error('Failed to submit form. Please try again or download and email directly.');
    }
  };

  const downloadForm = () => {
    const element = document.createElement('a');
    const text = `PROPX Client Intake Form
    
Client Information:
Full Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}
Identification: ${formData.identification}

Property Details:
Location: ${formData.propertyLocation}
Type: ${formData.propertyType}
Documents: ${Object.keys(formData.documents).filter(key => formData.documents[key]).join(', ')}

Services Requested: ${Object.keys(formData.services).filter(key => formData.services[key]).join(', ')}

Declaration:
Name: ${formData.declarationName}
Date: ${formData.date}`;
    
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `PROPX-Form-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Client Intake & Property Verification Form
        </h2>
        <p className="text-center text-gray-600 mb-8">Secure • Structured • Verified</p>

        <div className="h-1 w-32 bg-gold-500 mx-auto mb-8"></div>

        <form onSubmit={handleSubmit}>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                />
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
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Means of Identification</label>
                <select
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                >
                  <option>NIN</option>
                  <option>International Passport</option>
                  <option>Driver's License</option>
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
                  <option>Land</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Off-Plan</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 mb-4">Available Documents</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'coo', label: 'C of O' },
                  { id: 'survey', label: 'Survey Plan' },
                  { id: 'deed', label: 'Deed' },
                  { id: 'governorsConsent', label: 'Governor\'s Consent' }
                ].map((doc) => (
                  <label key={doc.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`documents.${doc.id}`}
                      checked={formData.documents[doc.id]}
                      onChange={handleChange}
                      className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                    />
                    <span>{doc.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Services Requested */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Services Requested</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'verification', label: 'Property Verification' },
                { id: 'review', label: 'Documentation Review' },
                { id: 'facilitation', label: 'Buyer–Seller Facilitation' },
                { id: 'consultation', label: 'Consultation' }
              ].map((service) => (
                <label key={service.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`services.${service.id}`}
                    checked={formData.services[service.id]}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Declaration */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b">Declaration</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 italic">
                I confirm that the information provided is accurate.  
                I understand that PROPX Verified provides verification and advisory services only.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Client Name *</label>
                <input
                  type="text"
                  name="declarationName"
                  value={formData.declarationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
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
              type="button"
              onClick={downloadForm}
              className="flex items-center justify-center gap-2 bg-white border-2 border-gold-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gold-50 transition-colors"
            >
              <FaDownload /> Download Form
            </button>
            
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg"
            >
              <FaPaperPlane /> Submit Form
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="bg-blue-900 text-white p-6 rounded-lg mt-10 text-center">
          <p className="mb-2">
            📩 Download the form, complete it, and send to{' '}
            <strong>contact.propx@gmail.com</strong>
          </p>
          <p>📱 WhatsApp: +234 812 562 0351</p>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;