/* eslint react/button-has-type: 0 */

import React, { HTMLProps } from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-no-outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

type ButtonWithLabelProps = {
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  title?: undefined
}

type IconOnlyProps = {
  title: string
  icon: string
  iconPosition: never
  label?: undefined
}

type ButtonProps = CommonProps & (ButtonWithLabelProps | IconOnlyProps)

const Button = ({
  className,
  priority = 'primary',
  icon,
  iconPosition,
  size = 'md',
  title,
  label,
  type = 'button',
  ...rest
}: UiComponentProps &
  Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type' | 'title' | 'label'> &
  ButtonProps) => (
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

export default Button
