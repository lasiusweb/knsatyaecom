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

        {/* Consultation Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
          <div className="border-2 border-brand-secondary rounded-lg p-6 text-center bg-white dark:bg-dark-surface shadow-2xl scale-105">
             <span className="bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full -mt-10 inline-block">Most Popular</span>
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

        {/* Resources Section */}
        <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-accent dark:text-brand-primary mb-4">Free Resources</h2>
            <div className="flex justify-center space-x-8">
                <button className="font-semibold text-brand-accent dark:text-gray-300 hover:text-brand-secondary">Download Our Guide</button>
                <button className="font-semibold text-brand-accent dark:text-gray-300 hover:text-brand-secondary">Watch Video Tutorials</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default OrganicFarmingPage;
