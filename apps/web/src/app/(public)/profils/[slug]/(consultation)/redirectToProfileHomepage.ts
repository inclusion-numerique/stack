import { ProfilePageData } from '@app/web/server/profiles/getProfile'

export const profileHomepageUrl = (profile: Pick<ProfilePageData, 'id'>) =>
  // TODO use slug when slugified
  `/profils/${profile.id}`
