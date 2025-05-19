// components/PricingSection.tsx
'use client';
import React, { useEffect } from 'react';

const PricingSection = () => {
  useEffect(() => {
    // Dynamically load Stripe pricing table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Simple pricing for every need. Cancel anytime.
          </p>
        </div>

        {/* Stripe Pricing Table */}
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
            {/* @ts-ignore */}
            <stripe-pricing-table
              pricing-table-id="prctbl_1QYl8ACVA8s1lzSpTKMzVjdr"
              publishable-key="pk_test_51QYjYCCVA8s1lzSpHFiti6Xscpre9fdMizP1PfeNdSnAinbSGWadr0hSKOhLNOcEg3nQjhMiM8RfVUQ3yyMyGyxD00ccFCXjhj"
              client-reference-id="user_{{USER_ID}}"
              customer-email="user@example.com"
            ></stripe-pricing-table>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Basic Features",
              description: "Everything you need to get started with our platform's core functionality.",
              icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )
            },
            {
              title: "Standard Benefits",
              description: "Enhanced capabilities for growing businesses and power users.",
              icon: (
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              )
            },
            {
              title: "Premium Advantages",
              description: "The complete package with priority support and exclusive features.",
              icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              )
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade at any time."
              },
              {
                question: "Is there a free trial available?",
                answer: "We offer a 14-day free trial for all new customers."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;