
import React from 'react';

// New component for timeline item
const TimelineItem: React.FC<{ year: string; title: string; text: string; align: 'left' | 'right' }> = ({ year, title, text, align }) => (
  <div className={`mb-8 flex justify-between items-center w-full ${align === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-brand-secondary shadow-xl w-8 h-8 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">{year.substring(2)}</h1>
    </div>
    <div className="order-1 bg-white dark:bg-dark-surface rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h3 className="mb-3 font-bold text-brand-accent dark:text-brand-primary text-xl">{title}</h3>
      <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-brand-accent dark:text-brand-primary mb-6">About KN Biosciences</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">Pioneering sustainable solutions in biosciences since 1997.</p>

        {/* Leadership */}
        <div className="mb-16 text-center p-8 bg-gray-50 dark:bg-dark-bg rounded-lg">
            <h2 className="text-3xl font-bold text-brand-secondary mb-6">Our Leadership</h2>
            <div className="inline-block">
                <img src="https://picsum.photos/200/200?woman,ceo" alt="P. Sudha Reddy" className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-brand-secondary"/>
                <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary">P. Sudha Reddy</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Founder & CEO</p>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic">"Our mission has always been to blend scientific innovation with a deep respect for nature. We are committed to empowering our farmers and partners with solutions that are not only effective but also sustainable for generations to come."</p>
            </div>
        </div>

        {/* History Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-secondary mb-8 text-center">Our Journey Since 1997</h2>
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-400 h-full border" style={{left: '50%'}}></div>
            <TimelineItem year="1997" title="The Beginning" text="Established our first tissue culture laboratory, laying the foundation for our journey in agri-biotechnology." align="left" />
            <TimelineItem year="2005" title="Diversification" text="Expanded our portfolio to include innovative solutions for the aquaculture and poultry sectors." align="right" />
            <TimelineItem year="2015" title="Innovation Milestone" text="Became the first company in India to launch Nano Fertilizers, revolutionizing nutrient delivery for small-scale farms." align="left" />
            <TimelineItem year="2022" title="National Recognition" text="Received government recognition for excellence and contribution to the field of agri-biotechnology." align="right" />
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
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
        
        {/* Our Facility */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-secondary mb-8 text-center">Our State-of-the-Art Facility</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <img src="https://picsum.photos/600/400?laboratory,modern" alt="KN Biosciences Laboratory" className="rounded-lg shadow-lg" />
                </div>
                <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Located in the heart of Genome Valley, Hyderabad, our NABL-accredited facility is equipped with the latest technology for research, development, and quality control. This allows us to maintain the highest standards for our products and services.</p>
                    <p className="font-semibold text-brand-accent dark:text-gray-200">K N Bio Sciences Pvt. Ltd.<br/>123 Innovation Drive, Genome Valley<br/>Hyderabad, Telangana, 500078, India</p>
                </div>
            </div>
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