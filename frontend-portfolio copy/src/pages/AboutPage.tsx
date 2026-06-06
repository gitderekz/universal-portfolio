import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Smartphone, Palette, Rocket, Award, Users, Heart } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ThreeBackground } from '../components/ThreeBackground';
import { fallbackSkills } from '../data/fallbackData';

export const AboutPage: React.FC = () => {
  const experience = [
    {
      year: '2020 - Present',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Leading development of enterprise-scale web applications using React, Node.js, and cloud technologies.'
    },
    {
      year: '2018 - 2020',
      title: 'Full-Stack Developer',
      company: 'Digital Innovations',
      description: 'Developed and maintained multiple client projects, focusing on performance and user experience.'
    },
    {
      year: '2016 - 2018',
      title: 'Frontend Developer',
      company: 'Creative Agency',
      description: 'Created responsive, pixel-perfect interfaces and interactive web experiences.'
    },
    {
      year: '2015 - 2016',
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      description: 'Started my career building web applications and learning best practices.'
    }
  ];

  const skillCategories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps'];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <ThreeBackground variant="wave" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Passionate developer crafting exceptional digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80"
                    alt="Profile"
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    My Journey
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    With over 8 years of experience in web development, I've had the privilege of working on diverse projects ranging from startup MVPs to enterprise-scale applications.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    My passion lies in creating elegant solutions to complex problems, always keeping the user experience at the forefront. I believe in writing clean, maintainable code and staying current with the latest technologies.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or mentoring aspiring developers.
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Principles that guide my work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'Committed to delivering the highest quality work'
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Strong believer in teamwork and knowledge sharing'
              },
              {
                icon: Heart,
                title: 'Passion',
                description: 'Genuinely love what I do and it shows in my work'
              }
            ].map((value, index) => (
              <GlassCard key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-xl">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technologies I work with
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h3>
                <div className="space-y-4">
                  {fallbackSkills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              My career journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-32">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold">
                      {exp.year}
                    </span>
                  </div>
                  <GlassCard className="flex-1 ml-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </GlassCard>
                </div>
                {index !== experience.length - 1 && (
                  <div className="absolute left-16 top-20 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-blue-600 opacity-30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
