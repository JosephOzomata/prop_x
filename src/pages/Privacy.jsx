import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-6">Privacy Policy</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Data Collection</h2>
              <p className="text-gray-600 mb-6">
                PROPX collects information necessary for property verification services, including client identification, property details, and contact information. All data is collected with explicit consent through our intake forms.
              </p>

              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Data Usage</h2>
              <p className="text-gray-600 mb-6">
                Collected information is used exclusively for property verification services, client communication, and service improvement. We never sell or share client data with third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Data Protection</h2>
              <p className="text-gray-600 mb-6">
                We implement industry-standard security measures to protect client data. All sensitive information is encrypted and stored securely. Our verification reports contain only necessary information and are shared exclusively with authorized parties.
              </p>

              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Client Rights</h2>
              <p className="text-gray-600 mb-6">
                Clients have the right to access, correct, or delete their personal information. To exercise these rights, please contact us at contact.propx@gmail.com with your request.
              </p>

              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                For privacy-related inquiries, please contact our Data Protection Officer at contact.propx@gmail.com or call +234 812 562 0351.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;