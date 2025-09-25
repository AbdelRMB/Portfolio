import { useState, useEffect } from 'react';
import { projectsAPI, experiencesAPI } from '../services/api';
import type { Project, Experience } from '../types';

// Hook pour gérer les projets
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      setError('Impossible de charger les projets');
      // Fallback avec données de démonstration si l'API échoue
      setProjects([
        {
          id: 4,
          title: 'CRM Still-Link',
          description: 'Développement d\'un CRM complet permettant la gestion de l\'entreprise Still-Link.\nIl permet la gestion de factures, devis, contracts et bien autres modules facilitant la gestion d\'entreprise.\nIl est également doté d\'outil permettant la gestion de client d\'employé et de stock.',
          technologies: ['React.JS', 'React.TS', 'NodeJS', 'Typescript', 'JavaScript', 'Express', 'Tailwind CSS'],
          image: '',
          github: '',
          demo: 'https://still-link.fr',
          category: 'Web Development',
          featured: true,
          created_at: '2025-09-22 09:30:00',
          updated_at: '2025-09-22 09:51:34'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newProject = await projectsAPI.create(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error('Erreur lors de la création du projet:', err);
      throw new Error('Impossible de créer le projet');
    }
  };

  const updateProject = async (id: number, projectData: Partial<Project>) => {
    try {
      const updatedProject = await projectsAPI.update(id, projectData);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du projet:', err);
      throw new Error('Impossible de mettre à jour le projet');
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await projectsAPI.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression du projet:', err);
      throw new Error('Impossible de supprimer le projet');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};

// Hook pour gérer les expériences
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await experiencesAPI.getAll();
      setExperiences(data);
    } catch (err) {
      console.error('Erreur lors du chargement des expériences:', err);
      setError('Impossible de charger les expériences');
      // Fallback avec données de démonstration
      setExperiences([
        {
          id: 1,
          company: 'Alyzia Groupe 3S',
          position: 'Chef de poste Coordinateur dégivrage',
          duration: '2022 - 2025',
          location: 'Aéroport Roissy CDG',
          type: 'Intérim',
          description: 'Chef de poste coordinateur dégivrage à l\'aéroport Roissy CDG.',
          technologies: [],
          achievements: [
            'Direction des opération de dégivrage sur Aéronef.',
            'Coordination et Gestion d\'équipe.',
            'Application de protocole spécifique.',
            'Gestion et organisation.'
          ],
          start_date: '2022-09-01',
          end_date: '2025-04-15',
          current_job: false,
          created_at: '2025-09-22 13:48:36',
          updated_at: '2025-09-22 13:48:36'
        },
        {
          id: 2,
          company: 'Iffen Formation',
          position: 'Développeur Web',
          duration: 'Avr 2024 - Juin 2024',
          location: 'Villeneuve-Saint-George',
          type: 'Stage',
          description: 'Stage Développeur Web dans le cadre de mes étude en BUT informatique 2.',
          technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'WordPress'],
          achievements: [
            'Création d\'un outil de conversion de fichier',
            'Maintenance de site internet',
            'optimisation de site internet'
          ],
          start_date: '2024-04-14',
          end_date: '2024-06-28',
          current_job: false,
          created_at: '2025-09-22 13:59:20',
          updated_at: '2025-09-22 13:59:20'
        },
        {
          id: 5,
          company: 'Still-Link',
          position: 'Développeur WEB/DevOps',
          duration: 'Juil 2025 - Août 2026',
          location: 'Tremblay-en-France',
          type: 'Alternance',
          description: 'Développeur en Alternance Chez Still-Link pour ma troisième année de BUT informatique.',
          technologies: ['React', 'JavaScript', 'TypeScript', 'SQL', 'Tailwind CSS', 'NodeJS', 'Express'],
          achievements: [
            'Maintenance de sites internet',
            'Optimisation de sites Internet',
            'Création et développement de CRM',
            'Gestion des automatisations via N8N',
            'Maintenance de Server VPS'
          ],
          start_date: '2025-07-01',
          end_date: '0000-00-00',
          current_job: true,
          created_at: '2025-09-22 14:24:51',
          updated_at: '2025-09-22 14:24:51'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createExperience = async (experienceData: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newExperience = await experiencesAPI.create(experienceData);
      setExperiences(prev => [...prev, newExperience]);
      return newExperience;
    } catch (err) {
      console.error('Erreur lors de la création de l\'expérience:', err);
      throw new Error('Impossible de créer l\'expérience');
    }
  };

  const updateExperience = async (id: number, experienceData: Partial<Experience>) => {
    try {
      const updatedExperience = await experiencesAPI.update(id, experienceData);
      setExperiences(prev => prev.map(e => e.id === id ? updatedExperience : e));
      return updatedExperience;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'expérience:', err);
      throw new Error('Impossible de mettre à jour l\'expérience');
    }
  };

  const deleteExperience = async (id: number) => {
    try {
      await experiencesAPI.delete(id);
      setExperiences(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'expérience:', err);
      throw new Error('Impossible de supprimer l\'expérience');
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience
  };
};