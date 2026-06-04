# Universal Professional Portfolio System

## 🎯 Project Overview

A comprehensive, full-stack portfolio management platform that supports **ALL professional fields** including software developers, engineers, doctors, teachers, finance professionals, companies, government organizations, and more.

### ✨ Key Features

- **Multi-Professional Support**: Dynamic templates for any profession
- **Backend API**: Node.js + TypeScript + Express + MySQL + Sequelize
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Authentication**: JWT-based with Role-Based Access Control (RBAC)
- **Dynamic Content**: API-driven pages, menus, and layouts
- **Image Optimization**: Automatic compression, thumbnails, and lazy loading
- **Email Integration**: Contact form with Gmail SMTP
- **Theme System**: Dark/Light mode support
- **Responsive Design**: Mobile-first approach
- **Admin Panel**: Full CRUD operations for all content

---

## 📁 Project Structure

```
project-root/
├── backend/                  # Backend API (Node.js + TypeScript)
│   ├── config/              # Database configuration
│   ├── models/              # Sequelize models (15 models)
│   ├── controllers/         # Request handlers
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation, error handling
│   ├── utils/               # JWT, email, image optimization
│   ├── server.ts            # Entry point
│   ├── package.json
│   └── README.md            # Backend documentation
│
├── frontend-portfolio/      # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # Auth & Theme contexts
│   │   ├── pages/           # Page components
│   │   ├── lib/             # API client
│   │   └── app/             # Main app component
│   ├── package.json
│   └── vite.config.ts
│
└── src/                     # Integrated frontend (current setup)
    ├── components/          # Layout, LazyImage, etc.
    ├── contexts/            # AuthContext, ThemeContext
    ├── pages/               # HomePage, Portfolio, Contact, etc.
    ├── lib/                 # API services
    └── app/                 # App.tsx with routing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- MySQL 8+
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create MySQL database**
```sql
CREATE DATABASE universal_portfolio;
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials and other settings
```

5. **Run the server**
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root**
```bash
cd ..
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Create environment file**
```bash
# Create .env in root
VITE_API_URL=http://localhost:5000/api
```

4. **Run development server**
```bash
pnpm dev
```

The frontend will be available at `http://localhost:5173`

---

## 🗄️ Database Models

### Core Models
- **User** - System users with authentication
- **Role** - User roles with permissions
- **Profession** - Professional categories (developer, doctor, etc.)
- **Page** - Dynamic pages with SEO metadata
- **PageSection** - Page content sections (JSON-based)
- **Menu** - Navigation menus per profession
- **MenuItem** - Menu items with nested support
- **MediaFile** - Uploaded files with optimization
- **Contact** - Contact form submissions
- **Setting** - System-wide settings

### Content Models
- **Project** - Portfolio projects
- **BlogPost** - Blog articles
- **Testimonial** - Client reviews
- **Service** - Services offered
- **Team** - Team members

---

## 🔐 Authentication & Authorization

### User Roles
- **Super Admin**: Full system access
- **Admin**: Manage all content and users
- **Editor**: Create and edit content
- **Viewer**: Read-only access

### Permissions System
Role-based permissions control access to:
- Pages (create, read, update, delete)
- Projects (create, read, update, delete)
- Media (upload, view, delete)
- Contacts (view, update, delete)
- Professions (manage)
- Settings (manage)

---

## 📡 API Endpoints

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
- `POST /api/pages` - Create page (Auth)
- `PUT /api/pages/:id` - Update page (Auth)
- `DELETE /api/pages/:id` - Delete page (Auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Auth)
- `PUT /api/projects/:id` - Update project (Auth)
- `DELETE /api/projects/:id` - Delete project (Auth)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Auth)
- `PUT /api/contact/:id` - Update contact status (Auth)
- `DELETE /api/contact/:id` - Delete contact (Auth)

### Media
- `POST /api/media` - Upload file (Auth)
- `GET /api/media` - Get all media (Auth)
- `GET /api/media/:id` - Get media by ID (Auth)
- `DELETE /api/media/:id` - Delete media (Auth)

### Professions
- `GET /api/professions` - Get all professions
- `GET /api/professions/:id` - Get profession by ID
- `GET /api/professions/slug/:slug` - Get by slug
- `POST /api/professions` - Create profession (Auth)
- `PUT /api/professions/:id` - Update profession (Auth)
- `DELETE /api/professions/:id` - Delete profession (Auth)

---

## 🎨 Frontend Features

### Core Components
- **Layout** - Header, footer, navigation with theme toggle
- **LazyImage** - Progressive image loading component
- **AuthContext** - Authentication state management
- **ThemeContext** - Dark/light mode management

### Pages
- **HomePage** - Hero section with features
- **PortfolioPage** - Project showcase with filtering
- **ContactPage** - Contact form with validation
- **LoginPage** - User authentication
- **AdminDashboard** - Admin control panel

### Features
- Responsive design (mobile-first)
- Dark/Light theme toggle
- Lazy loading images
- Smooth animations (Framer Motion)
- Form validation
- API error handling
- Protected routes
- Token-based authentication

---

## 🖼️ Image Optimization

### Backend Processing
1. Original image compression (90% quality)
2. Thumbnail generation (300x300px, 80% quality)
3. Both versions stored with unique filenames

### Frontend Display
1. Thumbnail loads first (low bandwidth)
2. Full image loads on good connection
3. Lazy loading with Intersection Observer
4. Smooth transition between versions

---

## 🛠️ Technologies Used

### Backend
- Node.js + TypeScript
- Express.js
- MySQL + Sequelize ORM
- JWT for auth
- Bcrypt for passwords
- Multer + Sharp for images
- Nodemailer for email
- Joi for validation
- Helmet + Rate limiting for security

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Framer Motion
- Lucide React (icons)
- React Intersection Observer

---

## 📦 Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use process manager (PM2)
3. Set up Nginx reverse proxy
4. Configure SSL (Let's Encrypt)
5. Use database migrations
6. Set up backup strategy

### Frontend
1. Build production bundle: `npm run build`
2. Deploy to Vercel/Netlify/custom server
3. Configure environment variables
4. Set up CDN for assets

---

## 🔄 Next Steps / Roadmap

- [ ] Add more profession templates (Doctor, Lawyer, etc.)
- [ ] Implement blog functionality
- [ ] Add testimonials management
- [ ] Create service pages
- [ ] Build team member section
- [ ] Add analytics dashboard
- [ ] Implement search functionality
- [ ] Add PDF resume generation
- [ ] Multi-language support
- [ ] Add social media integration
- [ ] Implement caching (Redis)
- [ ] Add unit and integration tests

---

## 📝 License

This project is created for educational/portfolio purposes.

---

## 👨‍💻 Support

For questions or issues, please refer to:
- Backend documentation: `/backend/README.md`
- API documentation: Available via Postman/Swagger (to be added)

---

## 🎯 System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
│   Port: 5173    │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend API   │
│   (Express)     │
│   Port: 5000    │
└────────┬────────┘
         │
         │ Sequelize
         │
┌────────▼────────┐
│   MySQL DB      │
│   Port: 3306    │
└─────────────────┘
```

---

**Built with ❤️ using Modern Full-Stack Technologies**
