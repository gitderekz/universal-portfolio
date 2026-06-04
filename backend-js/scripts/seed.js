const { sequelize } = require('../config/database');
const { Role, Profession, User } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🚀 Starting database seeding...');

    // Sync database (optional, careful in production)
    // await sequelize.sync({ force: true });
    // console.log('Database synced');

    // Create Roles
    const roles = await Role.bulkCreate([
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full system access',
        permissions: ['*']
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Admin',
        slug: 'admin',
        description: 'Administrative access',
        permissions: [
          'pages.*',
          'projects.*',
          'contacts.*',
          'media.*',
          'professions.*',
          'settings.*',
          'users.view'
        ]
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Editor',
        slug: 'editor',
        description: 'Content editor',
        permissions: [
          'pages.create',
          'pages.update',
          'pages.view',
          'projects.create',
          'projects.update',
          'projects.view',
          'media.upload',
          'media.view'
        ]
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Viewer',
        slug: 'viewer',
        description: 'Read-only access',
        permissions: [
          'pages.view',
          'projects.view',
          'media.view'
        ]
      }
    ]);

    console.log('✅ Roles created');

    // Create Professions
    const professions = await Profession.bulkCreate([
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Software Developer',
        slug: 'software-developer',
        description: 'Professional software development portfolio',
        icon: 'code',
        isActive: true,
        menuConfig: {
          items: ['Home', 'About', 'Projects', 'Skills', 'Tools', 'Blog', 'Contact']
        },
        layoutConfig: {
          theme: 'tech',
          colors: { primary: '#0ea5e9' }
        }
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Doctor',
        slug: 'doctor',
        description: 'Medical professional portfolio',
        icon: 'stethoscope',
        isActive: true,
        menuConfig: {
          items: ['Home', 'About', 'Services', 'Clinics', 'Research', 'Publications', 'Contact']
        },
        layoutConfig: {
          theme: 'medical',
          colors: { primary: '#10b981' }
        }
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'Company',
        slug: 'company',
        description: 'Corporate portfolio',
        icon: 'building',
        isActive: true,
        menuConfig: {
          items: ['Home', 'About', 'Services', 'Team', 'Careers', 'Investors', 'Contact']
        },
        layoutConfig: {
          theme: 'corporate',
          colors: { primary: '#6366f1' }
        }
      },
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        name: 'Teacher',
        slug: 'teacher',
        description: 'Educational professional portfolio',
        icon: 'book',
        isActive: true,
        menuConfig: {
          items: ['Home', 'About', 'Courses', 'Resources', 'Research', 'Contact']
        },
        layoutConfig: {
          theme: 'education',
          colors: { primary: '#f59e0b' }
        }
      }
    ]);

    console.log('✅ Professions created');

    // Hash password manually
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Create Default Super Admin User
    const superAdminRole = roles.find(r => r.slug === 'super-admin');
    const defaultProfession = professions[0];

    await User.create({
      id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      roleId: superAdminRole.id,
      professionId: defaultProfession.id,
      isActive: true
    });

    console.log('✅ Default admin user created');

    // Create sample users for testing
    const adminRole = roles.find(r => r.slug === 'admin');
    const editorRole = roles.find(r => r.slug === 'editor');
    const viewerRole = roles.find(r => r.slug === 'viewer');

    await User.bulkCreate([
      {
        id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        email: 'admin2@portfolio.com',
        password: hashedPassword,
        firstName: 'Regular',
        lastName: 'Admin',
        roleId: adminRole.id,
        professionId: professions[0].id,
        isActive: true
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

    console.log('✅ Sample users created');

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📋 Default credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Super Admin: admin@portfolio.com / Admin@123');
    console.log('Admin:       admin2@portfolio.com / Admin@123');
    console.log('Editor:      editor@portfolio.com / Admin@123');
    console.log('Viewer:      viewer@portfolio.com / Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  Please change the default passwords after first login!\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
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