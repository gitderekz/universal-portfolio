import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Briefcase, Zap, Shield, Rocket, Star } from 'lucide-react';
import { ThreeBackground } from '../components/ThreeBackground';
import { GlassCard } from '../components/GlassCard';
import { AnimatedText, AnimatedGradientText } from '../components/AnimatedText';
import { useApi } from '../hooks/useApi';
import { projectsAPI, testimonialAPI } from '../lib/api';
import { fallbackProjects, fallbackTestimonials } from '../data/fallbackData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Helper function to safely parse technologies
const parseTechnologies = (technologies: any): string[] => {
  if (!technologies) return [];
  if (Array.isArray(technologies)) return technologies;
  if (typeof technologies === 'string') {
    try {
      const parsed = JSON.parse(technologies);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const HomePage: React.FC = () => {
  // Fix: Extract the projects array from the response
  const { data: projectsResponse } = useApi(
    () => projectsAPI.getAll({ isActive: true }),
    { projects: fallbackProjects } // Return object matching API structure
  );
  
  const projects = projectsResponse?.projects || fallbackProjects;

  // Fix: Extract the testimonials array from the response
  const { data: testimonialsResponse } = useApi(
    () => testimonialAPI.getAll({ isActive: true }),
    { testimonials: fallbackTestimonials } // Return object matching API structure
  );
  
  const testimonials = testimonialsResponse?.testimonials || fallbackTestimonials;

  const features = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'End-to-end web solutions with modern frameworks and best practices',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Briefcase,
      title: 'Technical Consulting',
      description: 'Expert guidance on architecture and tech decisions',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { icon: Rocket, label: 'Projects Completed', value: '50+' },
    { icon: Star, label: 'Client Satisfaction', value: '98%' },
    { icon: Zap, label: 'Years Experience', value: '8+' },
    { icon: Shield, label: 'Success Rate', value: '100%' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <ThreeBackground variant="particles" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-sm font-medium backdrop-blur-xl">
                Welcome to My Portfolio
              </span>
            </motion.div>

            <AnimatedText
              text="Building Exceptional Digital Experiences"
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transforming ideas into reality through{' '}
              <AnimatedGradientText text="innovative technology" />
              {' '}and creative design
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-xl"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-purple-600 dark:hover:border-purple-400 transition-colors backdrop-blur-xl"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white mb-4 shadow-xl"
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <motion.h3
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What I Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Comprehensive solutions tailored to your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Showcasing my best work
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects && projects.slice(0, 3).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parseTechnologies(project.technologies).slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-xl"
              >
                View All Projects
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Client Testimonials
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              What clients say about working with me
            </motion.p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials && testimonials.map((testimonial: any) => (
              <SwiperSlide key={testimonial.id}>
                <GlassCard>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlassCard className="!bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let's collaborate and create something amazing together
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Get Started Today
                </motion.button>
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};








// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, Code, Palette, Briefcase, Zap, Shield, Rocket, Star } from 'lucide-react';
// import { ThreeBackground } from '../components/ThreeBackground';
// import { GlassCard } from '../components/GlassCard';
// import { AnimatedText, AnimatedGradientText } from '../components/AnimatedText';
// import { useApi } from '../hooks/useApi';
// import { projectsAPI, testimonialAPI } from '../lib/api';
// import { fallbackProjects, fallbackTestimonials } from '../data/fallbackData';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// export const HomePage: React.FC = () => {
//   // const { data: projects } = useApi(
//   //   () => projectsAPI.getAll({ isActive: true }),
//   //   fallbackProjects
//   // );

//   // const { data: testimonials } = useApi(
//   //   () => testimonialAPI.getAll({ isActive: true }),
//   //   fallbackTestimonials
//   // );

//    // Fix: Extract the projects array from the response
//     const { data: projectsResponse } = useApi(
//       () => projectsAPI.getAll({ isActive: true }),
//       { projects: fallbackProjects } // Return object matching API structure
//     );
    
//     const projects = projectsResponse?.projects || fallbackProjects;

//     // Fix: Extract the testimonials array from the response
//     const { data: testimonialsResponse } = useApi(
//       () => testimonialAPI.getAll({ isActive: true }),
//       { testimonials: fallbackTestimonials } // Return object matching API structure
//     );
    
//     const testimonials = testimonialsResponse?.testimonials || fallbackTestimonials;


//   const features = [
//     {
//       icon: Code,
//       title: 'Full-Stack Development',
//       description: 'End-to-end web solutions with modern frameworks and best practices',
//       gradient: 'from-blue-500 to-cyan-500'
//     },
//     {
//       icon: Palette,
//       title: 'UI/UX Design',
//       description: 'Beautiful, intuitive interfaces that users love',
//       gradient: 'from-purple-500 to-pink-500'
//     },
//     {
//       icon: Briefcase,
//       title: 'Technical Consulting',
//       description: 'Expert guidance on architecture and tech decisions',
//       gradient: 'from-orange-500 to-red-500'
//     }
//   ];

//   const stats = [
//     { icon: Rocket, label: 'Projects Completed', value: '50+' },
//     { icon: Star, label: 'Client Satisfaction', value: '98%' },
//     { icon: Zap, label: 'Years Experience', value: '8+' },
//     { icon: Shield, label: 'Success Rate', value: '100%' }
//   ];

//   return (
//     <div className="relative">
//       {/* Hero Section */}
//       <section className="relative min-h-[90vh] flex items-center overflow-hidden">
//         <ThreeBackground variant="particles" />

//         <div className="container mx-auto px-4 py-20 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="mb-6"
//             >
//               <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-sm font-medium backdrop-blur-xl">
//                 Welcome to My Portfolio
//               </span>
//             </motion.div>

//             <AnimatedText
//               text="Building Exceptional Digital Experiences"
//               className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
//             />

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
//             >
//               Transforming ideas into reality through{' '}
//               <AnimatedGradientText text="innovative technology" />
//               {' '}and creative design
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-wrap gap-4 justify-center"
//             >
//               <Link to="/projects">
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-xl"
//                 >
//                   <span>View My Work</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//               </Link>
//               <Link to="/contact">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-purple-600 dark:hover:border-purple-400 transition-colors backdrop-blur-xl"
//                 >
//                   Get in Touch
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <motion.div
//           animate={{
//             y: [0, -20, 0],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"
//         />
//         <motion.div
//           animate={{
//             y: [0, 20, 0],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: 'easeInOut',
//             delay: 1
//           }}
//           className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"
//         />
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white mb-4 shadow-xl"
//                 >
//                   <stat.icon className="w-8 h-8" />
//                 </motion.div>
//                 <motion.h3
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
//                   className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
//                 >
//                   {stat.value}
//                 </motion.h3>
//                 <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
//             >
//               What I Offer
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
//             >
//               Comprehensive solutions tailored to your needs
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <GlassCard key={feature.title} delay={index * 0.1}>
//                 <motion.div
//                   whileHover={{ y: -5 }}
//                   className="relative"
//                 >
//                   <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl`}>
//                     <feature.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </motion.div>
//               </GlassCard>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Projects */}
//       <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
//             >
//               Featured Projects
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-gray-600 dark:text-gray-300"
//             >
//               Showcasing my best work
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {projects.slice(0, 3).map((project: any, index: number) => (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <GlassCard hover>
//                   <div className="relative h-48 rounded-xl overflow-hidden mb-4">
//                     <img
//                       src={project.featuredImage}
//                       alt={project.title}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {project.technologies?.slice(0, 3).map((tech: string) => (
//                       <span
//                         key={tech}
//                         className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </GlassCard>
//               </motion.div>
//             ))}
//           </div>

//           <div className="text-center">
//             <Link to="/projects">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-xl"
//               >
//                 View All Projects
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
//             >
//               Client Testimonials
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-gray-600 dark:text-gray-300"
//             >
//               What clients say about working with me
//             </motion.p>
//           </div>

//           <Swiper
//             modules={[Autoplay, Pagination]}
//             spaceBetween={30}
//             slidesPerView={1}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 }
//             }}
//             autoplay={{ delay: 5000 }}
//             pagination={{ clickable: true }}
//             className="pb-12"
//           >
//             {testimonials.map((testimonial: any) => (
//               <SwiperSlide key={testimonial.id}>
//                 <GlassCard>
//                   <div className="flex items-center mb-4">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//                     ))}
//                   </div>
//                   <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
//                     "{testimonial.content}"
//                   </p>
//                   <div className="flex items-center">
//                     <img
//                       src={testimonial.avatar}
//                       alt={testimonial.name}
//                       className="w-12 h-12 rounded-full object-cover mr-4"
//                     />
//                     <div>
//                       <h4 className="font-semibold text-gray-900 dark:text-white">
//                         {testimonial.name}
//                       </h4>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {testimonial.position}, {testimonial.company}
//                       </p>
//                     </div>
//                   </div>
//                 </GlassCard>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <GlassCard className="!bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="py-12"
//             >
//               <h2 className="text-4xl md:text-5xl font-bold mb-6">
//                 Ready to Start Your Project?
//               </h2>
//               <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//                 Let's collaborate and create something amazing together
//               </p>
//               <Link to="/contact">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
//                 >
//                   Get Started Today
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </GlassCard>
//         </div>
//       </section>
//     </div>
//   );
// };
