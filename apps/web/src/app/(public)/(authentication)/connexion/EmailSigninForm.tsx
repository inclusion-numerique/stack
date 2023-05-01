'use client'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { Route } from 'next'

const SigninFormValidation = z.object({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .email('Merci de renseigner un email valide'),
})
type SigninFormData = z.infer<typeof SigninFormValidation>

export const EmailSigninForm = ({
  error,
  callbackUrl,
}: {
  error?: string
  callbackUrl: Route
}) => {
  const form = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormValidation),
  })

  const onSubmit = ({ email }: SigninFormData) => {
    // Set the email in a cookie for usage in Verify page as redirections resets memory
    Cookies.set('email-signin', email, { sameSite: 'strict' })
    return signIn('email', { email, callbackUrl })
  }
  const disabled =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  return (
    <form id="signin-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      {error ? (
        <div className="fr-fieldset__element">
          <div className="fr-alert fr-alert--error fr-alert--sm">
            <p>{error}</p>
          </div>
        </div>
      ) : null}
      <InputFormField
        control={form.control}
        path="email"
        label="Email"
        type="email"
        disabled={disabled}
      />
      <ButtonsGroup
        buttons={[
          {
            disabled,
            iconId: 'fr-icon-user-setting-line',
            children: 'Se connecter',
            type: 'submit',
          },
        ]}
      />
    </form>
  )
}
