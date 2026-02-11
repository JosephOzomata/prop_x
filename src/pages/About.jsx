import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaBullseye, 
  FaHandshake, 
  FaUsers,
  FaChartLine,
  FaGlobeAfrica
} from 'react-icons/fa';
import ProcessSteps from '../components/About/ProcessSteps';

const About = () => {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our verification processes'
    },
    {
      icon: <FaBullseye />,
      title: 'Accuracy',
      description: 'Precision and attention to detail in every verification report'
    },
    {
      icon: <FaHandshake />,
      title: 'Trust',
      description: 'Building long-term relationships based on reliability and transparency'
    },
    {
      icon: <FaUsers />,
      title: 'Client Focus',
      description: 'Putting our clients needs and protection first in everything we do'
    }
  ];

  const team = [
    {
      name: 'Legal Experts',
      description: 'Qualified legal professionals specializing in Nigerian property law',
      count: '5+'
    },
    {
      name: 'Field Agents',
      description: 'Experienced on-ground verification specialists across Nigeria',
      count: '25+'
    },
    {
      name: 'Real Estate Consultants',
      description: 'Industry experts with decades of combined experience',
      count: '8+'
    },
    {
      name: 'Support Staff',
      description: 'Dedicated professionals ensuring seamless service delivery',
      count: '12+'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About PROPX Verified
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Leading the fight against property fraud through comprehensive verification and due diligence services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Our Mission & Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  PROPX was founded to address the growing challenge of property fraud in Nigeria's real estate market. We recognized that buyers, sellers, and investors needed a trusted partner to verify property authenticity and ownership.
                </p>
                <p>
                  Our mission is to eliminate property fraud by providing transparent, reliable verification services that empower our clients to make informed decisions with confidence.
                </p>
                <p>
                  We exist because the Nigerian real estate market faces significant challenges with fraudulent transactions, illegal developments, and unclear ownership. PROPX brings transparency, security, and professionalism to every property transaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 p-8 rounded-2xl"
            >
              <div className="text-5xl text-gold-500 mb-6">
                <FaGlobeAfrica />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Nationwide Coverage</h3>
              <p className="text-gray-600 mb-6">
                Serving clients across all 36 states of Nigeria with our network of verified field agents and legal experts.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gold-500">500+</div>
                  <div className="text-sm text-gray-600">Properties Verified</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gold-500">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gold-500">36</div>
                  <div className="text-sm text-gray-600">States Covered</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gold-500">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every verification we conduct and every client we serve
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl text-gold-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <ProcessSteps />

      {/* Team & Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Team & Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A multidisciplinary team of professionals dedicated to property verification excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-gold-500 mb-2">{member.count}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{member.name}</h3>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-4xl mb-6">
              <FaChartLine />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Partner with Nigeria's Leading Property Verification Service
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust PROPX for secure property transactions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
              >
                Contact Us Today
              </a>
              <a
                href="/services"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                View Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;