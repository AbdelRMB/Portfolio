import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook pour précharger les ressources et améliorer les performances
export const usePagePreload = () => {
  const location = useLocation();

  useEffect(() => {
    // Optimisations basées sur la page actuelle
    switch (location.pathname) {
      case '/':
        // Page d'accueil - optimisations spécifiques
        document.title = 'Abdelrahim Riche - Portfolio Galactique';
        break;
      case '/projects':
        // Page projets
        document.title = 'Projets - Abdelrahim Riche';
        break;
      case '/about':
        // Page à propos
        document.title = 'À propos - Abdelrahim Riche';
        break;
      case '/experiences':
        // Page expériences
        document.title = 'Expériences - Abdelrahim Riche';
        break;
      case '/admin':
        // Page admin
        document.title = 'Administration - Abdelrahim Riche';
        break;
      default:
        document.title = 'Abdelrahim Riche - Portfolio';
        break;
    }

    // Ajout d'une classe CSS pour indiquer que la page est chargée
    document.body.classList.add('page-loaded');
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, [location.pathname]);
};

// Hook pour gérer les états de chargement
export const useLoadingState = () => {
  useEffect(() => {
    // Masquer le loader une fois que tout est chargé
    const handleLoad = () => {
      document.body.classList.add('app-loaded');
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
};