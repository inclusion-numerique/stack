# Guide de Contribution

## 📑 Table des matières

- 📦 [Prérequis](#prérequis)
- 🚀 [Démarrage](#démarrage)
- 🛠️ [Scripts Disponibles](#scripts-disponibles)
- 🧭 [Utilisation](#utilisation)
- 🤝 [Procédures](#procédures)
- 🏗️ [Construit avec](#construit-avec)

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
git clone git@github.com:inclusion-numerique/stack.git
```

### 2. Installez la dernière version de node

```bash
nvm use --lts
```

### 3. Installez les dépendances du projet

```bash
cd stack
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
pnpm docker:start
```

#### Sans Docker

[//]: # TODO

### 6. Générer le client prisma et initialiser la base de données

```bash
pnpm db:init
```

### 7. Démarrer le client next en local

```bash
pnpm start:web
```

Une fois ces étapes terminées, vous êtes prêt à commencer à travailler sur le projet ! 🎉

<h2 id="scripts-disponibles">🛠️ Scripts Disponibles</h2>

Ces commandes sont essentielles pour le développement de l'application :

### `pnpm start:web`

Lance l'application `web` en local :

- `web` est disponible sur http://localhost:3001

### `pnpm dev`

Lance les applications `web` et `storybook` en local :

- `web` est disponible sur http://localhost:3001
- `storybook` est disponible sur http://localhost:6006

### `pnpm db:init`

Génère le client prisma et initialise la base de données

### `pnpm docker:start`

Utilise Docker pour lancer les services de mail et de bases de données :

- Le service d'interception des mails de l'application `MailDev` est disponible sur http://0.0.0.0:1080/
- Par défault, la base est accessible sur `localhost`, port `5433`, avec l'utilisateur `stack` et le mot de passe `password` : `postgresql://stack:password@localhost:5433/stack`

### `pnpm docker:stop`

Utilise Docker pour arrêter les services de mail et de bases de données.

### `pnpm docker:reset`

Utilise Docker pour réinitialiser la base de données.

### `pnpm fixtures:load`

Charge un ensemble de données prédéfinies par les [fixtures](packages/fixtures) dans la base. Il faut que la base de données soit accessible avant de lancer cette commande. \
Ces données donnent l'accès à deux utilisateurs de tests :

- Edith Piaf : `edith@piaf.com`
- Georges Moustaki : `georges@moustaki.com`

Lorsqu'on se connecte avec le mail d'un utilisateur existant en dev, un "Magic link" qui permet de se connecter apparaît dans les sorties de la console du client next.js.

### `pnpm prisma:generate-migration nom_de_la_migration`

Pour modifier le schéma de base de données, il faut d'abord faire les modifications nécessaires dans le [schema.prisma](apps/web/prisma/schema.prisma). \
Ensuite, il suffit d'exécuter la commande **avec le nom de la migration** pour générer le fichier de migration et l'appliquer sur le schéma de la base.

### `pnpm build`

Construit les applications `cli` et `web` :

- Le build de web est généré dans le dossier [apps/web/.next](apps/web/.next)

### `pnpm test`

Lance l'exécution de tests avec Jest de l'ensemble des applications et packages du monorepo sauf `e2e` : `app/cli`, `app/web`, `packages/cdk`, `packages/config`, `packages/emails`, `packages/fixtures`, `packages/lint`, `packages/migration`, `packages/storybook`, `packages/test`, `packages/ui`

### `pnpm test:integration`

Lance l'exécution des tests d'intégration avec Jest. Dans le cas où Docker est utilisé, il faut qu'il soit lancé au préalable avec `pnpm docker: start`.

### `pnpm test:e2e`

Lance l'exécution des tests de bout en bout avec Cypress. Dans le cas où Docker est utilisé, il faut qu'il soit lancé au préalable avec `pnpm docker: start`.

### `pnpm cli`

Lance l'application `cli`, qui propose un ensemble de commandes pour effectuer des traitements liés au déploiement.

### `pnpm clean`

Supprime le dossier `node_modules` à la racine du monorepo.

### `pnpm clean:workspaces`

Supprime les dossiers `node_modules` de tous les projets contenus dans le monorepo.

<h2 id="utilisation">🧭 Utilisation</h2>

### Développement de votre projet

Ce projet a été créé à partir d'un clone du [dépôt de la stack](https://github.com/inclusion-numerique/stack). \
Si vous développez une nouvelle fonctionnalité que vous pensez utile à d'autres, nous vous encourageons à la partager en créant une pull-request sur le [dépôt de la stack](https://github.com/inclusion-numerique/stack).

### Récupérer les mises à jour de ce dépôt

Stack est un dépôt de code source, et non un template, il est amené à évoluer régulièrement. \
Certaines mises à jour / nouveaux composants peuvent vous intéresser. Certains changements peuvent au contraire être en conflit avec les vôtres, ou ne pas vous convenir. Cela sera géré dans un flow de merge classique. \
Pour récupérer les mises à jour de ce dépôt, il faut ajouter le dépôt comme remote de votre projet :

```bash
git remote add stack git@github.com:inclusion-numerique/stack.git 
```

Cela vous permettra de voir facilement les changements entre votre projet et le dépôt stack.

Nous recommandons ensuite de créer dans votre projet une branche `stack` qui suivra la branche `main` de ce dépôt, et de la rebaser régulièrement sur la branche `main` de ce dépôt.

```bash
git checkout -b stack
git pull stack main
git rebase main
```

Ensuite, créez une PR sur votre branche principale (dev par exemple) pour intégrer les changements de la branche `stack` dans votre projet. \
Cela vous permettra de faire une code review de l'intégration des changements de ce dépôt dans votre projet pour valider les changements que vous souhaitez intégrer ou non, et de résoudre les conflits. \
Une fois cette PR fusionnée (utilisez bien un merge classique pour ne pas avoir à résoudre les conflits à nouveau). Vous avez intégré les changements de ce dépôt dans votre projet.

<h2 id="procédures">🤝 Procédures</h2>

### Branches

- **Branches à jour** : Les branches doivent être créées à partir d'une version à jour de la branche de développement `dev`.
- **Préfixes conventionnels** : Lors de la création de nouvelles branches, assurez-vous qu'elles sont préfixées par l'une des catégories suivantes : `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/`, en fonction de la nature des modifications. Consultez les [types de commits conventionnels](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index) pour en savoir plus sur ces catégories.

### Commits

- **Commits Conventionnels** : Les messages de commit doivent suivre la spécification [Commits Conventionnels](https://www.conventionalcommits.org/fr) pour être valides.

### Signature

La branche main, ainsi que l'ensemble des branches de travail avec un préfixe valide requièrent que les commits soient signés :
- La documentation de GitHub indique comment configurer la signature des commits
- Les utilisateurs de keybase peuvent signer leurs commits avec leur clé GPG sur Keybase

### Création et publication d'une nouvelle fonctionnalité

1. **Créez une nouvelle branche** : Utilisez `git checkout -b feat/nom-de-la-fonctionnalité-incroyable` pour créer une nouvelle branche pour vos modifications.
2. **Commitez vos modifications** : Effectuez vos modifications et commitez-les avec un message descriptif. Par exemple, `git commit -m "feat: ajoute une fonctionnalité incroyable"`.
3. **Publiez votre branche** : Poussez votre branche de fonctionnalité vers le dépôt distant avec `git push origin feat/nom-de-la-fonctionnalité-incroyable`.
4. **Ouvrez une Pull-Request** : Une fois vos modifications poussées, ouvrez une Pull-Request vers la branche de développement. Indiquez des détails sur les modifications et demandez une revue des contributeurs.

### Déploiement

Lorsqu'une branche est fusionnée avec `main`, cela déclenche automatiquement la mise à jour en production.

<h2 id="construit-avec">🏗️ Construit avec</h2>

### Langages, frameworks et bibliothèques

- [TypeScript](https://www.typescriptlang.org/) : Le langage de programmation utilisé ici, c'est un langage open source qui s'appuie sur JavaScript en ajoutant un typage statique.
- [React](https://react.dev/) : Bibliothèque JavaScript qui permet de créer des interfaces utilisateurs interactives et prévisibles.
- [React Hook Form](https://react-hook-form.com/) : Bibliothèque de construction de formulaires avec React.
- [Next.js](https://nextjs.org/) : Framework full-stack pour construire des applications web avec React.
- [Système de Design de l'État (dsfr)](https://www.systeme-de-design.gouv.fr/) : Ensemble de composants réutilisables répondant aux standards de l'état.
- [React dsfr](https://github.com/codegouvfr/react-dsfr) : Surcouche de compatibilité React pour le Système de Design de l'État
- [Remix Icon](https://remixicon.com/) : Collection d'icônes.
- [Zod](https://zod.dev/) : Validation de schéma fondé sur TypeScript.
- [tRPC](https://trpc.io/) : Intégrer des API stables en bénéficiant de l'inférence de Type de TypeScript.
- [Prisma](https://www.prisma.io/) : ORM compatible avec TypeScript.
- [mjml](https://mjml.io/) : Écrire des templates de mails avec React.
- [NextAuth.js](https://next-auth.js.org/) : Adaptateur pour services d'authentification.

### Outils

- [Biome](https://biomejs.dev/) : Formatteur et linteur pour JavaScript, CSS et TypeScript.
- [Jest](https://jestjs.io/) : Environnement d'exécution des tests unitaires.
- [Cypress](https://www.cypress.io) : Environnement d'exécution des tests de bout en bout et de tests de composants.
- [Storybook](https://storybook.js.org) : Permet de créer, documenter et tester des composants UI.
- [Sentry](https://sentry.io) : Plateforme de surveillance d'erreurs et de problèmes de performance.
- [MailDev](https://maildev.github.io/maildev/) : Serveur local et interface web pour capter les mails envoyés pendant le développement.
