'use client'

import React, { MouseEventHandler } from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  type: 'success' | 'error' | 'info' | 'warning'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onClose?: MouseEventHandler<HTMLButtonElement>
}

type SmallClosableAlertProps = {
  title?: string
  description: string
  small: true
}

type ClosableAlertProps = {
  title: string
  description?: string
  small?: undefined
}

const ClosableAlert = ({
  className,
  as = 'h3',
  title,
  description,
  type,
  small,
  onClose,
}: UiComponentProps &
  CommonProps &
  (SmallClosableAlertProps | ClosableAlertProps)) => {
  const Title = as
  return (
    <div
      className={classNames(
        'fr-alert',
        `fr-alert--${type}`,
        { 'fr-alert--sm': small },
        className,
      )}
    >
      {title && <Title className="fr-alert__title">{title}</Title>}
      {description && <p>{description}</p>}
      <button
        className="fr-btn--close fr-btn"
        title="Masquer le message"
        type="button"
        onClick={(event) => {
          const alert = event.currentTarget.parentNode
          alert?.parentNode?.removeChild(alert)
          if (onClose) {
            onClose(event)
          }
        }}
      >
        Masquer le message
      </button>
    </div>
  )
}

export default ClosableAlert
