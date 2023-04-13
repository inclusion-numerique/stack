import React, { HTMLProps } from 'react'
import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  size?: 'sm' | 'lg'
}

type DSFRLinkProps = {
  simple?: undefined
  icon?: undefined
  iconPosition?: undefined
}

type SimpleDSFRLinkProps = {
  simple: true
  icon?: string
  iconPosition?: 'right' | 'left'
}

const DSFRLink = ({
  className,
  simple,
  children,
  icon,
  iconPosition = 'right',
  size,
  ...rest
}: UiComponentProps &
  CommonProps &
  (DSFRLinkProps | SimpleDSFRLinkProps) &
  LinkProps &
  Omit<HTMLProps<HTMLAnchorElement>, 'size' | 'ref'>) => (
  <Link
    className={classNames(
      {
        'fr-link': simple,
        [`fr-link--icon-${iconPosition}`]: icon,
        [`fr-link--${size || ''}`]: size,
      },
      icon,
      className,
    )}
    {...rest}
  >
    {children}
  </Link>
)

export default DSFRLink
