import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalacticBackground from './components/galactic/GalacticBackground';
import GalacticNavbar from './components/navigation/GalacticNavbar';
import { usePagePreload, useLoadingState } from './hooks/usePageOptimization';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencesPage from './pages/ExperiencesPage';
import AdminPage from './pages/AdminPage';

// Composant wrapper pour gérer les animations et l'état
function AppContent() {
  usePagePreload();
  useLoadingState();

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <GalacticBackground />
      <GalacticNavbar />
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
