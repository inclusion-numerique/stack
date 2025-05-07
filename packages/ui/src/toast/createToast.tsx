import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { JSX } from 'react'
import { toast } from 'react-hot-toast'
import styles from './Toaster.module.css'

export type ToastPriority = 'info' | 'warning' | 'error' | 'success'

const icons: { [key in ToastPriority]: string } = {
  info: 'fr-icon-info-fill',
  warning: 'fr-icon-warning-fill',
  error: 'fr-icon-error-fill',
  success: 'fr-icon-checkbox-circle-fill',
}

export const createToast = ({
  priority,
  message,
  action,
  duration,
}: {
  priority: ToastPriority
  message: JSX.Element | string | null
  action?: ButtonProps
  duration?: number
}) => {
  toast(
    action ? (
      <>
        <span>{message}</span>
        <Button
          className={classNames('fr-ml-1w', styles.action)}
          priority="tertiary no outline"
          size="small"
          {...action}
        />
      </>
    ) : (
      <span>{message}</span>
    ),
    {
      duration,
      className: classNames(styles.toast, styles[priority]),
      icon: <span className={classNames(styles.icon, icons[priority])} />,
    },
  )
}
