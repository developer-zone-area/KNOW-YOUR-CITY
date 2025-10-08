import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Know Your City</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover the best places, restaurants, attractions, and hidden gems in your city. 
              Connect with your community and explore everything your city has to offer.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cities" className="text-gray-300 hover:text-white transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/places" className="text-gray-300 hover:text-white transition-colors">
                  Places
                </Link>
              </li>
              <li>
                <Link to="/places?category=restaurant" className="text-gray-300 hover:text-white transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/places?category=attraction" className="text-gray-300 hover:text-white transition-colors">
                  Attractions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">info@knowyourcity.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Know Your City. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
