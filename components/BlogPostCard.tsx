import React from 'react';
import { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2">
      <div className="relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm text-brand-secondary font-semibold">{post.category}</p>
        <h3 className="text-xl font-bold text-brand-accent dark:text-brand-primary mt-2 mb-2 group-hover:text-brand-secondary transition-colors">{post.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">By {post.author} on {post.date}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <div className="mt-auto">
          <button onClick={onReadMore} className="font-bold text-brand-accent dark:text-gray-300 group-hover:text-brand-secondary transition-colors">
            Read More &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;