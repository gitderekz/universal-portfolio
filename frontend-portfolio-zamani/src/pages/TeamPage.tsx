import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { fallbackTeamMembers } from '../data/fallbackData';

export const TeamPage: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Meet the talented people behind the success</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fallbackTeamMembers.map((member: any, index: number) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <GlassCard hover>
                <img src={member.avatar} alt={member.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
