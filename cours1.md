
# 📝 Cours d’introduction à Markdown avec Mermaid

## 📌 Objectifs du cours

À la fin de ce cours, vous serez capables de :

* Comprendre la syntaxe de base de **Markdown**
* Rédiger des titres, listes, tableaux, liens, images et blocs de code
* Intégrer et personnaliser des **diagrammes Mermaid** pour illustrer des idées

---

## 1. Qu’est-ce que Markdown ?

Markdown est un **langage de balisage léger** pour écrire des documents formatés de manière simple. Il permet d’ajouter facilement titres, listes, liens, images et même des diagrammes.

---

## 2. Syntaxe de base Markdown

(Toujours le même contenu : titres, listes, tableaux, images, code…)

---

## 3. Qu’est-ce que **Mermaid** ?

* Il est pensé pour les développeurs, rédacteurs de documentation, chefs de projet, etc.
* Les diagrammes sont générés automatiquement à partir de la description textuelle.

**Exemples d’utilisation :**

* Représenter un processus, une organisation, une structure de code, un planning…
* Illustrer visuellement des concepts dans un README, un cahier des charges, ou des notes.

### b. **Comment ça marche ?**

* Dans un fichier Markdown compatible (par exemple sur GitHub, Notion, Obsidian, HackMD, etc.), vous ouvrez un bloc de code avec <code> \`\`\`mermaid </code>
* Vous écrivez votre diagramme en respectant la syntaxe Mermaid.
* À l’affichage, le schéma est généré automatiquement.

### c. **Principaux types de diagrammes Mermaid**

| Type de diagramme                        | Usage principal                                |
| ---------------------------------------- | ---------------------------------------------- |
| **Flowchart** (diagramme de flux)        | Visualiser un processus, une séquence d’étapes |
| **Gantt**                                | Planification de projet, calendrier            |
| **Class diagram** (UML)                  | Représentation de structures de code           |
| **Sequence diagram**                     | Interactions entre acteurs/systèmes            |
| **Pie chart, Entity Relationship, etc.** | D’autres visualisations avancées               |

### d. **Syntaxe de base Mermaid**

#### 1. **Diagramme de flux (Flowchart)**

````markdown
```mermaid
graph TD
    Start --> Step1
    Step1 --> Step2
    Step2 --> End
````

````

**Explication :**
- `graph TD` indique un flux de haut en bas (Top Down)
- Chaque flèche (`-->`) relie deux étapes
- Les libellés entre crochets définissent les nœuds

#### 2. **Diagramme de Gantt**

```markdown
```mermaid
gantt
    title Projet Examen
    dateFormat  YYYY-MM-DD
    section Plan
    Préparation     :a1, 2025-06-15, 2d
    Examen          :a2, after a1, 1d
    Correction      :a3, after a2, 2d
````

````

**Explication :**
- `gantt` : type de diagramme
- Chaque ligne = une tâche avec dates et durée

#### 3. **Diagramme de classes (UML)**

```markdown
```mermaid
classDiagram
    class Utilisateur {
        +String nom
        +login()
        +logout()
    }

    class Admin {
        +gererUtilisateurs()
    }

    Utilisateur <|-- Admin
````

````

**Explication :**
- `classDiagram` : type UML
- Déclare des classes, leurs méthodes, attributs et héritages

#### 4. **Diagramme de séquence**

```markdown
```mermaid
sequenceDiagram
    participant Etudiant
    participant Correcteur
    Etudiant->>Correcteur: Remet la copie
    Correcteur-->>Etudiant: Rendue signée
````

````

**Explication :**
- Représente l’ordre des échanges entre plusieurs acteurs

---

### e. **Astuces et ressources pour bien démarrer avec Mermaid**

- Pour tester vos diagrammes : [Mermaid Live Editor](https://mermaid.live)
- Sur GitHub, tous les fichiers `.md` ne supportent pas Mermaid nativement : vérifiez la compatibilité ou utilisez des outils comme Obsidian, HackMD, Notion.
- Pensez à bien indenter votre code Mermaid et à rester simple au début (commencez par des flowcharts !).

---

## 4. Exemples pratiques : Markdown + Mermaid

Voici comment combiner dans un document :

```markdown
# Exemple de rapport

## Étapes du workflow

Voici les étapes :

```mermaid
graph LR
    Saisie --> Validation
    Validation --> Correction
    Correction --> Archivage
````

```

---

## 5. Pour aller plus loin

- [Documentation officielle Mermaid](https://mermaid-js.github.io/mermaid/)
- [Markdown Guide en français](https://www.markdownguide.org/basic-syntax/)
- [HackMD](https://hackmd.io/) ou [Obsidian](https://obsidian.md/)

---


---