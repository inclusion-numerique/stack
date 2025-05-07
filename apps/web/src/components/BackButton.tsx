import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

const BackButton = ({
  href,
  children = 'Retour',
  className,
}: {
  href: string
  children?: ReactNode
  className?: string
}) => (
  <Button
    priority="tertiary no outline"
    size="small"
    linkProps={{
      href,
    }}
    className={classNames('fr-mt-4v fr-mb-4v', className)}
    iconId="fr-icon-arrow-left-line"
  >
    {children}
  </Button>
)

export default BackButton
