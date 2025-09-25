import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, FolderOpen, Menu, X } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Accueil', href: '/' },
  { icon: User, label: 'À propos', href: '/about' },
  { icon: FolderOpen, label: 'Projets', href: '/projects' },
  { icon: Briefcase, label: 'Expériences', href: '/experiences' },
];

export default function GalacticNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Déterminer l'item actif basé sur l'URL actuelle
  const getActiveItem = () => {
    switch (location.pathname) {
      case '/': return 'Accueil';
      case '/about': return 'À propos';
      case '/projects': return 'Projets';
      case '/experiences': return 'Expériences';
      case '/admin': return 'Admin';
      default: return 'Accueil';
    }
  };
  
  const activeItem = getActiveItem();

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="backdrop-blur-md bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/30 rounded-full px-6 py-3"
          style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <ul className="flex items-center space-x-8">
            {navItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  className={`
                    group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 relative
                    ${activeItem === label 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                    }
                  `}
                >
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium orbitron">{label}</span>
                  </motion.div>
                  {activeItem === label && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 md:hidden p-3 backdrop-blur-md bg-blue-900/30 border border-blue-400/30 rounded-full text-blue-400"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div 
          className="absolute inset-0 backdrop-blur-sm bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        <motion.div
          className="absolute top-20 right-6 backdrop-blur-md bg-gradient-to-b from-blue-900/40 to-purple-900/40 border border-blue-400/30 rounded-2xl p-6"
          initial={{ scale: 0.8, opacity: 0, x: 100 }}
          animate={{ 
            scale: isOpen ? 1 : 0.8, 
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : 100
          }}
          transition={{ duration: 0.3, type: "spring" }}
          style={{
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
          }}
        >
          <ul className="space-y-4">
            {navItems.map(({ icon: Icon, label, href }, index) => (
              <motion.li
                key={label}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: isOpen ? 0 : 50, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={href}
                  className="group flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium orbitron">{label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </>
  );
}