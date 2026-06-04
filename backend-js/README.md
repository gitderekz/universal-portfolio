# Universal Portfolio System - Backend API

## Overview
This is the backend API for the Universal Professional Portfolio System. It provides a RESTful API for managing portfolios across multiple professions.

## Features
- ✅ JWT Authentication & RBAC
- ✅ Multi-professional support
- ✅ Dynamic page management
- ✅ Project/Portfolio management
- ✅ Blog system
- ✅ Contact form with email notifications
- ✅ Media upload with image optimization
- ✅ Service management
- ✅ Testimonial management
- ✅ Team management
- ✅ Menu builder

## Tech Stack
- Node.js + TypeScript
- Express.js
- MySQL + Sequelize ORM
- JWT for authentication
- Multer + Sharp for image handling
- Nodemailer for email

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
```sql
CREATE DATABASE universal_portfolio;
```

### 3. Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Required variables:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET`
- `SMTP_*` variables for email

### 4. Run Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Pages
- `GET /api/pages` - Get all pages
- `GET /api/pages/:id` - Get page by ID
- `GET /api/pages/slug/:slug` - Get page by slug
- `POST /api/pages` - Create page (Auth required)
- `PUT /api/pages/:id` - Update page (Auth required)
- `DELETE /api/pages/:id` - Delete page (Auth required)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Auth required)
- `PUT /api/projects/:id` - Update project (Auth required)
- `DELETE /api/projects/:id` - Delete project (Auth required)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Auth required)
- `PUT /api/contact/:id` - Update contact status (Auth required)
- `DELETE /api/contact/:id` - Delete contact (Auth required)

### Media
- `POST /api/media` - Upload media (Auth required)
- `GET /api/media` - Get all media files (Auth required)
- `GET /api/media/:id` - Get media by ID (Auth required)
- `DELETE /api/media/:id` - Delete media (Auth required)

### Professions
- `GET /api/professions` - Get all professions
- `GET /api/professions/:id` - Get profession by ID
- `GET /api/professions/slug/:slug` - Get profession by slug
- `POST /api/professions` - Create profession (Auth required)
- `PUT /api/professions/:id` - Update profession (Auth required)
- `DELETE /api/professions/:id` - Delete profession (Auth required)

## Database Models

### Core Models
- `User` - System users with roles
- `Role` - User roles with permissions
- `Profession` - Professional categories
- `Page` - Dynamic pages
- `PageSection` - Page content sections
- `Menu` - Navigation menus
- `MenuItem` - Menu items
- `MediaFile` - Uploaded media files
- `Contact` - Contact form submissions
- `Setting` - System settings

### Content Models
- `Project` - Portfolio projects
- `BlogPost` - Blog articles
- `Testimonial` - Client testimonials
- `Service` - Services offered
- `Team` - Team members

## Default Roles & Permissions

### Super Admin
- Full system access (`*` permission)

### Admin
- Manage all content
- Manage users
- View analytics

### Editor
- Create/edit content
- Upload media
- Manage own content

### Viewer
- Read-only access

## Image Optimization

Images are automatically optimized on upload:
- Original images compressed (90% quality)
- Thumbnails generated (300x300px)
- Lazy loading support via thumbnail URLs

## Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in `SMTP_PASSWORD`

## Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 req/15min by default)
- JWT token authentication
- Password hashing with bcrypt
- Input validation with Joi
- CORS configuration

## Development

### Compile TypeScript
```bash
npx tsc
```

### Run Migrations (if using migrations)
```bash
npm run migrate
```

### Seed Database
```bash
npm run seed
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use process manager (PM2, systemd)
3. Set up reverse proxy (Nginx)
4. Configure SSL certificate
5. Use migrations instead of `sync()`
6. Set up backup strategy

## Folder Structure
```
backend/
├── config/          # Database configuration
├── models/          # Sequelize models
├── controllers/     # Request handlers
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── uploads/         # Uploaded files
└── server.ts        # Entry point
```

## Support

For issues or questions, please refer to the main project documentation.
