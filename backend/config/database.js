const mysql = require('mysql2/promise');

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Créer le pool de connexions
const pool = mysql.createPool(dbConfig);

// Fonction pour initialiser la base de données
async function initializeDatabase() {
  try {
    // Créer la base de données si elle n'existe pas
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.end();

    // Créer les tables
    await createTables();
    console.log('✅ Base de données initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Fonction pour créer les tables
async function createTables() {
  const connection = await pool.getConnection();
  
  try {
    // Table des projets
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies JSON NOT NULL,
        image VARCHAR(255),
        github VARCHAR(255),
        demo VARCHAR(255),
        category VARCHAR(100) NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Table des expériences professionnelles
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        duration VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        technologies JSON NOT NULL,
        achievements JSON NOT NULL,
        start_date DATE,
        end_date DATE,
        current_job BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tables créées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la création des tables:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Fonction pour insérer les données par défaut
async function insertDefaultData() {
  const connection = await pool.getConnection();
  
  try {
    // Vérifier si des données existent déjà
    const [projectRows] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    const [experienceRows] = await connection.execute('SELECT COUNT(*) as count FROM experiences');
    
    if (projectRows[0].count === 0) {
      // Insérer les projets par défaut
      const defaultProjects = [
        {
          title: "Portfolio Web Moderne",
          description: "Portfolio personnel responsive avec animations et design moderne",
          technologies: JSON.stringify(["React", "Vite", "CSS3", "JavaScript"]),
          image: "/images/portfolio-project.svg",
          github: "https://github.com/AbdelRMB/portfolio",
          demo: "https://abdelrahimriche.com",
          category: "Web Development",
          featured: true
        },
        {
          title: "Application Mobile E-commerce",
          description: "Application mobile complète pour la vente en ligne avec système de paiement",
          technologies: JSON.stringify(["React Native", "Node.js", "MongoDB", "Express"]),
          image: "/images/ecommerce-mobile.svg",
          github: "https://github.com/AbdelRMB/ecommerce-mobile",
          demo: "https://demo-ecommerce.app",
          category: "Mobile Development",
          featured: true
        },
        {
          title: "Système de Gestion Scolaire",
          description: "Plateforme complète de gestion pour établissements scolaires",
          technologies: JSON.stringify(["Vue.js", "Laravel", "MySQL", "Bootstrap"]),
          image: "/images/school-management.svg",
          github: "https://github.com/AbdelRMB/school-management",
          demo: "https://school-demo.com",
          category: "Web Development",
          featured: false
        }
      ];

      for (const project of defaultProjects) {
        await connection.execute(`
          INSERT INTO projects (title, description, technologies, image, github, demo, category, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [project.title, project.description, project.technologies, project.image, project.github, project.demo, project.category, project.featured]);
      }
    }
    
    if (experienceRows[0].count === 0) {
      // Insérer les expériences par défaut
      const defaultExperiences = [
        {
          company: "TechCorp Solutions",
          position: "Développeur Full Stack Senior",
          duration: "2023 - Présent",
          location: "Paris, France",
          type: "CDI",
          description: "Développement d'applications web et mobile complexes. Lead technique sur plusieurs projets stratégiques avec des équipes internationales.",
          technologies: JSON.stringify(["React", "Node.js", "MongoDB", "AWS", "Docker"]),
          achievements: JSON.stringify([
            "Architecture et développement d'une plateforme e-commerce gérant 50k+ utilisateurs",
            "Réduction de 40% du temps de chargement des applications",
            "Mentoring de 3 développeurs junior"
          ]),
          start_date: "2023-01-01",
          current_job: true
        },
        {
          company: "Digital Innovations",
          position: "Développeur Web & Mobile",
          duration: "2022 - 2023",
          location: "Lyon, France",
          type: "CDD",
          description: "Conception et développement d'applications mobiles natives et web responsives pour des clients dans différents secteurs.",
          technologies: JSON.stringify(["React Native", "Vue.js", "Laravel", "MySQL"]),
          achievements: JSON.stringify([
            "Développement de 8 applications mobiles publiées sur les stores",
            "Implementation de systèmes de paiement sécurisés",
            "Amélioration de l'expérience utilisateur de 60%"
          ]),
          start_date: "2022-01-01",
          end_date: "2023-01-01",
          current_job: false
        }
      ];

      for (const experience of defaultExperiences) {
        await connection.execute(`
          INSERT INTO experiences (company, position, duration, location, type, description, technologies, achievements, start_date, end_date, current_job)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [experience.company, experience.position, experience.duration, experience.location, experience.type, experience.description, experience.technologies, experience.achievements, experience.start_date, experience.end_date, experience.current_job]);
      }
    }

    console.log('✅ Données par défaut insérées');
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des données par défaut:', error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  initializeDatabase,
  insertDefaultData
};