import React, { ComponentProps, forwardRef } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
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

const DSFRLink = forwardRef<
  HTMLAnchorElement,
  UiComponentProps &
    CommonProps &
    (DSFRLinkProps | SimpleDSFRLinkProps) &
    ComponentProps<typeof Link>
>(
  (
    {
      className,
      simple,
      children,
      icon,
      iconPosition = 'right',
      size,
      ...rest
    },
    ref,
  ) => (
    <Link
      ref={ref}
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
  ),
)

export default DSFRLink
