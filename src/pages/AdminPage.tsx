import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import HologramCard from '../components/galactic/HologramCard';
import AnimatedText from '../components/galactic/AnimatedText';
import { useProjects, useExperiences } from '../hooks/useAPI';
import type { Project, Experience } from '../types';

type TabType = 'projects' | 'experiences';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | Experience | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { 
    projects, 
    loading: projectsLoading, 
    refetch: refetchProjects,
    deleteProject 
  } = useProjects();
  
  const { 
    experiences, 
    loading: experiencesLoading, 
    refetch: refetchExperiences,
    deleteExperience 
  } = useExperiences();

  const loading = projectsLoading || experiencesLoading;

  const handleEdit = (item: Project | Experience) => {
    setEditingItem(item);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number, type: 'project' | 'experience') => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      if (type === 'project') {
        await deleteProject(id);
        refetchProjects();
      } else {
        await deleteExperience(id);
        refetchExperiences();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-4xl orbitron text-green-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🔐
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 orbitron"
            style={{
              color: '#10B981',
              textShadow: '0 0 20px rgba(16, 185, 129, 0.7), 0 0 40px rgba(59, 130, 246, 0.5)'
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            PANNEAU D'ADMINISTRATION
          </motion.h1>
          <div className="text-xl text-gray-300">
            <AnimatedText 
              text="🔐 Gestion de votre portfolio galactique 🌟"
              className="orbitron"
              delay={1200}
            />
          </div>
          
          {/* Test API Status */}
          <motion.div
            className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-400">Statut API:</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                  {loading ? 'Chargement...' : 'Connecté'}
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Projets: {projects.length}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Expériences: {experiences.length}</span>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex bg-gray-800/50 rounded-full p-2 backdrop-blur-md border border-gray-600/30">
            <button
              className={`px-6 py-3 rounded-full font-semibold orbitron transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projets ({projects.length})
            </button>
            <button
              className={`px-6 py-3 rounded-full font-semibold orbitron transition-all duration-300 ${
                activeTab === 'experiences'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('experiences')}
            >
              Expériences ({experiences.length})
            </button>
          </div>
        </motion.div>

        {/* Instructions d'utilisation */}
        <motion.div
          className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-blue-400 text-lg">💡</div>
            <div>
              <h3 className="text-blue-400 font-semibold mb-2">Guide d'utilisation</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Cliquez sur <strong>"Ajouter"</strong> pour créer un nouveau {activeTab === 'projects' ? 'projet' : 'expérience'}</li>
                <li>• Utilisez les icônes <strong>"✏️"</strong> pour modifier et <strong>"🗑️"</strong> pour supprimer</li>
                <li>• Les champs marqués d'un <strong>*</strong> sont obligatoires</li>
                <li>• Les modifications sont sauvegardées instantanément dans votre base de données</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Add Button */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-semibold text-white orbitron"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-6 h-6" />
            Ajouter {activeTab === 'projects' ? 'un Projet' : 'une Expérience'}
          </motion.button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <ProjectsAdmin 
              key="projects"
              projects={projects}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id, 'project')}
            />
          ) : (
            <ExperiencesAdmin 
              key="experiences"
              experiences={experiences}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id, 'experience')}
            />
          )}
        </AnimatePresence>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <FormModal
              type={activeTab}
              item={editingItem}
              isEditing={isEditing}
              onClose={closeForm}
              onSave={() => {
                refetchProjects();
                refetchExperiences();
                closeForm();
              }}
            />
          )}
        </AnimatePresence>

        {/* --- SECTION ADMIN DEVOIRS --- */}
        {/* SQL pour la table devoirs :
        CREATE TABLE devoirs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titre VARCHAR(255) NOT NULL,
          description TEXT,
          matiere VARCHAR(100),
          date_due DATE NOT NULL,
          rendu BOOL DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        */}
        <DevoirsAdmin />
      </div>
    </div>
  );
}

