import { UserSecurityRole } from '@app/web/authorization/userSecurityRole'
import {
  ProfilePermission,
  ProfileRole,
} from '@app/web/authorization/models/profileAuthorization'
import {
  ResourceContributorPermission,
  ResourcePermission,
  ResourceRole,
} from '@app/web/authorization/models/resourceAuthorization'
import {
  BaseMemberPermission,
  BasePermission,
  BaseRole,
} from '@app/web/authorization/models/baseAuthorization'
import {
  CollectionPermission,
  CollectionRole,
  SavedCollectionPermission,
} from '@app/web/authorization/models/collectionAuthorization'
import { ResourceReportPermission } from '@app/web/authorization/models/resourceReportAuthorization'
import { BaseFollowPermission } from '@app/web/authorization/models/baseFollowAuthorization'
import { ProfileFollowPermission } from '@app/web/authorization/models/profileFollowAuthorization'

export type Role =
  | UserSecurityRole
  | ProfileRole
  | ResourceRole
  | BaseRole
  | CollectionRole

export type Permission =
  | ProfilePermission
  | ResourcePermission
  | ResourceContributorPermission
  | BasePermission
  | BaseMemberPermission
  | CollectionPermission
  | SavedCollectionPermission
  | ResourceReportPermission
  | BaseFollowPermission
  | ProfileFollowPermission
