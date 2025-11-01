
import React from 'react';

const OrganicFarmingPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-cover bg-center h-64 rounded-lg" style={{ backgroundImage: "url('https://picsum.photos/1200/400?organic,farm')" }}>
        <div className="flex items-center justify-center h-full bg-black/50 rounded-lg">
          <h1 className="text-4xl font-bold text-white text-center">Organic Farming Consultation</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-accent dark:text-brand-primary mb-4">Partner with Our Agri Experts</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Transition to sustainable, profitable organic farming with our guided expertise.</p>
        </div>

        {/* Our Process Section */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Our Proven Process</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-4"><span className="text-2xl font-bold text-brand-secondary">1</span></div>
                    <h3 className="font-bold text-lg mb-2 text-brand-accent dark:text-brand-primary">Assessment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We start with a thorough analysis of your soil, water, and current farming practices.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-4"><span className="text-2xl font-bold text-brand-secondary">2</span></div>
                    <h3 className="font-bold text-lg mb-2 text-brand-accent dark:text-brand-primary">Custom Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive a detailed, step-by-step organic transition plan tailored to your farm.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-4"><span className="text-2xl font-bold text-brand-secondary">3</span></div>
                    <h3 className="font-bold text-lg mb-2 text-brand-accent dark:text-brand-primary">Implementation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Our experts guide you through every step of implementation, from seed to harvest.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-4"><span className="text-2xl font-bold text-brand-secondary">4</span></div>
                    <h3 className="font-bold text-lg mb-2 text-brand-accent dark:text-brand-primary">Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get ongoing support and monitoring to ensure your success and certification.</p>
                </div>
            </div>
        </div>

        {/* Consultation Packages */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Package */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-dark-surface shadow-lg">
                <h3 className="text-2xl font-bold text-brand-secondary mb-4">Basic Plan</h3>
                <p className="text-4xl font-bold text-brand-accent dark:text-brand-primary mb-4">$99</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ 1:1 Video Consultation (60 min)</li>
                  <li>✓ Soil Health Analysis</li>
                  <li>✓ Basic Organic Transition Plan</li>
                </ul>
                <button className="w-full bg-brand-accent text-white py-2 rounded-full hover:bg-opacity-80 transition-colors">Book Now</button>
              </div>
              {/* Premium Package */}
              <div className="border-2 border-brand-secondary rounded-lg p-6 text-center bg-white dark:bg-dark-surface shadow-2xl scale-105 relative">
                 <span className="absolute -top-4 right-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                <h3 className="text-2xl font-bold text-brand-secondary mb-4">Premium Plan</h3>
                <p className="text-4xl font-bold text-brand-accent dark:text-brand-primary mb-4">$249</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ 3 x 1:1 Video Consultations</li>
                  <li>✓ Comprehensive Farm Analysis</li>
                  <li>✓ Custom Crop Rotation Plan</li>
                  <li>✓ Pest Management Guide</li>
                </ul>
                <button className="w-full bg-brand-secondary text-white py-2 rounded-full hover:bg-opacity-90 transition-colors">Book Now</button>
              </div>
              {/* On-Site Package */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-dark-surface shadow-lg">
                <h3 className="text-2xl font-bold text-brand-secondary mb-4">On-Site Visit</h3>
                <p className="text-4xl font-bold text-brand-accent dark:text-brand-primary mb-4">Custom</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>✓ Full-Day On-Site Expert Visit</li>
                  <li>✓ Hands-On Training for Staff</li>
                  <li>✓ 1-Year Support Plan</li>
                </ul>
                <button className="w-full bg-brand-accent text-white py-2 rounded-full hover:bg-opacity-80 transition-colors">Request Quote</button>
              </div>
            </div>
        </div>

        {/* Testimonial Section */}
        <div className="text-center bg-gray-50 dark:bg-dark-bg p-12 rounded-lg">
            <img src="https://picsum.photos/100/100?farmer,smiling" alt="Happy Farmer" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-dark-surface" />
            <p className="text-lg text-gray-700 dark:text-gray-300 italic max-w-2xl mx-auto">"Switching to organic felt overwhelming, but the team at KN Biosciences made it simple and profitable. Their guidance was invaluable, and my farm has never been healthier."</p>
            <p className="font-bold text-brand-accent dark:text-gray-200 mt-4">- R. Patel, Gujarat</p>
        </div>

      </div>
    </div>
  );
};

export default OrganicFarmingPage;
