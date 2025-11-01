
import React, { useState, useEffect } from 'react';
import { Product, Category, BlogPost } from '../types';
import ProductCard from './ProductCard';
import BlogPostCard from './BlogPostCard';
import { AgricultureIcon, AquacultureIcon, FarmEquipmentIcon, LabIcon, PoultryIcon, WasteManagementIcon, OrganicFarmingIcon } from './icons';

const heroTaglines = [
    { title: "India’s #1 Bio Sciences Innovator Since 1997", subtitle: "Pioneering sustainable solutions for agriculture and beyond." },
    { title: "From Tissue Culture to Total Farm Solutions", subtitle: "Led by the visionary leadership of P. Sudha Reddy." },
    { title: "Empowering Farmers, Enriching Nature", subtitle: "Explore our innovative products for a greener, more prosperous future." },
];

// SKELETON LOADER COMPONENTS
const ProductCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden flex flex-col h-full animate-pulse">
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-600"></div>
        <div className="p-4 flex-grow flex flex-col">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-full w-2/5"></div>
            </div>
        </div>
    </div>
);

const BlogPostCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-600"></div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-auto"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mt-4"></div>
        </div>
    </div>
);


const Hero: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
    const [currentTagline, setCurrentTagline] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTagline(prev => (prev + 1) % heroTaglines.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-cover bg-center h-[60vh] rounded-lg overflow-hidden" style={{ backgroundImage: `url('https://picsum.photos/1600/900?nature,farm,landscape')` }}>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-opacity duration-1000">{heroTaglines[currentTagline].title}</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto transition-opacity duration-1000">{heroTaglines[currentTagline].subtitle}</p>
                    <button onClick={onShopNow} className="bg-brand-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105">
                        Explore Our Products
                    </button>
                </div>
            </div>
        </div>
    );
};

const TrustIndicators: React.FC = () => {
    return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md -mt-12 relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-brand-accent dark:text-brand-primary">25+ Years of Excellence</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Innovating since 1997</p>
            </div>
            <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-brand-accent dark:text-brand-primary">Trusted by 50,000+ Farmers</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Across India</p>
            </div>
            <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-brand-accent dark:text-brand-primary">ISO Certified</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Commitment to Quality</p>
            </div>
        </div>
    </div>
    );
};

const CategoryJump: React.FC<{ onSelectCategory: (page: string, category: Category) => void }> = ({ onSelectCategory }) => {
    const categories = [
        { name: Category.Agriculture, icon: AgricultureIcon, page: 'Products' },
        { name: Category.Aquaculture, icon: AquacultureIcon, page: 'Products' },
        { name: Category.Poultry, icon: PoultryIcon, page: 'Products' },
        { name: Category.IndustrialWasteManagement, icon: WasteManagementIcon, page: 'Products' },
        { name: Category.FarmEquipment, icon: FarmEquipmentIcon, page: 'Products' },
        { name: Category.OrganicFarmingConsultation, icon: OrganicFarmingIcon, page: 'Organic Farming' },
        { name: Category.LabServices, icon: LabIcon, page: 'Lab Services' },
    ];
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Explore Our Solutions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-8">
                    {categories.map(({ name, icon: Icon, page }) => (
                        <button key={name} onClick={() => onSelectCategory(page, name)} className="group text-center">
                            <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gray-100 dark:bg-dark-surface rounded-full transition-all duration-300 group-hover:bg-brand-secondary group-hover:scale-110">
                                <Icon className="w-12 h-12 text-brand-accent dark:text-brand-primary transition-colors group-hover:text-white" />
                            </div>
                            <h3 className="mt-4 font-semibold text-brand-accent dark:text-gray-300 transition-colors group-hover:text-brand-secondary text-sm">{name}</h3>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeaturedProducts: React.FC<{ products: Product[], onViewProduct: (product: Product) => void, onQuickView: (product: Product) => void, isLoading: boolean }> = ({ products, onViewProduct, onQuickView, isLoading }) => {
    return (
        <div className="py-16 bg-brand-primary dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
                    ) : (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} onQuickView={onQuickView} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const PromotionsBanner: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-brand-secondary to-green-400 dark:from-brand-accent dark:to-gray-700 text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">First Order Discount!</h2>
                        <p>New to KN Biosciences? Get 15% off your first order of agriculture inputs. Use code: FARMER15</p>
                    </div>
                    <button onClick={onShopNow} className="mt-4 md:mt-0 bg-white text-brand-secondary font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const CEOVideoMessage: React.FC = () => {
    return (
    <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-dark-surface p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-3xl font-bold text-brand-accent dark:text-brand-primary mb-4">A Message from Our Leader</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        "Our mission has always been to blend scientific innovation with a deep respect for nature. We are committed to empowering our farmers and partners with solutions that are not only effective but also sustainable for generations to come."
                    </p>
                    <p className="font-bold text-brand-accent dark:text-gray-200">- P. Sudha Reddy, Founder</p>
                </div>
                <div className="bg-gray-200 dark:bg-black rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-gray-500">Video Message Placeholder</p>
                </div>
            </div>
        </div>
    </div>
    );
};

const BlogHighlights: React.FC<{ posts: BlogPost[], onReadPost: (post: BlogPost) => void, isLoading: boolean }> = ({ posts, onReadPost, isLoading }) => {
    return (
    <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">Tips for Farmers & Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <BlogPostCardSkeleton key={index} />)
                ) : (
                    posts.slice(0, 3).map(post => (
                        <BlogPostCard key={post.id} post={post} onReadMore={() => onReadPost(post)} />
                    ))
                )}
            </div>
        </div>
    </div>
    );
};


interface HomePageProps {
    products: Product[];
    posts: BlogPost[];
    onShopNow: () => void;
    onSelectCategory: (page: string, category: Category) => void;
    onReadPost: (post: BlogPost) => void;
    onViewProduct: (product: Product) => void;
    onQuickView: (product: Product) => void;
    productsLoading: boolean;
    postsLoading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ products, posts, onShopNow, onSelectCategory, onReadPost, onViewProduct, onQuickView, productsLoading, postsLoading }) => {
  return (
    <div className="space-y-8">
      <Hero onShopNow={onShopNow} />
      <TrustIndicators />
      <CategoryJump onSelectCategory={onSelectCategory} />
      <FeaturedProducts products={products.filter(p => p.isBestseller)} onViewProduct={onViewProduct} onQuickView={onQuickView} isLoading={productsLoading} />
      <PromotionsBanner onShopNow={onShopNow} />
      <CEOVideoMessage />
      <BlogHighlights posts={posts} onReadPost={onReadPost} isLoading={postsLoading} />
    </div>
  );
};

export default HomePage;