const { sequelize } = require('../config/database');
const { 
  User, 
  Profession, 
  Page, 
  Project, 
  BlogPost, 
  Contact,
  Service,
  Testimonial
} = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const [
      totalUsers,
      totalProfessions,
      totalPages,
      totalProjects,
      totalBlogs,
      totalContacts,
      totalServices,
      totalTestimonials,
      activeUsers,
      publishedBlogs,
      completedProjects
    ] = await Promise.all([
      User.count(),
      Profession.count(),
      Page.count(),
      Project.count(),
      BlogPost.count(),
      Contact.count(),
      Service.count(),
      Testimonial.count(),
      User.count({ where: { isActive: true } }),
      BlogPost.count({ where: { status: 'published' } }),
      Project.count({ where: { status: 'completed' } })
    ]);

    // Recent contacts
    const recentContacts = await Contact.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'email', 'subject', 'status', 'createdAt']
    });

    // Recent users
    const recentUsers = await User.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'firstName', 'lastName', 'email', 'isActive', 'createdAt'],
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['name']
        }
      ]
    });

    // Recent projects
    const recentProjects = await Project.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'status', 'isActive', 'createdAt']
    });

    res.status(200).json({
      success: true,
      stats: {
        users: { total: totalUsers, active: activeUsers, inactive: totalUsers - activeUsers },
        professions: totalProfessions,
        pages: totalPages,
        projects: { total: totalProjects, completed: completedProjects, pending: totalProjects - completedProjects },
        blogs: { total: totalBlogs, published: publishedBlogs, draft: totalBlogs - publishedBlogs },
        contacts: totalContacts,
        services: totalServices,
        testimonials: totalTestimonials
      },
      recent: {
        contacts: recentContacts,
        users: recentUsers,
        projects: recentProjects
      }
    });
  } catch (error) {
    next(error);
  }
};

const getRecentActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent records from multiple tables
    const [recentUsers, recentContacts, recentProjects, recentBlogs] = await Promise.all([
      User.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt']
      }),
      Contact.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'email', 'subject', 'createdAt']
      }),
      Project.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'status', 'createdAt']
      }),
      BlogPost.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'status', 'createdAt']
      })
    ]);

    // Combine and sort activities
    const activities = [
      ...recentUsers.map(u => ({
        type: 'user',
        action: 'created',
        title: `${u.firstName} ${u.lastName}`,
        description: `New user registered: ${u.email}`,
        createdAt: u.createdAt,
        id: u.id
      })),
      ...recentContacts.map(c => ({
        type: 'contact',
        action: 'submitted',
        title: c.name,
        description: `New contact message: ${c.subject}`,
        createdAt: c.createdAt,
        id: c.id
      })),
      ...recentProjects.map(p => ({
        type: 'project',
        action: p.status === 'completed' ? 'completed' : 'created',
        title: p.title,
        description: `Project ${p.status === 'completed' ? 'completed' : 'added'}: ${p.title}`,
        createdAt: p.createdAt,
        id: p.id
      })),
      ...recentBlogs.map(b => ({
        type: 'blog',
        action: 'created',
        title: b.title,
        description: `New blog post: ${b.title} (${b.status})`,
        createdAt: b.createdAt,
        id: b.id
      }))
    ];

    // Sort by date and limit
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const recentActivities = activities.slice(0, limit);

    res.status(200).json({
      success: true,
      activities: recentActivities
    });
  } catch (error) {
    next(error);
  }
};

const getChartsData = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;
    
    let groupFormat;
    let dateRange;
    
    switch(period) {
      case 'week':
        groupFormat = '%Y-%m-%d';
        dateRange = { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
        break;
      case 'month':
        groupFormat = '%Y-%m-%d';
        dateRange = { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
        break;
      case 'year':
        groupFormat = '%Y-%m';
        dateRange = { [Op.gte]: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) };
        break;
      default:
        groupFormat = '%Y-%m-%d';
        dateRange = { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
    }

    // Get user registrations over time
    const userRegistrations = await User.findAll({
      where: { createdAt: dateRange },
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat)],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat), 'ASC']],
      raw: true
    });

    // Get contact submissions over time
    const contactSubmissions = await Contact.findAll({
      where: { createdAt: dateRange },
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat)],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), groupFormat), 'ASC']],
      raw: true
    });

    // Get project completions over time
    const projectCompletions = await Project.findAll({
      where: { 
        status: 'completed',
        updatedAt: dateRange
      },
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), groupFormat), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), groupFormat)],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), groupFormat), 'ASC']],
      raw: true
    });

    // Popular professions
    const popularProfessions = await Profession.findAll({
      attributes: [
        'id', 'name',
        [sequelize.fn('COUNT', sequelize.col('users.id')), 'userCount']
      ],
      include: [{
        model: User,
        as: 'users',
        attributes: [],
        required: false
      }],
      group: ['Profession.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('users.id')), 'DESC']],
      limit: 5,
      raw: true,
      nest: true
    });

    res.status(200).json({
      success: true,
      charts: {
        userRegistrations,
        contactSubmissions,
        projectCompletions,
        popularProfessions
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivities,
  getChartsData
};