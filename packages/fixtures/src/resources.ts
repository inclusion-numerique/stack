import { ResourceCreatedDataV1 } from '@app/web/server/resources/feature/CreateResource'
import type { Prisma } from '@prisma/client'
import { jmAvecTout } from '@app/fixtures/users'
import { baseFixtureAvecTout } from '@app/fixtures/bases'

const resourcePubliqueDansBaseConstant = {
  id: 'd4c3a9c8-01e4-4e46-a3f4-8dab0a3723b2',
  title:
    'Ressource publique dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-publique-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-publique-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourcePriveeDansBaseConstant = {
  id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
  title:
    'Ressource privée dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-privee-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-privee-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourceBrouillonDansBaseConstant = {
  id: '35eef26e-cc63-4adb-a761-eb44cef48361',
  title:
    'Ressource brouillon dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-brouillon-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-brouillon-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

export const resourcePubliqueDansBase = {
  id: resourcePubliqueDansBaseConstant.id,
  title: resourcePubliqueDansBaseConstant.title,
  slug: resourcePubliqueDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourcePubliqueDansBaseConstant.titleDuplicationCheckSlug,
  description: resourcePubliqueDansBaseConstant.description,
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  isPublic: true,
  events: {
    connectOrCreate: {
      where: {
        id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
      },
      create: {
        id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePubliqueDansBaseConstant.title,
          description: resourcePubliqueDansBaseConstant.description,
          slug: resourcePubliqueDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourcePubliqueDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourcePubliqueDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourcePriveeDansBase = {
  id: resourcePriveeDansBaseConstant.id,
  title: resourcePriveeDansBaseConstant.title,
  slug: resourcePriveeDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourcePriveeDansBaseConstant.titleDuplicationCheckSlug,
  description: resourcePriveeDansBaseConstant.description,
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  isPublic: false,

  events: {
    connectOrCreate: {
      where: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
      },
      create: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePriveeDansBaseConstant.title,
          description: resourcePriveeDansBaseConstant.description,
          slug: resourcePriveeDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourcePriveeDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourcePriveeDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourceBrouillonDansBase = {
  id: resourceBrouillonDansBaseConstant.id,
  title: resourceBrouillonDansBaseConstant.title,
  slug: resourceBrouillonDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourceBrouillonDansBaseConstant.titleDuplicationCheckSlug,
  description: resourceBrouillonDansBaseConstant.description,
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  events: {
    connectOrCreate: {
      where: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
      },
      create: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourceBrouillonDansBaseConstant.title,
          description: resourceBrouillonDansBaseConstant.description,
          slug: resourceBrouillonDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourceBrouillonDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourceBrouillonDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resources = [
  resourcePubliqueDansBase,
  resourcePriveeDansBase,
  resourceBrouillonDansBase,
]
