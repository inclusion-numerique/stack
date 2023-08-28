'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { signIn } from 'next-auth/react'
import React from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import {
  UserGouvernanceSignup,
  UserGouvernanceSignupValidation,
} from '@app/web/server/rpc/user/userSignup'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { SessionUser } from '@app/web/auth/sessionUser'

const GouvernanceSignupForm = ({
  gouvernancePersonaId,
  user,
}: {
  gouvernancePersonaId: GouvernancePersonaId
  user?: SessionUser | null
}) => {
  const { handleSubmit, formState, setError, control } =
    useForm<UserGouvernanceSignup>({
      resolver: zodResolver(UserGouvernanceSignupValidation),
      defaultValues: {
        gouvernancePersonaId,
        email: user?.email ?? '',
      },
    })

  const callbackUrl = `/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`

  const signup = trpc.user.gouvernanceSignup.useMutation()

  const router = useRouter()

  const onSubmit = async (data: UserGouvernanceSignup) => {
    try {
      await signup.mutateAsync(data)
    } catch (mutationError) {
      // We add signup errors and cancel mutations
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      return
    }

    if (user) {
      router.push('/formulaires-feuilles-de-routes-territoriales')
    } else {
      // Signin if user is not logged in
      // Set the email in a cookie for usage in Verify page as redirections resets state
      Cookies.set('email-signin', data.email, { sameSite: 'strict' })
      await signIn(
        'email',
        { callbackUrl, ...data },
        { gouvernanceSignup: gouvernancePersonaId },
      )
    }
  }
  const isLoading = formState.isSubmitting || formState.isSubmitSuccessful

  const buttonClasses = classNames('fr-mb-2v', isLoading && 'fr-btn--loading')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {user ? (
        <div className="fr-btns-group">
          <Button type="submit" className={buttonClasses}>
            Accéder au formulaire
          </Button>
        </div>
      ) : (
        <>
          <h2>Inscription au formulaire</h2>
          <p className="fr-mb-4v">
            Renseignez votre adresse email pour accéder au formulaire.
          </p>
          <InputFormField
            label="Renseignez votre adresse email"
            control={control}
            path="email"
            disabled={isLoading}
          />
          <div className="fr-btns-group">
            <Button type="submit" className={buttonClasses}>
              Envoyer
            </Button>
          </div>
        </>
      )}
    </form>
  )
}

export default withTrpc(GouvernanceSignupForm)
