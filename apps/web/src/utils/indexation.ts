import type { Resource } from '@app/web/server/resources/getResource'

export const hasIndexation = (
  resource: Pick<Resource, 'themes' | 'supportTypes' | 'targetAudiences'>,
) =>
  (resource.themes && resource.themes.length > 0) ||
  (resource.supportTypes && resource.supportTypes.length > 0) ||
  (resource.targetAudiences && resource.targetAudiences.length > 0)
