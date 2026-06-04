import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fallbackBlogPosts } from '../data/fallbackData';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const post = fallbackBlogPosts.find(p => p.slug === slug) || fallbackBlogPosts[0];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-purple-600 dark:text-purple-400 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Blog
        </Link>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center"><User className="w-4 h-4 mr-2" />{post.author.firstName} {post.author.lastName}</span>
          </div>
          <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover rounded-2xl mb-8" />
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{post.content}</p>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
