import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-brand-accent dark:text-brand-primary mb-6">About KN Biosciences</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">Pioneering sustainable solutions in biosciences since 1997.</p>

        {/* Leadership */}
        <div className="mb-12 text-center p-8 bg-gray-50 dark:bg-dark-bg rounded-lg">
            <h2 className="text-3xl font-bold text-brand-secondary mb-6">Our Leadership</h2>
            <div className="inline-block">
                <img src="https://picsum.photos/200/200?woman,ceo" alt="P. Sudha Reddy" className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-brand-secondary"/>
                <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary">P. Sudha Reddy</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Founder & CEO</p>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic">"Our mission has always been to blend scientific innovation with a deep respect for nature. We are committed to empowering our farmers and partners with solutions that are not only effective but also sustainable for generations to come."</p>
            </div>
        </div>

        {/* History Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-secondary mb-4">Our Journey Since 1997</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Founded by the visionary P. Sudha Reddy, KN Biosciences began with a mission to revolutionize agriculture through science and sustainability. Starting with a small tissue culture lab, we have grown into a multi-faceted organization serving over 50,000 farmers and numerous industries across India. Our commitment to innovation and quality has been the cornerstone of our success, driving us to develop products that enhance productivity while preserving the environment.
          </p>
          {/* Timeline-like milestones */}
          <div className="space-y-4 border-l-4 border-brand-secondary/30 pl-6">
              <div>
                  <h4 className="font-bold text-brand-accent dark:text-gray-200">1997 - The Beginning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Established our first tissue culture laboratory.</p>
              </div>
               <div>
                  <h4 className="font-bold text-brand-accent dark:text-gray-200">2005 - Diversification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expanded into aquaculture and poultry solutions.</p>
              </div>
              <div>
                  <h4 className="font-bold text-brand-accent dark:text-gray-200">2015 - Innovation Milestone</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">First in India to launch Nano Fertilizers for small-scale farms.</p>
              </div>
               <div>
                  <h4 className="font-bold text-brand-accent dark:text-gray-200">2022 - National Recognition</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Received government recognition for excellence in agri-biotechnology.</p>
              </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-secondary mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To empower farmers and industries with innovative, eco-friendly, and scientifically-backed biological solutions that promote sustainable growth and prosperity for all.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-secondary mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To be India’s leading and most trusted biosciences company, recognized globally for our contribution to a greener, healthier, and more productive planet.
            </p>
          </div>
        </div>

        {/* CSR */}
         <div className="mb-12">
            <h2 className="text-3xl font-bold text-brand-secondary mb-4">Corporate Social Responsibility</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We believe in giving back to the community that sustains us. Our CSR initiatives focus on educating farmers on sustainable practices through free training camps, promoting water conservation, and supporting rural development projects. We are dedicated to creating a positive impact that extends beyond our products.
            </p>
        </div>


        {/* Certifications */}
        <div>
          <h2 className="text-3xl font-bold text-brand-secondary mb-4 text-center">Our Commitment to Quality</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center p-4">
                <p className="font-bold text-lg text-brand-accent dark:text-gray-300">ISO 9001:2015</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quality Management</p>
            </div>
             <div className="text-center p-4">
                <p className="font-bold text-lg text-brand-accent dark:text-gray-300">NABL Accredited</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Laboratory Services</p>
            </div>
             <div className="text-center p-4">
                <p className="font-bold text-lg text-brand-accent dark:text-gray-300">FSSAI Certified</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Food Testing</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;