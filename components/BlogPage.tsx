import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '../types';
import BlogPostCard from './BlogPostCard';

interface BlogPageProps {
  posts: BlogPost[];
  onViewPost: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onViewPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = useMemo(() => Object.values(BlogCategory), []);
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesCategory && matchesTag;
    });
  }, [posts, selectedCategory, selectedTag]);

  const handleSelectFilter = (type: 'category' | 'tag', value: any) => {
    if (type === 'category') {
        setSelectedCategory(value);
        setSelectedTag(null);
    }
    if (type === 'tag') {
        setSelectedTag(value);
        setSelectedCategory(null);
    }
  }

  return (
    <div>
        <h1 className="text-4xl font-bold text-center text-brand-accent dark:text-brand-primary mb-12">From Our Blog</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Filters */}
            <aside className="lg:col-span-3">
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md sticky top-24 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Categories</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => handleSelectFilter('category', null)} className={`w-full text-left px-3 py-2 rounded transition-colors ${!selectedCategory ? 'bg-brand-secondary text-white font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'}`}>All</button></li>
                            {categories.map(cat => (
                                <li key={cat}><button onClick={() => handleSelectFilter('category', cat)} className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === cat ? 'bg-brand-secondary text-white font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-accent dark:text-gray-300'}`}>{cat}</button></li>
                            ))}
                        </ul>
                    </div>
                    {/* Tags */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-brand-accent dark:text-brand-primary">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                             <button onClick={() => handleSelectFilter('tag', null)} className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${!selectedTag ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>All</button>
                            {allTags.map(tag => (
                                <button key={tag} onClick={() => handleSelectFilter('tag', tag)} className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${selectedTag === tag ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{tag}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right Column: Blog Post Grid */}
            <main className="lg:col-span-9">
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <BlogPostCard key={post.id} post={post} onReadMore={() => onViewPost(post)} />
                        ))
                    ) : (
                         <div className="md:col-span-3 text-center py-16">
                            <p className="text-xl text-gray-500 dark:text-gray-400">No posts found for the selected filter.</p>
                        </div>
                    )}
                 </div>
            </main>
        </div>
    </div>
  );
};

export default BlogPage;
