docker run -d -p 8080:80 --name mon-nginx nginx:latest# 🎯 Exercices Pratiques - Module 2 : Docker

## 📋 Vue d'ensemble

Ces exercices vous permettront de maîtriser Docker en pratique : depuis l'utilisation de conteneurs simples jusqu'à l'orchestration avec Docker Compose.

**Prérequis** : 
- Avoir lu le [Module 2 - Docker](./02-docker.md)
- Docker installé sur votre machine
- Connaissances de base en ligne de commande

---

## 🐳 Exercice 1 : Premier conteneur

### 🎯 Objectifs
- Lancer votre premier conteneur
- Comprendre les concepts de base
- Gérer les conteneurs et images

### 📝 Instructions

1. **Vérifier l'installation Docker**
   ```bash
   docker --version
   docker info
   ```

2. **Télécharger et lancer nginx**
   ```bash
   # Télécharger l'image nginx
   docker pull nginx:latest
   
   # Lancer nginx en arrière-plan avec mapping de port
   docker run -d -p 8080:80 --name mon-nginx nginx:latest
   ```

3. **Vérifier le conteneur**
   ```bash
   # Lister les conteneurs en cours
   docker ps
   
   # Tester l'accès
   curl http://localhost:8080
   # Ou ouvrir http://localhost:8080 dans votre navigateur
   ```

4. **Explorer le conteneur**
   ```bash
   # Exécuter une commande dans le conteneur
   docker exec -it mon-nginx bash
   
   # Explorer les fichiers (depuis l'intérieur du conteneur)
   ls /usr/share/nginx/html/
   cat /usr/share/nginx/html/index.html
   exit
   ```

5. **Consulter les logs**
   ```bash
   # Voir les logs
   docker logs mon-nginx
   
   # Suivre les logs en temps réel
   docker logs -f mon-nginx
   # Générez du trafic avec curl pour voir les logs
   ```

6. **Gérer le conteneur**
   ```bash
   # Arrêter le conteneur
   docker stop mon-nginx
   
   # Redémarrer
   docker start mon-nginx
   
   # Supprimer (après l'avoir arrêté)
   docker stop mon-nginx
   docker rm mon-nginx
   ```

### ✅ Critères de validation
- [ ] Nginx accessible sur http://localhost:8080
- [ ] Conteneur visible avec `docker ps`
- [ ] Connexion réussie avec `docker exec`
- [ ] Logs consultables
- [ ] Conteneur correctement supprimé

### 💡 Solution complète
<details>
<summary>Commandes à exécuter</summary>

```bash
# Installation et test
docker --version

# Lancement nginx
docker run -d -p 8080:80 --name mon-nginx nginx:latest

# Tests
docker ps
curl -I http://localhost:8080

# Exploration
docker exec -it mon-nginx bash
# Dans le conteneur:
ls /usr/share/nginx/html/
exit

# Logs
docker logs mon-nginx

# Nettoyage
docker stop mon-nginx
docker rm mon-nginx
docker rmi nginx:latest
```
</details>

---

## 🏗️ Exercice 2 : Créer une image personnalisée

### 🎯 Objectifs
- Écrire votre premier Dockerfile
- Construire une image personnalisée
- Comprendre les layers Docker

### 📝 Instructions

1. **Créer la structure du projet**
   ```bash
   mkdir mon-site-web
   cd mon-site-web
   ```

