export const CollectionRoles = {
  CollectionOwner: 'CollectionOwner',
  CollectionVisitor: 'CollectionVisitor',
} as const

export type CollectionRole =
  (typeof CollectionRoles)[keyof typeof CollectionRoles]

export const CollectionPermissions = {
  ReadGeneralCollectionInformation: 'ReadGeneralCollectionInformation',
  WriteCollection: 'WriteCollection',
  DeleteCollection: 'DeleteCollection',
  ReadCollectionContent: 'ReadCollectionContent',
} as const

export const collectionPermissions = Object.values(CollectionPermissions)

export type CollectionPermission =
  (typeof CollectionPermissions)[keyof typeof CollectionPermissions]

export const SavedCollectionPermissions = {
  SaveCollection: 'SaveCollection',
  UnsaveCollection: 'UnsaveCollection',
} as const

export const savedCollectionPermissions = Object.values(
  SavedCollectionPermissions,
)

export type SavedCollectionPermission =
  (typeof SavedCollectionPermissions)[keyof typeof SavedCollectionPermissions]
