# 🎯 Exercices Pratiques - Module 1 : Git & GitFlow

## 📋 Vue d'ensemble

Ces exercices vous permettront de mettre en pratique les concepts de Git et GitFlow vus dans le Module 1. Chaque exercice est progressif et build sur les précédents.

 
**Prérequis** : Avoir lu le [Module 1 - Git & GitFlow](./01-git-gitflow.md)

---

## 🏁 Exercice 1 : Premier dépôt Git

### 🎯 Objectifs
- Initialiser un dépôt Git
- Effectuer des commits de base
- Comprendre l'historique Git

### 📝 Instructions

1. **Créer le projet**
   ```bash
   mkdir mon-premier-projet
   cd mon-premier-projet
   ```

2. **Initialiser Git**
   ```bash
   git init
   ```

3. **Créer le fichier README.md**
   ```markdown
   # Mon Premier Projet Git
   
   ## Description
   Ce projet me permet d'apprendre Git.
   
   ## Auteur
   [Votre nom]
   
   ## Date
   [Date du jour]
   ```

4. **Premier commit**
   ```bash
   git add README.md
   git commit -m "Initial commit: Add README"
   ```

5. **Ajouter plus de contenu**
   Créez un fichier `index.html` :
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Mon Premier Projet</title>
   </head>
   <body>
       <h1>Bienvenue sur mon site !</h1>
       <p>Ceci est mon premier projet avec Git.</p>
   </body>
   </html>
   ```

6. **Deuxième commit**
   ```bash
   git add index.html
   git commit -m "Add basic HTML structure"
   ```

7. **Vérifier l'historique**
   ```bash
   git log
   git log --oneline
   ```

### ✅ Critères de validation
- [ ] Le dépôt Git est initialisé
- [ ] Au moins 2 commits sont présents
- [ ] Les messages de commit sont descriptifs
- [ ] `git log` affiche l'historique correct

### 💡 Solution et bonnes pratiques
<details>
<summary>Voir la solution complète</summary>

```bash
# Création et initialisation
mkdir mon-premier-projet && cd mon-premier-projet
git init

# Configuration (si pas déjà fait)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Création des fichiers et commits
echo "# Mon Premier Projet Git" > README.md
git add README.md
git commit -m "Initial commit: Add README"

# Ajout HTML
cat > index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Mon Premier Projet</title>
</head>
<body>
    <h1>Bienvenue sur mon site !</h1>
    <p>Ceci est mon premier projet avec Git.</p>
</body>
</html>
EOF

git add index.html
git commit -m "Add basic HTML structure"

# Vérification
git log --oneline
```
</details>

---

## 🌿 Exercice 2 : Gestion des branches

### 🎯 Objectifs
- Créer et utiliser des branches
- Merger des branches
- Supprimer des branches obsolètes

### 📝 Instructions

1. **Vérifier la branche actuelle**
   ```bash
   git branch
   git status
   ```

2. **Créer une branche pour l'en-tête**
   ```bash
   git checkout -b feature/header
   ```

3. **Développer la fonctionnalité**
   Créez `header.html` :
   ```html
   <header>
       <nav>
           <ul>
               <li><a href="#home">Accueil</a></li>
               <li><a href="#about">À propos</a></li>
               <li><a href="#contact">Contact</a></li>
           </ul>
       </nav>
   </header>
   ```

4. **Modifier index.html**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Mon Premier Projet</title>
   </head>
   <body>
       <!-- Include header -->
       <div id="header-placeholder">
           <!-- Le header sera intégré ici -->
       </div>
       
       <main>
           <h1>Bienvenue sur mon site !</h1>
           <p>Ceci est mon premier projet avec Git.</p>
       </main>
   </body>
   </html>
   ```

5. **Commiter les modifications**
   ```bash
   git add .
   git commit -m "Add navigation header structure"
   ```

6. **Retourner sur main et merger**
   ```bash
   git checkout main
   git merge feature/header
   ```

7. **Supprimer la branche feature**
   ```bash
   git branch -d feature/header
   ```

8. **Créer une branche pour le footer**
   ```bash
   git checkout -b feature/footer
   ```

9. **Ajouter le footer**
   Créez `footer.html` :
   ```html
   <footer>
       <p>&copy; 2025 Mon Premier Projet. Tous droits réservés.</p>
       <p>Créé avec Git et amour ❤️</p>
   </footer>
   ```

10. **Commiter et merger**
    ```bash
    git add footer.html
    git commit -m "Add footer with copyright"
    git checkout main
    git merge feature/footer
    git branch -d feature/footer
    ```

### ✅ Critères de validation
- [ ] Au moins 2 branches créées et utilisées
- [ ] Merge réussi sans conflits
- [ ] Branches features supprimées après merge
- [ ] Historique propre avec `git log --graph`

