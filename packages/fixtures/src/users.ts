import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 10

export const users: Exclude<
  Parameters<typeof prismaClient.user.upsert>[0]['create'],
  undefined
>[] = [
  {
    id: '99afd613-9d54-4110-9062-065c627eda8a',
    firstName: 'Hugues',
    lastName: 'Maignol',
    name: 'Hugues Maignol',
    role: 'Administrator',
    email: 'hugues.maignol@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: 'eecac657-f415-47e1-8087-c4508ea16191',
    firstName: 'Xavier',
    lastName: 'Desoindre',
    name: 'Xavier Desoindre',
    role: 'Administrator',
    email: 'xavier.desoindre@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: '8e3c9cdc-3125-4c2e-a49e-796903e9989e',
    firstName: 'Thibault',
    lastName: 'Rouveyrol',
    name: 'Thibault Rouveyrol',
    role: 'Administrator',
    email: 'thibault.rouveyrol@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: '153aa33b-9938-4458-a5ec-7676636bdccd',
    firstName: 'Amélie',
    lastName: 'Naquet',
    name: 'Amélie Naquet',
    email: 'amelie.naquet@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '511a5801-78c5-45f0-8b55-be524f43a207',
    firstName: 'Sylvain',
    lastName: 'Aubry',
    name: 'Sylvain Aubry',
    email: 'sylvain.aubry@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '7de33f33-9a65-4473-83b6-4892d14155a4',
    firstName: 'Laurène',
    lastName: 'Zyskind',
    name: 'Laurène Zyskind',
    email: 'laurene.zyskind@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
]

export const randomUsers: (
  random: number,
) => Exclude<
  Parameters<typeof prismaClient.user.create>[0]['data'],
  undefined
>[] = (random) =>
  Array.from({ length: random * BASE_NUMBER }, (_, index) => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    return {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(),
      emailVerified: index % 3 ? null : new Date(),
    }
  })
