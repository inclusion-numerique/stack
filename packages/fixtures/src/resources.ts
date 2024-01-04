import { ResourceCreatedDataV1 } from '@app/web/server/resources/feature/CreateResource'
import type { Prisma } from '@prisma/client'

export const resourceLongue = {
  id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
  slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
  createdBy: { connect: { id: '99afd613-9d54-4110-9062-065c627eda8a' } },
  base: { connect: { id: 'cb08cddb-1657-49ac-a2f9-d9212b428690' } },
  events: {
    connectOrCreate: {
      where: {
        id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
      },
      create: {
        id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
        byId: '99afd613-9d54-4110-9062-065c627eda8a',
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
          title:
            'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
          description:
            'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
          slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
          titleDuplicationCheckSlug:
            'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
          baseId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
          id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resource10Raisons = {
  id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
  title:
    '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
  slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
  titleDuplicationCheckSlug:
    '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
  description: 'TODO...',
  createdBy: { connect: { id: 'eecac657-f415-47e1-8087-c4508ea16191' } },
  events: {
    connectOrCreate: {
      where: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
      },
      create: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
        byId: 'eecac657-f415-47e1-8087-c4508ea16191',
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
          byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
          title:
            '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
          description: 'TODO...',
          slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
          titleDuplicationCheckSlug:
            '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
          baseId: null,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourceTests = {
  id: '35eef26e-cc63-4adb-a761-eb44cef48361',
  title: "Tester c'est pour les devs qui écrivent des bugs...",
  slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
  titleDuplicationCheckSlug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
  description: 'TODO...',
  createdBy: { connect: { id: 'eecac657-f415-47e1-8087-c4508ea16191' } },
  events: {
    connectOrCreate: {
      where: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
      },
      create: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
        byId: 'eecac657-f415-47e1-8087-c4508ea16191',
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          id: '35eef26e-cc63-4adb-a761-eb44cef48361',
          byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
          title:
            '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
          description: 'TODO...',
          slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
          titleDuplicationCheckSlug:
            'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
          baseId: null,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resources = [resourceLongue, resource10Raisons, resourceTests]
