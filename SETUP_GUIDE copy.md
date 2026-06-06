# 🚀 Universal Portfolio System - Complete Setup Guide

## Quick Start (3 Minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create MySQL database
mysql -u root -p
CREATE DATABASE universal_portfolio;
EXIT;

# Copy and configure environment
cp .env.example .env
# Edit .env with your database credentials

# Compile TypeScript (if needed)
npx tsc

# Start backend server
npm run dev
```

✅ **Backend should now be running on http://localhost:5000**

### Step 2: Seed Database (First Time Only)

```bash
# While in backend directory
npm run seed
```

This creates:
- 4 default roles (Super Admin, Admin, Editor, Viewer)
- 4 profession templates (Software Developer, Doctor, Company, Teacher)
- 1 super admin user: `admin@portfolio.com` / `Admin@123`

### Step 3: Frontend Setup

```bash
# Navigate back to project root
cd ..

# Install dependencies
pnpm install

# Start frontend dev server
pnpm dev
```

✅ **Frontend should now be running on http://localhost:5173**

---

## 🎯 Test the System

1. **Open your browser** → http://localhost:5173
2. **Click "Login"** in the header
3. **Login with:**
   - Email: `admin@portfolio.com`
   - Password: `Admin@123`
4. **Access Admin Dashboard** → Click on your name → Dashboard

---

## 📋 Environment Variables

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=universal_portfolio
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=noreply@yourportfolio.com

# Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env - Create in root)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if MySQL is running
sudo service mysql status

# Check if port 5000 is available
lsof -i :5000

# Check TypeScript compilation
cd backend
npx tsc --noEmit
```

### Frontend won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check if port 5173 is available
lsof -i :5173
```

### Database connection fails
```bash
# Test MySQL connection
mysql -u root -p

# Verify database exists
SHOW DATABASES;

# Check user permissions
SHOW GRANTS FOR 'root'@'localhost';
```

### CORS errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that backend is running on port 5000

---

## 📦 Project Commands

### Backend Commands
```bash
cd backend

# Development
npm run dev              # Start with nodemon
npm start                # Start production

# Database
npm run seed             # Seed database
npm run migrate          # Run migrations (if implemented)

# TypeScript
npx tsc                  # Compile TypeScript
npx tsc --watch          # Watch mode
```

### Frontend Commands
```bash
# Development
pnpm dev                 # Start dev server

# Build
pnpm build              # Build for production
pnpm preview            # Preview production build

# Backend shortcuts (from root)
pnpm backend            # Start backend from root
pnpm backend:install    # Install backend deps from root
```

---

## 🗄️ Database Schema

The system creates these tables automatically:
- `users` - User accounts
- `roles` - User roles with permissions
- `professions` - Professional categories
- `pages` - Dynamic pages
- `page_sections` - Page content sections
- `menus` - Navigation menus
- `menu_items` - Menu items
- `media_files` - Uploaded media
- `contacts` - Contact submissions
- `settings` - System settings
- `projects` - Portfolio projects
- `blog_posts` - Blog articles
- `testimonials` - Client reviews
- `services` - Services
- `teams` - Team members

---

## 🔐 Default User & Roles

### Super Admin
- **Email:** admin@portfolio.com
- **Password:** Admin@123
- **Permissions:** All (*)

⚠️ **IMPORTANT:** Change the password immediately after first login!

### Available Roles
1. **Super Admin** - Full system access
2. **Admin** - Manage content, users, settings
3. **Editor** - Create and edit content
4. **Viewer** - Read-only access

---

## 📱 Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"Admin@123"}'
```

**Get Professions:**
```bash
curl http://localhost:5000/api/professions
```

**Create Project (with auth):**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"professionId":"PROFESSION_ID","title":"My Project","slug":"my-project","description":"A great project"}'
```

### Using Postman
1. Import API endpoints from backend/README.md
2. Set base URL: `http://localhost:5000/api`
3. Add Bearer token in Authorization header for protected routes

---

## 🎨 Frontend Structure

```
src/
├── app/
│   └── App.tsx                 # Main app with routing
├── components/
│   ├── Layout.tsx              # Header, footer, navigation
│   └── LazyImage.tsx           # Optimized image component
├── contexts/
│   ├── AuthContext.tsx         # Authentication state
│   └── ThemeContext.tsx        # Theme management
├── lib/
│   └── api.ts                  # API client
└── pages/
    ├── HomePage.tsx            # Landing page
    ├── PortfolioPage.tsx       # Projects showcase
    ├── ContactPage.tsx         # Contact form
    ├── LoginPage.tsx           # Login
    └── AdminDashboard.tsx      # Admin panel
```

---

## 🌐 Accessing the System

### Frontend
- **Homepage:** http://localhost:5173
- **Portfolio:** http://localhost:5173/portfolio
- **Contact:** http://localhost:5173/contact
- **Login:** http://localhost:5173/login
- **Admin:** http://localhost:5173/admin (requires login)

### Backend
- **API Base:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health
- **Uploads:** http://localhost:5000/uploads

---

## 🚢 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name portfolio-api
   ```
3. Set up Nginx reverse proxy
4. Configure SSL certificate (Let's Encrypt)
5. Use migrations instead of `sync()`

### Frontend
1. Build production bundle:
   ```bash
   pnpm build
   ```
2. Deploy to Vercel/Netlify:
   ```bash
   # Vercel
   vercel deploy

   # Netlify
   netlify deploy --prod
   ```

---

## 💡 Next Steps

1. **Change Default Password**
2. **Configure Email Settings** (for contact form)
3. **Upload Your Projects** via Admin Panel
4. **Customize Your Profession** settings
5. **Add Your Content** (pages, services, team)
6. **Test Contact Form**
7. **Enable SSL** for production

---

## 🆘 Getting Help

- Check `PROJECT_README.md` for architecture overview
- Review `backend/README.md` for API documentation
- Review code comments for implementation details

---

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Database created and seeded
- [ ] Can login with default credentials
- [ ] Can access admin dashboard
- [ ] API health check returns OK
- [ ] Can view professions list
- [ ] Theme toggle works
- [ ] Contact form displays (even if email not configured)

---

**🎉 You're all set! Start building your professional portfolio.**
