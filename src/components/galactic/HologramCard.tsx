import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface HologramCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
  size: number;
}

export default function HologramCard({ 
  children, 
  className = '', 
  glowColor = 'rgb(59, 130, 246)' 
}: HologramCardProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const particleId = useRef(0);

  const colors = ['#60A5FA', '#A855F7', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    // Créer des particules à la position de la souris
    const newParticles: Particle[] = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        size: Math.random() * 8 + 4
      });
    }
    
    setParticles(prev => [...prev.slice(-20), ...newParticles]);
  };

  // Animer les particules
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          opacity: particle.opacity - 0.02,
          size: particle.size * 0.98
        })).filter(particle => particle.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative backdrop-blur-md bg-gradient-to-br from-blue-900/20 to-purple-900/20 
        border border-blue-400/30 rounded-xl p-6 overflow-hidden ${className}
      `}
      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{
        boxShadow: `
          0 0 20px ${glowColor}40,
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: `linear-gradient(45deg, ${glowColor}20, transparent, ${glowColor}20)`,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: glowColor }}
        animate={{
          y: [0, 200, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
      
      {/* Particules lumineuses au survol de la souris */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}80, 0 0 ${particle.size * 4}px ${particle.color}40`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Effet de lueur autour du curseur */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePos.x - 50,
          top: mousePos.y - 50,
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${colors[Math.floor(Date.now() / 200) % colors.length]}30 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: particles.length > 0 ? 0.6 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}