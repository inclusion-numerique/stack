import { prismaClient } from '@app/web/prismaClient'

export const fixtureUsers: Exclude<
  Parameters<typeof prismaClient.user.upsert>[0]['create'],
  undefined
>[] = [
  {
    id: '99afd613-9d54-4110-9062-065c627eda8a',
    firstName: 'Edith',
    lastName: 'Piaf',
    name: 'Edith Piaf',
    email: 'edith@piaf.com',
    emailVerified: new Date(),
  },
  {
    id: 'eecac657-f415-47e1-8087-c4508ea16191',
    firstName: 'Georges',
    lastName: 'Moustaki',
    name: 'Georges Moustaki',
    email: 'georges@moustaki.com',
  },
]
