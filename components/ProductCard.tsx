import React from 'react';
import { Product } from '../types';
import { StarIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    ))}
    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({reviewCount})</span>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, onQuickView }) => {
  const renderCTA = () => {
    switch (product.ctaType) {
      case 'b2b':
        return <button onClick={(e) => { e.stopPropagation(); alert('Redirecting to B2B Quote Form'); }} className="bg-brand-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300">Request Quote</button>;
      case 'equipment':
        return (
          <div className="flex flex-col space-y-2">
            <button onClick={(e) => { e.stopPropagation(); alert('Opening Demo Scheduler'); }} className="bg-brand-accent text-white px-4 py-2 text-sm rounded-full hover:bg-opacity-80 transition-all duration-300">Schedule Demo</button>
          </div>
        );
      case 'e-commerce':
      default:
        return (
          <button onClick={(e) => { e.stopPropagation(); alert(`${product.name} added to cart!`); }} className="bg-brand-accent text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
            Add to Cart
          </button>
        );
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div 
      className="group perspective-1000 h-full cursor-pointer"
      onClick={() => onViewProduct(product)}
      aria-label={`View details for ${product.name}`}
    >
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col h-full">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleQuickViewClick}
              className="bg-white/90 text-brand-accent font-bold py-2 px-6 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-200 ease-in-out"
            >
              Quick View
            </button>
          </div>
          {product.isBestseller && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Farmer's Choice</span>
          )}
          <span className="absolute top-2 right-2 bg-brand-secondary text-white text-xs font-bold px-2 py-1 rounded">{product.subCategory}</span>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-brand-accent dark:text-brand-primary mb-2 truncate group-hover:text-brand-secondary">{product.name}</h3>
          <div className="mb-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-16 overflow-hidden">{product.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-brand-accent dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xl font-bold text-brand-secondary">${product.price.toFixed(2)}</p>
            {renderCTA()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;