import type { ReactNode } from 'react'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import classNames from 'classnames'

const ContactSupportLink = ({
  className,
  children = 'Contactez le support',
}: {
  className?: string
  children?: ReactNode
}) => (
  <a
    href={`mailto:${PublicWebAppConfig.contactEmail}`}
    className={classNames('fr-link fr-link--sm fr-mb-0', className)}
  >
    {children}
  </a>
)

export default ContactSupportLink
