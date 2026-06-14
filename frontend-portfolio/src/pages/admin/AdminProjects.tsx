import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApi } from '../../hooks/useApi';
import { projectsAPI } from '../../lib/api';
import { fallbackProjects } from '../../data/fallbackData';
import { GlassCard } from '../../components/GlassCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminProjects: React.FC = () => {
  const { data: projectsResponse, loading, refetch } = useApi(
    () => projectsAPI.getAll(),
    { projects: fallbackProjects }
  );
  
  const projects = projectsResponse?.projects || fallbackProjects;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    technologies: '',
    featuredImage: '',
    projectUrl: '',
    githubUrl: '',
    status: 'completed',
    isActive: true
  });

  const filteredProjects = projects.filter((project: any) =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      let technologies = project.technologies;
      if (typeof technologies === 'string') {
        try {
          technologies = JSON.parse(technologies);
        } catch (e) {
          technologies = [];
        }
      }
      setFormData({
        title: project.title || '',
        description: project.description || '',
        content: project.content || '',
        category: project.category || '',
        technologies: Array.isArray(technologies) ? technologies.join(', ') : '',
        featuredImage: project.featuredImage || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        status: project.status || 'completed',
        isActive: project.isActive !== undefined ? project.isActive : true
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        technologies: '',
        featuredImage: '',
        projectUrl: '',
        githubUrl: '',
        status: 'completed',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const projectData = {
        title: formData.title,
        slug,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        featuredImage: formData.featuredImage,
        projectUrl: formData.projectUrl,
        githubUrl: formData.githubUrl,
        status: formData.status,
        isActive: formData.isActive,
        order: editingProject?.order || 0
      };

      if (editingProject) {
        await projectsAPI.update(editingProject.id, projectData);
      } else {
        await projectsAPI.create(projectData);
      }

      refetch();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        refetch();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </motion.button>
        </div>

        <GlassCard className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: any, index: number) => (
            <GlassCard key={project.id} delay={index * 0.1}>
              <div>
                {project.featuredImage && (
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                {project.category && (
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm mb-4">
                    {project.category}
                  </span>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Modal - Keep your existing modal code */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Your existing modal form content */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                  <button onClick={handleCloseModal}><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Form fields... */}
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold">
                      {editingProject ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={handleCloseModal} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};








// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
// import { AdminHeader } from '../../components/AdminHeader';
// import { useApi } from '../../hooks/useApi';
// import { projectsAPI } from '../../lib/api';
// import { fallbackProjects } from '../../data/fallbackData';
// import { GlassCard } from '../../components/GlassCard';
// import { LoadingSpinner } from '../../components/LoadingSpinner';

// export const AdminProjects: React.FC = () => {
//   // Fix: Extract projects array from response
//   const { data: projectsResponse, loading, refetch } = useApi(
//     () => projectsAPI.getAll(),
//     { projects: fallbackProjects }
//   );
  
//   const projects = projectsResponse?.projects || fallbackProjects;
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProject, setEditingProject] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     category: '',
//     technologies: '',
//     featuredImage: '',
//     projectUrl: '',
//     githubUrl: '',
//     status: 'completed',
//     isActive: true
//   });

//   const filteredProjects = projects.filter((project: any) =>
//     project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     project.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleOpenModal = (project?: any) => {
//     if (project) {
//       setEditingProject(project);
//       let technologies = project.technologies;
//       if (typeof technologies === 'string') {
//         try {
//           technologies = JSON.parse(technologies);
//         } catch (e) {
//           technologies = [];
//         }
//       }
//       setFormData({
//         title: project.title || '',
//         description: project.description || '',
//         content: project.content || '',
//         category: project.category || '',
//         technologies: Array.isArray(technologies) ? technologies.join(', ') : '',
//         featuredImage: project.featuredImage || '',
//         projectUrl: project.projectUrl || '',
//         githubUrl: project.githubUrl || '',
//         status: project.status || 'completed',
//         isActive: project.isActive !== undefined ? project.isActive : true
//       });
//     } else {
//       setEditingProject(null);
//       setFormData({
//         title: '',
//         description: '',
//         content: '',
//         category: '',
//         technologies: '',
//         featuredImage: '',
//         projectUrl: '',
//         githubUrl: '',
//         status: 'completed',
//         isActive: true
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingProject(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
//       const projectData = {
//         title: formData.title,
//         slug,
//         description: formData.description,
//         content: formData.content,
//         category: formData.category,
//         technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
//         featuredImage: formData.featuredImage,
//         projectUrl: formData.projectUrl,
//         githubUrl: formData.githubUrl,
//         status: formData.status,
//         isActive: formData.isActive,
//         order: editingProject?.order || 0
//       };

//       if (editingProject) {
//         await projectsAPI.update(editingProject.id, projectData);
//       } else {
//         await projectsAPI.create(projectData);
//       }

//       refetch();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error saving project:', error);
//       alert('Failed to save project. Please try again.');
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure you want to delete this project?')) {
//       try {
//         await projectsAPI.delete(id);
//         refetch();
//       } catch (error) {
//         console.error('Error deleting project:', error);
//         alert('Failed to delete project. Please try again.');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
//       <AdminHeader title="Projects Management" />
//       <div className="p-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Management</h1>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOpenModal()}
//               className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
//             >
//               <Plus className="w-5 h-5" />
//               Add Project
//             </motion.button>
//           </div>

//           <GlassCard className="mb-6">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search projects..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//           </GlassCard>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((project: any, index: number) => (
//               <GlassCard key={project.id} delay={index * 0.1}>
//                 <div className="relative group">
//                   {project.featuredImage && (
//                     <img
//                       src={project.featuredImage}
//                       alt={project.title}
//                       className="w-full h-48 object-cover rounded-lg mb-4"
//                     />
//                   )}
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
//                     {project.description}
//                   </p>
//                   {project.category && (
//                     <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm mb-4">
//                       {project.category}
//                     </span>
//                   )}
//                   <div className="flex gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       onClick={() => handleOpenModal(project)}
//                       className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                       Edit
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       onClick={() => handleDelete(project.id)}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </GlassCard>
//             ))}
//           </div>

//           {/* Modal content - same as before but with correct field names */}
//           <AnimatePresence>
//             {isModalOpen && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//                 onClick={handleCloseModal}
//               >
//                 <motion.div
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0.9 }}
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//                 >
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
//                     <button onClick={handleCloseModal}><X className="w-6 h-6" /></button>
//                   </div>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Title *</label>
//                       <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Description *</label>
//                       <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Content</label>
//                       <textarea rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Category</label>
//                         <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Status</label>
//                         <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl">
//                           <option value="completed">Completed</option>
//                           <option value="in-progress">In Progress</option>
//                           <option value="upcoming">Upcoming</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
//                       <input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, TypeScript" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Featured Image URL</label>
//                       <input type="url" value={formData.featuredImage} onChange={(e) => setFormData({...formData, featuredImage: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Live URL</label>
//                         <input type="url" value={formData.projectUrl} onChange={(e) => setFormData({...formData, projectUrl: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">GitHub URL</label>
//                         <input type="url" value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5" />
//                       <label htmlFor="isActive">Active Project</label>
//                     </div>
//                     <div className="flex gap-4 pt-4">
//                       <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold">{editingProject ? 'Update' : 'Create'}</button>
//                       <button type="button" onClick={handleCloseModal} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Cancel</button>
//                     </div>
//                   </form>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// };








// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Plus, Edit2, Trash2, Eye, Search, X } from 'lucide-react';
// // import { useApi } from '../../hooks/useApi';
// // import { projectsAPI } from '../../lib/api';
// // import { fallbackProjects } from '../../data/fallbackData';
// // import { GlassCard } from '../../components/GlassCard';
// // import { LoadingSpinner } from '../../components/LoadingSpinner';

// // export const AdminProjects: React.FC = () => {
// //   // Fix: Extract projects array from response
// //   const { data: projectsResponse, loading, refetch } = useApi(
// //     () => projectsAPI.getAll(),
// //     { projects: fallbackProjects }
// //   );

// //   const projects = projectsResponse?.projects || fallbackProjects;
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingProject, setEditingProject] = useState<any>(null);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     category: '',
// //     technologies: '',
// //     image: '',
// //     liveUrl: '',
// //     githubUrl: ''
// //   });

// //   const filteredProjects = projects.filter((project: any) =>
// //     project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     project.description.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const handleOpenModal = (project?: any) => {
// //     if (project) {
// //       setEditingProject(project);
// //       setFormData({
// //         title: project.title,
// //         description: project.description,
// //         category: project.category || '',
// //         technologies: project.technologies?.join(', ') || '',
// //         image: project.image || '',
// //         liveUrl: project.liveUrl || '',
// //         githubUrl: project.githubUrl || ''
// //       });
// //     } else {
// //       setEditingProject(null);
// //       setFormData({
// //         title: '',
// //         description: '',
// //         category: '',
// //         technologies: '',
// //         image: '',
// //         liveUrl: '',
// //         githubUrl: ''
// //       });
// //     }
// //     setIsModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setEditingProject(null);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const projectData = {
// //         ...formData,
// //         technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
// //       };

// //       if (editingProject) {
// //         await projectsAPI.update(editingProject.id, projectData);
// //       } else {
// //         await projectsAPI.create(projectData);
// //       }

// //       refetch();
// //       handleCloseModal();
// //     } catch (error) {
// //       console.error('Error saving project:', error);
// //       alert('Failed to save project. Please try again.');
// //     }
// //   };

// //   const handleDelete = async (id: string) => {
// //     if (confirm('Are you sure you want to delete this project?')) {
// //       try {
// //         await projectsAPI.delete(id);
// //         refetch();
// //       } catch (error) {
// //         console.error('Error deleting project:', error);
// //         alert('Failed to delete project. Please try again.');
// //       }
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
// //         <LoadingSpinner />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
// //       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Management</h1>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => handleOpenModal()}
// //             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
// //           >
// //             <Plus className="w-5 h-5" />
// //             Add Project
// //           </motion.button>
// //         </div>

// //         {/* Search */}
// //         <GlassCard className="mb-6">
// //           <div className="relative">
// //             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //             <input
// //               type="text"
// //               placeholder="Search projects..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //             />
// //           </div>
// //         </GlassCard>

// //         {/* Projects Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredProjects.map((project: any, index: number) => (
// //             <GlassCard key={project.id} delay={index * 0.1}>
// //               <div className="relative group">
// //                 {project.image && (
// //                   <img
// //                     src={project.image}
// //                     alt={project.title}
// //                     className="w-full h-48 object-cover rounded-lg mb-4"
// //                   />
// //                 )}
// //                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
// //                   {project.title}
// //                 </h3>
// //                 <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
// //                   {project.description}
// //                 </p>
// //                 {project.category && (
// //                   <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm mb-4">
// //                     {project.category}
// //                   </span>
// //                 )}
// //                 <div className="flex gap-2">
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={() => handleOpenModal(project)}
// //                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
// //                   >
// //                     <Edit2 className="w-4 h-4" />
// //                     Edit
// //                   </motion.button>
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={() => handleDelete(project.id)}
// //                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
// //                   >
// //                     <Trash2 className="w-4 h-4" />
// //                   </motion.button>
// //                 </div>
// //               </div>
// //             </GlassCard>
// //           ))}
// //         </div>

// //         {/* Modal */}
// //         <AnimatePresence>
// //           {isModalOpen && (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //               onClick={handleCloseModal}
// //             >
// //               <motion.div
// //                 initial={{ scale: 0.9, opacity: 0 }}
// //                 animate={{ scale: 1, opacity: 1 }}
// //                 exit={{ scale: 0.9, opacity: 0 }}
// //                 onClick={(e) => e.stopPropagation()}
// //                 className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
// //               >
// //                 <div className="flex justify-between items-center mb-6">
// //                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                     {editingProject ? 'Edit Project' : 'Add New Project'}
// //                   </h2>
// //                   <button
// //                     onClick={handleCloseModal}
// //                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
// //                   >
// //                     <X className="w-6 h-6" />
// //                   </button>
// //                 </div>

// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Title *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       value={formData.title}
// //                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Description *
// //                     </label>
// //                     <textarea
// //                       required
// //                       rows={4}
// //                       value={formData.description}
// //                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Category
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={formData.category}
// //                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                       placeholder="e.g., Web App, Mobile, Design"
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Technologies (comma-separated)
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={formData.technologies}
// //                       onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
// //                       placeholder="React, Node.js, TypeScript"
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Image URL
// //                     </label>
// //                     <input
// //                       type="url"
// //                       value={formData.image}
// //                       onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                       placeholder="https://example.com/image.jpg"
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       Live URL
// //                     </label>
// //                     <input
// //                       type="url"
// //                       value={formData.liveUrl}
// //                       onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
// //                       placeholder="https://example.com"
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                       GitHub URL
// //                     </label>
// //                     <input
// //                       type="url"
// //                       value={formData.githubUrl}
// //                       onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
// //                       placeholder="https://github.com/username/repo"
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>

// //                   <div className="flex gap-4 pt-4">
// //                     <motion.button
// //                       type="submit"
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
// //                     >
// //                       {editingProject ? 'Update Project' : 'Create Project'}
// //                     </motion.button>
// //                     <motion.button
// //                       type="button"
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={handleCloseModal}
// //                       className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold"
// //                     >
// //                       Cancel
// //                     </motion.button>
// //                   </div>
// //                 </form>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </motion.div>
// //     </div>
// //   );
// // };
