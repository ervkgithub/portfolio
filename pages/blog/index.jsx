// pages/blog/index.jsx
'use client';

import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { blogPostsData } from '../../data/blogPostsData';

export default function Blog() {
  // Sort posts by date (newest first)
  const posts = [...blogPostsData].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8 lg:px-10 lg:py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">My Latest Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <div className="h-72 relative">
                  <img
                    src={post.image}
                    alt={post.title || 'Blog post image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {post.title || 'Untitled Post'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt || 'No excerpt available...'}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
                  </span>
                  {post.readingTime && (
                    <span className="flex items-center">
                      <FiClock className="mr-1" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read on LinkedIn <FiExternalLink className="ml-1" />
                  </a>
                ) : (
                  <Link 
                    href={`/blog/${post.slug || post.id || 'post'}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read more <FiArrowRight className="ml-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              No blog posts found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't created any blog posts yet.
            </p>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                To add blog posts, edit the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">data/blogPostsData.js</code> file.
              </p>
              <a
                href="https://www.linkedin.com/in/ervks10/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Visit My LinkedIn <FiExternalLink className="ml-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}