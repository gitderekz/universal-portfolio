import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { fallbackFAQs } from '../data/fallbackData';
import { ChevronDown } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Frequently asked questions</p>
        </motion.div>

        <div className="space-y-4">
          {fallbackFAQs.map((faq: any, index: number) => (
            <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <GlassCard className="cursor-pointer" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                  <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="text-gray-600 dark:text-gray-300 mt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
