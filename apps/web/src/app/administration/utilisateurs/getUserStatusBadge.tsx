import Badge from '@codegouvfr/react-dsfr/Badge'
import { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'

export const getUserStatusBadge = (
  user: Pick<
    UtilisateurForList,
    'deleted' | 'profilInscription' | 'inscriptionValidee' | 'role'
  >,
  options?: {
    small?: boolean // small by default
  },
) => {
  const small = !!options && 'small' in options ? options.small : true

  if (user.deleted) {
    return (
      <Badge small={small} severity="error">
        Supprimé
      </Badge>
    )
  }

  if (user.inscriptionValidee) {
    return (
      <Badge small={small} severity="success">
        Inscrit
      </Badge>
    )
  }

  if (user.role === 'Admin') {
    return (
      <Badge small={small} severity="info">
        Admin
      </Badge>
    )
  }

  if (user.role === 'Support') {
    return (
      <Badge small={small} severity="info">
        Support
      </Badge>
    )
  }

  if (user.profilInscription) {
    return (
      <Badge small={small} severity="new">
        Inscription {user.profilInscription}
      </Badge>
    )
  }
  return (
    <Badge small={small} severity="new">
      Inscription
    </Badge>
  )
}
