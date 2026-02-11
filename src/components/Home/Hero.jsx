import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaUserShield, FaChartLine } from 'react-icons/fa';

const Hero = () => {
  const stats = [
    { icon: <FaCheckCircle />, value: '500+', label: 'Properties Verified' },
    { icon: <FaUserShield />, value: '98%', label: 'Client Satisfaction' },
    { icon: <FaShieldAlt />, value: '100%', label: 'Fraud Prevention' },
    { icon: <FaChartLine />, value: '15+', label: 'States Covered' },
  ];

  return (
    <section className="relative min-h-screen flex backdrop-blur-xs items-center justify-center">
      {/* Sticky Background */}
      <div 
        className="sticky-bg"
        style={{
          backgroundImage: 'linear-gradient(rgba(10, 31, 68, 0.9), rgba(10, 31, 68, 0.8)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80)'
        }}
        
      />

      <div className="page-content">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 uppercase tracking-tight">
              Property Verification You Can Trust
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              We protect buyers, sellers, and investors from property fraud through professional land and property verification across Nigeria
            </p>

            <p className="text-lg text-white mb-12 max-w-3xl mx-auto">
              At PROPX, we provide comprehensive due diligence services that ensure every property transaction is secure, transparent, and legally sound. Our expert team combines technology with on-ground verification to deliver peace of mind in Nigeria's real estate market.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <a
                href="/contact"
                className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Verification
              </a>
              <a
                href="/services"
                className="border-2 bg-white border-gold-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gold-50 transition-colors"
              >
                View Services
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl text-gold-500 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;