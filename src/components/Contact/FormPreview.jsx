import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEdit, FaDownload } from 'react-icons/fa';

const FormPreview = ({ formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-blue-900">Form Preview</h3>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-blue-900 hover:text-gold-500 transition-colors">
            <FaEdit />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-900 hover:text-gold-500 transition-colors">
            <FaEye />
            <span>Preview PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">Client Information</h4>
          <div className="space-y-2">
            <p><strong>Name:</strong> {formData.fullName || 'Not provided'}</p>
            <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
            <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
            <p><strong>ID Type:</strong> {formData.identification}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-blue-900 mb-2">Property Details</h4>
          <div className="space-y-2">
            <p><strong>Location:</strong> {formData.propertyLocation || 'Not provided'}</p>
            <p><strong>Type:</strong> {formData.propertyType}</p>
            <p><strong>Documents Available:</strong> {
              Object.entries(formData.documents)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(', ') || 'None'
            }</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-semibold text-blue-900 mb-2">Services Requested</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(formData.services)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <span key={key} className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              ))}
          </div>
        </div>

        <div className="md:col-span-2 pt-6 border-t">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Declaration:</strong> I confirm the information is accurate. Signed by {formData.declarationName || 'Not provided'} on {formData.date}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <button className="flex items-center justify-center space-x-2 w-full bg-gold-500 text-white py-3 rounded-lg hover:bg-gold-600 transition-colors">
          <FaDownload />
          <span>Download Complete Form</span>
        </button>
      </div>
    </motion.div>
  );
};

export default FormPreview;