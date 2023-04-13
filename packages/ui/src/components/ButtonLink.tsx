import React, { HTMLProps } from 'react'
import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { UiComponentProps } from '../utils/uiComponentProps'

type ButtonLinkProps = {
  icon?: string
  iconPosition?: 'left' | 'right'
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-no-outline'
  size?: 'sm' | 'md' | 'lg'
}

const ButtonLink = ({
  className,
  priority = 'primary',
  icon,
  iconPosition,
  size = 'md',
  children,
  ...rest
}: UiComponentProps &
  ButtonLinkProps &
  LinkProps &
  Omit<HTMLProps<HTMLAnchorElement>, 'size' | 'ref'>) => (
  <Link
    className={classNames(
      'fr-btn',
      {
        [`fr-btn--${priority}`]: priority !== 'primary',
        [`fr-btn--icon-${iconPosition || 'left'}`]: icon,
        [`fr-btn--${size}`]: size !== 'md',
      },
      icon,
      className,
    )}
    {...rest}
  >
    {children}
  </Link>
)

export default ButtonLink
