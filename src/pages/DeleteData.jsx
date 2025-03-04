// pages/DeleteData.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Shield, Clock, CheckCircle, AlertTriangle, File, Mail, ArrowRight } from 'lucide-react';
import { Navigation } from '../Navigation';
import { Footer } from '../App';

const DeleteData = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    confirmDelete: false
  });
  
  // State for submission status
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Construct email body
      const emailSubject = encodeURIComponent('NEST CRM Data Deletion Request');
      const emailBody = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Reason for deletion: ${formData.reason}

I confirm that I want to delete my data from NEST CRM.
      `);
      
      // Open email client
      window.location.href = `mailto:admin@nest-crm.com?subject=${emailSubject}&body=${emailBody}`;
      
      // Set submitted state
      setLoading(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        confirmDelete: false
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Data Deletion Request - NEST CRM</title>
        <meta name="description" content="Request deletion of your personal data from NEST CRM. We respect your privacy and data rights." />
      </Helmet>

      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-purple-900 to-purple-600 py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Data Deletion Request
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
                Your privacy matters to us. Use this form to request the deletion of your personal data from NEST CRM.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left Column - Information */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Understanding Data Deletion
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Trash2 className="w-6 h-6 text-purple-600" />,
                      title: "What Gets Deleted",
                      content: "Upon request, we'll delete all personal information associated with your account, including contact details, usage history, and preferences.",
                    },
                    {
                      icon: <Clock className="w-6 h-6 text-blue-500" />,
                      title: "Processing Time",
                      content: "Data deletion requests are typically processed within 30 days. We'll notify you by email once your data has been completely removed.",
                    },
                    {
                      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
                      title: "Important Considerations",
                      content: "Deleting your data will result in permanent loss of your account, settings, and historical information. This action cannot be undone.",
                    },
                    {
                      icon: <File className="w-6 h-6 text-green-500" />,
                      title: "Legal Obligations",
                      content: "We may retain certain information to comply with legal obligations, prevent fraud, or resolve disputes. See our Privacy Policy for details.",
                    },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Alternative Options
                  </h3>
                  <p className="text-sm text-blue-800 mb-2">
                    If you're concerned about specific data or privacy issues, you might not need to delete all your data. Consider these alternatives:
                  </p>
                  <ul className="text-sm text-blue-800 list-disc pl-5 space-y-1">
                    <li>Update your personal information</li>
                    <li>Modify your notification preferences</li>
                    <li>Restrict processing of certain data</li>
                    <li>Request a copy of your data</li>
                  </ul>
                  <p className="text-sm text-blue-800 mt-2">
                    Contact us at <a href="mailto:admin@nest-crm.com" className="underline hover:text-blue-600">admin@nest-crm.com</a> to discuss these options.
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-100 rounded-xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Request Submitted Successfully</h3>
                    <p className="text-green-700 mb-4">
                      Your data deletion request has been initiated. We've opened your email client with a pre-populated message. Please send this email to complete your request.
                    </p>
                    <p className="text-green-700 mb-6">
                      If your email client didn't open automatically, please send an email to <strong>admin@nest-crm.com</strong> with your request details.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Submit Deletion Request
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Please fill out this form to request the deletion of your data from NEST CRM. We'll process your request as quickly as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter the email associated with your account"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your phone number (optional)"
                        />
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                          Reason for Deletion
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Please explain why you're requesting data deletion (optional)"
                        ></textarea>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="confirmDelete"
                              name="confirmDelete"
                              type="checkbox"
                              checked={formData.confirmDelete}
                              onChange={handleChange}
                              required
                              className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="confirmDelete" className="text-gray-700">
                              I confirm that I want to delete my data from NEST CRM and understand this action cannot be undone. *
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={loading || !formData.confirmDelete}
                          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                            loading || !formData.confirmDelete 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-purple-600 hover:bg-purple-700'
                          } transition-colors flex items-center justify-center`}
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            'Submit Deletion Request'
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                          <div className="mt-1 text-sm text-yellow-700">
                            <p>
                              For security and verification purposes, we can only process data deletion requests from the registered email address associated with your account.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Contact Option */}
                <div className="mt-8 p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-600" />
                    Contact Us Directly
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If you prefer not to use this form, you can send your data deletion request directly to our Data Protection Team:
                  </p>
                  <a 
                    href="mailto:admin@nest-crm.com" 
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  >
                    admin@nest-crm.com
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeleteData;