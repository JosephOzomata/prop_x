import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import ServicesPreview from '../components/Home/ServicesPreview';
import { FaShieldAlt, FaUserCheck, FaAward, FaHandshake } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Fraud Protection',
      description: 'Comprehensive verification to prevent property fraud and illegal transactions'
    },
    {
      icon: <FaUserCheck />,
      title: 'Client Protection',
      description: 'Safeguarding buyers, sellers, and investors from financial losses'
    },
    {
      icon: <FaAward />,
      title: 'Professional Standards',
      description: 'Adherence to highest professional and ethical standards in verification'
    },
    {
      icon: <FaHandshake />,
      title: 'Trust & Transparency',
      description: 'Building trust through transparent processes and clear reporting'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden w-full bg-center bg-no-repeat bg-fixed bg-cover backdrop-blur-2xl bg-[url('./images/background.jpg')]  flex flex-col">

      <Hero />
      <ServicesPreview />
      
      {/* Why Choose Us */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PROPX?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional property verification you can trust for secure real estate transactions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl text-gold-500 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" bg-[url('./images/3_box_two.jpg')] bg-center bg-no-repeat bg-cover bg-fixed  ">
        <div className=" mx-auto py-20  backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Ready to Secure Your Property Investment?
            </h2>
            <p className="text-xl text-white mb-8">
              Don't risk your investment. Let our experts verify your property today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg"
              >
                Start Verification
              </Link>
              <Link
                to="/services"
                className="inline-block border-2 border-gold-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gold-50 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Trusted by Clients Nationwide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from investors, buyers, and sellers who have secured their transactions with PROPX
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "PROPX saved me from a fraudulent land deal. Their verification uncovered critical issues I never would have found.",
                author: "James O.",
                role: "Real Estate Investor"
              },
              {
                quote: "Professional, thorough, and reliable. The verification report gave me confidence to proceed with my purchase.",
                author: "Sarah K.",
                role: "Property Buyer"
              },
              {
                quote: "As a seller, having PROPX verification adds credibility to my property and attracts serious buyers.",
                author: "Michael T.",
                role: "Property Seller"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blue-50 p-8 rounded-xl"
              >
                <div className="text-gold-500 text-2xl mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-blue-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;