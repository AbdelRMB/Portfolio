import { motion } from 'framer-motion';
import { Code, Star, Rocket, Brain, Heart, Zap } from 'lucide-react';
import AnimatedText from '../components/galactic/AnimatedText';
import HologramCard from '../components/galactic/HologramCard';

export default function AboutPage() {
  const skills = [
    { name: 'React TypeScript || React JavaScript', level: 90, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
    { name: 'Node.js & Express', level: 85, color: 'from-green-500 to-emerald-500', icon: '🟢' },
    { name: 'PHP & WordPress', level: 80, color: 'from-purple-500 to-violet-500', icon: '🐘' },
    { name: 'DevOps & Docker', level: 75, color: 'from-orange-500 to-red-500', icon: '🐳' },
    { name: 'Base de données', level: 85, color: 'from-yellow-500 to-amber-500', icon: '🗄️' },
    { name: 'UI/UX Design', level: 95, color: 'from-pink-500 to-rose-500', icon: '🎨' },
    { name: 'Java', level: 70, color: 'from-red-500 to-yellow-500', icon: '☕' },
    { name: 'Python', level: 70, color: 'from-blue-400 to-blue-600', icon: '🐍' },
    { name: 'C', level: 50, color: 'from-gray-400 to-gray-600', icon: '💻' },
    { name: 'Linux & SysAdmin', level: 80, color: 'from-green-400 to-green-600', icon: '🐧' },
  ];

  const values = [
    { 
      icon: Code, 
      title: 'Innovation', 
      description: 'Toujours à la recherche des dernières technologies et des meilleures pratiques de développement.',
      color: 'text-blue-400'
    },
    { 
      icon: Rocket, 
      title: 'Performance', 
      description: 'Optimisation constante pour des applications rapides et efficaces.',
      color: 'text-purple-400'
    },
    { 
      icon: Brain, 
      title: 'Apprentissage', 
      description: 'Passion pour l\'apprentissage continu et le partage de connaissances.',
      color: 'text-green-400'
    },
    { 
      icon: Heart, 
      title: 'Passion', 
      description: 'Développement avec passion et attention aux détails.',
      color: 'text-red-400'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 orbitron"
            style={{
              color: '#3B82F6',
              textShadow: '0 0 20px rgba(59, 130, 246, 0.7), 0 0 40px rgba(6, 182, 212, 0.5)'
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            À PROPOS DE MOI
          </motion.h1>
          <div className="text-xl text-gray-300">
            <AnimatedText 
              text="🚀 Développeur passionné naviguant dans l'univers technologique 🌌"
              className="orbitron"
              delay={1200}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HologramCard glowColor="rgb(59, 130, 246)">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    👨‍💻
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold orbitron text-white">Abdelrahim Riche</h2>
                    <p className="text-blue-400 font-semibold">Développeur Full-Stack</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Étudiant passionné en <span className="text-purple-400 font-semibold">BUT Informatique</span>, 
                    actuellement en alternance chez <span className="text-blue-400 font-semibold">Still-Link</span>  
                    en tant que développeur Full-Stack et DevOps.
                  </p>
                  
                  <p>
                    Mon parcours m'a mené à travers différents univers technologiques, 
                    de l'aéronautique avec Alyzia Groupe 3S à l'innovation web avec Still-Link, 
                    en passant par des expériences enrichissantes chez Iffen Formation et I-Oasis.
                  </p>
                  
                  <p>
                    Passionné par les <span className="text-green-400 font-semibold">technologies modernes</span>, 
                    j'aime créer des solutions innovantes qui repoussent les limites du possible. 
                    Mon expertise couvre le développement web, les automatisations, et l'administration système.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {['Créatif', 'Rigoureux', 'Curieux', 'Collaboratif'].map((trait, index) => (
                    <motion.span
                      key={trait}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </HologramCard>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HologramCard glowColor="rgb(168, 85, 247)">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold orbitron text-white flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Compétences Techniques
                </h2>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HologramCard>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold orbitron text-white mb-4 flex items-center justify-center gap-3">
              <Star className="w-10 h-10 text-yellow-400" />
              Mes Valeurs
            </h2>
            <p className="text-gray-300 text-lg">Les principes qui guident mon approche du développement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <HologramCard className="h-full text-center group">
                  <div className="space-y-4">
                    <motion.div
                      className={`${value.color} mx-auto w-16 h-16 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <value.icon className="w-8 h-8" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold orbitron text-white group-hover:text-purple-400 transition-colors">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </HologramCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <HologramCard glowColor="rgb(34, 197, 94)" className="text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold orbitron text-white">
                🎯 Fun Facts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-bold text-blue-400 orbitron">5+</div>
                  <p className="text-gray-300">Projets réalisés</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-bold text-purple-400 orbitron">3</div>
                  <p className="text-gray-300">Années d'expérience</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-bold text-green-400 orbitron">∞</div>
                  <p className="text-gray-300">Passion pour apprendre</p>
                </motion.div>
              </div>
              
              <motion.p 
                className="text-gray-300 italic mt-6"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "Le code, c'est de la poésie que les machines peuvent comprendre" 🚀
              </motion.p>
            </div>
          </HologramCard>
        </motion.div>
      </div>
    </div>
  );
}