const { sequelize } = require('../config/database');
const { 
  Role, 
  Profession, 
  User, 
  Project, 
  BlogPost, 
  Testimonial, 
  Service, 
  Team,
  Setting,
  Page,
  PageSection,
  Menu,
  MenuItem,
  MediaFile,
  Contact
} = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🚀 Starting comprehensive database seeding...');
    console.log('📋 Based on frontend fallback data\n');

    // Sync database (optional, careful in production)
    // await sequelize.sync({ force: true });
    // console.log('Database synced');

    // ==================== 1. CREATE ROLES ====================
    console.log('📝 Creating roles...');
    const roles = await Role.bulkCreate([
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full system access',
        permissions: JSON.stringify(['*'])
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Admin',
        slug: 'admin',
        description: 'Administrative access',
        permissions: JSON.stringify([
          'pages.*',
          'projects.*',
          'contacts.*',
          'media.*',
          'professions.*',
          'settings.*',
          'users.view'
        ])
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Editor',
        slug: 'editor',
        description: 'Content editor',
        permissions: JSON.stringify([
          'pages.create',
          'pages.update',
          'pages.view',
          'projects.create',
          'projects.update',
          'projects.view',
          'media.upload',
          'media.view'
        ])
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Viewer',
        slug: 'viewer',
        description: 'Read-only access',
        permissions: JSON.stringify([
          'pages.view',
          'projects.view',
          'media.view'
        ])
      }
    ]);
    console.log('✅ Roles created');

    // ==================== 2. CREATE PROFESSIONS ====================
    console.log('📝 Creating professions...');
    const professions = await Profession.bulkCreate([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Software Developer',
        slug: 'software-developer',
        description: 'Professional software development portfolio',
        icon: 'code',
        isActive: true,
        menuConfig: JSON.stringify({
          items: ['Home', 'About', 'Projects', 'Skills', 'Tools', 'Blog', 'Contact']
        }),
        layoutConfig: JSON.stringify({
          theme: 'tech',
          colors: { primary: '#0ea5e9' }
        }),
        themeConfig: JSON.stringify({
          darkMode: true,
          animations: true
        })
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Doctor',
        slug: 'doctor',
        description: 'Medical professional portfolio',
        icon: 'stethoscope',
        isActive: true,
        menuConfig: JSON.stringify({
          items: ['Home', 'About', 'Services', 'Clinics', 'Research', 'Publications', 'Contact']
        }),
        layoutConfig: JSON.stringify({
          theme: 'medical',
          colors: { primary: '#10b981' }
        }),
        themeConfig: JSON.stringify({
          darkMode: false,
          animations: true
        })
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'Company',
        slug: 'company',
        description: 'Corporate portfolio',
        icon: 'building',
        isActive: true,
        menuConfig: JSON.stringify({
          items: ['Home', 'About', 'Services', 'Team', 'Careers', 'Investors', 'Contact']
        }),
        layoutConfig: JSON.stringify({
          theme: 'corporate',
          colors: { primary: '#6366f1' }
        }),
        themeConfig: JSON.stringify({
          darkMode: false,
          animations: true
        })
      },
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        name: 'Teacher',
        slug: 'teacher',
        description: 'Educational professional portfolio',
        icon: 'book',
        isActive: true,
        menuConfig: JSON.stringify({
          items: ['Home', 'About', 'Courses', 'Resources', 'Research', 'Contact']
        }),
        layoutConfig: JSON.stringify({
          theme: 'education',
          colors: { primary: '#f59e0b' }
        }),
        themeConfig: JSON.stringify({
          darkMode: false,
          animations: true
        })
      }
    ]);
    console.log('✅ Professions created');

    // ==================== 3. CREATE USERS ====================
    console.log('📝 Creating users...');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const superAdminRole = roles.find(r => r.slug === 'super-admin');
    const adminRole = roles.find(r => r.slug === 'admin');
    const editorRole = roles.find(r => r.slug === 'editor');
    const viewerRole = roles.find(r => r.slug === 'viewer');
    const defaultProfession = professions[0];

    await User.bulkCreate([
      {
        id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        email: 'admin@portfolio.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        roleId: superAdminRole.id,
        professionId: defaultProfession.id,
        isActive: true,
        lastLogin: new Date()
      },
      {
        id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        email: 'admin2@portfolio.com',
        password: hashedPassword,
        firstName: 'Regular',
        lastName: 'Admin',
        roleId: adminRole.id,
        professionId: professions[0].id,
        isActive: true,
        lastLogin: new Date()
      },
      {
        id: 'gggggggg-gggg-gggg-gggg-gggggggggggg',
        email: 'editor@portfolio.com',
        password: hashedPassword,
        firstName: 'Content',
        lastName: 'Editor',
        roleId: editorRole.id,
        professionId: professions[1].id,
        isActive: true
      },
      {
        id: 'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh',
        email: 'viewer@portfolio.com',
        password: hashedPassword,
        firstName: 'Portfolio',
        lastName: 'Viewer',
        roleId: viewerRole.id,
        professionId: professions[2].id,
        isActive: true
      }
    ]);
    console.log('✅ Users created');

    // ==================== 4. CREATE PAGES ====================
    console.log('📝 Creating pages...');
    const pages = await Page.bulkCreate([
      {
        id: '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        professionId: defaultProfession.id,
        title: 'Home',
        slug: 'home',
        description: 'Main landing page',
        metaTitle: 'Portfolio Home',
        metaDescription: 'Welcome to my portfolio',
        isActive: true,
        order: 1,
        layoutType: 'default'
      },
      {
        id: '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        professionId: defaultProfession.id,
        title: 'About',
        slug: 'about',
        description: 'About me page',
        metaTitle: 'About Me',
        metaDescription: 'Learn more about me and my work',
        isActive: true,
        order: 2,
        layoutType: 'default'
      },
      {
        id: '33333333-cccc-cccc-cccc-cccccccccccc',
        professionId: defaultProfession.id,
        title: 'Contact',
        slug: 'contact',
        description: 'Contact page',
        metaTitle: 'Contact Me',
        metaDescription: 'Get in touch with me',
        isActive: true,
        order: 3,
        layoutType: 'default'
      }
    ]);
    console.log('✅ Pages created');

    // ==================== 5. CREATE PAGE SECTIONS ====================
    console.log('📝 Creating page sections...');
    const homePage = pages[0];
    
    await PageSection.bulkCreate([
      {
        id: '11111111-dddd-dddd-dddd-dddddddddddd',
        pageId: homePage.id,
        type: 'hero',
        title: 'Welcome to My Portfolio',
        content: JSON.stringify({
          heading: 'Creative Developer & Designer',
          subheading: 'Building amazing digital experiences',
          ctaText: 'View Projects',
          ctaLink: '/projects',
          backgroundImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
        }),
        order: 1,
        isActive: true,
        config: JSON.stringify({
          fullWidth: true,
          height: '100vh'
        })
      },
      {
        id: '22222222-eeee-eeee-eeee-eeeeeeeeeeee',
        pageId: homePage.id,
        type: 'services',
        title: 'What I Do',
        content: JSON.stringify({
          columns: 3,
          showIcons: true
        }),
        order: 2,
        isActive: true,
        config: JSON.stringify({
          backgroundColor: '#f9fafb'
        })
      },
      {
        id: '33333333-ffff-ffff-ffff-ffffffffffff',
        pageId: homePage.id,
        type: 'projects',
        title: 'Featured Projects',
        content: JSON.stringify({
          itemsPerPage: 6,
          showFilters: true
        }),
        order: 3,
        isActive: true,
        config: JSON.stringify({
          layout: 'grid'
        })
      }
    ]);
    console.log('✅ Page sections created');

    // ==================== 6. CREATE MENUS ====================
    console.log('📝 Creating menus...');
    const menus = await Menu.bulkCreate([
      {
        id: '11111111-1111-aaaa-aaaa-aaaaaaaaaaaa',
        professionId: defaultProfession.id,
        name: 'Main Navigation',
        slug: 'main-nav',
        location: 'header',
        isActive: true
      },
      {
        id: '22222222-2222-bbbb-bbbb-bbbbbbbbbbbb',
        professionId: defaultProfession.id,
        name: 'Footer Menu',
        slug: 'footer-nav',
        location: 'footer',
        isActive: true
      }
    ]);
    console.log('✅ Menus created');

    // ==================== 7. CREATE MENU ITEMS ====================
    console.log('📝 Creating menu items...');
    const mainMenu = menus[0];
    
    const menuItems = await MenuItem.bulkCreate([
      {
        id: '11111111-1111-1111-aaaa-aaaaaaaaaaaa',
        menuId: mainMenu.id,
        label: 'Home',
        url: '/',
        order: 1,
        isActive: true,
        target: '_self'
      },
      {
        id: '22222222-2222-2222-bbbb-bbbbbbbbbbbb',
        menuId: mainMenu.id,
        label: 'About',
        url: '/about',
        order: 2,
        isActive: true,
        target: '_self'
      },
      {
        id: '33333333-3333-3333-cccc-cccccccccccc',
        menuId: mainMenu.id,
        label: 'Projects',
        url: '/projects',
        order: 3,
        isActive: true,
        target: '_self'
      },
      {
        id: '44444444-4444-4444-dddd-dddddddddddd',
        menuId: mainMenu.id,
        label: 'Blog',
        url: '/blog',
        order: 4,
        isActive: true,
        target: '_self'
      },
      {
        id: '55555555-5555-5555-eeee-eeeeeeeeeeee',
        menuId: mainMenu.id,
        label: 'Contact',
        url: '/contact',
        order: 5,
        isActive: true,
        target: '_self'
      }
    ]);
    console.log('✅ Menu items created');

    // ==================== 8. CREATE PROJECTS ====================
    console.log('📝 Creating projects...');
    await Project.bulkCreate([
      {
        id: '11111111-1111-1111-1111-111111111111',
        professionId: defaultProfession.id,
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.',
        content: 'Built with React, Node.js, and PostgreSQL. Features include product catalog, shopping cart, checkout flow, order management, and admin dashboard.',
        featuredImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
          'https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=800&q=80'
        ]),
        category: 'Web Development',
        tags: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Stripe']),
        technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API', 'TailwindCSS']),
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
        id: '22222222-2222-2222-2222-222222222222',
        professionId: defaultProfession.id,
        title: 'AI-Powered Analytics Dashboard',
        slug: 'ai-analytics-dashboard',
        description: 'Advanced analytics platform leveraging machine learning for predictive insights and data visualization.',
        content: 'Integrated multiple data sources, implemented ML models for forecasting, and created interactive visualizations.',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        gallery: JSON.stringify(['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80']),
        category: 'Data Science',
        tags: JSON.stringify(['Python', 'Machine Learning', 'Data Visualization']),
        technologies: JSON.stringify(['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI']),
        client: 'DataCorp',
        projectUrl: '#',
        githubUrl: '#',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2024-01-20'),
        status: 'completed',
        isActive: true,
        order: 2
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        professionId: defaultProfession.id,
        title: 'Mobile Healthcare App',
        slug: 'mobile-healthcare-app',
        description: 'HIPAA-compliant mobile application for patient management and telemedicine consultations.',
        content: 'Cross-platform mobile app with video calling, appointment scheduling, prescription management, and secure messaging.',
        featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        gallery: JSON.stringify(['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80']),
        category: 'Mobile Development',
        tags: JSON.stringify(['React Native', 'Healthcare', 'WebRTC']),
        technologies: JSON.stringify(['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'AWS']),
        client: 'HealthTech Solutions',
        projectUrl: '#',
        githubUrl: '#',
        startDate: new Date('2024-01-10'),
        endDate: null,
        status: 'in-progress',
        isActive: true,
        order: 3
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        professionId: defaultProfession.id,
        title: 'Blockchain Supply Chain',
        slug: 'blockchain-supply-chain',
        description: 'Decentralized supply chain management system using blockchain technology for transparency and traceability.',
        content: 'Built on Ethereum blockchain with smart contracts for automated verification and tracking.',
        featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        gallery: JSON.stringify(['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80']),
        category: 'Blockchain',
        tags: JSON.stringify(['Ethereum', 'Smart Contracts', 'Web3']),
        technologies: JSON.stringify(['Solidity', 'Ethereum', 'React', 'Web3.js', 'IPFS']),
        client: 'SupplyChain Inc.',
        projectUrl: '#',
        githubUrl: '#',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-02-28'),
        status: 'completed',
        isActive: true,
        order: 4
      }
    ]);
    console.log('✅ Projects created');

    // ==================== 9. CREATE BLOG POSTS ====================
    console.log('📝 Creating blog posts...');
    const adminUser = await User.findOne({ where: { email: 'admin@portfolio.com' } });
    
    await BlogPost.bulkCreate([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        professionId: defaultProfession.id,
        authorId: adminUser.id,
        title: 'The Future of Web Development in 2024',
        slug: 'future-web-development-2024',
        excerpt: 'Exploring the latest trends, technologies, and best practices shaping the future of web development.',
        content: 'Detailed blog content about web development trends including AI integration, WebAssembly, Edge Computing, and more...',
        featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        category: 'Technology',
        tags: JSON.stringify(['Web Development', 'JavaScript', 'Trends']),
        status: 'published',
        isActive: true,
        viewCount: 1523,
        publishedAt: new Date('2024-01-15')
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        professionId: defaultProfession.id,
        authorId: adminUser.id,
        title: 'Building Scalable APIs with Node.js',
        slug: 'scalable-apis-nodejs',
        excerpt: 'Best practices for designing and implementing scalable REST APIs using Node.js and Express.',
        content: 'Comprehensive guide to building production-ready APIs with Node.js, including error handling, validation, and caching strategies...',
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        category: 'Backend',
        tags: JSON.stringify(['Node.js', 'API Design', 'Performance']),
        status: 'published',
        isActive: true,
        viewCount: 2341,
        publishedAt: new Date('2024-02-20')
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        professionId: defaultProfession.id,
        authorId: adminUser.id,
        title: 'Mastering TypeScript for React Applications',
        slug: 'typescript-react-guide',
        excerpt: 'A comprehensive guide to using TypeScript in React applications for better type safety and developer experience.',
        content: 'Deep dive into TypeScript features that enhance React development, including generics, utility types, and advanced patterns...',
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        category: 'Frontend',
        tags: JSON.stringify(['TypeScript', 'React', 'Best Practices']),
        status: 'published',
        isActive: true,
        viewCount: 1876,
        publishedAt: new Date('2024-03-10')
      }
    ]);
    console.log('✅ Blog posts created');

    // ==================== 10. CREATE TESTIMONIALS ====================
    console.log('📝 Creating testimonials...');
    await Testimonial.bulkCreate([
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        professionId: defaultProfession.id,
        name: 'Sarah Johnson',
        position: 'CEO',
        company: 'Tech Innovations Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 5,
        content: 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded all expectations.',
        isActive: true,
        order: 1
      },
      {
        id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        professionId: defaultProfession.id,
        name: 'Michael Chen',
        position: 'CTO',
        company: 'Digital Solutions Ltd.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 5,
        content: 'The scalability and performance of the solution built for us has been phenomenal. Highly recommended!',
        isActive: true,
        order: 2
      },
      {
        id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        professionId: defaultProfession.id,
        name: 'Emily Rodriguez',
        position: 'Product Manager',
        company: 'StartUp Ventures',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        rating: 5,
        content: 'From concept to deployment, the entire process was smooth and professional.',
        isActive: true,
        order: 3
      }
    ]);
    console.log('✅ Testimonials created');

    // ==================== 11. CREATE SERVICES ====================
    console.log('📝 Creating services...');
    await Service.bulkCreate([
      {
        id: '11111111-1111-1111-1111-222222222222',
        professionId: defaultProfession.id,
        title: 'Full-Stack Web Development',
        slug: 'full-stack-development',
        description: 'End-to-end web application development using modern frameworks and best practices.',
        content: 'We build scalable, performant web applications using React, Node.js, and cutting-edge technologies.',
        icon: 'Code',
        featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
        price: 5000.00,
        priceType: 'starting at',
        isActive: true,
        order: 1
      },
      {
        id: '22222222-2222-2222-2222-333333333333',
        professionId: defaultProfession.id,
        title: 'Mobile App Development',
        slug: 'mobile-development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        content: 'Build beautiful, high-performance mobile apps with React Native or native technologies.',
        icon: 'Smartphone',
        featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        price: 8000.00,
        priceType: 'starting at',
        isActive: true,
        order: 2
      },
      {
        id: '33333333-3333-3333-3333-444444444444',
        professionId: defaultProfession.id,
        title: 'Cloud & DevOps Solutions',
        slug: 'cloud-devops',
        description: 'Infrastructure setup, CI/CD pipelines, and cloud architecture design.',
        content: 'We help you leverage cloud platforms for scalability and reliability.',
        icon: 'Cloud',
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        price: 3000.00,
        priceType: 'starting at',
        isActive: true,
        order: 3
      }
    ]);
    console.log('✅ Services created');

    // ==================== 12. CREATE TEAM MEMBERS ====================
    console.log('📝 Creating team members...');
    await Team.bulkCreate([
      {
        id: '44444444-4444-4444-4444-555555555555',
        professionId: defaultProfession.id,
        name: 'Alex Rivera',
        position: 'Senior Full-Stack Developer',
        bio: 'Passionate about building scalable web applications with 8+ years of experience.',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
        email: 'alex@portfolio.com',
        socialLinks: JSON.stringify({
          linkedin: '#',
          github: '#',
          twitter: '#'
        }),
        isActive: true,
        order: 1
      },
      {
        id: '55555555-5555-5555-5555-666666666666',
        professionId: defaultProfession.id,
        name: 'Maya Patel',
        position: 'UI/UX Designer',
        bio: 'Creating beautiful, user-centered designs that solve real problems.',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
        email: 'maya@portfolio.com',
        socialLinks: JSON.stringify({
          linkedin: '#',
          dribbble: '#'
        }),
        isActive: true,
        order: 2
      },
      {
        id: '66666666-6666-6666-6666-777777777777',
        professionId: defaultProfession.id,
        name: 'James Wilson',
        position: 'DevOps Engineer',
        bio: 'Infrastructure automation expert with deep knowledge of AWS, Docker, and Kubernetes.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        email: 'james@portfolio.com',
        socialLinks: JSON.stringify({
          linkedin: '#',
          github: '#'
        }),
        isActive: true,
        order: 3
      }
    ]);
    console.log('✅ Team members created');

    // ==================== 13. CREATE SETTINGS ====================
    console.log('📝 Creating settings...');
    await Setting.bulkCreate([
      {
        id: '77777777-7777-7777-7777-888888888888',
        key: 'site_name',
        value: JSON.stringify('Universal Portfolio'),
        type: 'string',
        category: 'general',
        description: 'Site name displayed in browser title'
      },
      {
        id: '88888888-8888-8888-8888-999999999999',
        key: 'site_description',
        value: JSON.stringify('Professional portfolio showcasing our work and expertise'),
        type: 'string',
        category: 'general',
        description: 'Site description for SEO'
      },
      {
        id: '99999999-9999-9999-9999-aaaaaaaaaaaa',
        key: 'contact_email',
        value: JSON.stringify('contact@portfolio.com'),
        type: 'string',
        category: 'contact',
        description: 'Main contact email address'
      },
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb',
        key: 'social_links',
        value: JSON.stringify({
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        }),
        type: 'json',
        category: 'social',
        description: 'Social media links'
      }
    ]);
    console.log('✅ Settings created');

    // ==================== 14. CREATE SAMPLE CONTACTS ====================
    console.log('📝 Creating sample contacts...');
    await Contact.bulkCreate([
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-cccccccccccc',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        subject: 'Project Inquiry',
        message: 'I am interested in your web development services.',
        status: 'new',
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Sample)'
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-dddddddddddd',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        subject: 'Collaboration Opportunity',
        message: 'Would love to discuss potential collaboration.',
        status: 'read',
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Sample)'
      }
    ]);
    console.log('✅ Sample contacts created');

    // ==================== 15. CREATE SAMPLE MEDIA FILES ====================
    console.log('📝 Creating sample media files...');
    await MediaFile.bulkCreate([
      {
        id: 'dddddddd-dddd-dddd-dddd-eeeeeeeeeeee',
        userId: adminUser.id,
        fileName: 'hero-image.jpg',
        originalName: 'hero-background.jpg',
        mimeType: 'image/jpeg',
        size: 1024000,
        path: '/uploads/hero-image.jpg',
        thumbnailPath: '/uploads/thumbnails/hero-image.jpg',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300',
        category: 'hero',
        alt: 'Hero background image',
        title: 'Hero Image',
        description: 'Main hero background image'
      },
      {
        id: 'eeeeeeee-eeee-eeee-eeee-ffffffffffff',
        userId: adminUser.id,
        fileName: 'profile.jpg',
        originalName: 'profile-picture.jpg',
        mimeType: 'image/jpeg',
        size: 512000,
        path: '/uploads/profile.jpg',
        thumbnailPath: '/uploads/thumbnails/profile.jpg',
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        thumbnailUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        category: 'profile',
        alt: 'Profile picture',
        title: 'Profile Image',
        description: 'User profile picture'
      }
    ]);
    console.log('✅ Sample media files created');

    // ==================== SUMMARY ====================
    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Seeding Summary:');
    console.log(`  👥 Roles: ${roles.length}`);
    console.log(`  💼 Professions: ${professions.length}`);
    console.log(`  👤 Users: 4`);
    console.log(`  📄 Pages: ${pages.length}`);
    console.log(`  📑 Page Sections: 3`);
    console.log(`  📋 Menus: ${menus.length}`);
    console.log(`  🔗 Menu Items: ${menuItems.length}`);
    console.log(`  📁 Projects: 4`);
    console.log(`  📝 Blog Posts: 3`);
    console.log(`  ⭐ Testimonials: 3`);
    console.log(`  🛠️ Services: 3`);
    console.log(`  👥 Team Members: 3`);
    console.log(`  ⚙️ Settings: 4`);
    console.log(`  📧 Contacts: 2`);
    console.log(`  🖼️ Media Files: 2`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('🔐 Admin Login:');
    console.log('  Email: admin@portfolio.com');
    console.log('  Password: Admin@123');
    console.log('\n  Email: admin2@portfolio.com');
    console.log('  Password: Admin@123');
    console.log('\n  Email: editor@portfolio.com');
    console.log('  Password: Admin@123');
    console.log('\n  Email: viewer@portfolio.com');
    console.log('  Password: Admin@123');
    console.log('\n⚠️  Please change the default passwords after first login!\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    console.error('Error details:', error.original || error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run seed if called directly
if (require.main === module) {
  seed().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}

module.exports = seed;