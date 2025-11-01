import React, { useState } from 'react';
// Fix: Import centralized User and Order types from types.ts
import { User, Product, Order } from '../types';

// Fix: Removed local Order type definition, now imported from types.ts

interface ProfilePageProps {
  user: User;
  orders: Order[];
  onUpdateUser: (updatedUser: User) => void;
}

const ProfileInformation: React.FC<{user: User, onUpdateUser: (user: User) => void}> = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleSave = () => {
        onUpdateUser({ name, email });
        setIsEditing(false);
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary">Personal Details</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your name and email address.</p>
            </div>
            {!isEditing ? (
                 <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg space-y-4">
                    <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Full Name</p>
                        <p className="text-gray-900 dark:text-gray-100">{user.name}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Email Address</p>
                        <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-full hover:bg-opacity-90">Edit Profile</button>
                 </div>
            ) : (
                <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div className="flex space-x-2">
                         <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-full hover:bg-opacity-90">Save Changes</button>
                         <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-brand-accent dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-opacity-90">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const OrderHistory: React.FC<{orders: Order[]}> = ({ orders }) => {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary">Your Orders</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Review your past purchases.</p>
            </div>
            <div className="space-y-6">
                {orders.length > 0 ? orders.map(order => (
                    <div key={order.id} className="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-xs font-semibold text-gray-500">ORDER NUMBER</p>
                                <p className="font-bold text-brand-accent dark:text-gray-200">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">DATE</p>
                                <p className="text-brand-accent dark:text-gray-200">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">TOTAL</p>
                                <p className="font-bold text-brand-accent dark:text-gray-200">${order.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">STATUS</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                             {order.items.map(item => (
                                <div key={item.id} className="flex items-center space-x-4 text-sm">
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded"/>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-brand-accent dark:text-gray-200">{item.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-brand-accent dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 dark:text-gray-400">You have no past orders.</p>
                )}
            </div>
        </div>
    )
}

const Preferences: React.FC = () => {
    return (
        <div className="space-y-4">
             <div>
                <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary">Communication Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose how we communicate with you.</p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-lg">
                <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-brand-secondary rounded focus:ring-brand-secondary" defaultChecked />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">Receive newsletter and promotional emails.</span>
                </label>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-full hover:bg-opacity-90">Save Preferences</button>
        </div>
    )
}


const ProfilePage: React.FC<ProfilePageProps> = ({ user, orders, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'prefs'>('info');

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <ProfileInformation user={user} onUpdateUser={onUpdateUser}/>;
      case 'orders':
        return <OrderHistory orders={orders} />;
      case 'prefs':
        return <Preferences />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{tab: 'info' | 'orders' | 'prefs', label: string}> = ({ tab, label }) => (
     <button 
        onClick={() => setActiveTab(tab)}
        className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${activeTab === tab ? 'bg-brand-secondary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'}`}
     >
        {label}
    </button>
  );

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-brand-accent dark:text-brand-primary mb-8">My Account</h1>
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar for Tabs */}
        <aside className="lg:col-span-3">
            <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md space-y-2">
                <TabButton tab="info" label="Profile Information"/>
                <TabButton tab="orders" label="Order History"/>
                <TabButton tab="prefs" label="Preferences"/>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
            <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-md min-h-[400px]">
                {renderContent()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
