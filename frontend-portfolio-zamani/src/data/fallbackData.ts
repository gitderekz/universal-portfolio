// Fallback data for when backend is not available
export const fallbackProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.',
    content: 'Built with React, Node.js, and PostgreSQL. Features include product catalog, shopping cart, checkout flow, order management, and admin dashboard.',
    featuredImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      'https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=800&q=80'
    ],
    category: 'Web Development',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API', 'TailwindCSS'],
    client: 'Tech Solutions Inc.',
    projectUrl: '#',
    githubUrl: '#',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-12-15'),
    status: 'completed',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    description: 'Advanced analytics platform leveraging machine learning for predictive insights and data visualization.',
    content: 'Integrated multiple data sources, implemented ML models for forecasting, and created interactive visualizations.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    ],
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'Data Visualization'],
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI'],
    projectUrl: '#',
    status: 'completed',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    title: 'Mobile Healthcare App',
    slug: 'mobile-healthcare-app',
    description: 'HIPAA-compliant mobile application for patient management and telemedicine consultations.',
    content: 'Cross-platform mobile app with video calling, appointment scheduling, prescription management, and secure messaging.',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'Mobile Development',
    tags: ['React Native', 'Healthcare', 'WebRTC'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
    projectUrl: '#',
    status: 'in-progress',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    title: 'Blockchain Supply Chain',
    slug: 'blockchain-supply-chain',
    description: 'Decentralized supply chain management system using blockchain technology for transparency and traceability.',
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    category: 'Blockchain',
    tags: ['Ethereum', 'Smart Contracts', 'Web3'],
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'IPFS'],
    projectUrl: '#',
    githubUrl: '#',
    status: 'completed',
    isActive: true,
    order: 4
  },
  {
    id: '5',
    title: 'Real Estate Platform',
    slug: 'real-estate-platform',
    description: 'Comprehensive real estate marketplace with virtual tours, mortgage calculators, and property management tools.',
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'Real Estate', '3D Tours'],
    technologies: ['Next.js', 'Three.js', 'PostgreSQL', 'Mapbox', 'Stripe'],
    projectUrl: '#',
    status: 'completed',
    isActive: true,
    order: 5
  },
  {
    id: '6',
    title: 'Educational Learning Platform',
    slug: 'educational-platform',
    description: 'Interactive e-learning platform with video courses, quizzes, progress tracking, and certification system.',
    featuredImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    category: 'Education',
    tags: ['EdTech', 'Video Streaming', 'Gamification'],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Socket.io'],
    projectUrl: '#',
    status: 'completed',
    isActive: true,
    order: 6
  }
];

export const fallbackBlogPosts = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    slug: 'future-web-development-2024',
    excerpt: 'Exploring the latest trends, technologies, and best practices shaping the future of web development.',
    content: 'Full blog content here...',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    category: 'Technology',
    tags: ['Web Development', 'JavaScript', 'Trends'],
    status: 'published',
    isActive: true,
    viewCount: 1523,
    publishedAt: new Date('2024-01-15'),
    author: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
    }
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    slug: 'scalable-apis-nodejs',
    excerpt: 'Best practices for designing and implementing scalable REST APIs using Node.js and Express.',
    content: 'Full blog content here...',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    category: 'Backend',
    tags: ['Node.js', 'API Design', 'Performance'],
    status: 'published',
    isActive: true,
    viewCount: 2341,
    publishedAt: new Date('2024-02-20'),
    author: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
    }
  },
  {
    id: '3',
    title: 'Mastering TypeScript for React Applications',
    slug: 'typescript-react-guide',
    excerpt: 'A comprehensive guide to using TypeScript in React applications for better type safety and developer experience.',
    content: 'Full blog content here...',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    category: 'Frontend',
    tags: ['TypeScript', 'React', 'Best Practices'],
    status: 'published',
    isActive: true,
    viewCount: 1876,
    publishedAt: new Date('2024-03-10'),
    author: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
    }
  }
];

export const fallbackTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'Tech Innovations Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    content: 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded all expectations. The attention to detail and technical expertise is unmatched.',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'CTO',
    company: 'Digital Solutions Ltd.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    content: 'The scalability and performance of the solution built for us has been phenomenal. Our platform now handles 10x the traffic with zero downtime. Highly recommended!',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Product Manager',
    company: 'StartUp Ventures',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    content: 'From concept to deployment, the entire process was smooth and professional. The team really understood our vision and brought it to life beautifully.',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    name: 'David Park',
    position: 'Founder',
    company: 'HealthTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    content: 'The HIPAA-compliant platform they built for us has transformed how we deliver healthcare services. Security, reliability, and user experience are all top-notch.',
    isActive: true,
    order: 4
  }
];