2. **Créer le contenu web**
   
   `index.html` :
   ```html
   <!DOCTYPE html>
   <html lang="fr">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Mon Site Docker</title>
       <link rel="stylesheet" href="style.css">
   </head>
   <body>
       <header>
           <h1>🐳 Mon Premier Site avec Docker</h1>
       </header>
       <main>
           <section>
               <h2>Bienvenue !</h2>
               <p>Ce site web tourne dans un conteneur Docker.</p>
               <p>Construit avec amour et Docker 💙</p>
           </section>
           <section>
               <h2>Informations</h2>
               <div id="info">
                   <p><strong>Hostname:</strong> <span id="hostname">Loading...</span></p>
                   <p><strong>Date:</strong> <span id="date">Loading...</span></p>
               </div>
           </section>
       </main>
       <script src="script.js"></script>
   </body>
   </html>
   ```

   `style.css` :
   ```css
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }

   body {
       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       line-height: 1.6;
       color: #333;
       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
       min-height: 100vh;
   }

   header {
       background: rgba(255, 255, 255, 0.1);
       padding: 2rem;
       text-align: center;
       backdrop-filter: blur(10px);
   }

   h1 {
       color: white;
       font-size: 2.5rem;
       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
   }

   main {
       max-width: 800px;
       margin: 2rem auto;
       padding: 2rem;
       background: white;
       border-radius: 10px;
       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
   }

   section {
       margin-bottom: 2rem;
   }

   h2 {
       color: #667eea;
       margin-bottom: 1rem;
   }

   #info {
       background: #f8f9fa;
       padding: 1rem;
       border-left: 4px solid #667eea;
       border-radius: 4px;
   }
   ```

   `script.js` :
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       // Afficher la date
       document.getElementById('date').textContent = new Date().toLocaleString();
       
       // Simuler l'affichage du hostname (normalement récupéré côté serveur)
       document.getElementById('hostname').textContent = 'docker-container';
   });
   ```

3. **Créer le Dockerfile**
   
   `Dockerfile` :
   ```dockerfile
   # Image de base
   FROM nginx:alpine

   # Métadonnées
   LABEL maintainer="votre.email@example.com"
   LABEL version="1.0"
   LABEL description="Mon site web personnalisé avec Docker"

   # Copier les fichiers web
   COPY index.html /usr/share/nginx/html/
   COPY style.css /usr/share/nginx/html/
   COPY script.js /usr/share/nginx/html/

   # Exposer le port
   EXPOSE 80

   # La commande par défaut est déjà définie dans l'image nginx
   ```

4. **Construire l'image**
   ```bash
   # Construire l'image avec un tag
   docker build -t mon-site:1.0 .
   
   # Vérifier que l'image est créée
   docker images
   ```

5. **Lancer le conteneur**
   ```bash
   # Lancer le conteneur
   docker run -d -p 3000:80 --name mon-site-container mon-site:1.0
   
   # Tester l'accès
   curl http://localhost:3000
   ```

6. **Optimiser le Dockerfile**
   
   `Dockerfile.optimized` :
   ```dockerfile
   # Image plus légère
   FROM nginx:alpine

   # Créer un utilisateur non-root pour la sécurité
   RUN addgroup -g 1001 -S nodejs && \
       adduser -S nodejs -u 1001

   # Métadonnées
   LABEL maintainer="votre.email@example.com" \
         version="1.0" \
         description="Site web optimisé avec Docker"

   # Copier les fichiers (une seule layer)
   COPY --chown=nginx:nginx index.html style.css script.js /usr/share/nginx/html/

   # Configuration nginx personnalisée
   COPY nginx.conf /etc/nginx/nginx.conf

   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD curl -f http://localhost/ || exit 1

   # Exposer le port
   EXPOSE 80

   # Utilisateur non-root
   USER nginx
   ```

   `nginx.conf` :
   ```nginx
   events {
       worker_connections 1024;
   }

   http {
       include       /etc/nginx/mime.types;
       default_type  application/octet-stream;
       
       server {
           listen 80;
           server_name localhost;
           
           location / {
               root /usr/share/nginx/html;
               index index.html;
           }
           
           # Cache pour les assets statiques
           location ~* \.(css|js|ico|png|jpg|gif)$ {
               expires 1y;
               add_header Cache-Control "public, immutable";
           }
       }
   }
   ```

### ✅ Critères de validation
- [ ] Image construite avec succès
- [ ] Site accessible sur le port choisi
- [ ] Styles CSS appliqués correctement
- [ ] JavaScript fonctionnel
- [ ] Health check fonctionnel (version optimisée)

---

## 🚀 Exercice 3 : Application Node.js

### 🎯 Objectifs
- Conteneuriser une application Node.js
- Gérer les dépendances npm
- Utiliser les variables d'environnement

### 📝 Instructions

1. **Créer l'application Node.js**
   
   ```bash
   mkdir app-node-docker
   cd app-node-docker
   ```

   `package.json` :
   ```json
   {
     "name": "app-node-docker",
     "version": "1.0.0",
     "description": "Application Node.js pour Docker",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "dotenv": "^16.3.1"
     },
     "devDependencies": {
       "nodemon": "^3.0.1"
     }
   }
   ```

   `server.js` :
   ```javascript
   require('dotenv').config();
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;
   const NODE_ENV = process.env.NODE_ENV || 'development';

   // Middleware
   app.use(express.json());
   app.use(express.static('public'));

   // Routes
   app.get('/', (req, res) => {
       res.json({
           message: 'Bienvenue dans notre API Docker !',
           version: '1.0.0',
           environment: NODE_ENV,
           hostname: require('os').hostname(),
           timestamp: new Date().toISOString()
       });
   });

   app.get('/health', (req, res) => {
       res.json({
           status: 'OK',
           uptime: process.uptime(),
           memory: process.memoryUsage()
       });
   });

   app.get('/api/users', (req, res) => {
       const users = [
           { id: 1, name: 'Alice Docker', email: 'alice@docker.com' },
           { id: 2, name: 'Bob Container', email: 'bob@container.com' },
           { id: 3, name: 'Charlie Image', email: 'charlie@image.com' }
       ];
       res.json(users);
   });

   // Gestion des erreurs
   app.use((err, req, res, next) => {
       console.error(err.stack);
       res.status(500).json({ error: 'Something went wrong!' });
   });

   // 404 handler
   app.use('*', (req, res) => {
       res.status(404).json({ error: 'Route not found' });
   });

   app.listen(PORT, '0.0.0.0', () => {
       console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
       console.log(`📊 Health check: http://localhost:${PORT}/health`);
   });
   ```

   `.env` :
   ```env
   NODE_ENV=production
   PORT=3000
   API_KEY=your-secret-api-key
   ```

2. **Créer le Dockerfile**
   
   `Dockerfile` :
   ```dockerfile
   # Utiliser l'image officielle Node.js
   FROM node:18-alpine

   # Définir le répertoire de travail
   WORKDIR /usr/src/app

   # Copier les fichiers de dépendances
   COPY package*.json ./

   # Installer les dépendances
   RUN npm ci --only=production && npm cache clean --force

   # Créer un utilisateur non-root
   RUN addgroup -g 1001 -S nodejs && \
       adduser -S nodejs -u 1001

   # Copier le code source
   COPY --chown=nodejs:nodejs . .

   # Changer vers l'utilisateur non-root
   USER nodejs

   # Exposer le port
   EXPOSE 3000

   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD node healthcheck.js

   # Démarrer l'application
   CMD ["npm", "start"]
   ```

   `healthcheck.js` :
   ```javascript
   const http = require('http');

   const options = {
     hostname: 'localhost',
     port: process.env.PORT || 3000,
     path: '/health',
     method: 'GET',
     timeout: 2000
   };

   const request = http.request(options, (res) => {
     if (res.statusCode === 200) {
       process.exit(0);
     } else {
       process.exit(1);
     }
   });

   request.on('error', () => {
     process.exit(1);
   });

   request.on('timeout', () => {
     request.destroy();
     process.exit(1);
   });

   request.end();
   ```

   `.dockerignore` :
   ```
   node_modules
   npm-debug.log
   .git
   .gitignore
   README.md
   .env
   .nyc_output
   coverage
   .DS_Store
   ```

3. **Construire et tester**
   ```bash
   # Construire l'image
   docker build -t app-node:1.0 .
   
   # Lancer avec variables d'environnement
   docker run -d \
     -p 3000:3000 \
     -e NODE_ENV=production \
     -e PORT=3000 \
     --name app-node-container \
     app-node:1.0
   
   # Tester l'API
   curl http://localhost:3000
   curl http://localhost:3000/health
   curl http://localhost:3000/api/users
   ```

### ✅ Critères de validation
- [ ] Application Node.js fonctionnelle
- [ ] API endpoints répondent correctement
- [ ] Variables d'environnement prises en compte
- [ ] Health check fonctionnel
- [ ] Sécurité : utilisateur non-root

---

## 🎵 Exercice 4 : Docker Compose - Stack complète

### 🎯 Objectifs
- Orchestrer plusieurs services
- Configurer la communication entre conteneurs
- Gérer des volumes et réseaux

### 📝 Instructions

1. **Structure du projet**
   ```bash
   mkdir stack-complete
   cd stack-complete
   mkdir frontend backend database
   ```

2. **Service Backend (API Node.js)**
   
   `backend/package.json` :
   ```json
   {
     "name": "backend-api",
     "version": "1.0.0",
     "main": "server.js",
     "scripts": {
       "start": "node server.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "cors": "^2.8.5",
       "pg": "^8.11.3",
       "redis": "^4.6.7"
     }
   }
   ```

   `backend/server.js` :
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const { Client } = require('pg');
   const redis = require('redis');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Configuration base de données
   const dbClient = new Client({
     host: process.env.DB_HOST || 'localhost',
     port: process.env.DB_PORT || 5432,
     database: process.env.DB_NAME || 'myapp',
     user: process.env.DB_USER || 'postgres',
     password: process.env.DB_PASSWORD || 'password'
   });

   // Configuration Redis
   const redisClient = redis.createClient({
     host: process.env.REDIS_HOST || 'localhost',
     port: process.env.REDIS_PORT || 6379
   });

   // Connexion aux services
   async function connectServices() {
     try {
       await dbClient.connect();
       await redisClient.connect();
       console.log('✅ Connected to database and Redis');
       
       // Créer la table si elle n'existe pas
       await dbClient.query(`
         CREATE TABLE IF NOT EXISTS users (
           id SERIAL PRIMARY KEY,
           name VARCHAR(100) NOT NULL,
           email VARCHAR(100) UNIQUE NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
       `);
     } catch (error) {
       console.error('❌ Error connecting to services:', error);
     }
   }

   // Routes
   app.get('/api/health', (req, res) => {
     res.json({ status: 'OK', service: 'backend' });
   });

   app.get('/api/users', async (req, res) => {
     try {
       // Vérifier le cache Redis
       const cached = await redisClient.get('users');
       if (cached) {
         return res.json(JSON.parse(cached));
       }

       // Récupérer depuis la base
       const result = await dbClient.query('SELECT * FROM users ORDER BY id');
       const users = result.rows;

       // Mettre en cache
       await redisClient.setEx('users', 300, JSON.stringify(users));

       res.json(users);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   app.post('/api/users', async (req, res) => {
     try {
       const { name, email } = req.body;
       const result = await dbClient.query(
         'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
         [name, email]
       );

       // Invalider le cache
       await redisClient.del('users');

       res.status(201).json(result.rows[0]);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   connectServices().then(() => {
     app.listen(PORT, '0.0.0.0', () => {
       console.log(`🚀 Backend running on port ${PORT}`);
     });
   });
   ```

   `backend/Dockerfile` :
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   USER node
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

3. **Service Frontend**
   
   `frontend/index.html` :
   ```html
   <!DOCTYPE html>
   <html lang="fr">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Stack Docker Complete</title>
       <style>
           * { margin: 0; padding: 0; box-sizing: border-box; }
           body { font-family: Arial, sans-serif; padding: 2rem; background: #f5f5f5; }
           .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; }
           .form-group { margin-bottom: 1rem; }
           label { display: block; margin-bottom: 0.5rem; }
           input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
           button { background: #007bff; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; }
           button:hover { background: #0056b3; }
           .users { margin-top: 2rem; }
           .user { background: #f8f9fa; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; }
       </style>
   </head>
   <body>
       <div class="container">
           <h1>🐳 Stack Docker Complete</h1>
           
           <form id="userForm">
               <div class="form-group">
                   <label for="name">Nom:</label>
                   <input type="text" id="name" required>
               </div>
               <div class="form-group">
                   <label for="email">Email:</label>
                   <input type="email" id="email" required>
               </div>
               <button type="submit">Ajouter Utilisateur</button>
           </form>

           <div class="users">
               <h2>Utilisateurs</h2>
               <div id="usersList"></div>
           </div>
       </div>

       <script>
           const API_URL = 'http://localhost:5000/api';

           async function loadUsers() {
               try {
                   const response = await fetch(`${API_URL}/users`);
                   const users = await response.json();
                   
                   const usersList = document.getElementById('usersList');
                   usersList.innerHTML = users.map(user => `
                       <div class="user">
                           <strong>${user.name}</strong> - ${user.email}
                           <br><small>Créé le: ${new Date(user.created_at).toLocaleDateString()}</small>
                       </div>
                   `).join('');
               } catch (error) {
                   console.error('Error loading users:', error);
               }
           }

           document.getElementById('userForm').addEventListener('submit', async (e) => {
               e.preventDefault();
               
               const name = document.getElementById('name').value;
               const email = document.getElementById('email').value;

               try {
                   await fetch(`${API_URL}/users`, {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({ name, email })
                   });

                   document.getElementById('userForm').reset();
                   loadUsers();
               } catch (error) {
                   console.error('Error adding user:', error);
               }
           });

           loadUsers();
       </script>
   </body>
   </html>
   ```

   `frontend/Dockerfile` :
   ```dockerfile
   FROM nginx:alpine
   COPY index.html /usr/share/nginx/html/
   EXPOSE 80
   ```

4. **Docker Compose**
   
   `docker-compose.yml` :
   ```yaml
   version: '3.8'

   services:
     # Frontend
     frontend:
       build: ./frontend
       ports:
         - "3000:80"
       depends_on:
         - backend
       networks:
         - app-network

     # Backend API
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - DB_HOST=database
         - DB_NAME=myapp
         - DB_USER=postgres
         - DB_PASSWORD=password
         - REDIS_HOST=cache
       depends_on:
         - database
         - cache
       networks:
         - app-network

     # Base de données
     database:
       image: postgres:13
       environment:
         POSTGRES_DB: myapp
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: password
       volumes:
         - postgres_data:/var/lib/postgresql/data
         - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
       networks:
         - app-network

     # Cache Redis
     cache:
       image: redis:7-alpine
       networks:
         - app-network

     # Monitoring (bonus)
     adminer:
       image: adminer
       ports:
         - "8080:8080"
       depends_on:
         - database
       networks:
         - app-network

   volumes:
     postgres_data:

   networks:
     app-network:
       driver: bridge
   ```

   `database/init.sql` :
   ```sql
   -- Insertion de données de test
   INSERT INTO users (name, email) VALUES 
   ('Alice Docker', 'alice@docker.com'),
   ('Bob Container', 'bob@container.com'),
   ('Charlie Compose', 'charlie@compose.com');
   ```

5. **Scripts de gestion**
   
   `scripts/start.sh` :
   ```bash
   #!/bin/bash
   echo "🚀 Démarrage de la stack complète..."
   docker-compose up -d
   echo "✅ Stack démarrée !"
   echo "🌐 Frontend: http://localhost:3000"
   echo "🔌 API: http://localhost:5000"
   echo "🗄️ Adminer: http://localhost:8080"
   ```

   `scripts/stop.sh` :
   ```bash
   #!/bin/bash
   echo "⏹️ Arrêt de la stack..."
   docker-compose down
   echo "✅ Stack arrêtée !"
   ```

### ✅ Critères de validation
- [ ] Tous les services démarrent sans erreur
- [ ] Frontend accessible et fonctionnel
- [ ] API backend répond correctement
- [ ] Base de données PostgreSQL opérationnelle
- [ ] Cache Redis fonctionnel
- [ ] Communication entre services établie

---

## 🎯 Exercice 5 : Déploiement et registre

### 🎯 Objectifs
- Publier une image sur Docker Hub
- Gérer les tags et versions
- Déployer depuis un registre

### 📝 Instructions

1. **Préparer l'image pour publication**
   ```bash
   # Depuis l'exercice 2
   cd mon-site-web
   
   # Construire avec un tag complet
   docker build -t votre-username/mon-site-web:1.0 .
   docker build -t votre-username/mon-site-web:latest .
   ```

2. **Se connecter à Docker Hub**
   ```bash
   # Créer un compte sur hub.docker.com si pas déjà fait
   docker login
   ```

3. **Publier l'image**
   ```bash
   # Pousser les versions
   docker push votre-username/mon-site-web:1.0
   docker push votre-username/mon-site-web:latest
   ```

4. **Tester le déploiement**
   ```bash
   # Supprimer l'image locale
   docker rmi votre-username/mon-site-web:1.0
   docker rmi votre-username/mon-site-web:latest
   
   # Déployer depuis le registre
   docker run -d -p 8080:80 votre-username/mon-site-web:latest
   ```

### ✅ Critères de validation
- [ ] Image publiée sur Docker Hub
- [ ] Déploiement réussi depuis le registre
- [ ] Tags correctement gérés

---

## 📚 Ressources supplémentaires

### Aide-mémoire Docker
```bash
# Images
docker images
docker build -t nom:tag .
docker rmi image:tag

# Conteneurs
docker ps -a
docker run -d -p host:container image
docker exec -it container bash
docker logs -f container

# Nettoyage
docker system prune
docker volume prune
docker network prune
```

### Bonnes pratiques
1. **Images légères** : Utilisez Alpine quand possible
2. **Multi-stage builds** pour optimiser la taille
3. **Utilisateur non-root** pour la sécurité
4. **Health checks** pour la fiabilité
5. **.dockerignore** pour exclure les fichiers inutiles

---

## ✅ Validation finale

Compétences acquises :
- [ ] Utilisation de conteneurs Docker
- [ ] Création d'images personnalisées
- [ ] Écriture de Dockerfiles optimisés
- [ ] Orchestration avec Docker Compose
- [ ] Publication sur registre Docker
- [ ] Gestion des volumes et réseaux

**Prochaine étape** : [Exercices Micro-services - Module 3](./exercices-03-microservices.md)

---

*Bravo ! Vous maîtrisez maintenant Docker. Passons à l'architecture micro-services ! 🏗️* 