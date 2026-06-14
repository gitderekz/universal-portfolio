import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Layout } from '../components/Layout';
import { LoadingPage } from '../components/LoadingSpinner';

// Pages
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { ServicesPage } from '../pages/ServicesPage';
import { BlogPage } from '../pages/BlogPage';
import { BlogPostPage } from '../pages/BlogPostPage';
import { GalleryPage } from '../pages/GalleryPage';
import { TeamPage } from '../pages/TeamPage';
import { FAQPage } from '../pages/FAQPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProjects } from '../pages/admin/AdminProjects';
import { AdminBlog } from '../pages/admin/AdminBlog';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminTeam } from '../pages/admin/AdminTeam';
import { AdminTestimonials } from '../pages/admin/AdminTestimonials';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { NotFoundPage } from '../pages/NotFoundPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
      <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
      <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
      <Route path="/team" element={<Layout><TeamPage /></Layout>} />
      <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/team"
        element={
          <ProtectedRoute>
            <AdminTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <AdminTestimonials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