export const fallbackServices = [
  {
    id: '1',
    title: 'Full-Stack Web Development',
    slug: 'full-stack-development',
    description: 'End-to-end web application development using modern frameworks and best practices.',
    content: 'We build scalable, performant web applications using React, Node.js, and cutting-edge technologies. From concept to deployment, we handle everything.',
    icon: 'Code',
    featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    price: 5000,
    priceType: 'starting at',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    content: 'Build beautiful, high-performance mobile apps with React Native or native technologies. Features include offline support, push notifications, and more.',
    icon: 'Smartphone',
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    price: 8000,
    priceType: 'starting at',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    title: 'Cloud & DevOps Solutions',
    slug: 'cloud-devops',
    description: 'Infrastructure setup, CI/CD pipelines, and cloud architecture design.',
    content: 'We help you leverage cloud platforms (AWS, Azure, GCP) for scalability and reliability. Automated deployments, monitoring, and infrastructure as code.',
    icon: 'Cloud',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    price: 3000,
    priceType: 'starting at',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'User-centered design for exceptional digital experiences.',
    content: 'Create stunning, intuitive interfaces that users love. Our design process includes research, wireframing, prototyping, and user testing.',
    icon: 'Palette',
    featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    price: 2500,
    priceType: 'starting at',
    isActive: true,
    order: 4
  },
  {
    id: '5',
    title: 'Technical Consulting',
    slug: 'technical-consulting',
    description: 'Expert guidance on architecture, tech stack, and best practices.',
    content: 'Get expert advice on technology decisions, architecture design, code reviews, and team training. We help you make informed technical decisions.',
    icon: 'Lightbulb',
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    price: 200,
    priceType: 'per hour',
    isActive: true,
    order: 5
  },
  {
    id: '6',
    title: 'API Development & Integration',
    slug: 'api-development',
    description: 'RESTful and GraphQL APIs with third-party integrations.',
    content: 'Design and build robust APIs for your applications. Integrate with payment gateways, social media, analytics, and other third-party services.',
    icon: 'Network',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    price: 4000,
    priceType: 'starting at',
    isActive: true,
    order: 6
  }
];

export const fallbackTeamMembers = [
  {
    id: '1',
    name: 'Alex Rivera',
    position: 'Senior Full-Stack Developer',
    bio: 'Passionate about building scalable web applications with 8+ years of experience in React and Node.js.',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
    email: 'alex@portfolio.com',
    socialLinks: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    },
    isActive: true,
    order: 1
  },
  {
    id: '2',
    name: 'Maya Patel',
    position: 'UI/UX Designer',
    bio: 'Creating beautiful, user-centered designs that solve real problems. 6 years of experience in product design.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    email: 'maya@portfolio.com',
    socialLinks: {
      linkedin: '#',
      dribbble: '#',
      behance: '#'
    },
    isActive: true,
    order: 2
  },
  {
    id: '3',
    name: 'James Wilson',
    position: 'DevOps Engineer',
    bio: 'Infrastructure automation expert with deep knowledge of AWS, Docker, and Kubernetes.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    email: 'james@portfolio.com',
    socialLinks: {
      linkedin: '#',
      github: '#'
    },
    isActive: true,
    order: 3
  },
  {
    id: '4',
    name: 'Sophie Anderson',
    position: 'Mobile Developer',
    bio: 'Building native iOS and Android apps with a focus on performance and user experience.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    email: 'sophie@portfolio.com',
    socialLinks: {
      linkedin: '#',
      github: '#'
    },
    isActive: true,
    order: 4
  }
];

export const fallbackFAQs = [
  {
    id: '1',
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in modern web technologies including React, Node.js, TypeScript, Next.js, and various databases (PostgreSQL, MongoDB, MySQL). We also work with cloud platforms like AWS, Azure, and GCP.',
    category: 'Technical',
    order: 1
  },
  {
    id: '2',
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8-12 weeks from discovery to deployment. We provide detailed timelines during the proposal phase.',
    category: 'Process',
    order: 2
  },
  {
    id: '3',
    question: 'Do you offer post-launch support?',
    answer: 'Yes! We provide maintenance and support packages to ensure your application runs smoothly. This includes bug fixes, security updates, performance monitoring, and feature enhancements.',
    category: 'Support',
    order: 3
  },
  {
    id: '4',
    question: 'Can you work with our existing team?',
    answer: 'Absolutely! We can integrate with your existing development team, provide technical leadership, or handle specific components of your project. We adapt to your workflow and communication preferences.',
    category: 'Collaboration',
    order: 4
  },
  {
    id: '5',
    question: 'What is your pricing model?',
    answer: 'We offer both fixed-price projects and time & materials engagements. For ongoing work, we also provide monthly retainers. Pricing depends on project scope, complexity, and timeline.',
    category: 'Pricing',
    order: 5
  },
  {
    id: '6',
    question: 'Do you sign NDAs?',
    answer: 'Yes, we are happy to sign non-disclosure agreements to protect your intellectual property and confidential information. We take security and confidentiality very seriously.',
    category: 'Legal',
    order: 6
  }
];

export const fallbackSkills = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 90, category: 'Backend' },
  { name: 'TypeScript', level: 92, category: 'Languages' },
  { name: 'PostgreSQL', level: 85, category: 'Database' },
  { name: 'AWS', level: 80, category: 'Cloud' },
  { name: 'Docker', level: 88, category: 'DevOps' },
  { name: 'GraphQL', level: 82, category: 'API' },
  { name: 'MongoDB', level: 87, category: 'Database' },
  { name: 'Next.js', level: 90, category: 'Frontend' },
  { name: 'Python', level: 75, category: 'Languages' }
];

export const fallbackGallery = [
  { id: '1', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', title: 'Workspace Setup', category: 'Office' },
  { id: '2', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', title: 'Development Environment', category: 'Tech' },
  { id: '3', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', title: 'Team Collaboration', category: 'Team' },
  { id: '4', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', title: 'Design Sprint', category: 'Design' },
  { id: '5', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', title: 'Analytics Dashboard', category: 'Tech' },
  { id: '6', url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80', title: 'Strategy Meeting', category: 'Team' },
  { id: '7', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', title: 'Office Space', category: 'Office' },
  { id: '8', url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', title: 'Product Launch', category: 'Events' },
  { id: '9', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', title: 'Code Review', category: 'Tech' }
];
