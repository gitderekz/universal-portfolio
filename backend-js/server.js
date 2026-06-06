const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const { sequelize } = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Ensure upload directories exist
const uploadDir = process.env.UPLOAD_PATH || './uploads';
const thumbnailDir = path.join(uploadDir, 'thumbnails');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow image loading
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global rate limiter (applied to all routes)
const globalLimiter = rateLimit({
  windowMs: (Number(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter rate limiter for auth routes (login, register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per 15 minutes
  skipSuccessfulRequests: true, // Don't count successful logins
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply global limiter to all /api routes
app.use('/api/', globalLimiter);
// Apply stricter limiter specifically to auth routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static Files (Uploads) - Make sure this is before API routes
app.use('/uploads', express.static(uploadDir));

// API Routes - All routes are automatically included from routes/index.js
app.use('/api', routes);

// Health Check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Universal Portfolio API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      api: '/api',
      health: '/health',
      uploads: '/uploads'
    },
    documentation: 'https://github.com/your-repo/universal-portfolio'
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.method} ${req.url}`,
    availableEndpoints: {
      auth: '/api/auth',
      users: '/api/users',
      professions: '/api/professions',
      pages: '/api/pages',
      projects: '/api/projects',
      blogs: '/api/blogs',
      contacts: '/api/contacts',
      media: '/api/media',
      services: '/api/services',
      testimonials: '/api/testimonials',
      teams: '/api/teams',
      settings: '/api/settings',
      dashboard: '/api/dashboard'
    }
  });
});

// Global Error Handler (should be last)
app.use(errorHandler);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync database (in production, use migrations)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synchronized');
    } else if (process.env.NODE_ENV === 'production') {
      // In production, just check connection without altering
      console.log('⚠️  Production mode - skipping auto-sync. Use migrations instead.');
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Server is running!`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`🖼️  Uploads URL: http://localhost:${PORT}/uploads`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // Log available routes in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📋 Available API Routes:');
        console.log('  POST   /api/auth/register');
        console.log('  POST   /api/auth/login');
        console.log('  GET    /api/auth/me');
        console.log('  GET    /api/professions');
        console.log('  GET    /api/pages');
        console.log('  GET    /api/projects');
        console.log('  GET    /api/blogs');
        console.log('  POST   /api/contacts');
        console.log('  GET    /api/services');
        console.log('  GET    /api/testimonials');
        console.log('  GET    /api/teams');
        console.log('  GET    /api/dashboard/stats');
        console.log('\n  💡 Protected routes require Bearer token');
        console.log('  📝 Default admin: admin@portfolio.com / Admin@123\n');
      }
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  // Close server & exit process
  process.exit(1);
});

startServer();

module.exports = app;