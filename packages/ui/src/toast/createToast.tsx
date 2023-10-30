import { toast } from 'react-hot-toast'
import classNames from 'classnames'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import styles from './Toaster.module.css'

export type ToastPriority = 'info' | 'warning' | 'error' | 'success'

const icons: { [key in ToastPriority]: string } = {
  info: 'fr-icon-info-fill',
  warning: 'fr-icon-warning-fill',
  error: 'fr-icon-error-fill',
  success: 'fr-icon-checkbox-circle-fill',
}

export const createToast = (
  priority: ToastPriority,
  message: string,
  action?: ButtonProps,
) => {
  toast(
    action ? (
      <>
        {message}{' '}
        <Button
          className={classNames('fr-ml-1w', styles.action)}
          priority="tertiary no outline"
          size="small"
          {...action}
        />
      </>
    ) : (
      message
    ),
    {
      className: styles[priority],
      icon: <span className={classNames(styles.icon, icons[priority])} />,
    },
  )
}
