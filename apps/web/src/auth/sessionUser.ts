import type {
  Base,
  BaseMembers,
  Collection,
  CollectionResource,
  Resource,
  ResourceContributors,
  User,
} from '@prisma/client'

export type SessionUserCollectionFragment = Pick<
  Collection,
  'id' | 'isPublic' | 'title'
> & {
  resources: Pick<CollectionResource, 'resourceId'>[]
}

export type SessionUserBase = Pick<
  Base,
  'slug' | 'title' | 'id' | 'isPublic'
> & {
  collections: SessionUserCollectionFragment[]
}

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
  ownedBases: SessionUserBase[]
  bases: (Pick<BaseMembers, 'isAdmin'> & {
    base: SessionUserBase
  })[]
  collections: SessionUserCollectionFragment[]
  resources: Pick<ResourceContributors, 'resourceId'>[]
  createdResources: Pick<Resource, 'id' | 'slug'>[]
}
