// frontend-portfolio/src/components/AdminSidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  Users,
  MessageSquare,
  Menu,
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Image,
  Mail,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.FC<any>;
  permissions?: string[];
}

export const AdminSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Menus', href: '/admin/menus', icon: Menu },
    { name: 'Media', href: '/admin/media', icon: Image },
    { name: 'Contacts', href: '/admin/contacts', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Globe },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (!item.permissions) return true;
    return item.permissions.some(permission => hasPermission(permission));
  });

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 80 : 280,
          transition: { duration: 0.3, type: 'spring', stiffness: 300 }
        }}
        className={`fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 z-50 shadow-2xl ${
          mobileOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Portfolio
                  </motion.span>
                )}
              </Link>
              <button
                onClick={toggleSidebar}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* User Info */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.firstName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.role?.name}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-3 space-y-1">
              {filteredNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.href} to={item.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? (
                <>
                  <div className="w-5 h-5">🌞</div>
                  {!collapsed && <span className="text-sm">Light Mode</span>}
                </>
              ) : (
                <>
                  <div className="w-5 h-5">🌙</div>
                  {!collapsed && <span className="text-sm">Dark Mode</span>}
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{
          marginLeft: collapsed ? 80 : 280,
          transition: { duration: 0.3, type: 'spring', stiffness: 300 }
        }}
        className="min-h-screen transition-all duration-300"
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
};