import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { GlassCard } from '../../components/GlassCard';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  isActive: boolean;
  order: number;
}

export const AdminMenus: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    { id: '1', label: 'Home', url: '/', isActive: true, order: 1 },
    { id: '2', label: 'About', url: '/about', isActive: true, order: 2 },
    { id: '3', label: 'Projects', url: '/projects', isActive: true, order: 3 },
    { id: '4', label: 'Services', url: '/services', isActive: true, order: 4 },
    { id: '5', label: 'Blog', url: '/blog', isActive: true, order: 5 },
    { id: '6', label: 'Team', url: '/team', isActive: false, order: 6 },
    { id: '7', label: 'Testimonials', url: '/testimonials', isActive: false, order: 7 },
    { id: '8', label: 'Contact', url: '/contact', isActive: true, order: 8 },
  ]);

  const handleToggleActive = (id: string) => {
    setMenus(menus.map(menu => 
      menu.id === id ? { ...menu, isActive: !menu.isActive } : menu
    ));
  };

  const activeMenus = menus.filter(m => m.isActive).sort((a, b) => a.order - b.order);
  const inactiveMenus = menus.filter(m => !m.isActive).sort((a, b) => a.order - b.order);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menu Management</h1>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Menu Item
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Menus */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-green-600" />
              Active Menus ({activeMenus.length})
            </h2>
            <div className="space-y-3">
              {activeMenus.map((menu) => (
                <GlassCard key={menu.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="cursor-move text-gray-400">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{menu.label}</h3>
                        <p className="text-sm text-gray-500">{menu.url}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleActive(menu.id)}
                        className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Inactive Menus */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <EyeOff className="w-6 h-6 text-red-600" />
              Inactive Menus ({inactiveMenus.length})
            </h2>
            <div className="space-y-3">
              {inactiveMenus.map((menu) => (
                <GlassCard key={menu.id}>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold text-gray-500 dark:text-gray-400">{menu.label}</h3>
                      <p className="text-sm text-gray-400">{menu.url}</p>
                    </div>
                    <button
                      onClick={() => handleToggleActive(menu.id)}
                      className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};








// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
// import { AdminHeader } from '../../components/AdminHeader';
// import { useApi } from '../../hooks/useApi';
// import { GlassCard } from '../../components/GlassCard';
// import { LoadingSpinner } from '../../components/LoadingSpinner';

// interface MenuItem {
//   id: string;
//   label: string;
//   url: string;
//   isActive: boolean;
//   order: number;
// }

// export const AdminMenus: React.FC = () => {
//   const [menus, setMenus] = useState<MenuItem[]>([
//     { id: '1', label: 'Home', url: '/', isActive: true, order: 1 },
//     { id: '2', label: 'About', url: '/about', isActive: true, order: 2 },
//     { id: '3', label: 'Projects', url: '/projects', isActive: true, order: 3 },
//     { id: '4', label: 'Services', url: '/services', isActive: true, order: 4 },
//     { id: '5', label: 'Blog', url: '/blog', isActive: true, order: 5 },
//     { id: '6', label: 'Team', url: '/team', isActive: false, order: 6 },
//     { id: '7', label: 'Testimonials', url: '/testimonials', isActive: false, order: 7 },
//     { id: '8', label: 'Contact', url: '/contact', isActive: true, order: 8 },
//   ]);

//   const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleToggleActive = (id: string) => {
//     setMenus(menus.map(menu => 
//       menu.id === id ? { ...menu, isActive: !menu.isActive } : menu
//     ));
//   };

//   const handleReorder = (dragIndex: number, hoverIndex: number) => {
//     const reorderedMenus = [...menus];
//     const [draggedItem] = reorderedMenus.splice(dragIndex, 1);
//     reorderedMenus.splice(hoverIndex, 0, draggedItem);
//     setMenus(reorderedMenus.map((menu, idx) => ({ ...menu, order: idx + 1 })));
//   };

//   const activeMenus = menus.filter(m => m.isActive).sort((a, b) => a.order - b.order);
//   const inactiveMenus = menus.filter(m => !m.isActive).sort((a, b) => a.order - b.order);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
//       <AdminHeader title="Menu Management" />
      
//       <div className="p-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Active Menus */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                 <Eye className="w-6 h-6 text-green-600" />
//                 Active Menus ({activeMenus.length})
//               </h2>
//               <div className="space-y-3">
//                 {activeMenus.map((menu, index) => (
//                   <GlassCard key={menu.id}>
//                     <div className="flex items-center justify-between p-4">
//                       <div className="flex items-center gap-4">
//                         <div className="cursor-move text-gray-400">
//                           <GripVertical className="w-5 h-5" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 dark:text-white">{menu.label}</h3>
//                           <p className="text-sm text-gray-500">{menu.url}</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleToggleActive(menu.id)}
//                           className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"
//                         >
//                           <EyeOff className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </GlassCard>
//                 ))}
//               </div>
//             </div>

//             {/* Inactive Menus */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                 <EyeOff className="w-6 h-6 text-red-600" />
//                 Inactive Menus ({inactiveMenus.length})
//               </h2>
//               <div className="space-y-3">
//                 {inactiveMenus.map((menu) => (
//                   <GlassCard key={menu.id}>
//                     <div className="flex items-center justify-between p-4">
//                       <div>
//                         <h3 className="font-semibold text-gray-500 dark:text-gray-400">{menu.label}</h3>
//                         <p className="text-sm text-gray-400">{menu.url}</p>
//                       </div>
//                       <button
//                         onClick={() => handleToggleActive(menu.id)}
//                         className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </GlassCard>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2">
//               <Plus className="w-5 h-5" />
//               Add New Menu Item
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };