// pages/Feedback.jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Star, Send, ArrowRight } from 'lucide-react';
import { Navigation } from '../Navigation';
import { Footer } from '../App';

const Feedback = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Feedback - NEST CRM</title>
        <meta name="description" content="Share your feedback on NEST CRM to help us improve your experience. Your insights are valuable to us." />
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
                We Value Your Feedback
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
                Help us make NEST CRM even better by sharing your experience and suggestions.
                Your insights drive our improvements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left Column - Value Proposition */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Your Feedback Matters
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <ThumbsUp className="w-6 h-6 text-purple-600" />,
                      title: "Improve Our Product",
                      content: "Your feedback helps us identify areas where we can enhance NEST CRM to better meet your needs.",
                    },
                    {
                      icon: <Star className="w-6 h-6 text-yellow-500" />,
                      title: "Shape New Features",
                      content: "Suggest features that would make NEST CRM more valuable for your real estate business operations.",
                    },
                    {
                      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
                      title: "Share Your Experience",
                      content: "Tell us about your experience using NEST CRM, what works well and what could be better.",
                    },
                    {
                      icon: <Send className="w-6 h-6 text-green-500" />,
                      title: "Direct Communication",
                      content: "Your feedback goes directly to our product team, ensuring your voice is heard.",
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
                <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-600" />
                    What Happens Next?
                  </h3>
                  <p className="text-sm text-purple-800">
                    After submitting your feedback, our team reviews each response carefully. We use your insights to prioritize improvements and new features. While we may not be able to respond to every submission individually, we truly value each one.
                  </p>
                </div>
              </div>

              {/* Right Column - Google Form */}
              <div className="lg:col-span-3 bg-gray-50 rounded-xl p-4 sm:p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Share Your Thoughts
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Please fill out the form below to provide your feedback.
                  </p>
                </div>

                {/* Embedded Google Form */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <iframe 
                    src="https://forms.gle/T1tcAAGwKxYFVN5e6" 
                    className="w-full h-[600px] border-0"
                    title="NEST CRM Feedback Form"
                  ></iframe>
                </div>

                {/* Alternative Contact */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Having trouble with the form? Contact us directly at:
                  </p>
                  <a 
                    href="mailto:admin@nest-crm.com" 
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium mt-1"
                  >
                    admin@nest-crm.com
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've helped real estate professionals across India streamline their operations. 
              Here's what some of them have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "NEST CRM transformed how we manage leads. The team was incredibly responsive to our feature requests.",
                author: "Rahul Sharma",
                position: "Real Estate Agent, Mumbai",
                rating: 5
              },
              {
                quote: "What stands out about NEST is how they continuously improve based on user feedback. It's become essential to our business.",
                author: "Priya Patel",
                position: "Property Manager, Delhi",
                rating: 5
              },
              {
                quote: "I suggested a few features through their feedback form, and within weeks they were implemented. Impressive service!",
                author: "Vikram Singh",
                position: "Broker, Bangalore",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 sm:p-10 text-white shadow-xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to improve NEST CRM?</h2>
            <p className="max-w-2xl mx-auto mb-6 text-purple-100">
              Your feedback helps us create the real estate CRM you truly need. 
              Share your thoughts today and help shape the future of NEST CRM.
            </p>
            <a
              href="#top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300"
            >
              Submit Your Feedback
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;