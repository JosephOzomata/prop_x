import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaHistory, FaMapMarkerAlt, FaClipboardCheck } from 'react-icons/fa';

const ProcessSteps = () => {
  const steps = [
    {
      icon: <FaFileAlt />,
      title: 'Document Review',
      description: 'Thorough examination of all property documents including survey plans, deeds of assignment, allocation letters, and titles.',
      color: 'bg-blue-100 text-blue-900'
    },
    {
      icon: <FaHistory />,
      title: 'Property History Checks',
      description: 'Comprehensive investigation into property history, ownership lineage, and legal status verification.',
      color: 'bg-gold-100 text-gold-900'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'On-Ground Confirmation',
      description: 'Physical verification of property location, boundary inspections, and local community inquiries.',
      color: 'bg-blue-100 text-blue-900'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Professional Reporting',
      description: 'Detailed verification report with clear status, identified risks, and professional recommendations.',
      color: 'bg-gold-100 text-gold-900'
    }
  ];

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Our Verification Process
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A systematic approach ensuring comprehensive property verification
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className={`p-6 rounded-xl shadow-lg ${step.color} h-full`}>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;