import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';
import {
  Users, MessageSquare, Shield, Zap,
  Building, UserPlus, Share2, PieChartIcon, Clock,
  Menu, X, Award, Globe, Linkedin, Instagram,
  Mail, Check, Target, MessageCircle, Briefcase, Layers, Settings, TrendingUp, Banknote, Info, Calendar, ArrowRight, Facebook, FileText, CheckCircle, Rocket, BarChart
} from 'lucide-react';
import { Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import Link if you're using React Router
import { Database } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation Component
// Navigation Component

// Update your Navigation component with modified links
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navItems
  const navItems = [
    {
      name: 'Features',
      to: '/#features'
    },
    {
      name: 'Analytics',
      to: '/#analytics'
    },
    {
      name: 'Data Store',
      to: '/data-store',
      isNewPage: true,
      icon: <Database className="h-4 w-4 mr-1.5" />
    },
    {
      name: 'Pricing',
      to: '/#pricing'
    },
    {
      name: 'Enterprise',
      to: '/#features'
    },
  ];

  // Helper function to handle navigation
  const handleNavigation = (e, to) => {
    if (to.startsWith('/#') && location.pathname === '/') {
      // On home page, scrolling to section
      e.preventDefault();
      const sectionId = to.substring(2); // Remove the '/#' prefix
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // For links that point to the root with hash, handle properly from data-store
    if (to.startsWith('/#') && location.pathname !== '/') {
      // We're not on the home page, so don't prevent default
      // The Link component will navigate to home page with the hash
    }
  };

  // Helper function for demo button
  const handleDemoClick = () => {
    if (location.pathname === '/data-store') {
      // Navigate to home page demo section
      window.location.href = '/#demo';
    } else {
      // Scroll to demo on current page
      const demoSection = document.getElementById('demo');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

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
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
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
                    onClick={(e) => handleNavigation(e, item.to)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            ))}
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
                          handleNavigation(e, item.to);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                ))}
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

