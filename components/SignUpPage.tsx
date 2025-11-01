import React, { useState } from 'react';
import { LeafIcon } from './icons';
// Fix: Import centralized User type
import { User } from '../types';

interface SignUpPageProps {
  onSignUp: (user: User) => void;
  onSignInClick: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onSignInClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp({ name, email });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-12 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-dark-surface rounded-xl shadow-lg">
        <div className="text-center">
            <LeafIcon className="w-12 h-12 mx-auto text-brand-secondary" />
            <h2 className="mt-6 text-3xl font-bold text-brand-accent dark:text-brand-primary">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button onClick={onSignInClick} className="font-medium text-brand-secondary hover:underline">
                    Sign in
                </button>
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="full-name" className="sr-only">Full Name</label>
                    <input id="full-name" name="name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-dark-bg rounded-t-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm" placeholder="Full Name" />
                </div>
                 <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-dark-bg focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-dark-bg rounded-b-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm" placeholder="Password" />
                </div>
            </div>
            <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary">
                    Create Account
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