// Projects Admin Component
function ProjectsAdmin({ 
  projects, 
  onEdit, 
  onDelete 
}: { 
  projects: Project[], 
  onEdit: (project: Project) => void,
  onDelete: (id: number) => void 
}) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <HologramCard className="group h-full">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold orbitron text-white line-clamp-2">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => onEdit(project)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    onClick={() => onDelete(project.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </HologramCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Experiences Admin Component  
function ExperiencesAdmin({ 
  experiences, 
  onEdit, 
  onDelete 
}: { 
  experiences: Experience[], 
  onEdit: (experience: Experience) => void,
  onDelete: (id: number) => void 
}) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <HologramCard className="group">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <h3 className="font-bold orbitron text-white">
                  {experience.position}
                </h3>
                <p className="text-purple-300 font-semibold">
                  {experience.company}
                </p>
                <p className="text-gray-300 text-sm">
                  {experience.duration} • {experience.location}
                </p>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {experience.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <motion.button
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => onEdit(experience)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => onDelete(experience.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </HologramCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Form Modal Component
function FormModal({
  type,
  item,
  isEditing,
  onClose,
  onSave
}: {
  type: TabType,
  item: Project | Experience | null,
  isEditing: boolean,
  onClose: () => void,
  onSave: () => void
}) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const { createProject, updateProject } = useProjects();
  const { createExperience, updateExperience } = useExperiences();

  useEffect(() => {
    if (isEditing && item) {
      setFormData(item);
    } else {
      setFormData(type === 'projects' ? {
        title: '',
        description: '',
        technologies: [],
        github: '',
        demo: '',
        category: '',
        featured: false
      } : {
        company: '',
        position: '',
        duration: '',
        location: '',
        type: '',
        description: '',
        technologies: [],
        achievements: [],
        start_date: '',
        end_date: '',
        current_job: false
      });
    }
  }, [type, item, isEditing]);

  // Fonction pour nettoyer les données avant envoi
  const cleanData = (data: any) => {
    const cleaned = { ...data };
    
    // Convertir les chaînes vides en null pour les champs optionnels
    if (type === 'projects') {
      if (cleaned.github === '') cleaned.github = null;
      if (cleaned.demo === '') cleaned.demo = null;
      if (cleaned.image === '') cleaned.image = null;
    } else {
      // Pour les expériences
      if (cleaned.start_date === '') cleaned.start_date = null;
      if (cleaned.end_date === '') cleaned.end_date = null;
      // Si current_job est true, end_date doit être null
      if (cleaned.current_job) {
        cleaned.end_date = null;
      }
    }
    
    // S'assurer que les tableaux sont bien des tableaux
    if (cleaned.technologies && !Array.isArray(cleaned.technologies)) {
      cleaned.technologies = [];
    }
    if (cleaned.achievements && !Array.isArray(cleaned.achievements)) {
      cleaned.achievements = [];
    }
    
    // Nettoyer les tableaux des valeurs vides
    if (cleaned.technologies) {
      cleaned.technologies = cleaned.technologies.filter((tech: string) => tech && tech.trim() !== '');
    }
    if (cleaned.achievements) {
      cleaned.achievements = cleaned.achievements.filter((achievement: string) => achievement && achievement.trim() !== '');
    }
    
    return cleaned;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const cleanedData = cleanData(formData);
      
      if (type === 'projects') {
        if (isEditing && item) {
          await updateProject(item.id, cleanedData);
        } else {
          await createProject(cleanedData);
        }
      } else {
        if (isEditing && item) {
          await updateExperience(item.id, cleanedData);
        } else {
          await createExperience(cleanedData);
        }
      }
      onSave();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-gray-600/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold orbitron text-white">
            {isEditing ? 'Modifier' : 'Ajouter'} {type === 'projects' ? 'le projet' : 'l\'expérience'}
          </h2>
          <motion.button
            className="p-2 text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="space-y-4">
          {type === 'projects' ? (
            <ProjectForm formData={formData} setFormData={setFormData} />
          ) : (
            <ExperienceForm formData={formData} setFormData={setFormData} />
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <motion.button
            className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Annuler
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            <Save className="w-4 h-4 inline mr-2" />
            {loading ? 'Sauvegarde...' : (isEditing ? 'Mettre à jour' : 'Créer')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Composant de formulaire pour les projets
function ProjectForm({ 
  formData, 
  setFormData 
}: { 
  formData: any, 
  setFormData: (data: any) => void 
}) {
  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...(formData.technologies || [])];
    newTech[index] = value;
    setFormData({ ...formData, technologies: newTech });
  };

  const addTechnology = () => {
    const newTech = [...(formData.technologies || []), ''];
    setFormData({ ...formData, technologies: newTech });
  };

  const removeTechnology = (index: number) => {
    const newTech = (formData.technologies || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, technologies: newTech });
  };

  return (
    <div className="space-y-4">
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Titre du projet *
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Ex: Portfolio Galactique"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Description détaillée du projet..."
          required
        />
      </div>

      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Catégorie *
        </label>
        <select
          value={formData.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="web">Développement Web</option>
          <option value="mobile">Application Mobile</option>
          <option value="desktop">Application Desktop</option>
          <option value="fullstack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Technologies utilisées
        </label>
        <div className="space-y-2">
          {(formData.technologies || []).map((tech: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="Ex: React, TypeScript..."
              />
              <motion.button
                type="button"
                onClick={() => removeTechnology(index)}
                className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          ))}
          <motion.button
            type="button"
            onClick={addTechnology}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-600/30 rounded-lg text-gray-400 hover:text-white hover:border-gray-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Ajouter une technologie
          </motion.button>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          URL de l'image
        </label>
        <input
          type="url"
          value={formData.image || ''}
          onChange={(e) => handleInputChange('image', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="https://exemple.com/image.jpg"
        />
      </div>

      {/* Liens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Lien GitHub
          </label>
          <input
            type="url"
            value={formData.github || ''}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Lien Démo
          </label>
          <input
            type="url"
            value={formData.demo || ''}
            onChange={(e) => handleInputChange('demo', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            placeholder="https://demo.exemple.com"
          />
        </div>
      </div>

      {/* Projet mis en avant */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured || false}
          onChange={(e) => handleInputChange('featured', e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-800/50 border-gray-600/30 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-300">
          Projet mis en avant
        </label>
      </div>
    </div>
  );
}

// Composant de formulaire pour les expériences
function ExperienceForm({ 
  formData, 
  setFormData 
}: { 
  formData: any, 
  setFormData: (data: any) => void 
}) {
  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...(formData.technologies || [])];
    newTech[index] = value;
    setFormData({ ...formData, technologies: newTech });
  };

  const addTechnology = () => {
    const newTech = [...(formData.technologies || []), ''];
    setFormData({ ...formData, technologies: newTech });
  };

  const removeTechnology = (index: number) => {
    const newTech = (formData.technologies || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, technologies: newTech });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const addAchievement = () => {
    const newAchievements = [...(formData.achievements || []), ''];
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = (formData.achievements || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, achievements: newAchievements });
  };

  return (
    <div className="space-y-4">
      {/* Entreprise */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Entreprise *
        </label>
        <input
          type="text"
          value={formData.company || ''}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Ex: Google, Microsoft..."
          required
        />
      </div>

      {/* Poste */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Poste *
        </label>
        <input
          type="text"
          value={formData.position || ''}
          onChange={(e) => handleInputChange('position', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Ex: Développeur Full Stack"
          required
        />
      </div>

      {/* Type et Lieu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type de contrat
          </label>
          <select
            value={formData.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          >
            <option value="">Sélectionner un type</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Freelance">Freelance</option>
            <option value="Alternance">Alternance</option>
            <option value="Temps partiel">Temps partiel</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Lieu
          </label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            placeholder="Ex: Paris, France"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date de début *
          </label>
          <input
            type="date"
            value={formData.start_date || ''}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date de fin
          </label>
          <input
            type="date"
            value={formData.end_date || ''}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
            disabled={formData.current_job}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Durée */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Durée
        </label>
        <input
          type="text"
          value={formData.duration || ''}
          onChange={(e) => handleInputChange('duration', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Ex: 2 ans, 6 mois..."
        />
      </div>

      {/* Poste actuel */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="current_job"
          checked={formData.current_job || false}
          onChange={(e) => {
            handleInputChange('current_job', e.target.checked);
            if (e.target.checked) {
              handleInputChange('end_date', '');
            }
          }}
          className="w-4 h-4 text-blue-600 bg-gray-800/50 border-gray-600/30 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="current_job" className="text-sm font-medium text-gray-300">
          Poste actuel
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          placeholder="Décrivez vos missions et responsabilités..."
          required
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Technologies utilisées
        </label>
        <div className="space-y-2">
          {(formData.technologies || []).map((tech: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="Ex: React, Node.js..."
              />
              <motion.button
                type="button"
                onClick={() => removeTechnology(index)}
                className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          ))}
          <motion.button
            type="button"
            onClick={addTechnology}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-600/30 rounded-lg text-gray-400 hover:text-white hover:border-gray-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Ajouter une technologie
          </motion.button>
        </div>
      </div>

      {/* Réalisations */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Réalisations et accomplissements
        </label>
        <div className="space-y-2">
          {(formData.achievements || []).map((achievement: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="Ex: Amélioration des performances de 30%..."
              />
              <motion.button
                type="button"
                onClick={() => removeAchievement(index)}
                className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          ))}
          <motion.button
            type="button"
            onClick={addAchievement}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-600/30 rounded-lg text-gray-400 hover:text-white hover:border-gray-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Ajouter une réalisation
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// --- SECTION ADMIN DEVOIRS ---

// Types pour les devoirs
type Devoir = {
  id: number;
  titre: string;
  description?: string;
  matiere?: string;
  date_due: string; // ISO date
  rendu: boolean;
};

type DevoirForm = Omit<Devoir, 'id'>;

function DevoirsAdmin() {
  const [show, setShow] = useState(false);
  const [devoirs, setDevoirs] = useState<Devoir[]>([]);
  const [form, setForm] = useState<DevoirForm>({
    titre: '',
    description: '',
    matiere: '',
    date_due: '',
    rendu: false
  });
  const [loading, setLoading] = useState(false);

  // Simule l'API (à remplacer par fetch vers backend réel)
  const fetchDevoirs = async () => {
    setLoading(true);
    // Remplacer par API réelle
    setTimeout(() => {
      setDevoirs([
        { id: 1, titre: 'Projet React', matiere: 'Web', date_due: '2025-09-30', rendu: false },
        { id: 2, titre: 'Rapport SQL', matiere: 'BDD', date_due: '2025-09-20', rendu: true }
      ]);
      setLoading(false);
    }, 500);
  };

  const addDevoir = async () => {
    setLoading(true);
    // Remplacer par API réelle
    setTimeout(() => {
      setDevoirs(prev => [
        ...prev,
        { ...form, id: Date.now(), rendu: false }
      ]);
      setForm({ titre: '', description: '', matiere: '', date_due: '', rendu: false });
      setLoading(false);
    }, 500);
  };

  // Affiche la section cachée
  return (
    <div className="mt-12">
      <button
        className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold mb-4"
        onClick={() => { setShow(s => !s); if (!show) fetchDevoirs(); }}
      >
        {show ? 'Masquer les devoirs' : 'Section Admin Devoirs'}
      </button>
      {show && (
        <div className="bg-gray-900/80 border border-pink-500/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-pink-400 mb-6 orbitron">Mes Devoirs</h2>
          {/* Formulaire ajout devoir */}
          <form
            className="space-y-4 mb-8"
            onSubmit={e => { e.preventDefault(); addDevoir(); }}
          >
            <div>
              <label className="block text-sm text-gray-300 mb-1">Titre *</label>
              <input type="text" required value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Matière</label>
              <input type="text" value={form.matiere} onChange={e => setForm(f => ({ ...f, matiere: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Date à rendre *</label>
              <input type="date" required value={form.date_due} onChange={e => setForm(f => ({ ...f, date_due: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white" />
            </div>
            <button type="submit" className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold mt-2" disabled={loading}>
              {loading ? 'Ajout...' : 'Ajouter le devoir'}
            </button>
          </form>
          {/* Liste des devoirs */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-pink-400">Chargement...</div>
            ) : devoirs.length === 0 ? (
              <div className="text-gray-400">Aucun devoir enregistré.</div>
            ) : devoirs.map(d => (
              <div key={d.id} className={`p-4 rounded-lg border ${d.rendu ? 'border-green-500/40 bg-green-900/20' : 'border-pink-500/40 bg-pink-900/20'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg text-white">{d.titre}</div>
                    <div className="text-sm text-pink-300">{d.matiere}</div>
                    <div className="text-xs text-gray-400">À rendre le {d.date_due}</div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: d.rendu ? '#10B981' : '#EC4899', color: 'white' }}>
                    {d.rendu ? 'Rendu' : 'À faire'}
                  </div>
                </div>
                {d.description && <div className="mt-2 text-gray-300 text-sm">{d.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}