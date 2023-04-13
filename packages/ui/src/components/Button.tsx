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
  Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type' | 'title'|'label'> &
  CommonProps &
  (ButtonProps | IconOnlyProps)) => {

  const title = 'title' in rest ? rest.title : undefined
  const label = 'label' in rest ? rest.label : undefined

  return (
    <button
      className={classNames(
        'fr-btn',
        priority && `fr-btn--${priority}`,
        icon,
        icon && label && `fr-btn--icon-${iconPosition || 'left'}`,
        title && 'fr-btn-icon',
        size !== 'md' && `fr-btn--${size}`,
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
