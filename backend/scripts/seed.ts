import { sequelize } from '../config/database';
import { Role, Profession, User } from '../models';

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Create Roles
    const roles = await Role.bulkCreate([
      {
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full system access',
        permissions: ['*']
      },
      {
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

    // Create Default Super Admin User
    const superAdminRole = roles.find(r => r.slug === 'super-admin');
    const defaultProfession = professions[0];

    await User.create({
      email: 'admin@portfolio.com',
      password: 'Admin@123',
      firstName: 'Super',
      lastName: 'Admin',
      roleId: superAdminRole!.id,
      professionId: defaultProfession.id,
      isActive: true
    });

    console.log('✅ Default admin user created (admin@portfolio.com / Admin@123)');

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('Default credentials:');
    console.log('Email: admin@portfolio.com');
    console.log('Password: Admin@123');
    console.log('\n⚠️  Please change the default password after first login!\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

seed();
