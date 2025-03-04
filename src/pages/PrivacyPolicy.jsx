// pages/PrivacyPolicy.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Clock, Eye, Lock, AlertTriangle, User, Database, Server, Globe, Settings, Download, Trash2, Info, Mail, MessageSquare } from 'lucide-react';
import { Navigation } from '../Navigation';
import { Footer } from '../App';

const PrivacyPolicy = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for table of contents navigation
  const [activeSection, setActiveSection] = useState('');

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Date of last update
  const lastUpdated = "March 4, 2025";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Privacy Policy - NEST CRM</title>
        <meta name="description" content="NEST CRM's Privacy Policy explains how we collect, use, and protect your data. We are committed to ensuring your privacy and data security." />
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
                Privacy Policy
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
                How we collect, use, and protect your data at NEST CRM
              </p>
              <p className="text-purple-200 mt-4">
                Last Updated: {lastUpdated}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar - Table of Contents */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-purple-600" />
                  Contents
                </h2>
                <nav className="space-y-1">
                  {[
                    { id: 'introduction', label: 'Introduction' },
                    { id: 'information-we-collect', label: 'Information We Collect' },
                    { id: 'how-we-use', label: 'How We Use Your Information' },
                    { id: 'how-we-share', label: 'Information Sharing' },
                    { id: 'data-security', label: 'Data Security' },
                    { id: 'data-retention', label: 'Data Retention' },
                    { id: 'your-rights', label: 'Your Rights' },
                    { id: 'international-transfers', label: 'International Transfers' },
                    { id: 'children-privacy', label: 'Children\'s Privacy' },
                    { id: 'changes', label: 'Changes to This Policy' },
                    { id: 'contact-us', label: 'Contact Us' },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                      className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <Download className="w-4 h-4 mr-1" /> Print Policy
                    </a>
                    <a 
                      href="/delete" 
                      className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete My Data
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6 sm:p-8">
              {/* Introduction */}
              <section id="introduction" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-purple-600" />
                  Introduction
                </h2>

                <p className="text-gray-700 mb-4">
                  Welcome to NEST CRM ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our real estate customer relationship management (CRM) platform.
                </p>

                <p className="text-gray-700 mb-4">
                  NEST CRM provides tools for real estate professionals to manage client relationships, property information, sales pipelines, and business analytics. To deliver these services, we need to collect and process certain personal information. This policy outlines our practices regarding that information and your rights concerning it.
                </p>

                <p className="text-gray-700 mb-4">
                  By using NEST CRM, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>

                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                      <div className="mt-1 text-sm text-yellow-700">
                        <p>
                          As a real estate CRM service, NEST CRM processes information about your clients and prospects. You are responsible for ensuring you have the proper legal basis to collect and process this information and for notifying your contacts that their information will be processed by third-party service providers like us.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-we-collect" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-purple-600" />
                  Information We Collect
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information You Provide to Us</h3>

                <p className="text-gray-700 mb-3">
                  When you register for NEST CRM, set up your profile, or use our services, we collect information that you provide directly to us:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, password, phone number, company name, job title, and profile picture.</li>
                  <li><strong>Billing Information:</strong> Payment details, billing address, and tax information.</li>
                  <li><strong>User Content:</strong> Information you input into the system, such as notes, tasks, appointments, and email communications.</li>
                  <li><strong>Client Information:</strong> Contact details, property preferences, interaction history, and purchase history of your clients that you choose to store in our system.</li>
                  <li><strong>Property Information:</strong> Details about properties you manage, including addresses, prices, features, images, and documents.</li>
                  <li><strong>Support Communications:</strong> Information provided when you contact our support team.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information We Collect Automatically</h3>

                <p className="text-gray-700 mb-3">
                  When you use our platform, we automatically collect certain information about your device and usage:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifier, and mobile network information.</li>
                  <li><strong>Usage Data:</strong> Actions taken, features used, time spent, and frequency of use.</li>
                  <li><strong>Log Data:</strong> System activity, timestamps, clicks, pages viewed, and other statistics.</li>
                  <li><strong>Location Information:</strong> Approximate location derived from IP address.</li>
                  <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar technologies to track user activities and collect device information.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information from Third Parties</h3>

                <p className="text-gray-700 mb-3">
                  We may receive information about you from other sources:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Integration Partners:</strong> If you connect third-party services (like email providers, calendar applications, or property listing platforms) to NEST CRM, we may receive information from these services.</li>
                  <li><strong>Business Partners:</strong> Information shared by our business partners for marketing, support, or service enhancement purposes.</li>
                  <li><strong>Public Sources:</strong> Publicly available information such as public social media profiles or property listing data.</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-purple-600" />
                  How We Use Your Information
                </h2>

                <p className="text-gray-700 mb-4">
                  We use the information we collect to provide, maintain, and improve our services. Specifically, we use your information to:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Provide Services:</strong> Deliver the core functions of NEST CRM, including contact management, property management, task tracking, communication tools, and analytics.</li>
                  <li><strong>Account Management:</strong> Create and manage your account, authenticate users, and provide customer support.</li>
                  <li><strong>Communications:</strong> Send service updates, security alerts, administrative messages, and, with your consent, marketing communications.</li>
                  <li><strong>Personalization:</strong> Customize your experience based on your preferences and usage patterns.</li>
                  <li><strong>Product Development:</strong> Develop new features, products, and services based on user needs and feedback.</li>
                  <li><strong>Analytics and Improvement:</strong> Analyze usage patterns to improve our platform, troubleshoot issues, and optimize performance.</li>
                  <li><strong>Security:</strong> Detect, investigate, and prevent fraudulent transactions, unauthorized access, and other illegal activities.</li>
                  <li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes.</li>
                  <li><strong>Billing and Administration:</strong> Process payments, administer your account, and provide customer service.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Legal Bases for Processing</h3>

                <p className="text-gray-700 mb-3">
                  We process your information under one or more of the following legal bases:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Contract Performance:</strong> Processing is necessary to fulfill our contractual obligations to you.</li>
                  <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests, such as fraud prevention, network security, and marketing our services.</li>
                  <li><strong>Legal Compliance:</strong> Processing is necessary to comply with applicable laws and regulations.</li>
                  <li><strong>Consent:</strong> We process certain data based on your explicit consent, which you can withdraw at any time.</li>
                </ul>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-purple-800">Your Client Data</h3>
                      <div className="mt-1 text-sm text-purple-700">
                        <p>
                          When you upload your clients' and prospects' personal data into NEST CRM, you remain the data controller for this information. We only process this information according to your instructions and as necessary to provide our services to you. You are responsible for ensuring you have the appropriate legal basis to collect and process this information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section id="how-we-share" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Share className="w-6 h-6 mr-2 text-purple-600" />
                  Information Sharing
                </h2>

                <p className="text-gray-700 mb-4">
                  We do not sell your personal information or your clients' personal information to third parties. However, we may share your information in the following circumstances:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> We share information with trusted third-party service providers who perform services on our behalf, such as cloud hosting, data analytics, payment processing, email delivery, and customer support. These providers are contractually obligated to use your information only for the purposes of providing these services to us.</li>
                  
                  <li><strong>Business Transfers:</strong> If NEST CRM is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.</li>
                  
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                  
                  <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of NEST CRM, our users, or others.</li>
                  
                  <li><strong>With Your Consent:</strong> We may share your information with third parties when we have your consent to do so.</li>
                  
                  <li><strong>Aggregated or De-identified Data:</strong> We may share aggregated or de-identified information, which cannot reasonably be used to identify you, with third parties for industry analysis, demographic profiling, and other purposes.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Third-Party Integrations</h3>

                <p className="text-gray-700 mb-4">
                  Our platform allows you to integrate with third-party services, such as email providers, calendar applications, or property listing platforms. When you enable these integrations, you may be allowing us to access and store information from those services. The information we receive will be governed by this Privacy Policy. However, information collected by the third party will be governed by their privacy policy.
                </p>
              </section>

              {/* Data Security */}
              <section id="data-security" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-purple-600" />
                  Data Security
                </h2>

                <p className="text-gray-700 mb-4">
                  The security of your data is important to us. While no method of transmission over the Internet or method of electronic storage is 100% secure, we implement robust security measures to protect your information:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Encryption:</strong> We use industry-standard encryption technologies to protect data in transit and at rest.</li>
                  <li><strong>Access Controls:</strong> We maintain strict access controls to limit employee access to user data based on job function.</li>
                  <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and penetration testing.</li>
                  <li><strong>Security Monitoring:</strong> We use advanced security monitoring tools to detect and respond to potential threats.</li>
                  <li><strong>Employee Training:</strong> All employees receive regular security awareness training.</li>
                  <li><strong>Physical Security:</strong> We ensure physical security for our premises and data centers.</li>
                  <li><strong>Incident Response:</strong> We have documented incident response procedures to address any potential data security incidents promptly.</li>
                </ul>

                <p className="text-gray-700 mb-4">
                  In the event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law.
                </p>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-600" />
                  Data Retention
                </h2>

                <p className="text-gray-700 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>

                <p className="text-gray-700 mb-4">
                  To determine the appropriate retention period for personal data, we consider:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>The amount, nature, and sensitivity of the personal data</li>
                  <li>The potential risk of harm from unauthorized use or disclosure</li>
                  <li>The purposes for which we process the data</li>
                  <li>Whether we can achieve those purposes through other means</li>
                  <li>Legal, regulatory, and contractual requirements</li>
                </ul>

                <p className="text-gray-700 mb-4">
                  For active customer accounts, we generally retain data for the duration of your use of our services, plus a reasonable period thereafter for backup, archival, and audit purposes.
                </p>

                <p className="text-gray-700 mb-4">
                  When your account is terminated, we typically retain certain information for up to 30 days to allow for account recovery. After this period, we begin the process of deleting or anonymizing your personal information, except where retention is necessary for legal reasons.
                </p>

                <p className="text-gray-700 mb-4">
                  You can request the deletion of your account and personal information at any time by contacting us at <a href="mailto:admin@nest-crm.com" className="text-purple-600 hover:text-purple-800">admin@nest-crm.com</a> or visiting our <a href="/delete" className="text-purple-600 hover:text-purple-800">Data Deletion page</a>.
                </p>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-purple-600" />
                  Your Rights
                </h2>

                <p className="text-gray-700 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information. These may include:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information about you.</li>
                  <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                  <li><strong>Restriction:</strong> You can request that we restrict the processing of your information in certain circumstances.</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.</li>
                  <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
                  <li><strong>Withdraw Consent:</strong> If we process your information based on consent, you can withdraw that consent at any time.</li>
                </ul>

                <p className="text-gray-700 mb-4">
                  To exercise any of these rights, please contact us at <a href="mailto:admin@nest-crm.com" className="text-purple-600 hover:text-purple-800">admin@nest-crm.com</a>. We will respond to your request within the timeframe required by applicable law.
                </p>

                <p className="text-gray-700 mb-4">
                  Please note that some of these rights may be limited where we have compelling legitimate grounds to process your information or where there are legal requirements that limit or override these rights.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Data Protection Authority</h3>

                <p className="text-gray-700 mb-4">
                  If you are not satisfied with how we handle your request, you have the right to lodge a complaint with your local data protection authority. However, we encourage you to contact us first so we can try to resolve your concern.
                </p>
              </section>

              {/* International Transfers */}
              <section id="international-transfers" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-purple-600" />
                  International Transfers
                </h2>

                <p className="text-gray-700 mb-4">
                  NEST CRM is headquartered in India, and we may process, store, and transfer your personal information in India and other countries which may have different data protection laws than those in your country of residence.
                </p>

                <p className="text-gray-700 mb-4">
                  When we transfer your information internationally, we take appropriate safeguards to ensure that your information receives an adequate level of protection, regardless of where it is processed. These safeguards may include:
                </p>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Entering into data processing agreements that include standard contractual clauses approved by relevant regulatory authorities</li>
                  <li>Implementing additional technical and organizational measures to protect your personal information</li>
                  <li>Obtaining your explicit consent for certain transfers</li>
                </ul>

                <p className="text-gray-700 mb-4">
                  By using NEST CRM, you consent to the transfer of information to countries outside your country of residence, including India, which may have different data protection rules than those of your country.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-purple-600" />
                  Children's Privacy
                </h2>

                <p className="text-gray-700 mb-4">
                  NEST CRM is designed for business use and is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at <a href="mailto:admin@nest-crm.com" className="text-purple-600 hover:text-purple-800">admin@nest-crm.com</a>. If we discover that a child under 18 has provided us with personal information, we will promptly delete such information from our servers.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section id="changes" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <RefreshCw className="w-6 h-6 mr-2 text-purple-600" />
                  Changes to This Policy
                </h2>

                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make material changes to this policy, we will notify you by email and/or by posting a notice on our website prior to the changes becoming effective.
                </p>

                <p className="text-gray-700 mb-4">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of NEST CRM after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact-us" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-purple-600" />
                  Contact Us
                </h2>

                <p className="text-gray-700 mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                </p>

                <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 mb-6">
                  <p className="font-medium text-gray-900 mb-1">NEST CRM</p>
                  <p className="text-gray-700 mb-1">Attention: Data Protection Team</p>
                  <p className="text-gray-700 mb-4">Mumbai, India</p>
                  
                  <p className="font-medium text-gray-900 mb-1">Email:</p>
                  <p className="text-gray-700">
                    <a href="mailto:admin@nest-crm.com" className="text-purple-600 hover:text-purple-800">admin@nest-crm.com</a>
                  </p>
                </div>

                <p className="text-gray-700 mb-4">
                  We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.
                </p>
              </section>

              {/* Conclusion */}
              <div className="mt-12 p-6 bg-purple-50 rounded-xl border border-purple-100 text-center">
                <h3 className="font-semibold text-purple-900 mb-3">Thank You for Trusting NEST CRM</h3>
                <p className="text-purple-700 mb-4">
                  We are committed to protecting your privacy and maintaining the security of your information. By using transparent practices and robust security measures, we aim to build and maintain your trust.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="/delete" className="text-purple-600 hover:text-purple-800 flex items-center">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete My Data
                  </a>
                  <a href="/feedback" className="text-purple-600 hover:text-purple-800 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Send Feedback
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

// Missing icons for Privacy Policy Page
const Share = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const RefreshCw = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

export default PrivacyPolicy;