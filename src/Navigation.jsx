// Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Database, Shield, FileText, MessageSquare } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a page other than home
  const isNotHomePage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navItems with proper paths
  const navItems = [
    {
      name: 'Features',
      to: isNotHomePage ? '/' : '#features',
      section: 'features'
    },
    {
      name: 'Analytics',
      to: isNotHomePage ? '/' : '#analytics',
      section: 'analytics'
    },
    {
      name: 'Data Store',
      to: '/data-store',
      isNewPage: true,
      icon: <Database className="h-4 w-4 mr-1.5" />
    },
    {
      name: 'Pricing',
      to: isNotHomePage ? '/' : '#pricing',
      section: 'pricing'
    },
    {
      name: 'Enterprise',
      to: isNotHomePage ? '/' : '#features',
      section: 'features'
    },
  ];

  // Define legal/utility pages for the footer dropdown
  const legalPages = [
    {
      name: 'Privacy Policy',
      to: '/privacy-policy',
      icon: <Shield className="h-4 w-4 mr-1.5" />
    },
    {
      name: 'Data Deletion',
      to: '/delete',
      icon: <FileText className="h-4 w-4 mr-1.5" />
    },
    {
      name: 'Feedback',
      to: '/feedback',
      icon: <MessageSquare className="h-4 w-4 mr-1.5" />
    }
  ];

  // Helper function to handle navigation
  const handleNavigation = (e, to, section) => {
    // If we're not on home page, but the link is for a home page section
    if (to.startsWith('#') && isNotHomePage) {
      e.preventDefault();
      // Store the target section in sessionStorage to retrieve it after navigation
      sessionStorage.setItem('scrollToSection', section);
      navigate('/');
    } 
    // If we're on the home page and using a hash link, scroll to section
    else if (to.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(to.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // For other routes, let React Router handle it normally
  };

  // Helper function for demo button
  const handleDemoClick = () => {
    if (isNotHomePage) {
      // Navigate home and then to demo
      sessionStorage.setItem('scrollToSection', 'demo');
      navigate('/');
    } else {
      // Already on home page, just scroll
      const demoSection = document.getElementById('demo');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  // State for legal dropdown
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-500">
                NEST
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              item.isNewPage ? (
                <motion.div key={item.name}>
                  <Link
                    to={item.to}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    {item.name}
                    <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">New</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.to}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors"
                    onClick={(e) => handleNavigation(e, item.to, item.section)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            ))}

            {/* Legal Pages Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors flex items-center"
                onClick={() => setLegalDropdownOpen(!legalDropdownOpen)}
              >
                <Shield className="h-4 w-4 mr-1.5" />
                Legal
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${legalDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {legalDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    onMouseLeave={() => setLegalDropdownOpen(false)}
                  >
                    <div className="py-1">
                      {legalPages.map((page) => (
                        <Link
                          key={page.name}
                          to={page.to}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                          onClick={() => setLegalDropdownOpen(false)}
                        >
                          {page.icon}
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-4 lg:px-8 py-2 lg:py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm lg:text-base shadow-lg shadow-purple-500/20"
              onClick={handleDemoClick}
            >
              Book Demo
            </motion.button>
          </div>

          {/* Mobile Navigation Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
          >
            {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 w-full md:hidden px-4 pt-2 pb-3 bg-white shadow-xl border-t border-gray-100"
              style={{ maxWidth: '100vw' }}
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  item.isNewPage ? (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="block px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                      <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">New</span>
                    </Link>
                  ) : (
                    <motion.div key={item.name} whileHover={{ x: 4 }}>
                      <Link
                        to={item.to}
                        className="block px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                        onClick={(e) => {
                          handleNavigation(e, item.to, item.section);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                ))}

                {/* Legal Pages Section */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Legal & Support
                  </h3>
                  {legalPages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.to}
                      className="block px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {page.icon}
                      {page.name}
                    </Link>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full mt-2 px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20"
                  onClick={handleDemoClick}
                >
                  Book Demo
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};