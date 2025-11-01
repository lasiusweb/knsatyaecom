import React, { useState } from 'react';
import { SunIcon, MoonIcon, SearchIcon, LeafIcon } from './icons';
import { Category } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: string, category?: Category) => void;
  isLoggedIn: boolean;
  userName: string | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, searchTerm, setSearchTerm, setCurrentPage, isLoggedIn, userName, onSignOut }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const productCategories = [
    Category.Agriculture,
    Category.Aquaculture,
    Category.Poultry,
    Category.IndustrialWasteManagement,
    Category.FarmEquipment
  ];
  
  const navLinks = [
    { name: 'Home', action: () => setCurrentPage('Home') },
    { name: 'Products', dropdown: productCategories.map(cat => ({ name: cat, action: () => setCurrentPage('Products', cat) }))},
    { name: 'Solutions by Segment', dropdown: [
      { name: 'For Shrimp Farmers', action: () => setCurrentPage('Products', Category.Aquaculture) },
      { name: 'For Organic Startups', action: () => setCurrentPage('Products', Category.Agriculture) },
    ]},
    { name: 'About Us', action: () => setCurrentPage('About') },
    { name: 'Blog', action: () => setCurrentPage('Blog') },
    { name: 'Organic Farming', action: () => setCurrentPage('Organic Farming') },
    { name: 'Lab Services', action: () => setCurrentPage('Lab Services') },
    { name: 'Contact', action: () => setCurrentPage('Contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-primary/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('Home')}
          >
            <LeafIcon className="h-8 w-8 text-brand-secondary" />
            <h1 className="ml-2 text-2xl font-bold text-brand-accent dark:text-brand-primary">KN Biosciences</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                <button 
                  onClick={link.action}
                  className="flex items-center text-brand-accent dark:text-gray-300 hover:text-brand-secondary dark:hover:text-white transition-colors duration-200"
                >
                  {link.name}
                  {link.dropdown && <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
                </button>
                {link.dropdown && openDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-surface rounded-md shadow-lg py-2 z-50 animate-fade-in-down">
                    {link.dropdown.map(item => (
                      <button 
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-brand-accent dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-secondary"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-48 border border-gray-300 dark:border-gray-600 rounded-full bg-transparent text-brand-accent dark:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                    <span className="hidden lg:block text-sm font-medium text-brand-accent dark:text-gray-300">Welcome, {userName}!</span>
                    <button onClick={onSignOut} className="px-4 py-2 text-sm font-medium text-brand-accent dark:text-gray-300 border border-brand-accent dark:border-gray-500 rounded-full hover:bg-brand-accent/10 dark:hover:bg-dark-surface/50 transition-colors">
                        Log Out
                    </button>
                </div>
            ) : (
                <div className="hidden md:flex items-center space-x-2">
                    <button onClick={() => setCurrentPage('SignIn')} className="px-4 py-2 text-sm font-medium text-brand-accent dark:text-gray-300 rounded-full hover:bg-brand-accent/10 dark:hover:bg-dark-surface/50 transition-colors">
                        Sign In
                    </button>
                    <button onClick={() => setCurrentPage('SignUp')} className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-full hover:bg-opacity-90 transition-colors">
                        Sign Up
                    </button>
                </div>
            )}

            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors duration-200">
              {darkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-brand-accent" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;