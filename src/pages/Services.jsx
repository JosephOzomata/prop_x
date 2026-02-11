import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFileContract, 
  FaMapMarkedAlt, 
  FaClipboardList,
  FaClock,
  FaCertificate,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
  const detailedServices = [
    {
      id: 'verification',
      icon: <FaSearch />,
      title: 'Property and Land Verification',
      description: 'Comprehensive verification confirming ownership, legal status, and authenticity of properties across Nigeria.',
      detailedDescription: 'We conduct multi-layered verification including ownership confirmation, legal status verification, title authenticity checks, and encumbrance verification. Our process includes checks with relevant government agencies and databases.',
      features: [
        'Ownership confirmation and validation',
        'Legal status verification',
        'Title authenticity and history check',
        'Encumbrance and lien verification',
        'Government registry cross-referencing'
      ],
      deliverables: [
        'Ownership verification certificate',
        'Legal status report',
        'Title authenticity confirmation',
        'Risk assessment summary'
      ]
    },
    {
      id: 'documents',
      icon: <FaFileContract />,
      title: 'Document Review',
      description: 'Professional examination and validation of all property documents for legal compliance and authenticity.',
      detailedDescription: 'Our legal experts thoroughly review all submitted documents including survey plans, deeds of assignment, allocation letters, and titles. We verify their authenticity, compliance with Nigerian law, and validity.',
      features: [
        'Survey plan verification and validation',
        'Deed of assignment review',
        'Allocation letter authenticity check',
        'Title document examination',
        'Stamp duty and registration verification'
      ],
      deliverables: [
        'Document authenticity report',
        'Legal compliance assessment',
        'Document validity certificate',
        'Recommendations for regularization'
      ]
    },
    {
      id: 'inspection',
      icon: <FaMapMarkedAlt />,
      title: 'On-Ground Verification',
      description: 'Physical inspection and confirmation of property details, boundaries, and local conditions.',
      detailedDescription: 'Our field agents conduct physical inspections including location confirmation, boundary verification, local community inquiries, and assessment of physical property conditions.',
      features: [
        'Physical location confirmation',
        'Boundary inspection and verification',
        'Local community and neighbor inquiries',
        'Property condition assessment',
        'Accessibility and infrastructure check'
      ],
      deliverables: [
        'Physical inspection report',
        'Geotagged photos and videos',
        'Boundary confirmation certificate',
        'Local community feedback summary'
      ]
    },
    {
      id: 'report',
      icon: <FaClipboardList />,
      title: 'Verification Report',
      description: 'Comprehensive professional report with clear status, identified risks, and actionable recommendations.',
      detailedDescription: 'Clients receive a detailed verification report stating the Verified/Not Verified status, all identified risks, legal implications, and professional recommendations for action.',
      features: [
        'Clear Verified/Not Verified status',
        'Detailed risk identification and assessment',
        'Professional recommendations',
        'Legal implications summary',
        'Next steps guidance'
      ],
      deliverables: [
        'Comprehensive verification report',
        'Executive summary',
        'Risk assessment matrix',
        'Actionable recommendations',
        'Supporting documentation'
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Discuss your verification needs and requirements',
      icon: <FaHeadset />,
      
    },
    {
      step: 2,
      title: 'Document Collection',
      description: 'Submit all relevant property documents for review',
      icon: <FaFileContract />
    },
    {
      step: 3,
      title: 'Verification Process',
      description: 'Comprehensive verification including on-ground checks',
      icon: <FaSearch />
    },
    {
      step: 4,
      title: 'Report Delivery',
      description: 'Receive detailed verification report with recommendations',
      icon: <FaCertificate />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Verification Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Protecting your property investments with comprehensive verification solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
              >
                Explore Services
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
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
              A systematic approach ensuring thorough and reliable property verification
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 text-white rounded-full text-2xl mb-6">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-gold-500 mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Comprehensive Verification Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each service is designed to provide specific verification needs for different property scenarios
            </p>
          </motion.div>

          <div className="space-y-16">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="text-5xl text-gold-500 mb-6">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Turnaround Time:</h4>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-2 text-gold-500" />
                          <span>5-7 business days</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-2/3">
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-blue-900 mb-3">Service Details</h4>
                        <p className="text-gray-700">{service.detailedDescription}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-900 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gold-500 mr-2">✓</span>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-blue-900 mb-3">Deliverables</h4>
                          <ul className="space-y-2">
                            {service.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gold-500 mr-2">•</span>
                                <span className="text-gray-700">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <Link to={"/contact"} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                          Request {service.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-4xl mb-6">
              <FaShieldAlt />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Your Property Verified Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us for a customized quote based on your specific verification needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
              >
                Get Custom Quote
              </a>
              <a
                href="tel:+2348125620351"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Call Now: +234 812 562 0351
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;