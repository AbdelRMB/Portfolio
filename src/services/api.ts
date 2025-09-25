import type { Experience, Project } from '../types';

const API_BASE_URL = 'https://api.abdelrahimriche.com';

// Configuration par défaut pour fetch
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Timeout pour les requêtes
const TIMEOUT_MS = 10000; // 10 secondes

// Helper function pour créer une requête avec timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log(`🚀 API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    console.log(`✅ API Response: ${response.status} ${url}`);
    
    if (!response.ok) {
      // Gestion des erreurs spécifiques
      if (response.status === 404) {
        console.warn('⚠️ Ressource non trouvée');
      } else if (response.status >= 500) {
        console.error('🔥 Erreur serveur');
      }
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('⏰ Timeout de la requête');
      throw new Error('Request timeout');
    }
    
    console.error('❌ Request Error:', error);
    throw error;
  }
};

// Helper function pour les requêtes API
const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithTimeout(url, options);
  return response.json();
};

// Projects API
export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    return apiRequest<Project[]>('/api/projects');
  },
  
  getById: async (id: number): Promise<Project> => {
    return apiRequest<Project>(`/api/projects/${id}`);
  },
  
  create: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
    return apiRequest<Project>('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },
  
  update: async (id: number, project: Partial<Project>): Promise<Project> => {
    return apiRequest<Project>(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },
  
  delete: async (id: number): Promise<void> => {
    await fetchWithTimeout(`${API_BASE_URL}/api/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Experiences API
export const experiencesAPI = {
  getAll: async (): Promise<Experience[]> => {
    return apiRequest<Experience[]>('/api/experiences');
  },
  
  getById: async (id: number): Promise<Experience> => {
    return apiRequest<Experience>(`/api/experiences/${id}`);
  },
  
  create: async (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<Experience> => {
    return apiRequest<Experience>('/api/admin/experiences', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  },
  
  update: async (id: number, experience: Partial<Experience>): Promise<Experience> => {
    return apiRequest<Experience>(`/api/admin/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experience),
    });
  },
  
  delete: async (id: number): Promise<void> => {
    await fetchWithTimeout(`${API_BASE_URL}/api/admin/experiences/${id}`, {
      method: 'DELETE',
    });
  },
};

// API pour les informations personnelles
export const personalAPI = {
  get: async () => {
    return apiRequest('/api/personal');
  },
};

// API pour les compétences
export const skillsAPI = {
  get: async () => {
    return apiRequest('/api/skills');
  },
};

// API pour les statistiques
export const statsAPI = {
  get: async () => {
    return apiRequest('/api/stats');
  },
};