### 💡 Conseils
- Utilisez `git log --graph --oneline --all` pour visualiser les branches
- Testez votre code avant de merger
- Les noms de branches doivent être descriptifs

---

## 🔄 Exercice 3 : Simulation GitFlow

### 🎯 Objectifs
- Appliquer la méthodologie GitFlow
- Gérer develop et feature branches
- Créer une release

### 📝 Instructions

1. **Créer la branche develop**
   ```bash
   git checkout -b develop
   ```

2. **Créer une feature navigation**
   ```bash
   git checkout -b feature/navigation develop
   ```

3. **Développer la navigation**
   Créez `nav.css` :
   ```css
   nav {
       background-color: #333;
       padding: 1rem 0;
   }
   
   nav ul {
       list-style: none;
       display: flex;
       justify-content: center;
       margin: 0;
       padding: 0;
   }
   
   nav li {
       margin: 0 1rem;
   }
   
   nav a {
       color: white;
       text-decoration: none;
       padding: 0.5rem 1rem;
       border-radius: 4px;
       transition: background-color 0.3s;
   }
   
   nav a:hover {
       background-color: #555;
   }
   ```

4. **Mettre à jour index.html**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Mon Premier Projet</title>
       <link rel="stylesheet" href="nav.css">
   </head>
   <body>
       <nav>
           <ul>
               <li><a href="#home">Accueil</a></li>
               <li><a href="#about">À propos</a></li>
               <li><a href="#contact">Contact</a></li>
           </ul>
       </nav>
       
       <main>
           <h1>Bienvenue sur mon site !</h1>
           <p>Ceci est mon premier projet avec Git.</p>
       </main>
       
       <footer>
           <p>&copy; 2025 Mon Premier Projet. Tous droits réservés.</p>
           <p>Créé avec Git et amour ❤️</p>
       </footer>
   </body>
   </html>
   ```

5. **Commiter la feature**
   ```bash
   git add .
   git commit -m "Style navigation with CSS"
   ```

6. **Merger dans develop**
   ```bash
   git checkout develop
   git merge feature/navigation
   git branch -d feature/navigation
   ```

7. **Créer une autre feature**
   ```bash
   git checkout -b feature/responsive develop
   ```

8. **Ajouter le responsive**
   Créez `responsive.css` :
   ```css
   @media (max-width: 768px) {
       nav ul {
           flex-direction: column;
           align-items: center;
       }
       
       nav li {
           margin: 0.5rem 0;
       }
       
       main {
           padding: 1rem;
           text-align: center;
       }
   }
   ```

9. **Mettre à jour index.html**
   ```html
   <head>
       <title>Mon Premier Projet</title>
       <link rel="stylesheet" href="nav.css">
       <link rel="stylesheet" href="responsive.css">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   ```

10. **Commiter et merger**
    ```bash
    git add .
    git commit -m "Add responsive design for mobile"
    git checkout develop
    git merge feature/responsive
    git branch -d feature/responsive
    ```

11. **Créer une release**
    ```bash
    git checkout -b release/v1.0 develop
    ```

12. **Préparer la release**
    Créez `VERSION` :
    ```
    1.0.0
    ```
    
    Mettre à jour `README.md` :
    ```markdown
    # Mon Premier Projet Git
    
    Version : 1.0.0
    
    ## Description
    Site web responsive avec navigation stylée.
    
    ## Fonctionnalités
    - Navigation responsive
    - Design mobile-friendly
    - Footer avec copyright
    
    ## Technologies
    - HTML5
    - CSS3
    - Git pour le versioning
    ```

13. **Commiter la version**
    ```bash
    git add .
    git commit -m "Bump version to 1.0.0"
    ```

14. **Merger la release**
    ```bash
    # Merger dans main
    git checkout main
    git merge release/v1.0
    
    # Taguer la version
    git tag -a v1.0.0 -m "Version 1.0.0 - First stable release"
    
    # Merger dans develop
    git checkout develop
    git merge release/v1.0
    
    # Supprimer la branche release
    git branch -d release/v1.0
    ```

### ✅ Critères de validation
- [ ] Branche `develop` créée et utilisée
- [ ] Au moins 2 features développées
- [ ] Release créée et mergée dans `main` et `develop`
- [ ] Tag de version créé
- [ ] Historique GitFlow respecté

### 📊 Visualisation
```bash
git log --graph --oneline --all
```

---

## ⚔️ Exercice 4 : Résolution de conflit

### 🎯 Objectifs
- Simuler et résoudre des conflits Git
- Comprendre les marqueurs de conflit
- Apprendre les bonnes pratiques de résolution

### 📝 Instructions

1. **Préparer le conflit**
   ```bash
   # Depuis main
   git checkout main
   git checkout -b feature/title-french
   ```

2. **Modifier le titre en français**
   Dans `index.html`, changez :
   ```html
   <h1>Bienvenue sur mon site !</h1>
   <p>Ceci est mon premier projet avec Git en français.</p>
   ```

3. **Commiter**
   ```bash
   git add index.html
   git commit -m "Translate title to French"
   ```

4. **Créer une branche conflictuelle**
   ```bash
   git checkout main
   git checkout -b feature/title-english
   ```

5. **Modifier le titre en anglais**
   Dans `index.html`, changez :
   ```html
   <h1>Welcome to my website!</h1>
   <p>This is my first project with Git in English.</p>
   ```

6. **Commiter**
   ```bash
   git add index.html
   git commit -m "Translate title to English"
   ```

7. **Merger la première branche**
   ```bash
   git checkout main
   git merge feature/title-french
   ```

8. **Tenter de merger la seconde (conflit !)**
   ```bash
   git merge feature/title-english
   ```

9. **Résoudre le conflit**
   Éditez `index.html` pour résoudre le conflit :
   ```html
   <main>
       <h1>Bienvenue - Welcome to my website!</h1>
       <p>Ceci est mon premier projet avec Git - This is my first Git project.</p>
       <p>Site bilingue français/anglais.</p>
   </main>
   ```

10. **Finaliser la résolution**
    ```bash
    git add index.html
    git commit -m "Resolve merge conflict: Create bilingual version"
    ```

11. **Nettoyer**
    ```bash
    git branch -d feature/title-french
    git branch -d feature/title-english
    ```

### ✅ Critères de validation
- [ ] Conflit créé et détecté
- [ ] Conflit résolu manuellement
- [ ] Commit de résolution effectué
- [ ] Résultat final cohérent

### 🚨 Points d'attention
- Toujours tester le code après résolution de conflit
- Les marqueurs `<<<<<<<`, `=======`, `>>>>>>>` doivent être supprimés
- Le commit de résolution doit être explicite

---

## 🏆 Exercice 5 : Projet intégré (Bonus)

### 🎯 Objectifs
- Intégrer tous les concepts appris
- Créer un workflow complet
- Simuler un projet en équipe

### 📝 Instructions

1. **Initialiser un nouveau projet**
   ```bash
   mkdir portfolio-git
   cd portfolio-git
   git init
   git checkout -b develop
   ```

2. **Structure du projet**
   ```
   portfolio-git/
   ├── index.html
   ├── css/
   │   ├── style.css
   │   └── responsive.css
   ├── js/
   │   └── main.js
   ├── images/
   └── README.md
   ```

3. **Développer 3 features en parallèle** (simuler 3 développeurs)
   - `feature/layout` : Structure HTML de base
   - `feature/styling` : CSS et design
   - `feature/interactivity` : JavaScript

4. **Créer des conflits intentionnels** et les résoudre

5. **Suivre GitFlow** complet avec release

6. **Documenter** le processus dans README.md

### 🎁 Bonus
- Ajoutez un `CHANGELOG.md`
- Créez plusieurs releases avec tags
- Utilisez des branches de hotfix
- Scriptez certaines tâches avec des hooks Git

---

## 📚 Ressources supplémentaires

### Aide-mémoire Git
```bash
# Status et informations
git status
git log --oneline --graph --all
git branch -a

