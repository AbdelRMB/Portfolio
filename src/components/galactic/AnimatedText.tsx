import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Vérifier si cette animation a déjà été vue
    const animationKey = `animated-text-${text}`;
    const hasBeenAnimated = sessionStorage.getItem(animationKey);

    if (hasBeenAnimated) {
      // Afficher directement le texte complet si déjà animé
      setDisplayedText(text);
      setIsComplete(true);
      setIsStarted(true);
      return;
    }

    // Sinon, faire l'animation normale
    setDisplayedText('');
    setCurrentIndex(0);
    setIsStarted(false);
    setIsComplete(false);

    // Démarrer l'animation après le délai initial
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (isStarted && currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        const nextChar = text[currentIndex];
        setDisplayedText(prev => prev + nextChar);
        setCurrentIndex(prev => prev + 1);
        
        // Marquer comme terminé si c'est le dernier caractère
        if (currentIndex === text.length - 1) {
          setIsComplete(true);
          // Marquer comme ayant été animé
          const animationKey = `animated-text-${text}`;
          sessionStorage.setItem(animationKey, 'true');
        }
      }, 50); // Vitesse constante de frappe

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isStarted, isComplete]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {isStarted && !isComplete && (
        <motion.span
          className="inline-block w-0.5 bg-blue-400 ml-1"
          style={{ height: '1em' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}
    </motion.div>
  );
}