import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Hammer, User, Mail, Briefcase } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#home', icon: Home },
    { name: 'Projets', href: '#projects', icon: Hammer },
    { name: 'À propos', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  return (
    <motion.header 
      className="minecraft-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Briefcase className="logo-icon" />
          <span className="logo-text">Abdelrahim Riche</span>
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="desktop-nav">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="nav-item"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon className="nav-icon" size={20} />
              <span className="nav-text">{item.name}</span>
            </motion.a>
          ))}
        </nav>

        {/* Menu Burger Mobile */}
        <motion.button
          className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>

      {/* Navigation Mobile */}
      <motion.nav 
        className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="mobile-nav-item"
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              x: isMenuOpen ? 0 : -20 
            }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon className="nav-icon" size={20} />
            <span className="nav-text">{item.name}</span>
          </motion.a>
        ))}
      </motion.nav>
    </motion.header>
  );
};

export default Header;