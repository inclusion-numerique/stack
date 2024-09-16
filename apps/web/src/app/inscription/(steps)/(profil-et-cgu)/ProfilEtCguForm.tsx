'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import {
  ChoisirProfilEtAccepterCguData,
  ChoisirProfilEtAccepterCguValidation,
} from '@app/web/inscription/ChoisirProfilEtAccepterCguValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import React from 'react'
import { profileInscriptionOptions } from '@app/web/inscription/profilInscription'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import RichCardLabel, {
  richCardFieldsetElementClassName,
} from '@app/web/components/form/RichCardLabel'
import { craFormFieldsetClassname } from '@app/web/app/coop/mes-activites/cra/craFormFieldsetClassname'
import styles from './ProfilEtCguForm.module.css'

const ProfilEtCguForm = () => {
  const form = useForm<ChoisirProfilEtAccepterCguData>({
    resolver: zodResolver(ChoisirProfilEtAccepterCguValidation),
  })

  const { control, formState } = form

  const mutation = trpc.inscription.choisirProfilEtAccepterCgu.useMutation()
  const router = useRouter()

  const onSubmit = async (data: ChoisirProfilEtAccepterCguData) => {
    console.log('onSubmit', data)

    router.push('/inscription/identification')
    router.refresh()

    try {
      await mutation.mutateAsync(data)
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
      mutation.reset()
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <RadioFormField
        control={control}
        path="profil"
        options={profileInscriptionOptions}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: craFormFieldsetClassname(styles.profilInscriptionFieldset),
        }}
      />
      <CheckboxFormField
        path="cguAcceptee"
        label={
          <>
            J’ai lu et j’accepte les conditions générales d’utilisation du
            service ainsi que la politique de confidentialité.
          </>
        }
        control={control}
        disabled={isLoading}
      />

      <div className="fr-btns-group fr-mt-10">
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Continuer
        </Button>
      </div>
      <div className="fr-flex fr-direction-column fr-align-items-center fr-mt-10">
        <Link href="/" className="fr-link fr-text--center">
          Revenir plus tard
        </Link>
      </div>
    </form>
  )
}

export default withTrpc(ProfilEtCguForm)
