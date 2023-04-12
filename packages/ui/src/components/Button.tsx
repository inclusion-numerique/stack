import React, { HTMLProps } from 'react'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-no-outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

type ButtonProps = {
  label: string
  title: never
  icon?: string
  iconPosition?: 'left' | 'right'
}

type IconOnlyProps = {
  label: never
  title: string
  icon: string
  iconPosition: never
}

function Button({
  className,
  label,
  title,
  priority = 'primary',
  icon,
  iconPosition,
  size = 'md',
  type = 'button',
  ...rest
}: UiComponentProps &
  Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type' | 'title'> &
  CommonProps &
  (ButtonProps | IconOnlyProps)) {
  return (
    <button
      className={`fr-btn${
        priority === 'primary' ? '' : ` fr-btn--${priority}`
      } ${icon || ''}${
        icon && label ? ` fr-btn--icon-${iconPosition || 'left'}` : ''
      }${title ? ' fr-btn-icon' : ''} fr-btn--${size} ${className || ''}`}
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
