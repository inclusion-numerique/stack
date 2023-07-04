import { SessionUser } from '@app/web/auth/sessionUser'

export const hasAccessToDepartementDashboard = (
  user: Pick<SessionUser, 'role' | 'roleScope'>,
  departementCode: string,
) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }
  if (user.role === 'Prefect') {
    return user.roleScope === departementCode
  }
  return false
}

export const hasAccessToDataAnalysis = (user: Pick<SessionUser, 'role'>) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }

  return false
}
