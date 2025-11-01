import React, { useState } from 'react';
import { Product, Variant } from '../types';
import { StarIcon, HeartIcon } from './icons';
import ProductCard from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onViewProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isLoggedIn: boolean;
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


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, allProducts, onBack, onViewProduct, onQuickView, isLoggedIn }) => {
  const hasVariants = product.variants && product.variants.length > 0;
  // Default to the first in-stock item, or the very first item if all are out of stock.
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? product.variants!.find(v => v.stock !== 'out-of-stock') || product.variants![0] : null
  );

  const frequentlyBought = allProducts.filter(p => product.frequentlyBoughtWith?.includes(p.id));

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayImageUrl = (selectedVariant && selectedVariant.imageUrl) ? selectedVariant.imageUrl : product.imageUrl;
  
  const handleSelectVariant = (variant: Variant) => {
    // We can still allow selecting out-of-stock variants to see info,
    // but the 'Add to Cart' will be disabled.
    setSelectedVariant(variant);
  };
  
  const StockIndicator = () => {
    if (!selectedVariant) return null;

    switch(selectedVariant.stock) {
        case 'low-stock':
            return <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-3 font-semibold">Low stock - order soon!</p>;
        case 'out-of-stock':
            return <p className="text-sm text-red-600 dark:text-red-400 mt-3 font-semibold">This option is currently out of stock.</p>;
        default:
            return <p className="text-sm text-green-600 dark:text-green-400 mt-3 font-semibold">In Stock</p>;
    }
  };


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
                <img src={displayImageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
            </div>
            {/* Right Column: Details */}
            <div>
                <span className="text-sm font-semibold text-brand-secondary">{product.category} &gt; {product.subCategory}</span>
                <h1 className="text-4xl font-bold text-brand-accent dark:text-brand-primary my-3">{product.name}</h1>
                <div className="mb-4">
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                </div>
                <p className="text-3xl font-bold text-brand-secondary mb-6">${displayPrice.toFixed(2)}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{product.longDescription}</p>
                
                {/* Variants Section */}
                {hasVariants && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Available Options {selectedVariant ? `- ${selectedVariant.name}` : ''}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.variants!.map(variant => {
                        const isSelected = selectedVariant?.id === variant.id;
                        const isOutOfStock = variant.stock === 'out-of-stock';
                        return (
                          <button
                            key={variant.id}
                            onClick={() => handleSelectVariant(variant)}
                            className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary/50 ${
                              isSelected
                                ? 'bg-brand-secondary text-white border-brand-secondary shadow-md'
                                : isOutOfStock
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed line-through'
                                : 'bg-transparent border-gray-300 dark:border-gray-600 text-brand-accent dark:text-gray-300 hover:border-brand-secondary'
                            }`}
                          >
                            {variant.name}
                          </button>
                        );
                      })}
                    </div>
                    <StockIndicator />
                  </div>
                )}


                <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-brand-accent dark:text-gray-300 px-3 py-1.5 rounded-full font-semibold">{tag}</span>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => alert(`${product.name} (${selectedVariant?.name}) added to cart!`)} 
                        disabled={!selectedVariant || selectedVariant.stock === 'out-of-stock'}
                        className="flex-grow bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {selectedVariant?.stock === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    {isLoggedIn && (
                        <button 
                            onClick={() => alert(`${product.name} (${selectedVariant?.name}) added to wishlist!`)}
                            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            aria-label="Add to Wishlist"
                            title="Add to Wishlist"
                        >
                            <HeartIcon className="w-6 h-6" />
                        </button>
                    )}
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
                    <ProductCard key={item.id} product={item} onViewProduct={onViewProduct} onQuickView={onQuickView} />
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