const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { pool, initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Fonction helper pour parser JSON de manière sécurisée
function safeJSONParse(jsonString, defaultValue = []) {
  // Si c'est déjà un tableau, le retourner directement
  if (Array.isArray(jsonString)) {
    return jsonString;
  }
  
  // Si c'est null, undefined, ou chaîne vide
  if (!jsonString || jsonString === 'null' || jsonString === 'undefined') {
    return defaultValue;
  }
  
  // Si c'est un objet, essayer de l'extraire
  if (typeof jsonString === 'object') {
    return Object.values(jsonString).filter(item => item && typeof item === 'string');
  }
  
  // Si c'est une chaîne, essayer de la parser
  if (typeof jsonString === 'string') {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (typeof parsed === 'object' && parsed !== null) {
        return Object.values(parsed).filter(item => item && typeof item === 'string');
      }
    } catch (error) {
      // Si ça échoue, essayer de la traiter comme une chaîne simple
      return jsonString.split(',').map(s => s.trim()).filter(s => s);
    }
  }
  
  return defaultValue;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Données personnelles d'Abdelrahim Riche
const personalInfo = {
  name: "Abdelrahim Riche",
  title: "Spécialiste en développement web et mobile",
  description: "Je conçois des solutions créatives qui dynamisent les marques et engagent les utilisateurs.",
  experience: "3+",
  projectsCompleted: "16",
  technologiesMastered: "28",
  githubContributions: "100+",
  github: "https://github.com/AbdelRMB",
  website: "https://abdelrahimriche.com",
  email: "richeabdelrahim1@gmail.com"
};

// Compétences techniques
const skills = {
  frontend: ["React", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Sass", "Tailwind CSS"],
  backend: ["Node.js", "Express", "Laravel", "PHP", "Python", "Java"],
  database: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
  mobile: ["React Native", "Flutter", "Ionic"],
  tools: ["Git", "Docker", "AWS", "Figma", "VS Code", "Postman"],
  other: ["REST API", "GraphQL", "Socket.io", "PWA", "SEO", "Responsive Design"]
};

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Abdelrahim Riche is running!' });
});

app.get('/api/personal', (req, res) => {
  res.json(personalInfo);
});

// Routes pour les projets (depuis la base de données)
app.get('/api/projects', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM projects';
    const params = [];
    
    if (category || featured) {
      query += ' WHERE';
      const conditions = [];
      
      if (category) {
        conditions.push(' category = ?');
        params.push(category);
      }
      
      if (featured === 'true') {
        conditions.push(' featured = 1');
      }
      
      query += conditions.join(' AND');
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.execute(query, params);
    
    // Parser les JSON pour technologies avec vérification
    const projects = rows.map(project => ({
      ...project,
      technologies: safeJSONParse(project.technologies, []),
      featured: Boolean(project.featured)
    }));
    
    res.json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const project = {
      ...rows[0],
      technologies: safeJSONParse(rows[0].technologies, []),
      featured: Boolean(rows[0].featured)
    };
    
    res.json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Routes pour les expériences (depuis la base de données)
app.get('/api/experiences', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM experiences ORDER BY start_date DESC');
    
    // Parser les JSON pour technologies et achievements avec vérification
    const experiences = rows.map(experience => ({
      ...experience,
      technologies: safeJSONParse(experience.technologies, []),
      achievements: safeJSONParse(experience.achievements, []),
      current_job: Boolean(experience.current_job)
    }));
    
    res.json(experiences);
  } catch (error) {
    console.error('Erreur lors de la récupération des expériences:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

// Route pour les statistiques
app.get('/api/stats', async (req, res) => {
  try {
    const [projectCount] = await pool.execute('SELECT COUNT(*) as count FROM projects');
    const [featuredCount] = await pool.execute('SELECT COUNT(*) as count FROM projects WHERE featured = 1');
    
    res.json({
      experience: personalInfo.experience,
      projectsCompleted: projectCount[0].count.toString(),
      technologiesMastered: personalInfo.technologiesMastered,
      githubContributions: personalInfo.githubContributions,
      totalProjects: projectCount[0].count,
      featuredProjects: featuredCount[0].count
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Routes CRUD pour l'administration

// CRUD Projets
app.post('/api/admin/projects', async (req, res) => {
  try {
    const { title, description, technologies, image, github, demo, category, featured } = req.body;
    
    // S'assurer que technologies est un tableau et le stringifier proprement
    const techArray = Array.isArray(technologies) ? technologies : [];
    const techString = JSON.stringify(techArray);
    
    const [result] = await pool.execute(`
      INSERT INTO projects (title, description, technologies, image, github, demo, category, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description, techString, image, github, demo, category, featured || false]);
    
    res.status(201).json({ id: result.insertId, message: 'Projet créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/api/admin/projects/:id', async (req, res) => {
  try {
    const { title, description, technologies, image, github, demo, category, featured } = req.body;
    
    // S'assurer que technologies est un tableau et le stringifier proprement
    const techArray = Array.isArray(technologies) ? technologies : [];
    const techString = JSON.stringify(techArray);
    
    const [result] = await pool.execute(`
      UPDATE projects 
      SET title = ?, description = ?, technologies = ?, image = ?, github = ?, demo = ?, category = ?, featured = ?
      WHERE id = ?
    `, [title, description, techString, image, github, demo, category, featured || false, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json({ message: 'Projet mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CRUD Expériences
app.post('/api/admin/experiences', async (req, res) => {
  try {
    const { company, position, duration, location, type, description, technologies, achievements, start_date, end_date, current_job } = req.body;
    
    const [result] = await pool.execute(`
      INSERT INTO experiences (company, position, duration, location, type, description, technologies, achievements, start_date, end_date, current_job)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [company, position, duration, location, type, description, JSON.stringify(technologies), JSON.stringify(achievements), start_date, end_date, current_job || false]);
    
    res.status(201).json({ id: result.insertId, message: 'Expérience créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'expérience:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/api/admin/experiences/:id', async (req, res) => {
  try {
    const { company, position, duration, location, type, description, technologies, achievements, start_date, end_date, current_job } = req.body;
    
    const [result] = await pool.execute(`
      UPDATE experiences 
      SET company = ?, position = ?, duration = ?, location = ?, type = ?, description = ?, technologies = ?, achievements = ?, start_date = ?, end_date = ?, current_job = ?
      WHERE id = ?
    `, [company, position, duration, location, type, description, JSON.stringify(technologies), JSON.stringify(achievements), start_date, end_date, current_job || false, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Expérience non trouvée' });
    }
    
    res.json({ message: 'Expérience mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'expérience:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.delete('/api/admin/experiences/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM experiences WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Expérience non trouvée' });
    }
    
    res.json({ message: 'Expérience supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'expérience:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Initialiser la base de données au démarrage
async function startServer() {
  try {
    await initializeDatabase();
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Démarrer le serveur
startServer();