import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="text-3xl text-gold-500">{service.icon}</div>
          <h3 className="text-2xl font-bold text-blue-900">{service.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-blue-900 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-gold-500 mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Turnaround Time:</h4>
              <p className="text-gray-600">5-7 business days</p>
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Request Service
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;