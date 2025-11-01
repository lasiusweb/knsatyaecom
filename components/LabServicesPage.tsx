import React from 'react';

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
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 text-center">
        {['Soil', 'Water', 'Food', 'Beauty Products', 'Environment'].map(service => (
            <div key={service} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-brand-secondary">{service} Testing</h3>
            </div>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-8">Test Packages</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left bg-white dark:bg-dark-surface rounded-lg shadow-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="p-4 font-bold text-brand-accent dark:text-brand-primary">Feature</th>
                        <th className="p-4 font-bold text-brand-accent dark:text-brand-primary">Basic</th>
                        <th className="p-4 font-bold text-brand-accent dark:text-brand-primary">Standard</th>
                        <th className="p-4 font-bold text-brand-accent dark:text-brand-primary">Premium</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr className="text-gray-600 dark:text-gray-300">
                        <td className="p-4">No. of Parameters</td>
                        <td className="p-4">5</td>
                        <td className="p-4">15</td>
                        <td className="p-4">25+</td>
                    </tr>
                    <tr className="text-gray-600 dark:text-gray-300">
                        <td className="p-4">Turnaround Time</td>
                        <td className="p-4">5-7 Days</td>
                        <td className="p-4">3-5 Days</td>
                        <td className="p-4">1-2 Days</td>
                    </tr>
                    <tr className="text-gray-600 dark:text-gray-300">
                        <td className="p-4">Consultation</td>
                        <td className="p-4">-</td>
                        <td className="p-4">✓</td>
                        <td className="p-4">✓</td>
                    </tr>
                    <tr className="font-bold text-brand-accent dark:text-brand-primary">
                        <td className="p-4">Price</td>
                        <td className="p-4">$50</td>
                        <td className="p-4">$120</td>
                        <td className="p-4">$200</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
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
    </div>
  );
};

export default LabServicesPage;
