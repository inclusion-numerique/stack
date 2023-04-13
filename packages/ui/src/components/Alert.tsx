import React from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  type: 'success' | 'error' | 'info' | 'warning'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

type SmallAlertProps = {
  title?: string
  description: string
  small: true
}

type AlertProps = {
  title: string
  description?: string
  small: never
}

type ClosableProps = {
  closable: true
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type NonClosableProps = {
  closable: never
  onClose: never
}

const Alert = ({
  className,
  as = 'h3',
  title,
  description,
  type,
  small,
  closable,
  onClose,
}: UiComponentProps &
  CommonProps &
  (SmallAlertProps | AlertProps) &
  (ClosableProps | NonClosableProps)) => {
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
      {closable && (
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
      )}
    </div>
  )
}

export default Alert
