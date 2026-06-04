import React from 'react';
import { motion } from 'framer-motion';
import { fallbackGallery } from '../data/fallbackData';

export const GalleryPage: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Visual showcase of my work</p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {fallbackGallery.map((item: any, index: number) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
              className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl">
                <img src={item.url} alt={item.title} className="w-full transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
