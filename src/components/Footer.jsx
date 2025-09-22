import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: '⚡', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Discord', icon: '🎮', url: 'https://discord.com' },
    { name: 'Email', icon: '📧', url: 'mailto:contact@portfolio.com' }
  ];

  return (
    <motion.footer 
      className="minecraft-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">🧱 Portfolio Minecraft</h3>
          <p className="footer-description">
            Un portfolio créé avec passion, inspiré de l'univers Minecraft.
            Construit avec React, Node.js et beaucoup de créativité !
          </p>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Liens Rapides</h4>
          <ul className="footer-links">
            <li><a href="#home">🏠 Accueil</a></li>
            <li><a href="#projects">⚒️ Projets</a></li>
            <li><a href="#about">👤 À propos</a></li>
            <li><a href="#contact">📧 Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Technologies</h4>
          <div className="tech-grid">
            <span className="tech-item">⚛️ React</span>
            <span className="tech-item">🟢 Node.js</span>
            <span className="tech-item">🎨 CSS3</span>
            <span className="tech-item">⚡ Vite</span>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="section-title">Réseaux</h4>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        className="footer-bottom"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Portfolio Minecraft. Crafted with ❤️ et beaucoup de ☕
          </p>
          <p className="minecraft-quote">
            "Imagine it, Build it, Code it!" - Steve, probablement
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;