'use client'

import Link from 'next/link'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceReportModal } from './ResourceReportModal'

const ResourceReportButton = ({
  resource,
  user,
  variant = 'tertiary',
  priority = 'secondary',
  size,
}: {
  resource: Resource
  user: SessionUser | null
  variant?: 'icon-only' | 'tertiary'
  priority?: ButtonProps['priority']
  size?: ButtonProps['size']
}) => {
  if (user == null) {
    return variant === 'icon-only' ? (
      <Link
        className="fr-btn fr-btn--secondary fr-btn--sm"
        title="Signaler la ressource"
        href={`/connexion?suivant=/ressources/${resource.slug}`}
      >
        <span className="ri-alert-line" aria-hidden />
      </Link>
    ) : (
      <Link
        className="fr-btn fr-btn--secondary fr-btn--sm"
        title="Signaler la ressource"
        href="/connexion?suivant=/ressources/arnaques-a-la-location-immobiliere-definition-et-prevention"
      >
        <span className="ri-alert-line" aria-hidden />
        Signaler
      </Link>
    )
  }

  return variant === 'icon-only' ? (
    <Button
      size={size}
      title="Signaler la ressource"
      iconId="fr-icon-warning-line"
      priority={priority}
      onClick={ResourceReportModal.open}
    />
  ) : (
    <Button
      size={size}
      title="Signaler la ressource"
      iconId="fr-icon-warning-line"
      priority={priority}
      onClick={ResourceReportModal.open}
    >
      Signaler
    </Button>
  )
}

export default ResourceReportButton
