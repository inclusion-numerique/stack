import { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'

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
