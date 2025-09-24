import { useState } from 'react';
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
    <header className="minecraft-header">
      <div className="header-container">
        <div className="logo">
          <Briefcase className="logo-icon" />
          <span className="logo-text">Abdelrahim Riche</span>
        </div>

        {/* Navigation Desktop */}
        <nav className="desktop-nav">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-item"
            >
              <item.icon className="nav-icon" size={20} />
              <span className="nav-text">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Menu Burger Mobile */}
        <button
          className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Navigation Mobile */}
      <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        {navItems.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            className="mobile-nav-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <item.icon className="nav-icon" size={20} />
            <span className="nav-text">{item.name}</span>
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;