# Guide de Contribution

## 📑 Table des matières

- 📦 [Prérequis](#prérequis)
- 🚀 [Démarrage](#démarrage)

<h2 id="prérequis">📦 Prérequis</h2>

- [Git](https://git-scm.com/) : Système de contrôle de version distribué
- [Node.js](https://nodejs.org/) : Environnement d'exécution pour JavaScript (version 20.7 minimum)
- [pnpm](https://pnpm.io/) : Gestionnaire de paquets pour les projets Node.js
- [Docker](https://www.docker.com/) (optionnel) : Environnement d'exécution d'applications sous forme de conteneurs
- [PostgreSQL](https://www.postgresql.org/) (optionnel si Docker est utilisé) : Système de gestion de base de données relationnelle

### Recommandation

> Pour une gestion plus facile de Node.js, envisagez d'utiliser [nvm](https://github.com/nvm-sh/nvm), qui vous permet d'obtenir rapidement et d'utiliser différentes versions de Node.js via la ligne de commande.

<h2 id="démarrage">🚀 Démarrage</h2>

Suivez ces étapes pour configurer le projet :

### 1. Clonez le dépôt

```bash
git clone git@github.com:inclusion-numerique/la-base.git
```

### 2. Installez la dernière version de node

```bash
nvm use --lts
```

### 3. Installez les dépendances du projet

```bash
cd la-base
pnpm install
```

### 4. Paramétrer les variables pour le développement

Créer le fichier `.env` contenant les variables d'environnement à partir de [.env.dist](.env.dist)

```bash
cp .env.dist .env
```

### 5. Démarrer les services de mail et de base de donnée en local

#### Avec Docker

```bash
docker compose -f ./docker-compose.dev.yml -p la-base up -d
```

Puis pour arrêter :

```bash
docker compose -f ./docker-compose.dev.yml -p la-base down
```

#### Sans Docker

[//]: # TODO

### 6. Démarrer le client next en local

```
pnpm run dev
```

Une fois ces étapes terminées, vous êtes prêt à commencer à travailler sur le projet ! 🎉
