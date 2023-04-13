/* eslint react/button-has-type: 0 */

import React, { HTMLProps } from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-no-outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

type ButtonProps = {
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
}

type IconOnlyProps = {
  title: string
  icon: string
  iconPosition: never
}

const Button = ({
  className,
  priority = 'primary',
  icon,
  iconPosition,
  size = 'md',
  type = 'button',
  ...rest
}: UiComponentProps &
  Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type' | 'title' | 'label'> &
  CommonProps &
  (ButtonProps | IconOnlyProps)) => {
  const title = 'title' in rest ? rest.title : undefined
  const label = 'label' in rest ? rest.label : undefined

  return (
    <button
      className={classNames(
        'fr-btn',
        {
          [`fr-btn--${priority}`]: priority !== 'primary',
          [`fr-btn--icon-${iconPosition || 'left'}`]: icon && label,
          'fr-btn-icon': title,
          [`fr-btn--${size}`]: size !== 'md',
        },
        icon,
        className,
      )}
      type={type}
      title={title}
      {...rest}
    >
      {label}
      {title}
    </button>
  )
}

export default Button
