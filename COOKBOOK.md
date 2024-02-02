# Cookbook

## 📑 Table des matières

- [Créer une nouvelle page](#créer-une-nouvelle-page)
- [Créer une nouvelle table](#créer-une-nouvelle-table)
- [Créer un formulaire](#créer-un-formulaire)
- [Récupérer et afficher des données](#récupérer-et-afficher-des-données)
- [Modifier un élément](#modifier-un-élément)
- [Supprimer un élément avec un "soft delete"](#supprimer-un-élément-avec-un-soft-delete)
- [Mettre en place un test end-to-end](#mettre-en-place-un-test-end-to-end)

## Créer une nouvelle page

Les pages du site se trouvent dans le dossier [apps/web/src/app](apps/web/src/app).

Il existe deux types de pages :

- Les pages publiques, qui ne nécessitent pas d'être authentifié pour y accéder dans le dossier [apps/web/src/app/(public)](<apps/web/src/app/(public)>)
- Les pages privées, qui ne nécessitent une authentification pour y accéder dans le dossier [apps/web/src/app/(private)](<apps/web/src/app/(private)>)

Dans chacun de ces deux dossiers, il y a un fichier `layout.tsx`. Le layout est appliqué à toutes les pages qui se trouvent dans le même dossier. Le layout permet d'ajouter un header contenant le menu de connexion dans le cas des pages dans le dossier [apps/web/src/app/(private)](<apps/web/src/app/(private)>), le layout se charge de rediriger vers la page de connexion si l'utilisateur n'est pas connecté.

Créer un dossier `todo` dans [apps/web/src/app/(private)](<apps/web/src/app/(private)>), puis y ajouter le fichier `page.tsx` avec le contenu suivant :

```tsx
const TodoPage = async () => {
  return (
    <div className="fr-container">
      <h1 className="fr-mt-8v">Todo</h1>
    </div>
  )
}

export default TodoPage
```

Conformément au [App Router](https://nextjs.org/docs/app) de next.js, le dossier [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>) va créer un nouveau chemin d'URL `todo` qui affiche le contenu de [apps/web/src/app/(private)/todo/page.tsx](<apps/web/src/app/(private)/todo/page.tsx>).

Le dossier `(private)` étant entre parenthèse, il est ignoré dans le chemin de l'URL, la page est donc accessible sur http://localhost:3001/todo, il est nécessaire d'être authentifié pour y accéder.

## Créer une nouvelle table

Pour créer ou modifier une table, il faut passer par une modification du [schema.prisma](apps/web/prisma/schema.prisma), en ajoutant le modèle `todo` à la fin du fichier :

```prisma
model Todo {
  id          String @id @default(cuid())
  description String

  owner   User   @relation(fields: [ownerId], references: [id])
  ownerId String @map("owner_id") @db.Uuid

  created DateTime  @default(now())
  deleted DateTime?
  done    DateTime?

  @@index([ownerId])
  @@map("todos")
}
```

Le modèle `Todo` est identifié par un `id`, et matérialisé par une `dsescription` et un état `done` qui correspond à la date à laquelle la tache est finie. La date de suppression `deleted` permet de gérer un "soft delete", c'est à dire conserver l'entrée dans la base tout en la masquant à l'utilisateur. Enfin les attributs `ownerId` et `owner` permettent de faire le lien avec l'utilisateur.

Pour appliquer ces modifications du schéma sur la base, il faut générer et appliquer une nouvelle migration :

```bash
pnpm prisma:generate-migration todo_model
```

La nouvelle migration est disponible dans le dossier [apps/web/prisma/migrations](apps/web/prisma/migrations), préfixée par la date de génération du dossier, elle contient les instructions SQL pour mettre à jour la table.

Parfois, il arrive qu'on récupère une migration faite par un autre développeur, lorsque l'on met à jour une branche, il faut donc mettre à jour le schéma et appliquer la migration avec :

```bash
pnpm db:init
```

## Créer un formulaire

### Schema de validation Zod

Zod permet d'assurer la cohérence de type entre le schéma de la base et les données qui sont saisies via le formulaire.
Pour cela, il faut créer un schéma de validation et un type associé.
Créer le dossier `todos` dans le dossier [apps/web/src/server](apps/web/src/server) puis y ajouter le fichier `createTodo.ts` avec le contenu suivant :

```typescript
import z from 'zod'

export const todoDescriptionMaxLength = 250

export const descriptionValidation = z
  .string({ required_error: 'Veuillez renseigner la description de la tâche' })
  .trim()
  .min(1, 'Veuillez renseigner la description de la tâche')
  .max(
    todoDescriptionMaxLength,
    `La description ne doit pas dépasser ${todoDescriptionMaxLength} caractères`,
  )

export const CreateTodoCommandValidation = z.object({
  description: descriptionValidation,
})

export type CreateTodoCommand = z.infer<typeof CreateTodoCommandValidation>
```

La validation `CreateTodoCommandValidation` assure que la description de la tâche est bien définie, qu'elle ne contient pas un espace, et que la taille du texte est comprise entre 1 et 250 caractères.

Le type `CreateTodoCommand` permet de représenter un type correspondant à cette validation.

### Router pour les todos

Avant d'aller plus loin dans la création du formulaire, il faut une route côté back qui permet de réceptionner les informations du formulaire.

Créer un dossier `todo` dans [apps/web/src/server/rpc](apps/web/src/server/rpc), puis y ajouter le fichier `todoRouter.ts` avec le contenu suivant :

```typescript
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateTodoCommandValidation } from '../../todos/createTodo'

export const todoRouter = router({
  create: protectedProcedure
    .input(CreateTodoCommandValidation)
    .mutation(async ({ input: data, ctx: { user } }) =>
      prismaClient.todo.create({ data: { ...data, ownerId: user.id } }),
    ),
})
```

Le client Prisma permet ici de créer un nouvel élément dans la table todo et la présence de `CreateTodoCommandValidation` assure que les données reçues en "input" valident le schéma.
Le type géré par le client Prisma détecterait donc un souci de cohérence de type si le schéma de validation n'était pas aligné sur le schéma de la table `todo`.

Enfin, il faut déclarer `todoRouter` dans le routeur de l'application [apps/web/src/server/rpc/appRouter.ts](apps/web/src/server/rpc/appRouter.ts) :

```typescript
import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { todoRouter } from '@app/web/server/rpc/todo/todoRouter'

export const appRouter = router({
  user: userRouter,
  upload: uploadRouter,
  image: imageRouter,
  todo: todoRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
```

### Composant pour les champs du formulaire

#### Base du formulaire

Avec les server components de next.js, il est important d'avoir en tête qu'une partie des composants est rendu côté serveur et les autres sont rendu côté client.
Lorsque le rendu est intégralement fait côté serveur, le serveur ne renvoie que du html et aucun javascript n'est nécessaire côté client.
Mais dans certains cas, une intéraction est nécessaire, cela implique de télécharger du javascript côté client pour permettre les traitements.

> Une bonne pratique consiste à maximiser les rendus côté serveur et minimiser les composants rendus côté client.
> Cela permet de minimiser le besoin de javascript côté client, allège donc le contenu des requêtes et donc d'augmenter les performances.
> Pour réaliser cela, il faut que les fichiers `pages.tsx` soient conçu de telle sorte qu'ils n'aient jamais besoin d'exécution côté client
> et d'extraire les parties de la page qui nécessitent une intéraction client dans des composants dédiés.

Le formulaire d'ajout implique une intéraction côté client, il faut donc un composant spécifique qui sera rendu côté client.

Pour cela, il faut créer un dossier `ajouter` dans [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>), puis y ajouter le fichier `AddTodoForm.tsx` avec le contenu suivant :

```tsx
'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const {
  Component: CancelModal,
  close: closeCancelModal,
  buttonProps: cancelModalNativeButtonProps,
} = createModal({
  id: 'cancel-ajout-tache',
  isOpenedByDefault: false,
})

const AddTodoForm = () => {
  return (
    <form>
      <div className="fr-container">
        <h1 className="fr-my-8v">Ajouter une tâche</h1>
      </div>
      <div className="fr-mt-16w fr-py-2w fr-pr-16w fr-flex fr-justify-content-end fr-flex-gap-4v fr-border--top">
        <Button
          type="button"
          priority="secondary"
          {...cancelModalNativeButtonProps}
        >
          Annuler
        </Button>
        <Button type="submit">Créer la tâche</Button>
        <CancelModal
          title="Annuler l'ajout de la tâche"
          buttons={[
            {
              priority: 'secondary',
              type: 'button',
              children: "Revenir à l'ajout de la tâche",
              onClick: closeCancelModal,
            },
            { children: 'Annuler', linkProps: { href: '/todo' } },
          ]}
        >
          Êtes-vous sûr de vouloir annuler l'ajout de cette tâche ?
        </CancelModal>
      </div>
    </form>
  )
}

export default withTrpc(AddTodoForm)
```

`'use client'` en début de fichier indique qu'il s'agit d'un composant rendu côté client.
Pour le moment le formulaire est vide, mais il possède un bouton pour valider et un autre pour annuler.
Le bouton pour annuler ouvre une modale de confirmation qui permet de revenir sur le formulaire de création ou d'annuler et de revenir sur la page todo.

#### Champs du formulaire

Pour afficher le champ pour indiquer la `description`, il faut :

- Déclarer le formulaire avec `useForm` qui prend en paramètre un resolver zod assurant ainsi la cohérence entre la validation des données du formulaire et ce qui est attendu côté back.
- Déclarer la fonction `descriptionInfo` qui permet d'afficher le nombre de caractères disponibles.
- Utiliser le composant `InputFormField` qui va afficher le camp en précisant :
  - le control du formulaire associé avec `control={form.control}`
  - le chemin de la propriété `path="description"` : l'intégration avec zod permet de n'autoriser que les champs attendus dans le formulaire, un chemin inexistant affiche une erreur.
  - l'état du formulaire qui se désactive tant que l'envoi de la requête est en cours avec `disabled={form.formState.isSubmitting}`.
  - et `asterisk` indique que c'est une valeur obligatoire.

```tsx
/* ... */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import {
  CreateTodoCommand,
  CreateTodoCommandValidation,
  todoDescriptionMaxLength,
} from '@app/web/server/todos/CreateTodo'

const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${todoDescriptionMaxLength} caractères`

/* ... */

const AddTodoForm = () => {
  const form = useForm<CreateTodoCommand>({
    resolver: zodResolver(CreateTodoCommandValidation),
  })

  return (
    <form>
      <div className="fr-container">
        <h1 className="fr-my-8v">Ajouter une tâche</h1>
        <InputFormField
          control={form.control}
          path="description"
          label="Description de la tâche"
          disabled={form.formState.isSubmitting}
          asterisk
          info={descriptionInfo}
        />
      </div>
      /* ... */
    </form>
  )
}

export default withTrpc(AddTodoForm)
```

#### Mutation des données

[tRPC](https://trpc.io/) a pour rôle d'interagir avec le back pour effectuer la sauvegarde des données.
L'état de la requête via tRPC et du formulaire permettent de déduire et d'afficher un état de chargement du bouton :

```tsx
/* ... */
import { trpc } from '@app/web/trpc'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'

/* ... */

const AddTodoForm = () => {
  /* ... */

  const mutate = trpc.todo.create.useMutation()

  const isLoading =
    form.formState.isSubmitting || mutate.isPending || mutate.isSuccess

  return (
    <form>
      /* ... */
      <div className="fr-mt-16w fr-py-2w fr-pr-16w fr-flex fr-justify-content-end fr-flex-gap-4v fr-border--top">
        /* ... */
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Créer la tâche
        </Button>
        /* ... */
      </div>
    </form>
  )
}

export default withTrpc(AddTodoForm)
```

#### Soumission du formulaire

La dernière étape consiste à envoyer les données du formulaire lorsque le bouton `Créer la tâche` a été cliqué :

```tsx
/* ... */
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'

/* ... */

const AddTodoForm = () => {
  const router = useRouter()

  /* ... */

  const onSubmit = async (data: CreateTodoCommand) => {
    try {
      await mutate.mutateAsync(data)
      router.push('/todo')
      router.refresh()

      createToast({
        priority: 'success',
        message: 'La tâche a bien été créée',
      })
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>/* ... */</form>
}

export default withTrpc(AddTodoForm)
```

Lorsque le bouton `Créer la tâche` a été cliqué, la fonction `form.handleSubmit` tente de valider les données du formulaire en utilisant le schéma zod :

- Si le formulaire n'est pas valide, le message défini dans le schéma zod est affiché avec un état d'erreur.
- Si le formulaire est valide, la fonction `onSubmit` est appelée

La fonction `onSubmit` reçois les données valides du formulaire, procède à l'ajout de la tâche avec `await mutate.mutateAsync(data)`, puis redirige vers la page `todo` avec un message de succès qui indique que "la tâche a bien été créée".
Si une erreur de validation se produit côté back, le catch a pour rôle d'appliquer ces messages d'erreurs au formulaire, en effet, il peut arriver que certaines validations ne se produisent que côté back, par exemple la vérification de l'unicité d'un élément.

### Page pour le formulaire de création d'une tâche

Ajouter le fichier `page.tsx` dans [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>) avec le contenu suivant :

```tsx
import AddTodoForm from './AddTodoForm'

const AddTodoPage = async () => {
  return <AddTodoForm />
}

export default AddTodoPage
```

Conformément aux explications de la partie [Créer une nouvelle page](#créer-une-nouvelle-page), la page d'ajout d'une tâche est accessible via l'URL http://localhost:3001/todo/ajouter, à condition d'être connecté.

L'ajout d'un lien permet d'accéder à cette page depuis la page [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>) :

```tsx
import Link from 'next/link'

const TodoPage = async () => {
  return (
    <div className="fr-container">
      <div className="fr-mb-6w fr-flex fr-justify-content-space-between fr-align-items-center">
        <h1 className="fr-mt-8v">Todo</h1>
        <Link
          className="fr-btn fr-btn--icon-left fr-icon-add-line fr-btn--secondary"
          href={`/todo/ajouter`}
        >
          Ajouter une tâche
        </Link>
      </div>
    </div>
  )
}

export default TodoPage
```

### Afficher un état de chargement

Lorsqu'une page est rendue côté back, il n'y a pas besoin d'afficher un état de chargement.
Mais si une page contient des composants chargés côté front, il est possible d'afficher un état de chargement temporaire en attendant que la page soit prête.

Dans le dossier [apps/web/src/app/%28private%29/todo/ajouter](apps/web/src/app/%28private%29/todo/ajouter), ajouter un fichier `loading.tsx` avec le contenu suivant :

```tsx
import React from 'react'

const LoadingAddTodoPage = () => (
  <div className="fr-container">
    <h1 className="fr-my-8v">Ajouter une tâche</h1>
    <div className="fr-input-group">
      <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--240" />
      <input className="fr-input" disabled />
    </div>
  </div>
)

export default LoadingAddTodoPage
```

Cet état de chargement a pour but d'imiter l'allure générale de la page, mais en remplissant les contenus.
Par exemple le label du champ est remplacé par un rectangle.
Dans le cas présent, il n'y a pas de raison que le chargement prenne beaucoup de temps, donc l'état de chargement n'apparait que très furtivement.
Mais dans le cas où des requêtes asynchrones doivent être réalisés depuis le client, il devient plus pertinent de mettre des états de chargements en attendant la réponse.

## Récupérer et afficher des données

### Rechercher les tâches d'un utilisateur

Avant d'afficher la liste des tâches d'un utilisateur, il faut d'abord les récupérer en utilisant le client prisma.
Ajouter le dossier `todos` dans [apps/web/src/server](apps/web/src/server) s'il n'existe pas déjà et y créer le fichier `getUserTodoList.ts` avec le contenu suivant :

```typescript
import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'

export const todoSelect = {
  id: true,
  description: true,
  created: true,
  done: true,
} satisfies Prisma.TodoSelect

const todoOwnerIs = (user?: Pick<SessionUser, 'id'> | null) => ({
  ownerId: user?.id,
})

export const getUserTodoList = async (user: Pick<SessionUser, 'id'> | null) =>
  prismaClient.todo.findMany({
    select: todoSelect,
    where: todoOwnerIs(user),
  })

export type TodoListItem = Exclude<
  Awaited<ReturnType<typeof getUserTodoList>>,
  null
>[number]
```

La fonction `getUserTodoList` utilise le client prisma pour récupérer la liste des tâches en sélectionnant les champs `id`, `description`, `created` et `done`
en filtrant avec une clause where pour ne récupérer que les tâches pour lesquelles le champ `ownerId` correspond à l'id de l'utilisateur.
Le type `TodoListItem` représente un élément de la liste.

### Créer un composant pour afficher la liste des tâches

La liste des tâches peut être rendue côté serveur, mais un composant permet de mieux organiser le code. Dans le dossier [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>), créer le fichier `TodoList.tsx` avec le contenu suivant :

```tsx
import { TodoListItem } from '@app/web/server/todos/getUserTodoList'

const TodoList = ({ todoList }: { todoList: TodoListItem[] }) => (
  <ul className="fr-raw-list">
    {todoList.map((todo) => (
      <li className="fr-flex" key={todo.id}>
        <div className="fr-py-2w fr-border--bottom">
          <span className="fr-flex fr-direction-column">
            {todo.description}
            <span className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-mt-1v">
              <span className="fr-icon-calendar-line fr-icon--sm fr-pr-1v"></span>
              {todo.created.toDateString()}
            </span>
          </span>
        </div>
      </li>
    ))}
  </ul>
)

export default TodoList
```

Ensuite, il suffit d'utiliser le composant dans [apps/web/src/app/%28private%29/todo/page.tsx](apps/web/src/app/%28private%29/todo/page.tsx) :

```tsx
/* ... */
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getUserTodoList } from '@app/web/server/todos/getUserTodoList'
import TodoList from './TodoList'

const TodoPage = async () => {
  const user = await getSessionUser()
  const todoList = await getUserTodoList(user)

  return (
    <div className="fr-container">
      /* ... */
      <TodoList todoList={todoList} />
    </div>
  )
}

export default TodoPage
```

### Afficher un message lorsqu'il n'y a pas de données

Arriver devant une page vide n'est pas forcément idéale, pour y remédier, il peut être intéressant d'afficher un contenu alternatif.

Aouter le fichier `EmptyTodoList.tsx` dans le dossier [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>) avec le contenu suivant :

```tsx
import Link from 'next/link'
import React from 'react'

const EmptyTodoList = () => (
  <div className="fr-text--center fr-background-alt--blue-france fr-p-6w">
    <h6 className="fr-mb-1w">Vous n'avez aucune tâche à faire !</h6>
    <div>
      La liste de tâches vous permet de savoir à tout moment ce qu'il vous reste
      à faire. Vous pouvez ajouter une tâche et lui donner une description.
    </div>
    <Link
      className="fr-btn fr-btn--icon-left fr-icon-add-line  fr-mt-4w"
      href={`/todo/ajouter`}
    >
      Ajouter une tâche
    </Link>
  </div>
)

export default EmptyTodoList
```

Puis ajouter ce composant dans le fichier [apps/web/src/app/(private)/todo/page.tsx](<apps/web/src/app/(private)/todo/page.tsx>) :

```tsx
/* ... */

const TodoPage = async () => {
  /* ... */

  return (
    <div className="fr-container">
      /* ... */
      {todoList.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <TodoList todoList={todoList} />
      )}
    </div>
  )
}
```

## Modifier un élément

Pour marquer un élément de la liste comme terminé, il faut créer une nouvelle route qui nous permettra de modifier une tâche en indiquant la date à laquelle elle a été réalisée.

Créer un fichier `toggleDone.ts` dans le dossier [apps/web/src/server/todos](apps/web/src/server/todos) avec le contenu suivant :

```typescript
import z from 'zod'

export const ToggleDoneCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la tâche" }),
  isDone: z.boolean().default(false),
})
```

Dans le fichier [apps/web/src/server/rpc/todo/todoRouter.ts](apps/web/src/server/rpc/todo/todoRouter.ts), ajouter le la procédure `toggleDone` :

```typescript
/* ... */
import { ToggleDoneCommandValidation } from '../../todos/toggleDone'

export const todoRouter = router({
  /* ... */
  toggleDone: protectedProcedure
    .input(ToggleDoneCommandValidation)
    .mutation(async ({ input: { id, isDone } }) =>
      prismaClient.todo.update({
        where: { id },
        data: { done: isDone ? new Date() : null },
      }),
    ),
})
```

Ce code fonctionne, mais présente un problème de sécurité : en effet, il est possible pour n'importe quel utilisateur connecté de construire une requête qui permet de modifier n'importe quel todo, dans que l'id correspond.
Pour empêcher cela, il faut veiller à faire correspondre la propriété `ownerId` de la tâche à modifier avec l'identifiant de l'utilisateur qui a initié la requête :

```typescript
/* ... */

export const todoRouter = router({
  /* ... */
  toggleDone: protectedProcedure
    /* ... */
    .mutation(async ({ input: { id, isDone }, ctx: { user } }) =>
      prismaClient.todo.update({
        where: { id, ownerId: user.id },
        /* ... */
      }),
    ),
})
```

Côté interface, il faut ajouter un `input` de type `checkbox` pour chaque ligne de la liste des tâches, nous nous en servirons pour modifier chaque tâche en modifiant son état pour indiquer si elle reste à faire ou si elle est terminée :

```tsx
import { TodoListItem } from '@app/web/server/todos/getUserTodoList'

const TodoList = ({ todoList }: { todoList: TodoListItem[] }) => (
  <ul className="fr-toggle__list">
    {todoList.map((todo) => (
      <li className="fr-flex" key={todo.id}>
        <div className="fr-toggle fr-toggle--border-bottom fr-toggle--label-left fr-width-full">
          <input
            type="checkbox"
            className="fr-toggle__input"
            id={`task-${todo.id}`}
          />
          <label
            className="fr-toggle__label"
            htmlFor={`task-${todo.id}`}
            data-fr-checked-label="Terminé"
            data-fr-unchecked-label="À faire"
          >
            <span className="fr-flex fr-direction-column">
              {todo.description}
              <span className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-mt-1v">
                <span className="fr-icon-calendar-line fr-icon--sm fr-pr-1v"></span>
                {todo.created.toDateString()}
              </span>
            </span>
          </label>
        </div>
      </li>
    ))}
  </ul>
)
```

La prochaine étape est d'ajouter l'intéraction qui permet effectivement de mettre à jour la tâche depuis l'interface.
Comme il est recommandé de faire des composants intéractifs les plus petits possibles et les plus bas dans la hiérarchie des composants,
ajouter un nouveau composant `ToggleTodo.tsx` dans [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>) avec le contenu suivant :

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { createToast } from '@app/ui/toast/createToast'
import { TodoListItem } from '@app/web/server/todos/getUserTodoList'

const ToggleTodo = ({
  todo,
  inputId,
}: {
  todo: TodoListItem
  inputId: string
}) => {
  const router = useRouter()

  const mutate = trpc.todo.toggleDone.useMutation()

  const isLoading = mutate.isPending

  const toggleDone = async ({ id, done }: TodoListItem) => {
    try {
      await mutate.mutateAsync({ id, isDone: done == null })

      router.refresh()

      createToast({
        priority: 'success',
        message: 'Le statut de la tâche a été mis à jour',
      })
    } catch (error) {
      createToast({
        priority: 'error',
        message: "Le statut de la tâche n'a pas pu être mis à jour",
      })
    }
  }

  return (
    <input
      type="checkbox"
      className="fr-toggle__input"
      id={inputId}
      disabled={isLoading}
      checked={todo.done != null}
      onChange={() => toggleDone(todo)}
    />
  )
}
export default withTrpc(ToggleTodo)
```

La fonction `toggleDone` est appelée à chaque changement sur l'input, en applique la mutation `toggleDone` qui va ajouter une date `done` ou la mettre à `null` en fonction de l'état précédent de `done`.
En cas de succès, le contenu de la page est rechargé et un message de succès apparaît. Une erreur est signalée par un message.

La valeur de `checked` de l'interrupteur est déduit de présence ou non d'une date dans `todo.done`, et l'état `disabled` est actif pendant que la requête est en train d'être exécutée.

Il ne reste plus qu'à utiliser ce composant dans [TodoList.tsx](<apps/web/src/app/(private)/todo/TodoList.tsx>) :

```tsx
/* ... */
import ToggleTodo from './ToggleTodo'

const TodoList = ({ todoList }: { todoList: TodoListItem[] }) => (
  <ul className="fr-toggle__list">
    {todoList.map((todo) => (
      <li className="fr-flex" key={todo.id}>
        <div className="fr-toggle fr-toggle--border-bottom fr-toggle--label-left fr-width-full">
          <ToggleTodo todo={todo} inputId={`task-${todo.id}`} />
          /* ... */
        </div>
      </li>
    ))}
  </ul>
)

export default TodoList
```

Pour terminer, il serait intéressant de trier les tâches de façon à faire apparaître les tâches à faire en premier en les triant par date de création, et de faire apparaître les tâches terminées après en les triant par date de fin.

Dans le fichier [getUserTodoList.ts](apps/web/src/server/todos/getUserTodoList.ts), ajouter la propriété de tri :

```typescript
/* ... */

export const getUserTodoList = async (user: Pick<SessionUser, 'id'> | null) =>
  prismaClient.todo.findMany({
    /* ... */
    orderBy: [{ done: 'desc' }, { created: 'desc' }],
  })

/* ... */
```

## Supprimer un élément avec un "soft delete"

Le principe du "soft delete" est d'inscrire une date de suppression pour l'élément concerné, sans le supprimer réellement. Celà revient donc à une modification.

Créer un fichier `deleteTodo.ts` dans le dossier [apps/web/src/server/todos](apps/web/src/server/todos) avec le contenu suivant :

```typescript
import z from 'zod'

export const DeleteTodoCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la tâche" }),
})
```

Dans le fichier [apps/web/src/server/rpc/todo/todoRouter.ts](apps/web/src/server/rpc/todo/todoRouter.ts), ajouter le la procédure `delete` :

```typescript
/* ... */
import { DeleteTodoCommandValidation } from '../../todos/deleteTodo'

export const todoRouter = router({
  /* ... */
  delete: protectedProcedure
    .input(DeleteTodoCommandValidation)
    .mutation(async ({ input: { id }, ctx: { user } }) =>
      prismaClient.todo.update({
        where: { id, ownerId: user.id },
        data: { deleted: new Date() },
      }),
    ),
})
```

Cette route modifie donc la date `deleted` en veillant bien à ce que l'id de la tâche corresponde et que l'utilisateur qui a initié la requête correspond bien au propriétaire de la tâche en vérifiant la correspondance avec la propriété `ownerId`.

Dans le dossier [apps/web/src/app/(private)/todo](<apps/web/src/app/(private)/todo>), ajouter un nouveau composant `DeleteTodo.tsx` avec le contenu suivant :

```tsx
'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { TodoListItem } from '@app/web/server/todos/getUserTodoList'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useRouter } from 'next/navigation'
import { trpc } from '@app/web/trpc'
import { createToast } from '@app/ui/toast/createToast'

const DeleteTodo = ({ todo }: { todo: TodoListItem }) => {
  const {
    Component: DeleteModal,
    close: closeDeleteModal,
    buttonProps: deleteModalNativeButtonProps,
  } = createModal({
    id: `delete-resource-${todo.id}`,
    isOpenedByDefault: false,
  })

  const router = useRouter()
  const mutate = trpc.todo.delete.useMutation()

  const isLoading = mutate.isPending

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({ id: todo.id })

      closeDeleteModal()
      router.refresh()

      createToast({
        priority: 'success',
        message: 'Le tâche a bien été supprimée',
      })
    } catch (error) {
      createToast({
        priority: 'error',
        message: "Le tâche n'a pas pu être supprimée",
      })
    }
  }

  return (
    <div className="fr-m-2w">
      <button
        className="fr-btn fr-btn--tertiary fr-btn--sm fr-icon-delete-line fr-btn--icon-left"
        {...deleteModalNativeButtonProps}
      >
        Supprimer
      </button>
      <DeleteModal
        title="Supprimer la tâche"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            ...buttonLoadingClassname(isLoading, 'fr-btn--danger'),
            onClick: onDelete,
          },
        ]}
      >
        Confirmez-vous la suppression de cette tâche ?
      </DeleteModal>
    </div>
  )
}
export default withTrpc(DeleteTodo)
```

`DeleteTodo` affiche un bouton qui ouvre une modale de confirmation de suppression de la tâche. Si la suppression est validée, la requête qui conduit à l'ajout de la date de suppression est déclenchée.
Si la requête se déroule avec succès, la modale de confirmation est supprimée, le contenu de la page est rechargé, puis un message de confirmation est affiché.
En cas d'erreur un message est également affiché. Le bouton de confirmation de suppression de la modale est désactivé le temps que la requête soit exécuté.

Puis utiliser ce composant dans [TodoList.tsx](<apps/web/src/app/(private)/todo/TodoList.tsx>) :

```tsx
/* ... */
import DeleteTodo from './DeleteTodo'

const TodoList = ({ todoList }: { todoList: TodoListItem[] }) => (
  <ul className="fr-toggle__list">
    {todoList.map((todo) => (
      <li className="fr-flex" key={todo.id}>
        /* ... */
        <DeleteTodo todo={todo} />
      </li>
    ))}
  </ul>
)

export default TodoList
```

Pour que la suppression d'une tâche fasse disparaître l'élément concerné de la liste, il manque un filtre pour ne pas remonter les tâches dont la date de suppression est présente.

Dans le fichier [getUserTodoList.ts](apps/web/src/server/todos/getUserTodoList.ts), ajouter le filtre sur le champ `deleted` :

```typescript
/* ... */

const notDeleted = () => ({
  deleted: null,
})

export const getUserTodoList = async (user: Pick<SessionUser, 'id'> | null) =>
  prismaClient.todo.findMany({
    /* ... */
    where: { ...todoOwnerIs(user), ...notDeleted() },
    /* ... */
  })

/* ... */
```

## Mettre en place un test end-to-end
