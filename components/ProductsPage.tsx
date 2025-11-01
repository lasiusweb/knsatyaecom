import React from 'react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';
import CategorySidebar from './CategorySidebar';

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  subcategories: string[];
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCategory: string | null) => void;
  onViewProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  allTags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  isLoading: boolean;
}

// Skeleton loader for ProductCard
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


const FeaturedContent: React.FC = () => {
    return (
        <aside className="w-full">
            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md sticky top-24 space-y-6">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Customer Reviews</h3>
                    <div className="border-l-4 border-brand-secondary pl-4">
                        <p className="italic text-gray-600 dark:text-gray-400">"The nano fertilizers doubled my crop yield! Highly recommended."</p>
                        <p className="text-right font-semibold text-sm mt-2 text-brand-accent dark:text-gray-300">- A. Kumar, Farmer</p>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Need Consultation?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Our experts are here to help you with organic farming practices and more.</p>
                     <button className="w-full bg-brand-secondary text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors">Contact Us</button>
                </div>
            </div>
        </aside>
    );
}

const ProductsPage: React.FC<ProductsPageProps> = ({ 
  products, 
  categories, 
  selectedCategory, 
  onSelectCategory,
  subcategories,
  selectedSubCategory,
  onSelectSubCategory,
  onViewProduct,
  onQuickView,
  allTags,
  selectedTag,
  onSelectTag,
  isLoading
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Category Filters */}
      <div className="lg:col-span-3">
        <CategorySidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          subcategories={subcategories}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={onSelectSubCategory}
          allTags={allTags}
          selectedTag={selectedTag}
          onSelectTag={onSelectTag}
        />
      </div>

      {/* Center Column: Product Grid */}
      <main className="lg:col-span-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} onQuickView={onQuickView} />
            ))
          ) : (
            <div className="md:col-span-2 text-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Column: Featured Content/Reviews */}
      <div className="lg:col-span-3">
        <FeaturedContent />
      </div>
    </div>
  );
};

export default ProductsPage;