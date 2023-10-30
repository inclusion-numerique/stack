import type {
  Base,
  BaseMembers,
  Collection,
  CollectionResource,
  Resource,
  ResourceContributors,
  User,
} from '@prisma/client'

type SessionUserCollectionFragment = Pick<
  Collection,
  'id' | 'isPublic' | 'title'
> & {
  resources: Pick<CollectionResource, 'resourceId'>[]
}

type SessionUserBaseFragment = Pick<
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
  ownedBases: SessionUserBaseFragment[]
  bases: (Pick<BaseMembers, 'isAdmin'> & {
    base: SessionUserBaseFragment
  })[]
  collections: SessionUserCollectionFragment[]
  resources: Pick<ResourceContributors, 'resourceId'>[]
  createdResources: Pick<Resource, 'id' | 'slug'>[]
}
