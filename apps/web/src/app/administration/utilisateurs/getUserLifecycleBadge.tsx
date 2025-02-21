import { getUserLifecycle } from '@app/web/app/administration/utilisateurs/getUserLifecycle'
import { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'
import { allProfileInscriptionLabels } from '@app/web/inscription/profilInscription'
import Badge from '@codegouvfr/react-dsfr/Badge'

export const getUserLifecycleBadge = (
  user: Pick<
    UtilisateurForList,
    'deleted' | 'profilInscription' | 'inscriptionValidee' | 'role'
  >,
  options?: {
    small?: boolean // small by default
  },
) => {
  const small = !!options && 'small' in options ? options.small : true

  const lifeCycle = getUserLifecycle(user)

  if (lifeCycle === 'Supprimé') {
    return (
      <Badge small={small} severity="error">
        Supprimé
      </Badge>
    )
  }
  if (lifeCycle === 'Inscrit') {
    return (
      <Badge small={small} severity="success">
        Inscrit
      </Badge>
    )
  }
  if (lifeCycle === 'Administrateur') {
    return (
      <Badge small={small} severity="info">
        Admin
      </Badge>
    )
  }

  if (lifeCycle === 'Support') {
    return (
      <Badge small={small} severity="info">
        Support
      </Badge>
    )
  }

  if (user.profilInscription) {
    return (
      <Badge small={small} severity="new">
        Inscription{' '}
        {allProfileInscriptionLabels[user.profilInscription].toLowerCase()}
      </Badge>
    )
  }
  return (
    <Badge small={small} severity="new">
      Inscription en cours
    </Badge>
  )
}
