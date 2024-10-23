import type { ReactNode } from 'react'
import classNames from 'classnames'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const ContactSupportLink = ({
  className,
  children = 'Contactez le support',
  size = 'sm',
}: {
  className?: string
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) => (
  <a
    href={`mailto:${PublicWebAppConfig.contactEmail}`}
    className={classNames(`fr-link fr-link--${size} fr-mb-0`, className)}
  >
    {children}
  </a>
)

export default ContactSupportLink
