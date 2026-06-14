import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { useApi } from '../hooks/useApi';
import { projectsAPI } from '../lib/api';
import { fallbackProjects } from '../data/fallbackData';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { data: projects } = useApi(() => projectsAPI.getAll({ isActive: true }), fallbackProjects);
  const [filter, setFilter] = React.useState('all');
  const categories = ['all', ...Array.from(new Set(projects.map((p: any) => p.category).filter(Boolean)))];
  const filteredProjects = filter === 'all' ? projects : projects.filter((p: any) => p.category === filter);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">My Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">A showcase of my recent work</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button key={category} onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full capitalize transition-colors ${filter === category ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: any, index: number) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <GlassCard hover>
                <img src={project.featuredImage} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.projectUrl && <a href={project.projectUrl} className="flex items-center text-purple-600 dark:text-purple-400 hover:underline"><ExternalLink className="w-4 h-4 mr-1" />Demo</a>}
                  {project.githubUrl && <a href={project.githubUrl} className="flex items-center text-gray-600 dark:text-gray-400 hover:underline"><Github className="w-4 h-4 mr-1" />Code</a>}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
