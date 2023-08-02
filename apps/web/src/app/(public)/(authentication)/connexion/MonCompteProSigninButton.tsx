'use client'

import classNames from 'classnames'
import { Route } from 'next'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import MonCompteProButton from '@codegouvfr/react-dsfr/MonCompteProButton'
import { Spinner } from '@app/web/ui/Spinner'
import { monCompteProConnectProviderId } from '@app/web/auth/monCompteProConnect'
import styles from './MonCompteProSigninButton.module.css'

export const MonCompteProSigninButton = ({
  className,
  callbackUrl,
}: {
  className?: string
  callbackUrl: Route
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = () => {
    if (isLoading) return

    setIsLoading(true)
    signIn(monCompteProConnectProviderId, { callbackUrl })
  }
  return (
    <div className={classNames(styles.container, className)}>
      <MonCompteProButton
        className={classNames(isLoading && styles.loading)}
        onClick={onClick}
      />
      {isLoading && <Spinner size="small" className={styles.spinner} />}
    </div>
  )
}

export default MonCompteProSigninButton
