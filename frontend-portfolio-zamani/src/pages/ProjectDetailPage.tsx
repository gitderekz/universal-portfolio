import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fallbackProjects } from '../data/fallbackData';
import { ArrowLeft } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams();
  const project = fallbackProjects.find(p => p.slug === slug) || fallbackProjects[0];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Link to="/projects" className="inline-flex items-center text-purple-600 dark:text-purple-400 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Projects
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{project.title}</h1>
          <img src={project.featuredImage} alt={project.title} className="w-full h-96 object-cover rounded-2xl mb-8" />
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-300">{project.content}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
