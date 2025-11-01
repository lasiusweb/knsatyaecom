import React from 'react';
import { PhoneIcon, WhatsappIcon } from './icons';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-brand-accent dark:text-brand-primary mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" />
              </div>
              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Inquiry About</label>
                <select id="inquiry" name="inquiry" className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary">
                  <option>General Inquiry</option>
                  <option>Product Sales</option>
                  <option>Consultation Services</option>
                  <option>Lab Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-brand-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-brand-accent dark:text-brand-primary mb-6">Our Information</h2>
            <div className="flex flex-col space-y-4">
              <a href="tel:+911234567890" className="flex items-center p-4 bg-gray-100 dark:bg-dark-bg rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <PhoneIcon className="w-6 h-6 text-brand-secondary mr-4"/>
                  <span>Call Us: +91-123-456-7890</span>
              </a>
               <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-100 dark:bg-dark-bg rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <WhatsappIcon className="w-6 h-6 text-brand-secondary mr-4"/>
                  <span>Message us on WhatsApp</span>
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand-accent dark:text-gray-200">Address</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">K N Bio Sciences Pvt. Ltd.<br/>123 Innovation Drive, Genome Valley<br/>Hyderabad, Telangana, 500078, India</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand-accent dark:text-gray-200">Email</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Sales: sales@knbiosciences.com</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Support: support@knbiosciences.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
