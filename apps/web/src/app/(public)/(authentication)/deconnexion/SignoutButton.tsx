'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { ReactNode, useState } from 'react'
import { signOut } from 'next-auth/react'
import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'

const SignoutButton = ({
  children = 'Se déconnecter',
  callbackUrl = '/',
  className,
  ...buttonProps
}: {
  children?: ReactNode
  callbackUrl?: string
} & ButtonProps.Common) => {
  const [isLoading, setIsLoading] = useState(false)
  const onLogout = async () => {
    setIsLoading(true)
    await signOut({ redirect: true, callbackUrl })
  }

  return (
    <Button
      type="button"
      onClick={onLogout}
      {...buttonProps}
      {...buttonLoadingClassname(isLoading, className)}
    >
      {children}
    </Button>
  )
}

export default SignoutButton
