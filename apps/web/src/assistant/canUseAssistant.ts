import { SessionUser } from '@app/web/auth/sessionUser'
import { hasFeatureFlag } from '@app/web/security/hasFeatureFlag'

export const canUseAssistant = (
  user: Pick<SessionUser, 'featureFlags' | 'role'> | null,
): boolean => {
  if (!user) {
    return false
  }

  // Admin and support can use the assistant
  if (user.role === 'Admin' || user.role === 'Support') {
    return true
  }

  // Users can use the assistant if they have the feature flag
  return hasFeatureFlag(user, 'Assistant')
}

export const canEditAssistantConfiguration = (
  user: Pick<SessionUser, 'featureFlags' | 'role'>,
): boolean => {
  if (!user) {
    return false
  }

  // Admin and support can edit the assistant configuration
  if (user.role === 'Admin' || user.role === 'Support') {
    return true
  }

  // Users cannot edit their personal assistant configuration
  return false
}
