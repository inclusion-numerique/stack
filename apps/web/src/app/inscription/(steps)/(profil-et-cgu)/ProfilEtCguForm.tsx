'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import React from 'react'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import {
  profileInscriptionOptionsWithExtras,
  profileInscriptionSlugs,
} from '@app/web/inscription/profilInscription'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  ChoisirProfilEtAccepterCguData,
  ChoisirProfilEtAccepterCguValidation,
} from '@app/web/inscription/ChoisirProfilEtAccepterCguValidation'
import RichCardLabel, {
  richCardFieldsetElementClassName,
} from '@app/web/components/form/RichCardLabel'
import styles from './ProfilEtCguForm.module.css'

const ProfilEtCguForm = ({ userId }: { userId: string }) => {
  const form = useForm<ChoisirProfilEtAccepterCguData>({
    resolver: zodResolver(ChoisirProfilEtAccepterCguValidation),
    defaultValues: {
      userId,
    },
  })

  const { control } = form

  const mutation = trpc.inscription.choisirProfilEtAccepterCgu.useMutation()
  const router = useRouter()

  const onSubmit = async (data: ChoisirProfilEtAccepterCguData) => {
    router.push(
      `/inscription/identification?profil=${profileInscriptionSlugs[data.profil]}`,
    )
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
        options={profileInscriptionOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
          labelProps: { paddingX: 16 },
        }}
        classes={{
          radioGroup: styles.radioGroup,
          fieldsetElement: richCardFieldsetElementClassName,
        }}
      />
      <hr className="fr-separator-6v fr-mb-10v" />
      <CheckboxFormField
        path="cguAcceptee"
        label={
          <>
            J’ai lu et j’accepte les{' '}
            <a href="/" className="fr-link wip-outline" target="_blank">
              conditions générales d’utilisation du service
            </a>
            {'  '}
            ainsi que la{' '}
            <a href="/" className="fr-link wip-outline" target="_blank">
              politique de confidentialité
            </a>
            .
          </>
        }
        classes={{
          label: styles.cguLabel,
        }}
        control={control}
        disabled={isLoading}
      />

      <div className="fr-btns-group fr-mt-10v">
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
