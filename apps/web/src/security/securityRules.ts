import { SessionUser } from '@app/web/auth/sessionUser'

export const hasWriteAccessOnScope = (
  user: Pick<SessionUser, 'role' | 'roleScope'>,
  {
    departementCode,
  }: {
    departementCode: string
  },
) => {
  if (user.role === 'Administrator') {
    return true
  }
  if (user.role === 'PrefectureDepartement') {
    return user.roleScope === departementCode
  }
  if (user.role === 'PrefectureRegion') {
    return false // Region do not have write access anymore
  }
  return false
}

export const hasAccessToAdministration = (
  user: Pick<SessionUser, 'role'> | null,
) => user?.role === 'Administrator' || user?.role === 'Demo'

// Accès aux remontées de gouvernance
export const hasAccessToRemonteesGouvernances = (
  user: Pick<SessionUser, 'role'> | null,
) => !!user && user.role !== 'User'

export const canAddGouvernancePressentie = (
  user: Pick<SessionUser, 'role' | 'roleScope'>,
  {
    departementCode,
  }: {
    departementCode: string
  },
) => hasWriteAccessOnScope(user, { departementCode })

export const canEditGouvernance = (
  user: Pick<SessionUser, 'role' | 'roleScope'> | null,
  {
    departementCode,
  }: {
    departementCode: string
  },
) =>
  !!user &&
  user.role !== 'PrefectureRegion' &&
  hasWriteAccessOnScope(user, { departementCode })

export const hasAccessToNationalDashboard = (
  user: Pick<SessionUser, 'role'>,
) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }
  return false
}

export const hasAccessToDataAnalysis = (user: Pick<SessionUser, 'role'>) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }

  return false
}

export const hasAccessToGouvernanceForm = (
  user: Pick<SessionUser, 'role' | 'gouvernancePersona'>,
) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }
  if (
    user.role === 'PrefectureDepartement' ||
    user.role === 'PrefectureRegion'
  ) {
    return false
  }
  return true
}

export const hasAccessToDevelopmentPreview = (
  user: Pick<SessionUser, 'role'>,
) => {
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }
  return false
}

export const canUpdateFormulaireGouvernance = (
  user: Pick<SessionUser, 'role' | 'formulaireGouvernance'>,
  formulaireGouvernanceId: string,
) => {
  if (user.role === 'Administrator') {
    return true
  }
  return user.formulaireGouvernance?.id === formulaireGouvernanceId
}
