import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Download, Rocket } from 'lucide-react';
import AnimatedText from '../components/galactic/AnimatedText';
import HologramCard from '../components/galactic/HologramCard';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4">
      {/* Hero Section */}
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Title */}
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-4 orbitron"
          style={{
            color: '#60A5FA',
            textShadow: '0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
            animation: 'titleGlow 3s ease-in-out infinite alternate'
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: "easeOut"
          }}
        >
          ABDELRAHIM RICHE
        </motion.h1>
        
        {/* Animated Role */}
        <div className="text-xl md:text-2xl mb-8 text-gray-300">
          <AnimatedText 
            text="🚀 Développeur Web Full-Stack | DevOps Enthusiast 🌌"
            className="orbitron"
            delay={1500}
          />
        </div>

        {/* Holographic Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <HologramCard glowColor="rgb(168, 85, 247)">
            <p className="text-lg text-gray-200 leading-relaxed">
              Étudiant en <span className="text-purple-400 font-semibold">BUT Informatique</span> passionné par le développement web moderne.
              Actuellement en alternance chez <span className="text-blue-400 font-semibold">Still-Link</span> en tant que développeur Full-Stack & DevOps.
            </p>
          </HologramCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <Link to="/projects">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Voir mes projets
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          
          <motion.button
            className="group px-8 py-4 border-2 border-blue-400 rounded-xl font-semibold text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Télécharger CV
            </span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          {[
            { icon: Github, href: "https://github.com/AbdelRMB", label: "GitHub", color: "hover:text-gray-300" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/abdelrahim-riche-504a88256/", label: "LinkedIn", color: "hover:text-blue-400" },
            { icon: Mail, href: "mailto:", label: "Email", color: "hover:text-purple-400" }
          ].map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              className={`p-3 rounded-full border border-gray-600 text-gray-400 transition-all duration-300 ${color} hover:border-current hover:bg-current/10`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-blue-400/30 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity }
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 border border-purple-400/30 rounded-xl"
        animate={{
          rotate: -360,
          y: [-10, 10, -10]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity }
        }}
      />
    </div>
  );
}