import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { fallbackBlogPosts } from '../data/fallbackData';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export const BlogPage: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Insights and tutorials on web development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackBlogPosts.map((post: any, index: number) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Link to={`/blog/${post.slug}`}>
                <GlassCard hover>
                  <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />5 min read</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
