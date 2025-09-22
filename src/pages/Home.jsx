import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { User, Hand, Gamepad2, Mail, Rocket, Clock, Hammer } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [currentText, setCurrentText] = useState(0);
    const [stats, setStats] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [experiences, setExperiences] = useState([]);

    const texts = [
        "Spécialiste en développement web et mobile",
        "Créateur de solutions créatives",
        "Passionné de technologies",
        "Architecte digital moderne"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Récupérer les données personnelles et statistiques
        fetch('http://localhost:5000/api/personal')
            .then(res => res.json())
            .then(data => setPersonalInfo(data))
            .catch(err => console.error('Erreur lors du chargement des infos personnelles:', err));

        fetch('http://localhost:5000/api/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Erreur lors du chargement des stats:', err));

        fetch('http://localhost:5000/api/experiences')
            .then(res => res.json())
            .then(data => setExperiences(data))
            .catch(err => console.error('Erreur lors du chargement des expériences:', err));
    }, []);

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

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="floating-blocks">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`floating-block block-${i % 4 + 1}`}
                                initial={{ y: -100, rotation: 0 }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotation: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 3 + (i % 3),
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-avatar" variants={itemVariants}>
                        <div className="minecraft-character">
                            <div className="character-head">
                                <img src="/assets/minecraft-textures/steve.png" alt="Steve Minecraft" className="steve-character petit" />
                            </div>
                            <div className="character-body"></div>
                        </div>
                    </motion.div>

                    <motion.h1 className="hero-title" variants={itemVariants}>
                        Bonjour, je suis <span className="highlight">Abdelrahim Riche</span> <Hand className="wave-icon" size={32} />
                    </motion.h1>

                    <motion.div className="hero-subtitle" variants={itemVariants}>
                        <span className="typing-text">{texts[currentText]}</span>
                        <span className="cursor">|</span>
                    </motion.div>

                    <motion.p className="hero-description" variants={itemVariants}>
                        {personalInfo?.description || "Je conçois des solutions créatives qui dynamisent les marques et engagent les utilisateurs."}
                    </motion.p>

                    <motion.div className="hero-actions" variants={itemVariants}>
                        <motion.a
                            href="#projects"
                            className="cta-button primary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Gamepad2 className="cta-icon" size={20} />
                            Voir mes projets
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="cta-button secondary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail className="cta-icon" size={20} />
                            Me contacter
                        </motion.a>
                    </motion.div>

                    <motion.div className="hero-stats" variants={itemVariants}>
                        <div className="stat-item">
                            <Rocket className="stat-icon" size={32} />
                            <span className="stat-number">{stats?.projectsCompleted || "16"}</span>
                            <span className="stat-label">Projets Terminés</span>
                        </div>
                        <div className="stat-item">
                            <Clock className="stat-icon" size={32} />
                            <span className="stat-number">{stats?.experience || "3+"}</span>
                            <span className="stat-label">Années d'expérience</span>
                        </div>
                        <div className="stat-item">
                            <Hammer className="stat-icon" size={32} />
                            <span className="stat-number">{stats?.technologiesMastered || "28"}</span>
                            <span className="stat-label">Technologies Maîtrisées</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* About Section */}
            <section className="about-section" id="about">
                <motion.div
                    className="container"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">🧱 À propos de moi</h2>

                    <div className="about-content">
                        <motion.div
                            className="about-text"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                Spécialiste en développement web et mobile depuis plus de 3 ans,
                                je conçois des solutions créatives qui dynamisent les marques et
                                engagent les utilisateurs. Mon approche combine expertise technique
                                et vision créative pour créer des expériences digitales exceptionnelles.
                            </p>
                            <p>
                                Passionné par les nouvelles technologies, j'explore constamment
                                de nouveaux outils et frameworks. Avec 28 technologies maîtrisées
                                et 16 projets terminés, je m'adapte rapidement aux nouveaux
                                environnements et défis techniques.
                            </p>
                        </motion.div>

                        <motion.div
                            className="skills-grid"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className="skill-category">
                                <h4>🖥️ Frontend</h4>
                                <div className="skills">
                                    <span className="skill-tag">React</span>
                                    <span className="skill-tag">Vue.js</span>
                                    <span className="skill-tag">Angular</span>
                                    <span className="skill-tag">JavaScript</span>
                                    <span className="skill-tag">TypeScript</span>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>⚙️ Backend</h4>
                                <div className="skills">
                                    <span className="skill-tag">Node.js</span>
                                    <span className="skill-tag">Laravel</span>
                                    <span className="skill-tag">PHP</span>
                                    <span className="skill-tag">Express</span>
                                    <span className="skill-tag">Python</span>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>� Mobile</h4>
                                <div className="skills">
                                    <span className="skill-tag">React Native</span>
                                    <span className="skill-tag">Flutter</span>
                                    <span className="skill-tag">Ionic</span>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>🗄️ Base de données</h4>
                                <div className="skills">
                                    <span className="skill-tag">MongoDB</span>
                                    <span className="skill-tag">MySQL</span>
                                    <span className="skill-tag">PostgreSQL</span>
                                    <span className="skill-tag">Firebase</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Experience Timeline Section */}
            <section className="experience-section" id="experience">
                <motion.div
                    className="container"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">⚒️ Mon Parcours Professionnel</h2>

                    <div className="timeline">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={experience.id}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <div className="timeline-icon">
                                            <img src="/assets/minecraft-textures/craft.png" alt="Experience" />
                                        </div>
                                        <div className="timeline-date">{experience.duration}</div>
                                    </div>
                                    
                                    <div className="timeline-body">
                                        <h3 className="position">{experience.position}</h3>
                                        <h4 className="company">
                                            {experience.company}
                                            <span className="location">📍 {experience.location}</span>
                                        </h4>
                                        <span className="contract-type">{experience.type}</span>
                                        
                                        <p className="description">{experience.description}</p>
                                        
                                        <div className="technologies">
                                            <h5>🔧 Technologies utilisées :</h5>
                                            <div className="tech-tags">
                                                {experience.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="achievements">
                                            <h5>🏆 Réalisations principales :</h5>
                                            <ul>
                                                {experience.achievements.map((achievement, achIndex) => (
                                                    <li key={achIndex}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;