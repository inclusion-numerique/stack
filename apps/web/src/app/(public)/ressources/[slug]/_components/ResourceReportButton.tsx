'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { ResourceReportModal } from './ResourceReportModal'

const ResourceReportButton = ({
  variant = 'tertiary',
  priority = 'secondary',
  size,
}: {
  variant?: 'icon-only' | 'tertiary'
  priority?: ButtonProps['priority']
  size?: ButtonProps['size']
}) =>
  variant === 'icon-only' ? (
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

export default ResourceReportButton
