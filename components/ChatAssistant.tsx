import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatIcon, LeafIcon } from './icons';

type Message = {
    text: string;
    sender: 'user' | 'ai';
};

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hello! I'm your AI assistant for KN Biosciences. How can I help you learn about our products or services today?",
            sender: 'ai'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chat) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are a friendly and professional AI assistant for KN Biosciences, a leading Indian company in agriculture, aquaculture, poultry, and industrial waste management. Your goal is to help users by answering their questions about the company, its products, and services.

                        - Company Background: Founded in 1997 by P. Sudha Reddy, KN Biosciences is an ISO-certified innovator.
                        - Product Categories: Agriculture Inputs (e.g., Nano Fertilizers), Aquaculture Solutions (e.g., Pond Probiotics), Poultry Farming (e.g., Feed Supplements), Industrial Waste Management (e.g., ETP solutions), and Farm Equipment.
                        - Services: Organic Farming Consultation and NABL-accredited Lab Services (Soil, Water, Food testing).
                        
                        Your responsibilities:
                        1.  Answer questions based on the provided product and service categories.
                        2.  If asked about a specific product, provide a brief overview and suggest the user check the "Products" page for details.
                        3.  For pricing or purchase inquiries, direct users to the product pages or the contact page for B2B/equipment quotes.
                        4.  For complex agricultural or scientific questions, recommend using the "Contact Us" page to speak with an expert.
                        5.  Maintain a helpful and polite tone. Do not invent products, services, or information.
                        6.  Keep responses concise and easy to understand.`,
                    },
                });
                setChat(newChat);
            } catch (error) {
                console.error("Failed to initialize Gemini AI:", error);
                setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai' }]);
            }
        }
    }, [isOpen, chat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chat) return;

        const userMessage: Message = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const aiMessage: Message = { text: response.text, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: Message = { text: "I'm sorry, I encountered an error. Please try again.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 bg-white dark:bg-dark-surface rounded-lg shadow-2xl transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-brand-accent text-white rounded-t-lg">
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                             {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center"><LeafIcon className="w-5 h-5 text-white"/></div>}
                            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-brand-secondary text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-brand-accent dark:text-gray-200 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center"><LeafIcon className="w-5 h-5 text-white"/></div>
                             <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                                </div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !inputValue.trim()} className="ml-2 p-3 bg-brand-secondary text-white rounded-full hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors">
                        <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 bg-brand-secondary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50"
                aria-label="Toggle AI Assistant"
            >
                <ChatIcon className="w-8 h-8" />
            </button>
        </>
    );
};

export default ChatAssistant;
