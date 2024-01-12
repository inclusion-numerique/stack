import React, { ReactNode } from 'react'

const ExternalLink = ({
  href,
  icon,
  children,
}: {
  href: string | null
  icon?: string
  children: ReactNode
}) => (
  <>
    {href && (
      <a href={href} className="fr-link" rel="noreferrer" target="_blank">
        {icon && (
          <>
            <span role="img" className={icon} aria-hidden="true"></span>
            &nbsp;
          </>
        )}
        {children}
      </a>
    )}
  </>
)

export default ExternalLink
