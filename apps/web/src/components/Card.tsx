import React, { ReactNode } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

const Card = ({
  id,
  className,
  'data-testid': dataTestid,
  title,
  titleAs: CardTitle = 'h3',
  href,
  isExternal = false,
  enlargeLink = href != null,
  noBorder = false,
  description,
  children,
  header,
  contentSeparator = false,
  arrowTop = false,
  arrowSm = false,
}: {
  id?: string
  className?: string
  'data-testid'?: string
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  href?: string
  isExternal?: boolean
  enlargeLink?: boolean
  noBorder?: boolean
  description?: ReactNode
  children?: ReactNode
  header?: ReactNode
  contentSeparator?: boolean
  arrowTop?: boolean
  arrowSm?: boolean
}) => (
  <div
    id={id}
    data-testid={dataTestid}
    className={classNames(className, 'fr-card', [
      noBorder && 'fr-card--no-border',
      enlargeLink && 'fr-enlarge-link',
      arrowTop && 'fr-card--arrow-top',
      arrowSm && 'fr-card--arrow-sm',
    ])}
  >
    <div className="fr-card__body">
      <div className="fr-card__content">
        <CardTitle className="fr-card__title">
          {href ? (
            <Link href={href} target={isExternal ? '_blank' : ''}>
              {title}
            </Link>
          ) : (
            title
          )}
        </CardTitle>
        {description && <div className="fr-card__desc">{description}</div>}
        {children && (
          <div className="fr-card__end">
            {contentSeparator && <hr className="fr-pb-4w" />}
            {children}
          </div>
        )}
      </div>
    </div>
    {header ?? <div className="fr-card__header">{header}</div>}
  </div>
)

export default Card
