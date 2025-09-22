/* Contact Section Component */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Globe, Github, Send, Briefcase } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    // Récupérer les informations personnelles
    fetch('http://localhost:5000/api/personal')
      .then(res => res.json())
      .then(data => setPersonalInfo(data))
      .catch(err => console.error('Erreur lors du chargement des infos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (remplacer par vraie logique)
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Mail className="contact-title-icon" size={32} />
          Contactez-moi !
        </motion.h2>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>
              <Briefcase className="section-icon" size={24} />
              Démarrons une collaboration !
            </h3>
            <p>
              Vous avez une question, un projet ou souhaitez simplement discuter ? 
              Envoyez-moi un message en utilisant le formulaire ci-dessous ou 
              contactez-moi directement via mes réseaux.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <Mail className="method-icon" size={24} />
                <div className="method-info">
                  <h4>Email</h4>
                  <p>{personalInfo?.email || 'contact@abdelrahimriche.com'}</p>
                </div>
              </div>
              
              <div className="contact-method">
                <Globe className="method-icon" size={24} />
                <div className="method-info">
                  <h4>Site Web</h4>
                  <p>{personalInfo?.website || 'abdelrahimriche.com'}</p>
                </div>
              </div>
              
              <div className="contact-method">
                <Github className="method-icon" size={24} />
                <div className="method-info">
                  <h4>GitHub</h4>
                  <p>{personalInfo?.github?.replace('https://github.com/', '') || 'AbdelRMB'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <label htmlFor="name">👤 Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="minecraft-input"
                placeholder="Votre nom complet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">� Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="minecraft-input"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">📝 Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="minecraft-input"
                placeholder="Objet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">💬 Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="minecraft-input"
                placeholder="Décrivez votre projet ou posez votre question..."
              />
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-blocks">
                    <span></span><span></span><span></span>
                  </span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Envoyer le message
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message envoyé avec succès ! Je vous répondrai bientôt !
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;