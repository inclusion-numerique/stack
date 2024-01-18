# Guide de Contribution

## 📑 Table des matières

- 📦 [Prérequis](#prérequis)
- 🚀 [Démarrage](#démarrage)
- 🤝 [Procédures](#procédures)

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

### 5. Démarrer les services de mail et de base de données en local

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

<h2 id="procédures">🤝 Procédures</h2>

### Branches

- **Branches à jour** : Les branches doivent être créées à partir d'une version à jour de la branche de développement `dev`.
- **Préfixes conventionnels** : Lors de la création de nouvelles branches, assurez-vous qu'elles sont préfixées par l'une des catégories suivantes : `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/`, en fonction de la nature des modifications. Consultez les [types de commits conventionnels](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index) pour en savoir plus sur ces catégories.

### Commits

- **Commits Conventionnels** : Les messages de commit doivent suivre la spécification [Commits Conventionnels](https://www.conventionalcommits.org/fr) pour être valides.

### Création et publication d'une nouvelle fonctionnalité

1. **Créez une nouvelle branche** : Utilisez `git checkout -b feat/nom-de-la-fonctionnalité-incroyable` pour créer une nouvelle branche pour vos modifications.
2. **Commitez vos modifications** : Effectuez vos modifications et commitez-les avec un message descriptif. Par exemple, `git commit -m "feat: ajoute une fonctionnalité incroyable"`.
3. **Publiez votre branche** : Poussez votre branche de fonctionnalité vers le dépôt distant avec `git push origin feat/nom-de-la-fonctionnalité-incroyable`.
4. **Ouvrez une Pull-Request** : Une fois vos modifications poussées, ouvrez une Pull-Request vers la branche de développement. Indiquez des détails sur les modifications et demandez une revue des contributeurs.

### Déploiement

Lorsqu'une branche est fusionnée avec `main`, cela déclenche automatiquement la mise à jour en production.
