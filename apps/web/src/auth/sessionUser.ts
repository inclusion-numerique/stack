import type {
  Resource,
  ResourceContributors,
  Base,
  User,
  BaseMembers,
} from '@prisma/client'

// Serializable user interface
export type SessionUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'isPublic' | 'legacyId'
> & {
  image: {
    id: string
    altText: string | null
  } | null
  emailVerified: string | null
  created: string | null
  updated: string | null
  ownedBases: Pick<Base, 'slug' | 'title' | 'id' | 'isPublic'>[]
  bases: (Pick<BaseMembers, 'isAdmin'> & {
    base: Pick<Base, 'slug' | 'title' | 'id' | 'isPublic'>
  })[]
  resources: Pick<ResourceContributors, 'resourceId'>[]
  createdResources: Pick<Resource, 'id' | 'slug'>[]
}
