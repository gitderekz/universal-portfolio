import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, X, Save } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { settingsAPI } from '../../lib/api';
import { GlassCard } from '../../components/GlassCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminSettings: React.FC = () => {
  // Fix: Extract raw array from response
  const { data: settingsResponse, loading, refetch } = useApi(
    () => settingsAPI.getAll(),
    { raw: [] }
  );
  
  const settings = settingsResponse?.raw || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<any>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    type: 'string',
    category: '',
    description: ''
  });

  const filteredSettings = settings.filter((setting: any) =>
    setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (setting.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (setting.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group settings by category
  const groupedSettings = filteredSettings.reduce((acc: any, setting: any) => {
    const category = setting.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(setting);
    return acc;
  }, {});

  const handleOpenModal = (setting?: any) => {
    if (setting) {
      setEditingSetting(setting);
      setFormData({
        key: setting.key,
        value: typeof setting.value === 'object' ? JSON.stringify(setting.value, null, 2) : setting.value?.toString() || '',
        type: setting.type || 'string',
        category: setting.category || '',
        description: setting.description || ''
      });
    } else {
      setEditingSetting(null);
      setFormData({
        key: '',
        value: '',
        type: 'string',
        category: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSetting(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let processedValue: any = formData.value;

      // Parse value based on type
      if (formData.type === 'number') {
        processedValue = parseFloat(formData.value);
        if (isNaN(processedValue)) {
          alert('Invalid number value');
          return;
        }
      } else if (formData.type === 'boolean') {
        processedValue = formData.value === 'true' || formData.value === '1';
      } else if (formData.type === 'json') {
        try {
          processedValue = JSON.parse(formData.value);
        } catch {
          alert('Invalid JSON format');
          return;
        }
      }

      const settingData = {
        key: formData.key,
        value: processedValue,
        type: formData.type,
        category: formData.category,
        description: formData.description
      };

      if (editingSetting) {
        await settingsAPI.update(editingSetting.key, settingData);
      } else {
        await settingsAPI.create(settingData);
      }

      refetch();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('Failed to save setting. Please try again.');
    }
  };

  const handleDelete = async (key: string) => {
    if (confirm('Are you sure you want to delete this setting?')) {
      try {
        await settingsAPI.delete(key);
        refetch();
      } catch (error) {
        console.error('Error deleting setting:', error);
        alert('Failed to delete setting. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Setting
          </motion.button>
        </div>

        {/* Search */}
        <GlassCard className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </GlassCard>

        {/* Settings by Category */}
        <div className="space-y-6">
          {Object.entries(groupedSettings).map(([category, categorySettings]: [string, any], categoryIndex: number) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category}</h2>
              <div className="space-y-3">
                {categorySettings.map((setting: any, index: number) => (
                  <GlassCard key={setting.key || setting.id} delay={categoryIndex * 0.1 + index * 0.05}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {setting.key}
                          </h3>
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-xs">
                            {setting.type || 'string'}
                          </span>
                        </div>
                        {setting.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {setting.description}
                          </p>
                        )}
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 overflow-x-auto">
                          <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                            {typeof setting.value === 'object'
                              ? JSON.stringify(setting.value, null, 2)
                              : setting.value?.toString() || 'null'
                            }
                          </code>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenModal(setting)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(setting.key)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedSettings).length === 0 && (
            <GlassCard>
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No settings found</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenModal()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Setting
                </motion.button>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Modal */}
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingSetting ? 'Edit Setting' : 'Add New Setting'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.key}
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                      disabled={!!editingSetting}
                      placeholder="e.g., site_title, max_upload_size"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                    {editingSetting && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Key cannot be changed when editing
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Value *
                    </label>
                    {formData.type === 'boolean' ? (
                      <select
                        required
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    ) : formData.type === 'json' ? (
                      <textarea
                        required
                        rows={6}
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder='{"key": "value"}'
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                      />
                    ) : (
                      <input
                        type={formData.type === 'number' ? 'number' : 'text'}
                        required
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder={formData.type === 'number' ? '123' : 'Setting value'}
                        step={formData.type === 'number' ? 'any' : undefined}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., General, Email, Security"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of what this setting controls..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {editingSetting ? 'Update Setting' : 'Create Setting'}
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