// Pricing Components
const PlanFeature = ({ feature, highlight = false }) => (
  <motion.li className="flex items-center space-x-2 sm:space-x-3">
    <Check className={`h-4 w-4 sm:h-5 sm:w-5 ${highlight ? 'text-purple-600 animate-pulse' : 'text-gray-300'}`} />
    <span className={`text-sm sm:text-base ${highlight ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
      {feature}
    </span>
  </motion.li>
);

const PricingCard = ({ plan, isPopular }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 border
        ${isPopular ? 'border-2 border-purple-600 shadow-xl ring-4 ring-purple-100 md:scale-105 z-10' : 'border-gray-200'}`}
    >
      {isPopular && (
        <div className="absolute -top-6 inset-x-0 flex justify-center">
          <motion.div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 inline-block" />
            Most Popular
          </motion.div>
        </div>
      )}

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{plan.name}</h3>
      <div className="flex items-baseline mt-2">
        {plan.originalPrice && (
          <span className="text-base sm:text-lg line-through text-gray-400 mr-2">₹{plan.originalPrice}</span>
        )}
        <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
        {plan.period && <span className="ml-1 text-sm sm:text-base text-gray-500">/{plan.period}</span>}
      </div>

      {plan.name === 'Yearly' && (
        <p className="mt-2 text-xs sm:text-sm text-green-600">
          Save ₹{((parseInt(plan.originalPrice) - parseInt(plan.price.replace('₹', ''))) * 12).toLocaleString()} yearly
        </p>
      )}

      <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {plan.features.map((feature, index) => (
          <PlanFeature key={feature} feature={feature} highlight={isPopular && index < 2} />
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-4 sm:mt-6 w-full py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-colors 
          ${isPopular ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
      >
        {plan.buttonText}
      </motion.button>

      {plan.guarantee && (
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center flex items-center justify-center">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
          {plan.guarantee}
        </p>
      )}
    </motion.div>
  );
};


const PricingSection = ({ setIsOpen }) => {
  const plans = [
    {
      name: 'Monthly',
      originalPrice: '900',
      price: '₹600',
      period: 'month',
      buttonText: 'Get Started',
      features: [
        'Basic Lead Management',
        'Email Support',
        'Mobile App Access',
        'Basic Analytics',
        'Performance Metrics',
        'Constant Updates'
      ],
      accentColor: 'bg-purple-100 text-purple-600',
      gradient: 'from-purple-50 to-purple-100',
      icon: Users
    },
    {
      name: 'Yearly',
      originalPrice: '600',
      price: '₹350',
      period: 'month',
      buttonText: 'Get Started',
      features: [
        'All Monthly Features',
        'Advanced Analytics',
        'Priority Support',
        'Spotlight Feature',
        '1-year price lock',
        'Custom Integrations'
      ],
      accentColor: 'bg-green-100 text-green-600',
      gradient: 'from-green-50 to-green-100',
      icon: Star,
      popular: true
    },
    {
      name: 'Quarterly',
      originalPrice: '800',
      price: '₹450',
      period: 'month',
      buttonText: 'Get Started',
      features: [
        'Partial Monthly Features',
        'Limited Analytics',
        'Standard Support',
        'Quarterly Billing',
        'Performance Metrics',
        'Constant Updates'
      ],
      accentColor: 'bg-blue-100 text-blue-600',
      gradient: 'from-blue-50 to-blue-100',
      icon: Calendar
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Choose the plan that best fits your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-8 sm:mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`
                relative 
                rounded-2xl 
                shadow-lg 
                overflow-hidden 
                transform 
                transition-all 
                duration-300 
                group
                ${plan.popular ? 'md:scale-105 z-10 border-2 border-purple-600' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <div className="bg-purple-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              <div className={`
                p-5 sm:p-6 
                bg-gradient-to-br 
                ${plan.gradient}
                relative
                overflow-hidden
              `}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className={`
                    rounded-full 
                    px-2 sm:px-3 
                    py-1 
                    text-xs sm:text-sm 
                    font-medium 
                    ${plan.accentColor}
                  `}>
                    <plan.icon className="inline-block mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {plan.name}
                  </div>
                </div>

                <div className="flex items-baseline mb-4 relative z-10">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 mr-2">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500">/{plan.period}</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 relative z-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full 
                    py-2.5 sm:py-3 
                    rounded-xl 
                    font-semibold 
                    text-sm sm:text-base
                    transition-all 
                    duration-300 
                    flex 
                    items-center 
                    justify-center 
                    gap-2
                    relative 
                    z-10
                    ${plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-200'}
                  `}
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom CRM Box with Icons */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Want a Custom CRM?</h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Build a fully customized CRM with tailored workflows, advanced integrations, and dedicated support.
          </p>

          {/* Icons Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-8 text-gray-600">
            {[
              { Icon: Briefcase, label: 'Custom Workflows' },
              { Icon: Layers, label: 'Advanced Integrations' },
              { Icon: Settings, label: 'Dedicated Support' }
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center group">
                <div className="
                  w-14 h-14 sm:w-16 sm:h-16 
                  bg-purple-100 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  mb-2 
                  group-hover:bg-purple-200 
                  transition-colors
                ">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <motion.a
            href="https://wa.me/9322434882"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              inline-flex 
              items-center 
              gap-2 
              bg-purple-600 
              text-white 
              py-2.5 sm:py-3 
              px-5 sm:px-6 
              rounded-xl 
              text-sm sm:text-base
              font-medium 
              hover:bg-purple-700 
              shadow-lg 
              transition-colors
            "
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Contact Sales
          </motion.a>
        </div>
      </div>
    </section>
  );
};
// Demo Section Component
const DemoSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    referral: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `*New Demo Request*\n\n` +
        `Name: ${formData.name}\n` +
        `Company: ${formData.company}\n` +
        `Team Size: ${formData.referral}\n` +
        `Contact: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Hi! I'm interested in booking a demo for NEST CRM.`;

      const whatsappNumber = "919322434882";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        // teamSize: '',
        message: '',
        referral: '',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="demo"
      className="py-12 sm:py-20 bg-gradient-to-br from-purple-900 to-purple-600 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Column: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            viewport={{ once: true }}
            className="text-white space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8">
              Book a personalized demo and see how NEST CRM can revolutionize your real estate operations.
            </p>

            <div className="space-y-4 sm:space-y-5">
              {[
                'Personalized walkthrough of features',
                'Live Q&A session with our experts',
                'Custom solution discussion',
                'Pricing and implementation details'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="flex items-center"
                >
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300 mr-3 sm:mr-4 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-purple-100">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Book Your Demo
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Ayush Mishra' },
                { name: 'email', label: 'Work Email', type: 'email', placeholder: 'ayush@company.com' },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 8299804567' },
                { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Real Estate Solutions Inc.' },
                {
                  name: 'referral',
                  label: 'Referred By',
                  type: 'text',
                  placeholder: 'Colleague Name or Channel Partner',
                  optional: true
                }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 flex items-center">
                    {field.label}
                    {field.optional && (
                      <span
                        className="ml-2 text-gray-500 text-xs flex items-center"
                        title="Optional field"
                      >
                        <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                        Optional
                      </span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({
                      ...formData,
                      [field.name]: e.target.value
                    })}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent
                      transition-all duration-300 ease-in-out text-sm sm:text-base
                      placeholder-gray-400"
                    required={!field.optional}
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-2.5 sm:py-3 px-4 rounded-lg 
                  bg-purple-600 text-white font-semibold
                  hover:bg-purple-700 text-sm sm:text-base
                  transition-all duration-300
                  flex items-center justify-center
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed bg-purple-500' : 'hover:shadow-lg'}
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Schedule Demo'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
// Footer Component
export const Footer = () => {
  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Enterprise', 'Case Studies', 'Security']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'API Reference', 'Community', 'Partners']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security']
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Mail, href: '#' },
    { icon: Globe, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2 flex-grow">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors block py-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">NEST</span>
              <div className="flex space-x-4 ml-6">
                {socialLinks.map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
              © {new Date().getFullYear()} NEST CRM. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
// Enhanced Analytics Components
const LeadSourceChart = ({ data }) => {
  const COLORS = ['#7c3aed', '#9f7aea', '#b794f4', '#c084fc'];
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-medium text-gray-900">{payload[0].name}</p>
                    <p className="text-purple-600">{`${payload[0].value}%`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const PerformanceMetrics = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [dateRange, setDateRange] = useState('week');

  const performanceData = {
    leads: {
      week: [
        { date: 'Mon', value: 150, conversion: 45 },
        { date: 'Tue', value: 230, conversion: 65 },
        { date: 'Wed', value: 180, conversion: 55 },
        { date: 'Thu', value: 290, conversion: 85 },
        { date: 'Fri', value: 200, conversion: 60 },
        { date: 'Sat', value: 120, conversion: 35 },
        { date: 'Sun', value: 100, conversion: 30 },
      ],
      month: [
        { date: 'Week 1', value: 800, conversion: 240 },
        { date: 'Week 2', value: 1200, conversion: 360 },
        { date: 'Week 3', value: 900, conversion: 270 },
        { date: 'Week 4', value: 1100, conversion: 330 },
      ]
    },
    visits: {
      week: [
        { date: 'Mon', completed: 25, scheduled: 30 },
        { date: 'Tue', completed: 35, scheduled: 40 },
        { date: 'Wed', completed: 28, scheduled: 32 },
        { date: 'Thu', completed: 40, scheduled: 45 },
        { date: 'Fri', completed: 32, scheduled: 38 },
        { date: 'Sat', completed: 20, scheduled: 25 },
        { date: 'Sun', completed: 15, scheduled: 20 },
      ],
      month: [
        { date: 'Week 1', completed: 120, scheduled: 150 },
        { date: 'Week 2', completed: 180, scheduled: 200 },
        { date: 'Week 3', completed: 150, scheduled: 170 },
        { date: 'Week 4', completed: 160, scheduled: 180 },
      ]
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Real-Time Performance Metrics</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Track your business metrics in real-time</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          {/* Tab and Date Range Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            {/* Tab Controls */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-1 sm:flex-none ${activeTab === 'leads'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Lead Analytics
              </button>
              <button
                onClick={() => setActiveTab('visits')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-1 sm:flex-none ${activeTab === 'visits'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Site Visits
              </button>
            </div>

            {/* Date Range Controls */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setDateRange('week')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-1 sm:flex-none ${dateRange === 'week'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                This Week
              </button>
              <button
                onClick={() => setDateRange('month')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-1 sm:flex-none ${dateRange === 'month'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-60 sm:h-72 lg:h-96 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'leads' ? (
                <RechartsBarChart data={performanceData.leads[dateRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    tick={{ fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fontSize: 12 }}
                    tickMargin={8}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                            <p className="font-medium text-gray-900 text-sm">{label}</p>
                            <p className="text-purple-600 text-sm">Leads: {payload[0].value}</p>
                            <p className="text-purple-400 text-sm">Conversions: {payload[0].payload.conversion}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    name="Leads"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="conversion"
                    name="Conversions"
                    fill="#c084fc"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              ) : (
                <LineChart data={performanceData.visits[dateRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    tick={{ fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fontSize: 12 }}
                    tickMargin={8}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                            <p className="font-medium text-gray-900 text-sm">{label}</p>
                            <p className="text-purple-600 text-sm">Completed: {payload[0].value}</p>
                            <p className="text-purple-400 text-sm">Scheduled: {payload[1].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="scheduled"
                    stroke="#c084fc"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
            {activeTab === 'leads' ? (
              <>
                <MetricCard
                  title="Total Leads"
                  value="2,547"
                  trend="+12.5%"
                  icon={Users}
                />
                <MetricCard
                  title="Conversion Rate"
                  value="32.8%"
                  trend="+2.4%"
                  icon={Target}
                />
                <MetricCard
                  title="Avg. Response Time"
                  value="2.4h"
                  trend="-18%"
                  icon={MessageSquare}
                />
                <MetricCard
                  title="Lead Quality Score"
                  value="8.7/10"
                  trend="+0.5"
                  icon={Award}
                />
              </>
            ) : (
              <>
                <MetricCard
                  title="Total Visits"
                  value="856"
                  trend="+8.3%"
                  icon={Users}
                />
                <MetricCard
                  title="Completion Rate"
                  value="92%"
                  trend="+4.2%"
                  icon={Target}
                />
                <MetricCard
                  title="Avg. Visit Duration"
                  value="45m"
                  trend="+5m"
                  icon={Clock}
                />
                <MetricCard
                  title="Customer Satisfaction"
                  value="4.8/5"
                  trend="+0.2"
                  icon={Award}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
{/* Lead Source Distribution */ }
{/* import React from 'react';
import { 
  Users, 
  Globe, 
  Facebook, 
  TrendingUp 
} from 'lucide-react'; */}

const LEAD_SOURCES = [
  {
    icon: Users,
    name: 'Pre Sales',
    description: 'Direct sales team outreach',
    percentage: 40,
    color: 'purple',
    progressColor: 'bg-purple-600',
    iconBgColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    icon: Globe,
    name: 'MagicBricks',
    description: 'Real estate portal leads',
    percentage: 30,
    color: 'blue',
    progressColor: 'bg-blue-500',
    iconBgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    icon: Globe,
    name: '99acres',
    description: 'Online property marketplace',
    percentage: 20,
    color: 'green',
    progressColor: 'bg-green-500',
    iconBgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    icon: Facebook,
    name: 'Facebook Ads',
    description: 'Social media advertising',
    percentage: 10,
    color: 'indigo',
    progressColor: 'bg-indigo-400',
    iconBgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600'
  }
];

const LeadSourceDistribution = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="mr-3 w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              Lead Source Distribution
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Breakdown of lead acquisition channels
            </p>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="p-6 space-y-6">
          {LEAD_SOURCES.map((source, index) => {
            const SourceIcon = source.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`p-3 ${source.iconBgColor} rounded-full shrink-0`}>
                      <SourceIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${source.textColor}`} />
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                            {source.name}
                          </h4>
                          <span
                            className={`${source.iconBgColor} ${source.textColor} text-xs px-2 py-0.5 rounded-full font-medium`}
                          >
                            {source.percentage}%
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {source.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${source.progressColor} h-2 rounded-full`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
{/* Sales Pipeline Overview */ }
// import { 
//   TrendingUp, 
//   Target, 
//   FileText, 
//   CheckCircle, 
//   Rocket,
//   BarChart 
// } from 'lucide-react';

const PIPELINE_STAGES = [
  {
    icon: Rocket,
    name: 'New Leads',
    stage: 'Initial Contact Stage',
    leads: 5000,
    percentage: 100,
    color: 'purple',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Target,
    name: 'Qualified',
    stage: 'Evaluation Stage',
    leads: 3500,
    percentage: 70,
    color: 'blue',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: FileText,
    name: 'Proposals',
    stage: 'Negotiation Stage',
    leads: 2200,
    percentage: 44,
    color: 'indigo',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: CheckCircle,
    name: 'Closed Deals',
    stage: 'Success Stage',
    leads: 800,
    percentage: 16,
    color: 'green',
    textColor: 'text-green-600',
    bgColor: 'bg-green-100'
  }
];

const SalesPipelineChart = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BarChart className="mr-3 w-8 h-8 text-purple-600" />
              Sales Pipeline Overview
            </h2>
            <p className="text-gray-600 mt-2">Comprehensive lead progression tracking</p>
          </div>
        </div>

        {/* Pipeline Stages */}
        <div className="p-6 space-y-6">
          {PIPELINE_STAGES.map((stage, index) => {
            const StageIcon = stage.icon;
            return (
              <div
                key={index}
                className="relative bg-gray-50 rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 ${stage.bgColor} rounded-full`}>
                      <StageIcon className={`w-6 h-6 ${stage.textColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">{stage.name}</h3>
                        <span className={`${stage.bgColor} ${stage.textColor} text-xs px-2 py-0.5 rounded-full`}>
                          {stage.percentage}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{stage.stage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{stage.leads.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {stage.name === 'New Leads' ? 'Total Leads' :
                        stage.name === 'Qualified' ? 'Qualified Leads' :
                          stage.name === 'Proposals' ? 'Active Proposals' :
                            'Successful Closures'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`bg-${stage.color}-500 h-2.5 rounded-full`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border-t">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-600 font-medium">Average Deal Size</h4>
              <Rocket className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">₹65,000</p>
            <p className="text-sm text-gray-500">Per successful closure</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-600 font-medium">Conversion Rate</h4>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">16%</p>
            <p className="text-sm text-gray-500">Lead to closure ratio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default SalesPipelineChart;
// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 pt-16 px-4 sm:px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight px-4 sm:px-0"
          >
            <span className="block mb-2">Transform Your</span>
            <span className="block text-purple-600">Real Estate Business</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-4 sm:mt-6 max-w-lg mx-auto text-base sm:text-lg md:text-xl text-gray-500 sm:max-w-3xl px-4 sm:px-6"
          >
            Streamline operations, boost sales, and manage leads effectively with our
            comprehensive CRM solution designed specifically for real estate professionals.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex-none bg-purple-600 text-white text-base sm:text-lg font-semibold py-3 px-6 sm:px-8 rounded-xl hover:bg-purple-700 transition-colors"
              onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex-none bg-gray-50 text-gray-700 text-base sm:text-lg font-semibold py-3 px-6 sm:px-8 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Preview */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
          <div className="group relative h-full">
            <div className="
              relative 
              h-full
              bg-gradient-to-br from-purple-500 to-purple-700
              text-white
              rounded-2xl 
              p-4 sm:p-5
              shadow-xl 
              transform 
              transition-all 
              duration-300 
              hover:-translate-y-2 
              hover:shadow-2xl
              flex 
              flex-col 
              items-center 
              justify-center
              space-y-2 sm:space-y-3
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full 
                flex items-center justify-center 
                group-hover:bg-white/30 
                transition-colors 
                duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>

              <h3 className="relative z-10 text-lg sm:text-xl font-bold text-center">
                Performance Insights
              </h3>

              <p className="relative z-10 text-xs sm:text-sm text-center opacity-80">
                Real-time business analytics
              </p>
            </div>
          </div>

          <div className="group relative h-full">
            <div className="
              relative 
              h-full
              bg-gradient-to-br from-blue-500 to-purple-600
              text-white
              rounded-2xl 
              p-4 sm:p-5
              shadow-xl 
              transform 
              transition-all 
              duration-300 
              hover:-translate-y-2 
              hover:shadow-2xl
              flex 
              flex-col 
              items-center 
              justify-center
              space-y-2 sm:space-y-3
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full 
                flex items-center justify-center 
                group-hover:bg-white/30 
                transition-colors 
                duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              </div>

              <h3 className="relative z-10 text-lg sm:text-xl font-bold text-center">
                Business Flow
              </h3>

              <p className="relative z-10 text-xs sm:text-sm text-center opacity-80">
                Automated sales pipeline management
              </p>
            </div>
          </div>

          <div className="group relative h-full">
            <div className="
              relative 
              h-full
              bg-gradient-to-br from-green-500 to-blue-600
              text-white
              rounded-2xl 
              p-4 sm:p-5
              shadow-xl 
              transform 
              transition-all 
              duration-300 
              hover:-translate-y-2 
              hover:shadow-2xl
              flex 
              flex-col 
              items-center 
              justify-center
              space-y-2 sm:space-y-3
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full 
                flex items-center justify-center 
                group-hover:bg-white/30 
                transition-colors 
                duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <h3 className="relative z-10 text-lg sm:text-xl font-bold text-center">
                Client Management
              </h3>

              <p className="relative z-10 text-xs sm:text-sm text-center opacity-80">
                Comprehensive lead and customer tracking
              </p>
            </div>
          </div>

          <div className="group relative h-full">
            <div className="
              relative 
              h-full
              bg-gradient-to-br from-red-500 to-orange-600
              text-white
              rounded-2xl 
              p-4 sm:p-5
              shadow-xl 
              transform 
              transition-all 
              duration-300 
              hover:-translate-y-2 
              hover:shadow-2xl
              flex 
              flex-col 
              items-center 
              justify-center
              space-y-2 sm:space-y-3
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full 
                flex items-center justify-center 
                group-hover:bg-white/30 
                transition-colors 
                duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>

              <h3 className="relative z-10 text-lg sm:text-xl font-bold text-center">
                Follow-up Tracker
              </h3>

              <p className="relative z-10 text-xs sm:text-sm text-center opacity-80">
                Intelligent missed follow-up alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Main App Component
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Helmet>
        <link rel="canonical" href="https://nest-crm.com/" />
        <title>NEST CRM - Real Estate CRM Solution</title>
        <meta name="description" content="Streamline your real estate operations with NEST CRM - the comprehensive solution for property management, lead tracking, and analytics." />
      </Helmet>

      {/* Navigation is now a separate component */}
      <Navigation />

      {/* Only render home page content when on the home page */}
      {isHomePage && (
        <>
          <HeroSection />
          <FeaturesSection />
          <AnalyticsSection />
          <PerformanceMetrics />
          <LeadSourceDistribution />
          <SalesPipelineChart />
          <PricingSection setIsOpen={setIsOpen} />
          <DemoSection />
        </>
      )}

      <Footer />
    </div>
  );
};

// Features Section Components
// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    variants={fadeInUp}
    transition={{ delay }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
      <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-600 transition-colors duration-300">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
  </motion.div>
);

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: UserPlus,
      title: 'Lead Management',
      description: 'Capture, nurture, and convert leads with our intelligent lead management system. Track every interaction and never miss an opportunity.'
    },
    {
      icon: Building,
      title: 'Property Portfolio',
      description: 'Manage your entire property portfolio in one place. Track availability, pricing, and documentation with ease.'
    },
    {
      icon: Share2,
      title: 'Team Collaboration',
      description: 'Enable seamless collaboration between team members. Share updates, assign tasks, and track performance in real-time.'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Enterprise-grade security to protect your sensitive data. Role-based access control and encrypted storage.'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks like follow-ups, document generation, and status updates to save valuable time.'
    },
    {
      icon: PieChartIcon,
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with comprehensive analytics and custom reports tailored to your needs.'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
          >
            Powerful Features for Modern Real Estate
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0"
          >
            Everything you need to streamline your real estate business operations
            and drive growth.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, trend, icon: Icon, delay = 0 }) => (
  <motion.div
    variants={fadeInUp}
    transition={{ delay }}
    className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className={`text-xs sm:text-sm mt-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
            {trend}
          </p>
        )}
      </div>
      <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
      </div>
    </div>
  </motion.div>
);

// Analytics Section Component
const AnalyticsSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [chartData] = useState({
    month: [
      { name: 'Week 1', leads: 420, conversions: 280 },
      { name: 'Week 2', leads: 380, conversions: 250 },
      { name: 'Week 3', leads: 520, conversions: 320 },
      { name: 'Week 4', leads: 480, conversions: 350 },
    ],
    quarter: [
      { name: 'Jan', leads: 1200, conversions: 800 },
      { name: 'Feb', leads: 1400, conversions: 950 },
      { name: 'Mar', leads: 1600, conversions: 1100 },
    ],
    year: [
      { name: 'Q1', leads: 4200, conversions: 2800 },
      { name: 'Q2', leads: 4800, conversions: 3200 },
      { name: 'Q3', leads: 5200, conversions: 3600 },
      { name: 'Q4', leads: 5800, conversions: 4000 },
    ],
  });

  const metrics = [
    { title: 'Total Leads', value: '2,547', trend: '+12.5%', icon: Users },
    { title: 'Conversion Rate', value: '32.8%', trend: '+2.4%', icon: Target },
    { title: 'Avg. Response Time', value: '2.4h', trend: '-18%', icon: MessageSquare },
    { title: 'Active Properties', value: '1,283', trend: '+8.1%', icon: Building },
  ];

  return (
    <section id="analytics" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
          >
            Data-Driven Insights
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0"
          >
            Monitor your business performance with real-time analytics and actionable insights
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} {...metric} delay={index * 0.1} />
          ))}
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Performance</h3>
            <div className="flex flex-wrap gap-2 sm:space-x-2">
              {['month', 'quarter', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedPeriod === period
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 sm:h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData[selectedPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="leads" name="Total Leads" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" name="Conversions" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;