# Branches
git checkout -b nouvelle-branche
git merge branche-source
git branch -d branche-terminee

# Conflits
git status  # voir les fichiers en conflit
git add fichier-resolu
git commit -m "Resolve conflict"

# Annuler des modifications
git checkout -- fichier  # annuler modifications non commitées
git reset HEAD fichier    # retirer de la staging area
git revert commit-hash    # annuler un commit spécifique
```

### Outils utiles
- **Git GUI** : GitKraken, SourceTree
- **VS Code Extensions** : GitLens, Git Graph
- **Terminal** : Oh My Zsh avec thème git

### Bonnes pratiques rappel
1. **Messages de commit** clairs et descriptifs
2. **Commits atomiques** (une seule responsabilité)
3. **Branches** pour chaque fonctionnalité
4. **Tests** avant merge
5. **Nettoyage** des branches obsolètes

---

## ✅ Validation finale

Une fois tous les exercices terminés, vous devriez maîtriser :
- [ ] Initialisation et configuration Git
- [ ] Commits et historique
- [ ] Création et gestion des branches
- [ ] Merge et résolution de conflits
- [ ] Workflow GitFlow complet
- [ ] Bonnes pratiques Git

**Prochaine étape** : [Exercices Docker - Module 2](./exercices-02-docker.md)

---

*Félicitations ! Vous maîtrisez maintenant Git et GitFlow. Passons à la conteneurisation ! 🐳* 