import { faker } from '@faker-js/faker'
import { AppPrisma } from '@app/web/prisma'

const BASE_NUMBER = 10

export const users = [
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
  {
    id: 'f618dff9-b217-41fa-9dbb-a441aad535ed',
    firstName: 'Gabriel',
    lastName: 'Fonlladosa',
    name: 'Gabriel Fonlladosa',
    email: 'gabriel.fonlladosa@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '80fb420f-e9c5-44e9-ae2d-d5b431a9bbc4',
    firstName: 'Julie',
    lastName: 'Ripa',
    name: 'Julie Ripa',
    email: 'julie.ripa@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'f5dfe079-7534-47de-b00d-ec415c89a662',
    firstName: 'Estelle',
    lastName: 'Patat',
    name: 'Estelle Patat',
    email: 'estelle.patat@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'de0dfd09-5958-4467-be86-b16002f9e00a',
    firstName: 'Julia',
    lastName: 'Herriot',
    name: 'Julia Herriot',
    email: 'julia.herriot@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '124843a6-7682-4234-b9b7-646f7ae09cfb',
    firstName: 'Pierre-Louis',
    lastName: 'Rolle',
    name: 'Pierre-Louis Rolle',
    email: 'pierre-louis.rolle@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '33d9b439-2a7c-4fa7-bf68-36345ac9d9d2',
    firstName: 'Léa',
    lastName: 'Gislais',
    name: 'Léa Gislais',
    email: 'lea.gislais@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'a5e05571-9fdb-4adc-8abb-ef3beecb0a16',
    firstName: 'Marine',
    lastName: 'Jouan',
    name: 'Marine Jouan',
    email: 'marine.jouan@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '63aa97b4-cd37-4487-8d27-e093bcb28a02',
    firstName: 'Kevin',
    lastName: 'Thuillier',
    name: 'Kevin Thuillier',
    email: 'kevin.thuillier@numerique.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'cec429c0-47c7-49f3-9200-66bd82b69347',
    firstName: 'Célestin',
    lastName: 'Leroux',
    name: 'Célestin Leroux',
    email: 'celestin.leroux@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
] satisfies AppPrisma.UserCreateInput[]

export const randomUsers: (random: number) => AppPrisma.UserCreateInput[] = (
  random,
) =>
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
