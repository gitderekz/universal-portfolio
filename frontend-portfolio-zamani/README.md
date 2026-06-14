# Universal Portfolio - Frontend

A modern, responsive portfolio application built with React, TypeScript, Three.js, and TailwindCSS.

## ✨ Features

- **Stunning Animations**: Three.js particle effects, Framer Motion transitions
- **Glassmorphism UI**: Modern frosted glass design system
- **Dark/Light Theme**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach
- **Fallback Data System**: Works offline with beautiful mock data
- **15 Pages**: Complete portfolio with admin panel
- **Type-Safe**: Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Backend API running (optional - falls back to mock data)

### Installation

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Edit .env with your API URL
# VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:5173
```

### Build

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
src/
├── app/
│   └── App.tsx              # Main router and app setup
├── components/
│   ├── Layout.tsx           # Navigation and footer
│   ├── ThreeBackground.tsx  # 3D particle effects
│   ├── GlassCard.tsx        # Glassmorphism component
│   ├── AnimatedText.tsx     # Text reveal animations
│   └── LoadingSpinner.tsx   # Loading states
├── contexts/
│   ├── AuthContext.tsx      # Authentication state
│   └── ThemeContext.tsx     # Theme management
├── data/
│   └── fallbackData.ts      # Mock data for offline mode
├── hooks/
│   ├── useApi.ts            # API client with fallback
│   └── useScrollAnimation.ts # Scroll-triggered animations
├── lib/
│   └── api.ts               # Axios API client
├── pages/
│   ├── HomePage.tsx         # Landing page
│   ├── AboutPage.tsx        # About and experience
│   ├── ServicesPage.tsx     # Services and pricing
│   ├── ProjectsPage.tsx     # Project showcase
│   ├── ProjectDetailPage.tsx # Single project
│   ├── BlogPage.tsx         # Blog listing
│   ├── BlogPostPage.tsx     # Single blog post
│   ├── GalleryPage.tsx      # Photo gallery
│   ├── TeamPage.tsx         # Team members
│   ├── FAQPage.tsx          # FAQ accordion
│   ├── ContactPage.tsx      # Contact form
│   ├── LoginPage.tsx        # Authentication
│   ├── NotFoundPage.tsx     # 404 error
│   └── admin/               # Admin CRUD pages
└── utils/
    └── cn.ts                # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: Purple (500-600) to Blue (500-600) gradients
- **Background**: White → Gray (50-100) in light mode
- **Dark Mode**: Gray (900-800) gradients
- **Accents**: Pink, Cyan, Orange

### Components
- Glass cards with backdrop blur
- Gradient text effects
- Smooth hover transitions
- Animated progress bars
- Masonry grid layouts
- Carousels with Swiper

## 🔌 API Integration

The app works in two modes:

1. **Connected Mode**: Fetches data from backend API
2. **Fallback Mode**: Uses mock data when API is unavailable

The `useApi` hook automatically handles fallback:

```typescript
const { data, loading, error, usedFallback } = useApi(
  () => projectsAPI.getAll(),
  fallbackProjects
);
```

## 🧩 Key Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **TailwindCSS**: Styling
- **Three.js**: 3D graphics
- **Framer Motion**: Animations
- **React Router**: Navigation
- **Axios**: HTTP client
- **Swiper**: Carousels
- **Lucide React**: Icons

## 📱 Pages

### Public Pages
1. **Home** - Hero, stats, features, testimonials
2. **About** - Story, values, skills, timeline
3. **Services** - Service cards with pricing
4. **Projects** - Grid with filtering
5. **Project Detail** - Full project showcase
6. **Blog** - Blog listing
7. **Blog Post** - Single post view
8. **Gallery** - Masonry photo grid
9. **Team** - Team member profiles
10. **FAQ** - Accordion interface
11. **Contact** - Contact form

### Auth Pages
12. **Login** - User authentication
13. **404** - Error page

### Admin Pages
14. **Dashboard** - Overview and stats
15. **CRUD Pages** - Projects, Blog, Services, Team, Testimonials, Settings

## 🎯 Performance

- Lazy loading for routes
- Optimized Three.js particle count
- Intersection Observer for scroll animations
- Image lazy loading
- Code splitting

## 🌙 Theme System

Automatic dark mode detection with manual toggle:

```typescript
const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark' | 'system'
```

## 🔒 Authentication

JWT-based authentication with role-based access:

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start dev server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Environment Variables

```bash
VITE_API_URL=http://localhost:5000/api
```

## 📦 Deployment

Build the production bundle:

```bash
pnpm build
```

The `dist` folder contains the optimized production build.

Deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist` folder or use CLI
- **Static Hosting**: Upload `dist` folder contents

## 🤝 Contributing

This is a portfolio template system. Feel free to customize:

1. Update fallback data in `src/data/fallbackData.ts`
2. Modify colors in `tailwind.config.ts`
3. Customize components in `src/components/`
4. Add new pages in `src/pages/`

## 📄 License

MIT License - feel free to use for your own portfolio!

---

**Built with ❤️ using React, TypeScript, Three.js, and TailwindCSS**
