
import React from 'react';

const services = [
    { name: 'Soil Testing', description: 'Analysis of pH, nutrients (N, P, K), organic carbon, and micronutrients to optimize fertilizer use.' },
    { name: 'Water Testing', description: 'Essential for aquaculture and irrigation. We test for hardness, pH, ammonia, nitrites, and contaminants.' },
    { name: 'Food Testing', description: 'FSSAI-compliant testing for microbial contamination, nutritional value, pesticides, and heavy metals.' },
    { name: 'Beauty Products', description: 'Testing for stability, microbial content, and presence of heavy metals in cosmetic formulations.' },
    { name: 'Environment', description: 'Analysis of industrial effluents (ETP/STP) for regulatory compliance, including BOD, COD, and TSS.' },
];

const LabServicesPage: React.FC = () => {
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your sample pickup has been booked! Our team will contact you shortly.');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-accent dark:text-brand-primary mb-4">Laboratory Services</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Accurate, reliable, and NABL-accredited testing for a wide range of industries.</p>
         <div className="flex justify-center items-center space-x-8 mt-4">
            <span className="font-semibold text-sm">NABL Accredited</span>
            <span className="font-semibold text-sm">FSSAI Certified</span>
            <span className="font-semibold text-sm">ISO 9001:2015</span>
        </div>
      </div>

      {/* List of Tests */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map(service => (
            <div key={service.name} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-xl text-brand-secondary mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
        ))}
        <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg shadow-md flex items-center justify-center">
            <p className="font-bold text-center text-brand-accent dark:text-brand-primary">And many more custom tests available!</p>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl max-w-5xl mx-auto mb-16">
        <div>
            <h2 className="text-2xl font-bold text-brand-accent dark:text-brand-primary mb-6">Book a Sample Pickup</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary" />
              </div>
              <div>
                <label htmlFor="sampleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sample Type</label>
                <select id="sampleType" className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary">
                  <option>Soil</option>
                  <option>Water</option>
                  <option>Food Product</option>
                  <option>Beauty Product</option>
                  <option>Environment Sample</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-brand-secondary hover:bg-opacity-90">
                  Schedule Pickup
                </button>
              </div>
            </form>
        </div>
        <div>
             <h2 className="text-2xl font-bold text-brand-accent dark:text-brand-primary mb-6">How It Works</h2>
             <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300">
                <li><span className="font-semibold">Book Online:</span> Fill out the form with your details and sample type.</li>
                <li><span className="font-semibold">We Pick Up:</span> Our team will contact you to schedule a convenient pickup time.</li>
                <li><span className="font-semibold">We Test:</span> Your sample is processed at our state-of-the-art facility.</li>
                <li><span className="font-semibold">Get Report:</span> Receive a detailed digital report via email.</li>
             </ol>
        </div>
      </div>

      {/* FAQ Section */}
       <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg cursor-pointer">
            <summary className="font-semibold text-brand-accent dark:text-gray-200">How long does it take to get my results?</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Turnaround time varies by test, but most reports are delivered within 3-5 business days after the sample reaches our lab.</p>
          </details>
           <details className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg cursor-pointer">
            <summary className="font-semibold text-brand-accent dark:text-gray-200">How should I prepare my sample for pickup?</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Our team will provide you with specific instructions based on the sample type when they call to confirm your pickup.</p>
          </details>
           <details className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg cursor-pointer">
            <summary className="font-semibold text-brand-accent dark:text-gray-200">Are your reports accepted by regulatory bodies?</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Yes, our lab is NABL accredited and our reports are widely accepted for regulatory and certification purposes.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default LabServicesPage;
