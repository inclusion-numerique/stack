import { v4 } from 'uuid'
import {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import { CreateResourceCommand } from '@app/web/server/resources/feature/CreateResource'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import {
  CreateBaseInput,
  CreateUserInput,
  sendResourceCommands,
} from '../e2e/authentication/user.tasks'
import { PublishCommand } from '@app/web/server/resources/feature/PublishResource'

export const appUrl = (path: string) =>
  `${Cypress.config().baseUrl}${encodeURI(path)}`

export const createTestUser = (publicProfile?: boolean, userId?: string) =>
  ({
    id: userId || v4(),
    legacyId: null,
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: 'Jean Biche',
    emailVerified: new Date('2023-04-01'),
    isPublic: publicProfile || false,
  }) satisfies CreateUserInput

export const createTestBase = (ownerId: string, isPublic?: boolean) =>
  ({
    id: v4(),
    title: 'Conseiller numérique France Services - contributions',
    slug: 'conseiller-numérique-france-services-contributions',
    titleDuplicationCheckSlug:
      'conseiller-numérique-france-services-contributions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
    ownerId,
    isPublic,
    email: 'test@mail.fr',
    emailIsPublic: true,
    members: { create: [{ memberId: ownerId, isAdmin: true }] },
  } satisfies CreateBaseInput)

export const createTestPublishResourceCommand = (
  resourceId: string,
  isPublic?: boolean,
) =>
  ({
    name: 'Publish',
    payload: isPublic
      ? {
          resourceId,
          isPublic: true,
          themes: ['theme-1'],
          supportTypes: ['support-1'],
          targetAudiences: ['target-1'],
        }
      : { resourceId, isPublic: false },
  } satisfies PublishCommand)

export const createTestResourceCommands = ({
  baseId,
  resourceId: resourceIdParam,
}: {
  baseId?: string
  resourceId?: string
}): [CreateResourceCommand, ...ResourceMutationCommand[]] => {
  const resourceId = resourceIdParam || v4()
  return [
    {
      name: 'CreateResource',
      payload: {
        resourceId,
        baseId: baseId || null,
        title:
          'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
        description:
          'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
      },
    },
    {
      name: 'AddContent',
      payload: {
        resourceId,
        title: 'Mon premier titre de section',
        type: 'SectionTitle',
      },
    },
    {
      name: 'AddContent',
      payload: {
        resourceId,
        type: 'Text',
        text: '<p>Mon premier paragraphe</p>',
      },
    },
    {
      name: 'AddContent',
      payload: {
        resourceId,
        type: 'Link',
        title: 'Vous avez vu mon lien',
        url: 'https://www.imdb.com/title/tt0357111/',
        showPreview: false,
        caption: 'Il est beau hein !',
      },
    },
  ] satisfies [CreateResourceCommand, ...ResourceMutationCommand[]]
}