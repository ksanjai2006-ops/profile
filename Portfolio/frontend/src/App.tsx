import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Admin Components
import { AdminSidebar } from './components/AdminSidebar';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminEducationPage } from './pages/admin/AdminEducationPage';
import { AdminCertificationsPage } from './pages/admin/AdminCertificationsPage';
import { AdminExperiencePage } from './pages/admin/AdminExperiencePage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Public Layout Wrapper
const PublicLayout: React.FC = () => (
  <div className="d-flex flex-column min-vh-100 bg-background text-primary">
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Admin Layout Wrapper
const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-background text-primary">
      <AdminSidebar />
      <main className="flex-grow-1 p-3 p-md-4 p-lg-5 overflow-auto">
        <div className="container-fluid max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="skills" element={<AdminSkillsPage />} />
              <Route path="education" element={<AdminEducationPage />} />
              <Route path="certifications" element={<AdminCertificationsPage />} />
              <Route path="experience" element={<AdminExperiencePage />} />
              <Route path="messages" element={<AdminMessagesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
