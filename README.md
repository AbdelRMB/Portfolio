# 💼 Portfolio Abdelrahim Riche - Minecraft Theme

Un portfolio moderne avec un thème Minecraft épique, présentant les projets et compétences d'**Abdelrahim Riche**, spécialiste en développement web et mobile.

![Portfolio Abdelrahim Riche](./public/assets/minecraft-portfolio-preview.png)

## 👨‍💻 À propos

**Abdelrahim Riche** est un spécialiste en développement web et mobile avec plus de 3 ans d'expérience. Il conçoit des solutions créatives qui dynamisent les marques et engagent les utilisateurs.

### 📊 Statistiques
- **3+** années d'expérience
- **16** projets terminés  
- **28** technologies maîtrisées
- **100+** contributions GitHub

## 🎮 Fonctionnalités

- **Design Minecraft immersif** avec animations de blocs flottants
- **Interface responsive** adaptée à tous les écrans
- **Animations fluides** avec Framer Motion
- **API Node.js** pour la gestion des projets réels
- **Style inventaire Minecraft** pour l'affichage des projets
- **Thème pixelisé moderne** avec effets de particules
- **Section contact** interactive avec validation
- **Navigation smooth scroll** style jeu vidéo
- **Données réelles** depuis l'API backend

## 🚀 Technologies utilisées

### Frontend
- ⚛️ **React 18** avec Vite
- 🎨 **CSS3** avec variables et animations
- ✨ **Framer Motion** pour les animations
- 🔄 **Axios** pour les appels API
- 📱 **Design responsive**
- 🎯 **React Router** pour la navigation

### Backend
- 🟢 **Node.js** avec Express
- 🌐 **CORS** pour les requêtes cross-origin
- 🔧 **Nodemon** pour le développement
- 📊 **API REST** pour les projets et données personnelles

## 📦 Installation

### Prérequis
- Node.js 16+
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/AbdelRMB/portfolio-minecraft.git
cd portfolio-minecraft
```

### 2. Installer les dépendances

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

## 🎯 Lancement du projet

### Développement

#### 1. Démarrer le backend
```bash
cd backend
npm run dev
```
Le serveur API sera disponible sur `http://localhost:5000`

#### 2. Démarrer le frontend
```bash
npm run dev
```
L'application sera disponible sur `http://localhost:5173`

### Production

#### Build du frontend
```bash
npm run build
```

#### Démarrage du backend en production
```bash
cd backend
npm start
```

## 📁 Structure du projet

```
portfolio-minecraft/
├── 📂 public/                 # Assets statiques
│   ├── 📂 images/            # Images du portfolio
│   └── 📂 assets/            # Ressources Minecraft
├── 📂 src/                   # Code source React
│   ├── 📂 components/        # Composants réutilisables
│   │   ├── Header.jsx        # Navigation Minecraft
│   │   ├── Footer.jsx        # Pied de page thématique
│   │   ├── Layout.jsx        # Layout principal
│   │   └── Contact.jsx       # Formulaire de contact
│   ├── 📂 pages/            # Pages principales
│   │   ├── Home.jsx          # Page d'accueil avec hero
│   │   └── Projects.jsx      # Grille projets style inventaire
│   ├── 📂 styles/           # Styles CSS
│   │   └── minecraft-theme.css # Thème global Minecraft
│   ├── App.jsx              # Composant racine
│   └── main.jsx             # Point d'entrée
├── 📂 backend/              # Serveur Node.js
│   ├── server.js            # Configuration Express + données
│   └── package.json         # Dépendances backend
└── 📄 README.md             # Documentation
```

## 🛠️ API Endpoints

### GET `/api/personal`
Récupère les informations personnelles d'Abdelrahim Riche

### GET `/api/projects`
Récupère la liste de tous les projets avec filtres optionnels
- `?category=Web Development` - Filtrer par catégorie
- `?featured=true` - Projets mis en avant uniquement

### GET `/api/projects/:id`
Récupère un projet spécifique par son ID

### GET `/api/skills`
Récupère les compétences techniques organisées par catégorie

### GET `/api/stats`
Récupère les statistiques (expérience, projets, technologies, etc.)

## 🎨 Projets présentés

Le portfolio présente les vrais projets d'Abdelrahim Riche :

1. **Portfolio Web Moderne** - Site personnel responsive
2. **Application Mobile E-commerce** - App complète avec paiement
3. **Système de Gestion Scolaire** - Plateforme éducative
4. **API REST Microservices** - Architecture pour livraison
5. **Dashboard Analytics** - Visualisations temps réel
6. **Chat Application** - Messagerie avec notifications push

## 💼 Compétences techniques

### Frontend
React, Vue.js, Angular, JavaScript, TypeScript, HTML5, CSS3, Sass, Tailwind CSS

### Backend  
Node.js, Express, Laravel, PHP, Python, Java

### Mobile
React Native, Flutter, Ionic

### Bases de données
MongoDB, MySQL, PostgreSQL, Redis, Firebase

### Outils
Git, Docker, AWS, Figma, VS Code, Postman

## 📧 Contact

### Informations de contact
- **Email** : contact@abdelrahimriche.com
- **Site Web** : [abdelrahimriche.com](https://abdelrahimriche.com)
- **GitHub** : [AbdelRMB](https://github.com/AbdelRMB)

### Formulaire de contact
Le portfolio inclut un formulaire de contact interactif avec validation pour :
- Nom complet
- Email
- Sujet du message
- Message détaillé

## 📱 Responsive Design

Le portfolio est entièrement responsive et s'adapte à :
- 📱 **Mobile** (320px+)
- 📱 **Tablette** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🎮 Personnalisation

### Modifier les données
Les informations personnelles et projets sont centralisés dans `backend/server.js` pour faciliter les mises à jour.

### Personnaliser le thème
Modifiez les variables CSS dans les fichiers de style pour adapter les couleurs et animations.

## 🔧 Scripts disponibles

### Frontend
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Aperçu du build

### Backend
- `npm run dev` - Serveur avec nodemon
- `npm start` - Serveur de production

## 📝 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

**Abdelrahim Riche** - Spécialiste en développement web et mobile
- Site Web: [abdelrahimriche.com](https://abdelrahimriche.com)
- GitHub: [@AbdelRMB](https://github.com/AbdelRMB)
- Email: contact@abdelrahimriche.com

## 🙏 Remerciements

- Minecraft pour l'inspiration visuelle
- La communauté React pour les excellents outils
- Tous les contributeurs open source

---

<div align="center">

**Fait avec ❤️ et beaucoup de ☕**

*"Spécialiste en développement web et mobile qui conçoit des solutions créatives"*

</div>+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
