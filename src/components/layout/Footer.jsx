import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold">PROPX</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional property verification services protecting buyers, sellers, and investors across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaPhone className="text-gold-500 mt-1" />
                <span>+234 812 562 0351</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaWhatsapp className="text-gold-500 mt-1" />
                <span>WhatsApp: +234 812 562 0351</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-gold-500 mt-1" />
                <span>contact.propx@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/propx_property" className="hover:text-gold-500 transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://facebook.com/propXverified" className="hover:text-gold-500 transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://wa.me/2348125620351" className="hover:text-gold-500 transition-colors">
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Operating Hours: Mon - Fri, 9:00 AM - 5:00 PM
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} PROPX Verified. All rights reserved.</p>
          <p className="mt-2">Property Verification & Due Diligence Services</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;