export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
  achievements: string[];
  start_date: string;
  end_date: string;
  current_job: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}