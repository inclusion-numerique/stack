import React, { ComponentProps, forwardRef } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { UiComponentProps } from '../utils/uiComponentProps'

type ButtonLinkProps = {
  icon?: string
  iconPosition?: 'left' | 'right'
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-no-outline'
  size?: 'sm' | 'md' | 'lg'
}

const ButtonLink = forwardRef<
  HTMLAnchorElement,
  UiComponentProps & ButtonLinkProps & ComponentProps<typeof Link>
>(
  (
    {
      className,
      priority = 'primary',
      icon,
      iconPosition,
      size = 'md',
      children,
      ...rest
    },
    ref,
  ) => (
    <Link
      ref={ref}
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
  ),
)
ButtonLink.displayName = 'ButtonLink'

export default ButtonLink
