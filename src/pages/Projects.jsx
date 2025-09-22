import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Monitor, Smartphone, Server, BarChart3, Zap, Eye, Github, Folder } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Tous', icon: Home, blockIcon: '/assets/minecraft-textures/grass_bloc.png' },
    { id: 'Web Development', name: 'Web Dev', icon: Monitor, blockIcon: '/assets/minecraft-textures/fer.png' },
    { id: 'Mobile Development', name: 'Mobile', icon: Smartphone, blockIcon: '/assets/minecraft-textures/or.png' },
    { id: 'Backend Development', name: 'Backend', icon: Server, blockIcon: '/assets/minecraft-textures/diamond.png' },
    { id: 'Data Visualization', name: 'Data Viz', icon: BarChart3, blockIcon: '/assets/minecraft-textures/emeraud.png' },
    { id: 'Real-time Apps', name: 'Real-time', icon: Zap, blockIcon: '/assets/minecraft-textures/obsidian.png' }
  ];

  useEffect(() => {
    // Charger les projets depuis l'API
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        // S'assurer que data est un tableau
        const projectsArray = Array.isArray(data) ? data : [];
        setProjects(projectsArray);
        setFilteredProjects(projectsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des projets:', err);
        // En cas d'erreur, initialiser avec un tableau vide
        setProjects([]);
        setFilteredProjects([]);
        setLoading(false);
      });
  }, []);

  const filterProjects = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="loading-container">
          <div className="minecraft-loader">
            <div className="loading-block"></div>
            <div className="loading-block"></div>
            <div className="loading-block"></div>
            <div className="loading-block"></div>
          </div>
          <p>Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page" id="projects">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="projects-header" variants={itemVariants}>
          <div className="header-with-steve">
            <img src="/assets/minecraft-textures/steve.png" alt="Steve Minecraft" className="steve-character" />
            <div className="header-content">
              <h1 className="page-title minecraft-text">Mes Créations Minecraft</h1>
              <p className="page-subtitle">
                Explorez mon inventaire de projets : des constructions web aux applications mobiles
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div className="projects-filters" variants={itemVariants}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => filterProjects(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={category.blockIcon} alt={category.name} className="filter-icon-img" />
              <span className="filter-text">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grille des projets */}
        <motion.div 
          className="projects-grid"
          layout
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              layout
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {project.featured && (
                <div className="featured-badge">
                  <img src="/assets/minecraft-textures/totem.png" alt="Featured" className="featured-icon" />
                  <span>Projet Légendaire</span>
                </div>
              )}
              
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-project.svg';
                  }}
                />
                <div className="project-overlay">
                  <div className="project-actions">
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn demo"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="action-icon-lucide" />
                        Demo
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn github"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="action-icon-lucide" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-category">
                  {project.category}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                
                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-technologies">
                  {Array.isArray(project.technologies) && project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="empty-state">
              <Folder className="empty-icon-lucide" />
              <h3>Coffre vide !</h3>
              <p>Aucun projet trouvé dans cet inventaire. Essayez un autre filtre !</p>
            </div>
          </motion.div>
        )}

        {/* Statistiques */}
        <motion.div 
          className="projects-stats"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="stat-card">
            <img src="/assets/minecraft-textures/fer.png" alt="Projects" className="stat-icon-img" />
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Total Projets</span>
          </div>
          <div className="stat-card">
            <img src="/assets/minecraft-textures/totem.png" alt="Featured" className="stat-icon-img" />
            <span className="stat-number">{projects.filter(p => p.featured).length}</span>
            <span className="stat-label">Projets Légendaires</span>
          </div>
          <div className="stat-card">
            <img src="/assets/minecraft-textures/diamond.png" alt="Technologies" className="stat-icon-img" />
            <span className="stat-number">
              {[...new Set(projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : []))].length}
            </span>
            <span className="stat-label">technologies</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;