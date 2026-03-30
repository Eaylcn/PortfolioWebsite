
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import DroidShikai from './pages/DroidShikai';
import Story from './pages/Story';
import DataDrake from './components/BugOracle';
import GameDetailPage from './pages/GameDetailPage';
import MobileDetailPage from './pages/MobileDetailPage';
import WebDetailPage from './pages/WebDetailPage';
import Footer from './components/shared/Footer';

const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = React.lazy(() => import('./pages/admin/AdminProjects'));
const AdminProjectForm = React.lazy(() => import('./pages/admin/AdminProjectForm'));
const AdminShikai = React.lazy(() => import('./pages/admin/AdminShikai'));
const AdminExperience = React.lazy(() => import('./pages/admin/AdminExperience'));
const AdminStats = React.lazy(() => import('./pages/admin/AdminStats'));
const AdminStory = React.lazy(() => import('./pages/admin/AdminStory'));
const AdminTechStack = React.lazy(() => import('./pages/admin/AdminTechStack'));
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthGuard } from './components/admin/AuthGuard';
import { Outlet } from 'react-router-dom';

const AdminSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="animate-spin size-12 border-4 border-primary border-t-transparent rounded-full shadow-glow"></div>
    </div>
  }>
    {children}
  </Suspense>
);

const WebsiteLayout = () => (
  <div className="min-h-screen bg-background-dark flex flex-col font-body">
    <Navbar />
    <DataDrake />
    <main className="flex-grow flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminSuspense><AdminLogin /></AdminSuspense>} />
        
        <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
          <Route index element={<AdminSuspense><AdminDashboard /></AdminSuspense>} />
          <Route path="projects" element={<AdminSuspense><AdminProjects /></AdminSuspense>} />
          <Route path="projects/new" element={<AdminSuspense><AdminProjectForm /></AdminSuspense>} />
          <Route path="projects/edit/:id" element={<AdminSuspense><AdminProjectForm /></AdminSuspense>} />
          <Route path="shikai" element={<AdminSuspense><AdminShikai /></AdminSuspense>} />
          <Route path="experience" element={<AdminSuspense><AdminExperience /></AdminSuspense>} />
          <Route path="stats" element={<AdminSuspense><AdminStats /></AdminSuspense>} />
          <Route path="story" element={<AdminSuspense><AdminStory /></AdminSuspense>} />
          <Route path="tech-stack" element={<AdminSuspense><AdminTechStack /></AdminSuspense>} />
        </Route>

        {/* Public Website Routes */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="skills" element={<Skills />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="story" element={<Story />} />
          <Route path="games/:slug" element={<GameDetailPage />} />
          <Route path="mobile/:slug" element={<MobileDetailPage />} />
          <Route path="web/:slug" element={<WebDetailPage />} />
          <Route path="droid-shikai" element={<DroidShikai />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
