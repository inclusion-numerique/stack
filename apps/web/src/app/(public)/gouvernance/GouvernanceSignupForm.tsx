'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { signIn, signOut } from 'next-auth/react'
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
      },
    })

  const callbackUrl = `/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`

  const signup = trpc.user.gouvernanceSignup.useMutation()

  const onSubmit = async (data: UserGouvernanceSignup) => {
    try {
      await signup.mutateAsync(data)
    } catch (mutationError) {
      // We add signup errors and cancel mutations
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      return
    }

    // If User was already signed in, we sign him out to allow for clean flow in demo mode or if a
    // logged in user tries to log in again here with another email.
    if (user) {
      await signOut({ redirect: false })
    }

    // Set the email in a cookie for usage in Verify page as redirections resets state
    Cookies.set('email-signin', data.email, { sameSite: 'strict' })
    await signIn(
      'email',
      { callbackUrl, ...data },
      { gouvernanceSignup: gouvernancePersonaId },
    )
  }
  const disabled = formState.isSubmitting || formState.isSubmitSuccessful

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFormField
        label="Renseignez votre adresse email"
        control={control}
        path="email"
        disabled={disabled}
      />
      <div className="fr-btns-group">
        <Button type="submit" disabled={disabled}>
          Envoyer
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(GouvernanceSignupForm)
