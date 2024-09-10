export const getUserRoleLabel = (user: {
  role: string
  mediateur: { conseillerNumerique: { id: string } | null } | null
  coordinateur: { id: string } | null
}) => {
  if (user.role === 'Admin') return 'Administrateur'
  if (user.coordinateur != null) return 'Coordinateur'
  if (user.mediateur?.conseillerNumerique != null) return 'Conseiller Numérique'
  if (user.mediateur != null) return 'Médiateur'

  return 'Rôle non défini'
}

export type UserRoleLabel = ReturnType<typeof getUserRoleLabel>
