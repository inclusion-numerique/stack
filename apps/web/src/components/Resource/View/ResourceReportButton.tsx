'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { ResourceReportModal } from '@app/web/components/Resource/View/ResourceReportModal'

const ResourceReportButton = ({
  priority = 'secondary',
  className,
}: {
  className?: string
  priority?: ButtonProps['priority']
}) => (
  <Button
    iconId="fr-icon-warning-line"
    priority={priority}
    className={className}
    onClick={ResourceReportModal.open}
  >
    Signaler
  </Button>
)

export default ResourceReportButton
