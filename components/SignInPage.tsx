import React, { useState } from 'react';
import { LeafIcon } from './icons';
// Fix: Import centralized User type
import { User } from '../types';

interface SignInPageProps {
  onSignIn: (user: User) => void;
  onSignUpClick: () => void;
  onDemoLogin: (user: User) => void;
}

const DEMO_USERS = {
    farmer: { name: 'Alex the Farmer', email: 'farmer@knbio.com' },
    b2b: { name: 'BioCorp Manager', email: 'manager@biocorp.com' },
};

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn, onSignUpClick, onDemoLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here.
    // For this demo, we'll create a mock user.
    const userName = email.split('@')[0];
    onSignIn({ name: userName.charAt(0).toUpperCase() + userName.slice(1), email });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-12 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-dark-surface rounded-xl shadow-lg">
        <div className="text-center">
            <LeafIcon className="w-12 h-12 mx-auto text-brand-secondary" />
            <h2 className="mt-6 text-3xl font-bold text-brand-accent dark:text-brand-primary">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <button onClick={onSignUpClick} className="font-medium text-brand-secondary hover:underline">
                    create a new account
                </button>
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-dark-bg rounded-t-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-dark-bg rounded-b-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm" placeholder="Password" />
                </div>
            </div>
            <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary">
                    Sign in
                </button>
            </div>
        </form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-surface text-gray-500 dark:text-gray-400">Or continue with a demo</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onDemoLogin(DEMO_USERS.farmer)} type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                Farmer Login
            </button>
            <button onClick={() => onDemoLogin(DEMO_USERS.b2b)} type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                B2B Login
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
