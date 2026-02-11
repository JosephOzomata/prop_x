import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaFileContract, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';

const ServicesPreview = () => {
  const services = [
    {
      icon: <FaShieldAlt />,
      title: 'Property Verification',
      description: 'Comprehensive ownership and legal status verification',
      link: '/services#verification'
    },
    {
      icon: <FaFileContract />,
      title: 'Document Review',
      description: 'Professional examination of all property documents',
      link: '/services#documents'
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'On-Ground Inspection',
      description: 'Physical property confirmation and boundary checks',
      link: '/services#inspection'
    },
    {
      icon: <FaChartLine />,
      title: 'Verification Report',
      description: 'Detailed risk assessment and recommendations',
      link: '/services#report'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end property verification solutions to ensure your real estate investments are secure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl text-gold-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="inline-flex items-center text-blue-900 font-semibold hover:text-gold-500 transition-colors"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;