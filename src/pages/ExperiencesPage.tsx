import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Trophy, RefreshCw, AlertCircle } from 'lucide-react';
import HologramCard from '../components/galactic/HologramCard';
import AnimatedText from '../components/galactic/AnimatedText';
import { useExperiences } from '../hooks/useAPI';

export default function ExperiencesPage() {
  const { experiences, loading, error, refetch } = useExperiences();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
          className="text-4xl orbitron text-purple-400 mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          💼
        </motion.div>
        <p className="text-gray-400 orbitron">Chargement des expériences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold orbitron text-red-400 mb-2">
            Erreur de Connexion
          </h2>
          <p className="text-gray-300 mb-6 max-w-md">
            {error} - Utilisation des données de démonstration.
          </p>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white orbitron"
            onClick={() => refetch()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 orbitron"
            style={{
              color: '#EC4899',
              textShadow: '0 0 20px rgba(236, 72, 153, 0.7), 0 0 40px rgba(168, 85, 247, 0.5)'
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            MES EXPÉRIENCES
          </motion.h1>
          <div className="text-xl text-gray-300">
            <AnimatedText 
              text="🚀 Mon parcours professionnel à travers les galaxies technologiques 💫"
              className="orbitron"
              delay={1200}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences
              .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
              .map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${
                      exp.current_job 
                        ? 'bg-green-400 border-green-300 shadow-lg shadow-green-400/50' 
                        : 'bg-blue-400 border-blue-300 shadow-lg shadow-blue-400/50'
                    }`}
                    animate={exp.current_job ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        '0 0 20px rgba(34, 197, 94, 0.5)',
                        '0 0 40px rgba(34, 197, 94, 0.8)',
                        '0 0 20px rgba(34, 197, 94, 0.5)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Experience card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? '' : 'md:mr-0'}`}>
                    <HologramCard 
                      className="group"
                      glowColor={exp.current_job ? 'rgb(34, 197, 94)' : 'rgb(168, 85, 247)'}
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="text-xl font-bold orbitron text-white group-hover:text-purple-400 transition-colors">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-2 text-purple-300 font-semibold mt-1">
                              <Building className="w-4 h-4" />
                              {exp.company}
                            </div>
                          </div>
                          {exp.current_job && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                              ✨ Actuel
                            </span>
                          )}
                        </div>

                        {/* Job details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Type badge */}
                        <div className="flex items-center gap-2">
                          <span className={`
                            px-3 py-1 rounded-full text-sm font-semibold
                            ${exp.type === 'Alternance' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                              exp.type === 'Stage' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                              'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            }
                          `}>
                            {exp.type}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        {exp.technologies.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-200 orbitron">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <motion.span
                                  key={i}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Achievements */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-200 orbitron flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            Réalisations:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                className="text-sm text-gray-300 flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.2) + (i * 0.1) }}
                              >
                                <span className="text-yellow-400 mt-1 text-xs">⭐</span>
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </HologramCard>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
          </div>
        </div>

        {experiences.length === 0 && (
          <motion.div
            className="text-center text-gray-400 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">💼</div>
            <p className="text-xl orbitron">Aucune expérience trouvée</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}