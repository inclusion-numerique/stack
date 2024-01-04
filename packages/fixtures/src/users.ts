import type { Prisma } from '@prisma/client'

export const edith = {
  id: '99afd613-9d54-4110-9062-065c627eda8a',
  firstName: 'Edith',
  lastName: 'Piaf',
  name: 'Edith Piaf',
  email: 'edith@piaf.com',
  emailVerified: new Date(),
  isPublic: true,
} satisfies Prisma.UserCreateManyInput

export const joe = {
  id: 'f1826416-af31-402c-9d92-379d4ea7509e',
  firstName: 'Joe',
  lastName: 'Dassin',
  name: 'Joe Dassin',
  email: 'joe@dassin.com',
  emailVerified: new Date(),
} satisfies Prisma.UserCreateManyInput

export const georges = {
  id: 'eecac657-f415-47e1-8087-c4508ea16191',
  firstName: 'Georges',
  lastName: 'Moustaki',
  name: 'Georges Moustaki',
  email: 'georges@moustaki.com',
} satisfies Prisma.UserCreateManyInput

export const users = [edith, joe, georges]
