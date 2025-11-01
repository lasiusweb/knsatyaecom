import React from 'react';
import { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-brand-secondary font-bold hover:underline flex items-center group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Blog
      </button>
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
        <div className="p-6 md:p-12">
          <p className="text-brand-secondary font-semibold">{post.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-accent dark:text-brand-primary mt-4 mb-4">{post.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">By {post.author} on {post.date}</p>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-brand-accent dark:text-gray-200 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;