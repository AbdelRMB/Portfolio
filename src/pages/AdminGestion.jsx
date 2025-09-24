import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';
import './AdminGestion.css';

const AdminGestion = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  // États pour les formulaires
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: [],
    image: '',
    github: '',
    demo: '',
    category: 'Web Development',
    featured: false
  });

  const [experienceForm, setExperienceForm] = useState({
    company: '',
    position: '',
    duration: '',
    location: '',
    type: 'CDI',
    description: '',
    technologies: [],
    achievements: [],
    start_date: '',
    end_date: '',
    current_job: false
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'Backend Development',
    'Data Visualization',
    'Real-time Apps'
  ];

  const contractTypes = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance', 'Intérim'];

  // Charger les données
  useEffect(() => {
    loadProjects();
    loadExperiences();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('https://api.abdelrahimriche.com/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    }
  };

  const loadExperiences = async () => {
    try {
      const response = await fetch('https://api.abdelrahimriche.com/api/experiences');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Erreur lors du chargement des expériences:', error);
    }
  };

  // Gestion des projets
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProject 
        ? `https://api.abdelrahimriche.com/api/admin/projects/${editingProject.id}`
        : 'https://api.abdelrahimriche.com/api/admin/projects';
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectForm)
      });

      if (response.ok) {
        loadProjects();
        resetProjectForm();
        alert(editingProject ? 'Projet mis à jour!' : 'Projet créé!');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du projet:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleProjectDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        const response = await fetch(`https://api.abdelrahimriche.com/api/admin/projects/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          loadProjects();
          alert('Projet supprimé!');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  // Gestion des expériences
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingExperience 
        ? `https://api.abdelrahimriche.com/api/admin/experiences/${editingExperience.id}`
        : 'https://api.abdelrahimriche.com/api/admin/experiences';
      
      const method = editingExperience ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(experienceForm)
      });

      if (response.ok) {
        loadExperiences();
        resetExperienceForm();
        alert(editingExperience ? 'Expérience mise à jour!' : 'Expérience créée!');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'expérience:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleExperienceDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
      try {
        const response = await fetch(`https://api.abdelrahimriche.com/api/admin/experiences/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          loadExperiences();
          alert('Expérience supprimée!');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'expérience:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  // Fonctions utilitaires
  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      technologies: [],
      image: '',
      github: '',
      demo: '',
      category: 'Web Development',
      featured: false
    });
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const resetExperienceForm = () => {
    setExperienceForm({
      company: '',
      position: '',
      duration: '',
      location: '',
      type: 'CDI',
      description: '',
      technologies: [],
      achievements: [],
      start_date: '',
      end_date: '',
      current_job: false
    });
    setEditingExperience(null);
    setShowExperienceForm(false);
  };

  const editProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      image: project.image,
      github: project.github,
      demo: project.demo,
      category: project.category,
      featured: project.featured
    });
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const editExperience = (experience) => {
    setExperienceForm({
      company: experience.company,
      position: experience.position,
      duration: experience.duration,
      location: experience.location,
      type: experience.type,
      description: experience.description,
      technologies: Array.isArray(experience.technologies) ? experience.technologies : [],
      achievements: Array.isArray(experience.achievements) ? experience.achievements : [],
      start_date: experience.start_date ? experience.start_date.split('T')[0] : '',
      end_date: experience.end_date ? experience.end_date.split('T')[0] : '',
      current_job: experience.current_job
    });
    setEditingExperience(experience);
    setShowExperienceForm(true);
  };

  const handleTechnologyAdd = (type, tech) => {
    if (tech.trim() && !getFormData(type).technologies.includes(tech.trim())) {
      if (type === 'project') {
        setProjectForm(prev => ({
          ...prev,
          technologies: [...prev.technologies, tech.trim()]
        }));
      } else {
        setExperienceForm(prev => ({
          ...prev,
          technologies: [...prev.technologies, tech.trim()]
        }));
      }
    }
  };

  const handleTechnologyRemove = (type, index) => {
    if (type === 'project') {
      setProjectForm(prev => ({
        ...prev,
        technologies: prev.technologies.filter((_, i) => i !== index)
      }));
    } else {
      setExperienceForm(prev => ({
        ...prev,
        technologies: prev.technologies.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAchievementAdd = (achievement) => {
    if (achievement.trim() && !experienceForm.achievements.includes(achievement.trim())) {
      setExperienceForm(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievement.trim()]
      }));
    }
  };

  const handleAchievementRemove = (index) => {
    setExperienceForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const getFormData = (type) => {
    return type === 'project' ? projectForm : experienceForm;
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">🛠️ Administration Portfolio</h1>
        <p className="admin-subtitle">Gestion des projets et expériences professionnelles</p>
      </div>

      {/* Onglets */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📦 Projets ({projects.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'experiences' ? 'active' : ''}`}
          onClick={() => setActiveTab('experiences')}
        >
          💼 Expériences ({experiences.length})
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="admin-content">
        {activeTab === 'projects' && (
          <div className="projects-section">
            <div className="section-header">
              <h2>Gestion des Projets</h2>
              <button
                className="add-button"
                onClick={() => setShowProjectForm(true)}
              >
                <Plus size={20} />
                Nouveau Projet
              </button>
            </div>

            {/* Formulaire projet */}
            {showProjectForm && (
              <div className="form-modal">
                <form onSubmit={handleProjectSubmit} className="project-form">
                  <div className="form-header">
                    <h3>{editingProject ? 'Modifier le Projet' : 'Nouveau Projet'}</h3>
                    <button type="button" onClick={resetProjectForm} className="close-button">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Titre</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Catégorie</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                      />
                    </div>

                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input
                        type="text"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, github: e.target.value }))}
                      />
                    </div>

                    <div className="form-group">
                      <label>Demo URL</label>
                      <input
                        type="text"
                        value={projectForm.demo}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, demo: e.target.value }))}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                        />
                        Projet en vedette
                      </label>
                    </div>

                    <div className="form-group full-width">
                      <label>Technologies</label>
                      <TechInput
                        technologies={projectForm.technologies}
                        onAdd={(tech) => handleTechnologyAdd('project', tech)}
                        onRemove={(index) => handleTechnologyRemove('project', index)}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={resetProjectForm} className="cancel-button">
                      Annuler
                    </button>
                    <button type="submit" className="save-button">
                      <Save size={20} />
                      {editingProject ? 'Mettre à jour' : 'Créer'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste des projets */}
            <div className="items-grid">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="item-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="item-header">
                    <h3>{project.title}</h3>
                    <div className="item-actions">
                      <button onClick={() => editProject(project)} className="edit-button">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleProjectDelete(project.id)} className="delete-button">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="item-description">{project.description}</p>
                  
                  <div className="item-meta">
                    <span className="category">{project.category}</span>
                    {project.featured && <span className="featured">⭐ Featured</span>}
                  </div>
                  
                  <div className="item-technologies">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="item-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="experiences-section">
            <div className="section-header">
              <h2>Gestion des Expériences</h2>
              <button
                className="add-button"
                onClick={() => setShowExperienceForm(true)}
              >
                <Plus size={20} />
                Nouvelle Expérience
              </button>
            </div>

            {/* Formulaire expérience */}
            {showExperienceForm && (
              <div
                className="form-modal"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <form onSubmit={handleExperienceSubmit} className="experience-form">
                  <div className="form-header">
                    <h3>{editingExperience ? 'Modifier l\'Expérience' : 'Nouvelle Expérience'}</h3>
                    <button type="button" onClick={resetExperienceForm} className="close-button">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Entreprise</label>
                      <input
                        type="text"
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Poste</label>
                      <input
                        type="text"
                        value={experienceForm.position}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, position: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Durée</label>
                      <input
                        type="text"
                        value={experienceForm.duration}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="ex: 2022 - 2023"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Lieu</label>
                      <input
                        type="text"
                        value={experienceForm.location}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Type de contrat</label>
                      <select
                        value={experienceForm.type}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, type: e.target.value }))}
                      >
                        {contractTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Date de début</label>
                      <input
                        type="date"
                        value={experienceForm.start_date}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, start_date: e.target.value }))}
                      />
                    </div>

                    <div className="form-group">
                      <label>Date de fin</label>
                      <input
                        type="date"
                        value={experienceForm.end_date}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, end_date: e.target.value }))}
                        disabled={experienceForm.current_job}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={experienceForm.current_job}
                          onChange={(e) => setExperienceForm(prev => ({ 
                            ...prev, 
                            current_job: e.target.checked,
                            end_date: e.target.checked ? '' : prev.end_date
                          }))}
                        />
                        Poste actuel
                      </label>
                    </div>

                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Technologies</label>
                      <TechInput
                        technologies={experienceForm.technologies}
                        onAdd={(tech) => handleTechnologyAdd('experience', tech)}
                        onRemove={(index) => handleTechnologyRemove('experience', index)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Réalisations</label>
                      <AchievementInput
                        achievements={experienceForm.achievements}
                        onAdd={handleAchievementAdd}
                        onRemove={handleAchievementRemove}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={resetExperienceForm} className="cancel-button">
                      Annuler
                    </button>
                    <button type="submit" className="save-button">
                      <Save size={20} />
                      {editingExperience ? 'Mettre à jour' : 'Créer'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste des expériences */}
            <div className="items-grid">
              {experiences.map(experience => (
                <div
                  key={experience.id}
                  className="item-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="item-header">
                    <h3>{experience.position}</h3>
                    <div className="item-actions">
                      <button onClick={() => editExperience(experience)} className="edit-button">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleExperienceDelete(experience.id)} className="delete-button">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="company-name">{experience.company}</h4>
                  <p className="item-description">{experience.description}</p>
                  
                  <div className="item-meta">
                    <span className="duration">{experience.duration}</span>
                    <span className="location">📍 {experience.location}</span>
                    <span className="contract-type">{experience.type}</span>
                    {experience.current_job && <span className="current">🟢 Actuel</span>}
                  </div>
                  
                  <div className="item-technologies">
                    {experience.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {experience.technologies.length > 3 && (
                      <span className="tech-more">+{experience.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour la gestion des technologies
const TechInput = ({ technologies, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(e);
  };

  return (
    <div className="tech-input">
      <form onSubmit={handleSubmit} className="tech-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une technologie..."
        />
        <button type="button" onClick={handleButtonClick}>+</button>
      </form>
      <div className="tech-list">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-item">
            {tech}
            <button onClick={() => onRemove(index)} className="tech-remove">×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Composant pour la gestion des réalisations
const AchievementInput = ({ achievements, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(e);
  };

  return (
    <div className="achievement-input">
      <form onSubmit={handleSubmit} className="achievement-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une réalisation..."
        />
        <button type="button" onClick={handleButtonClick}>+</button>
      </form>
      <div className="achievement-list">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <span>⭐ {achievement}</span>
            <button onClick={() => onRemove(index)} className="achievement-remove">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGestion;
