import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, FileText, Briefcase, Mail, Image, Settings, Users, MessageSquare } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Projects', value: '12', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { label: 'Blog Posts', value: '24', icon: FileText, color: 'from-purple-500 to-pink-500' },
    { label: 'Messages', value: '8', icon: Mail, color: 'from-orange-500 to-red-500' },
    { label: 'Team Members', value: '4', icon: Users, color: 'from-green-500 to-emerald-500' }
  ];

  const quickActions = [
    { name: 'Manage Projects', icon: Briefcase, href: '/admin/projects' },
    { name: 'Blog Posts', icon: FileText, href: '/admin/blog' },
    { name: 'Services', icon: Settings, href: '/admin/services' },
    { name: 'Team', icon: Users, href: '/admin/team' },
    { name: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.firstName}!</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Here's what's happening with your portfolio</p>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <GlassCard>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.label}</dt>
                        <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
                      </dl>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action, index) => (
                <motion.div key={action.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link to={action.href}>
                    <GlassCard hover className="text-center">
                      <action.icon className="h-8 w-8 mx-auto text-purple-600 dark:text-purple-400 mb-3" />
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</h3>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
