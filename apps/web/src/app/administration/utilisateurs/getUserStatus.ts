import { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'

export const getUserStatus = (
  user: Pick<
    UtilisateurForList,
    'deleted' | 'profilInscription' | 'inscriptionValidee' | 'role'
  >,
) => {
  if (user.deleted) {
    return 'Supprimé'
  }

  if (user.inscriptionValidee) {
    return 'Inscrit'
  }

  if (user.profilInscription) {
    return `Inscription ${user.profilInscription}`
  }
  return null
}
