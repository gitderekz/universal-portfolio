import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useApi } from '../hooks/useApi';
import { servicesAPI } from '../lib/api';
import { fallbackServices } from '../data/fallbackData';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const { data: services } = useApi(
    () => servicesAPI.getAll({ isActive: true }),
    fallbackServices
  );

  const getIconComponent = (iconName: string) => {
    const icons: any = {
      Code: require('lucide-react').Code,
      Smartphone: require('lucide-react').Smartphone,
      Cloud: require('lucide-react').Cloud,
      Palette: require('lucide-react').Palette,
      Lightbulb: require('lucide-react').Lightbulb,
      Network: require('lucide-react').Network
    };
    return icons[iconName] || require('lucide-react').Code;
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service: any, index: number) => {
            const Icon = getIconComponent(service.icon);
            return (
              <GlassCard key={service.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="h-full flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ${service.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {service.priceType}
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </GlassCard>
            );
          })}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How I Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '01', title: 'Discovery', description: 'Understanding your goals and requirements' },
              { number: '02', title: 'Planning', description: 'Creating a detailed roadmap and timeline' },
              { number: '03', title: 'Development', description: 'Building your solution with best practices' },
              { number: '04', title: 'Launch', description: 'Deployment and ongoing support' }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <GlassCard className="!bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
          <div className="py-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your project and bring your ideas to life
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
