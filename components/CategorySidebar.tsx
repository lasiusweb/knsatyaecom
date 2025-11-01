import React from 'react';
import { Category } from '../types';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  subcategories: string[];
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCategory: string | null) => void;
  allTags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ 
  categories, selectedCategory, onSelectCategory, 
  subcategories, selectedSubCategory, onSelectSubCategory,
  allTags, selectedTag, onSelectTag
}) => {
  return (
    <aside className="w-full">
      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md sticky top-24 space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Categories</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onSelectCategory(null)}
                className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 font-semibold ${
                  selectedCategory === null 
                  ? 'bg-brand-secondary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 font-semibold ${
                    selectedCategory === category
                      ? 'bg-brand-secondary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
                {selectedCategory === category && subcategories.length > 0 && (
                  <ul className="pl-4 mt-2 space-y-1 border-l-2 border-brand-secondary/50">
                    <li>
                      <button
                        onClick={() => onSelectSubCategory(null)}
                        className={`w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${
                          selectedSubCategory === null
                            ? 'font-semibold text-brand-secondary'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'
                        }`}
                      >
                        All in {category}
                      </button>
                    </li>
                    {subcategories.map(sub => (
                      <li key={sub}>
                        <button
                          onClick={() => onSelectSubCategory(sub)}
                          className={`w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${
                            selectedSubCategory === sub
                              ? 'font-semibold text-brand-secondary'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'
                          }`}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => onSelectTag(null)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${!selectedTag ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 text-brand-accent dark:text-gray-300 hover:bg-gray-300'}`}
                >
                  All
                </button>
                {allTags.map(tag => (
                   <button 
                    key={tag}
                    onClick={() => onSelectTag(tag)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${selectedTag === tag ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 text-brand-accent dark:text-gray-300 hover:bg-gray-300'}`}
                  >
                    {tag}
                  </button>
                ))}
            </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;