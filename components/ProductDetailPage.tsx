import React from 'react';
import { Product } from '../types';
import { StarIcon } from './icons';
import ProductCard from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number; reviewCount: number; size?: 'sm' | 'lg' }> = ({ rating, reviewCount, size = 'lg' }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`${size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    ))}
    <span className={`text-gray-500 dark:text-gray-400 ml-2 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>({reviewCount} reviews)</span>
  </div>
);

const CustomerReviews: React.FC = () => (
    <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <StarRating rating={5} reviewCount={1} size="sm" />
            <p className="font-bold mt-2 text-brand-accent dark:text-gray-200">Excellent Yield!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">"Used the Nano Fertilizer and my crop yield increased by 30%. Absolutely amazing product." - Ramesh K.</p>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <StarRating rating={4} reviewCount={1} size="sm" />
            <p className="font-bold mt-2 text-brand-accent dark:text-gray-200">Good, but expensive</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">"Works as advertised and my plants are healthier. A bit on the pricey side but worth it." - Priya S.</p>
        </div>
    </div>
);


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, allProducts, onBack, onViewProduct }) => {

  const frequentlyBought = allProducts.filter(p => product.frequentlyBoughtWith?.includes(p.id));

  return (
    <div className="animate-fade-in">
       <button onClick={onBack} className="mb-8 text-brand-secondary font-bold hover:underline flex items-center group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Products
      </button>

      <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl">
        <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: Image */}
            <div>
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
            </div>
            {/* Right Column: Details */}
            <div>
                <span className="text-sm font-semibold text-brand-secondary">{product.category} &gt; {product.subCategory}</span>
                <h1 className="text-4xl font-bold text-brand-accent dark:text-brand-primary my-3">{product.name}</h1>
                <div className="mb-4">
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                </div>
                <p className="text-3xl font-bold text-brand-secondary mb-6">${product.price.toFixed(2)}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{product.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-brand-accent dark:text-gray-300 px-3 py-1.5 rounded-full font-semibold">{tag}</span>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex-grow bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-all">Add to Cart</button>
                    <button className="text-brand-accent dark:text-gray-300 hover:text-brand-secondary">Need Help Choosing?</button>
                </div>
            </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
          <div className="my-16">
            <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-8">Frequently Bought Together</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {frequentlyBought.map(item => (
                    <ProductCard key={item.id} product={item} onViewProduct={onViewProduct} />
                ))}
            </div>
          </div>
      )}

      {/* Customer Reviews */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center text-brand-accent dark:text-brand-primary mb-8">Customer Reviews</h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl">
            <CustomerReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;