import type { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'
import type { SessionUser } from '@app/web/auth/sessionUser'

export const getUserLifecycle = (
  user: Pick<UtilisateurForList, 'deleted' | 'inscriptionValidee' | 'role'>,
) => {
  if (user.deleted) {
    return 'Supprimé'
  }

  if (user.role === 'Admin') {
    return 'Administrateur'
  }

  if (user.role === 'Support') {
    return 'Support'
  }

  if (user.inscriptionValidee) {
    return 'Inscrit'
  }

  return `Inscription en cours`
}

export type UserLifecycle = ReturnType<typeof getUserLifecycle>

export const isLimitedToInscription = (user: {
  role: SessionUser['role']
  inscriptionValidee: Date | string | null
}) => user.role === 'User' && !user.inscriptionValidee
