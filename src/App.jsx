import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './components/Contact';
import AdminGestion from './pages/AdminGestion';
import './styles/minecraft-theme.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route principale avec layout */}
        <Route path="/" element={
          <Layout>
            <Home />
            <Projects />
            <Contact />
          </Layout>
        } />
        
        {/* Route d'administration sans layout principal */}
        <Route path="/admin/gestion" element={<AdminGestion />} />
      </Routes>
    </Router>
  );
}

export default App;
