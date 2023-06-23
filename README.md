# Stack

## Description

Stack est une application [Next.js](https://nextjs.org/docs) développée par le [Pôle Inclusion numérique de l'ANCT](https://societenumerique.gouv.fr/fr/les-services-de-linclusion-numerique/), utilisant le [Système de Design de l'Etat](https://www.systeme-de-design.gouv.fr/) et le [template commun de l'ANCT](https://www.figma.com/file/C9Ump1yh3z4DPMxm2qk3IY/Templates_communs?type=design&node-id=4-2946&t=d7Fn19OfHLoEcXqg-0) qui ajoute des composants métiers au Système de Design de l'Etat.

L'objectif de ce projet est de permettre une mise en ligne facile, rapide et respectant les critères de qualité de l'Incubateur des Territoires (sécurité, qualité de code, design, protection des données, respect de la confidentialité...).

Il contient les pages suivantes: 
- Accueil
- Connexion par lien magique et par le Single Sign On [Inclusion Connect](https://inclusion.beta.gouv.fr/nos-services/inclusion-connect/) 
- Page profil (🏗️ En cours)
- Politique de confidentialité (🏗️ En cours)
- Mentions légales (🏗️ En cours)
- Conditions générales d'utilisation (🏗️ En cours)
- Statistiques (🏗️ En cours)
- Déclaration d'accessibilité
- Page 404 / 500...

## Table des matières

- [🪧 Description](#description)
- [🏗️ Contenu technique (🏗️ En cours)](#construit-avec)
- [📦 Prérequis (🏗️ En cours)](#prérequis)
- [🚀 Installation (🏗️ En cours)](#installation)
- [🛠️ Utilisation (🏗️ En cours)](#utilisation)
- [🤝 Contribution (🏗️ En cours)](#contribution)
- [📝 Licence](#licence)
    
## Construit avec

### Langage & Framework

- TypeScript 
- Next.js 

### Tests

- Jest pour les tests unitaires
- Cypress pour les tests de composants et e2e
- ESlint pour l'analyse statique
- Prettier pour harmoniser la rédaction du code
- Storybook pour documenter et visualiser les interfaces
- Chromatic pour valider les interfaces 

## Statistiques

- Sentry pour les rapports d'erreur
- Matomo pour les statistiques d'utilisation

## Prérequis

Le projet nécessite les outils suivants pour fonctionner :
- Node 18
- pnpm 6
- postgresql ou Docker
- Un compte Scaleway pour pouvoir déployer l'application

## Installation

Pour commencer à utiliser le projet, il faut cloner le dépôt et installer les dépendances :

```bash
git clone git@github.com:inclusion-numerique/stack.git
pnpm install
pnpm project-postinstall
cp .env.dist .env
pnpm -F web dev 
```

## Infrastructure

Le package `cdk` contient les dépendances et le code nécéssaire pour déployer l'application sur Scaleway.️

[Voir la documentation du package cdk pour plus de détails.](./packages/cdk/Readme.md)

Il est possible de déployer l'application sur un autre cloud, ou sur un serveur en local, en modifiant le code du package `cdk` ou en créant votre propre pipeline de déploiement pour votre infrastructure.

## Utilisation


### Développement de votre projet

Votre projet part du clone de ce dépôt, et vous pouvez le modifier à votre guise.

Si vous développez une nouvelle fonctionnalité que vous pensez utile à d'autres, nous vous encourageons à la partager en créant une pull request sur ce dépôt.

### Récupérer les mises à jour de ce dépôt

Stack est un dépôt de code source, et non un template, il est ammené à évoluer régulièrement.

Certaines mises à jours / nouveaux composants peuvent vous intéresser. Certains changements peuvent au contraire être en conflit avec les votre, ou ne pas vous convenir. Cela sera géré dans un flow de merge classique.

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

Ensuite créez une PR sur votre branche principale (`dev` par exemple) pour intégrer les changements de la branche `stack` dans votre projet.

Cela vous permettra de faire une code review de l'integration des changements de ce dépôt dans votre projet pour valider les changements que vous souhaitez intégrer ou non, et de résoudre les conflits.

Une fois cette PR mergée (utilisez bien un merge classique pour ne pas avoir à résoudre les conflits à nouveau). Vous avez intégré les changements de ce dépôt dans votre projet.


## Contribution

### Nommage des branches

- Avant de créer une nouvelle branche de travail, récupérer les dernières modifications disponibles sur la branche main.
- La nouvelle branche de travail doit ête préfixée par `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/` en fonction du type de modification prévu, pour plus de détails à ce sujet, consulter [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

### Commits

#### Convention

Les commits de ce repository doivent respecter la syntaxe décrite par [la spécification des Commits Conventionnels](https://www.conventionalcommits.org/fr/v1.0.0/#sp%c3%a9cification)

#### Signature

La branche main, ainsi que l'ensemble des branches de travail avec un préfixe valide requièrent que les commits soient signés :

- La documentation de GitHub indique comment configurer la signature des commits
- Les utilisateurs de keybase peuvent signer leurs commits avec leur clé GPG sur Keybase

#### Déployer



## Licence

Voir le fichier [LICENSE](https://github.com/inclusion-numerique/stack/blob/main/LICENSE) du dépôt.
