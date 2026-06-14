import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }, 1000);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Let's discuss your project</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email', value: 'contact@portfolio.com', link: 'mailto:contact@portfolio.com' },
              { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
              { icon: MapPin, title: 'Location', value: 'Your City, Country', link: null }
            ].map((item) => (
              <GlassCard key={item.title}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    {item.link ? <a href={item.link} className="text-purple-600 dark:text-purple-400 hover:underline">{item.value}</a> : <p className="text-gray-600 dark:text-gray-400">{item.value}</p>}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="lg:col-span-2">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                  <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                </div>
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                <input type="text" placeholder="Subject" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
                <textarea placeholder="Message" required rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none" />
                {success && <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">Message sent successfully!</div>}
                <button type="submit" disabled={loading} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center">
                  {loading ? 'Sending...' : (<><Send className="w-5 h-5 mr-2" />Send Message</>)}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
