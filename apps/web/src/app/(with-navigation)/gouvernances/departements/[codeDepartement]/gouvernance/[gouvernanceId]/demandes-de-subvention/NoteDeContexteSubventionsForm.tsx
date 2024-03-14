'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'

import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import React from 'react'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  noteDeContexteSubventionMinChars,
  NoteDeContexteSubventionsData,
  NoteDeContexteSubventionsValidation,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'

export const noteDeContexteSubventionInfoText = (title?: string | null) =>
  `${title ? stripHtmlTags(title).length : 0} caractères sur un minimum de ${noteDeContexteSubventionMinChars} `

const NoteDeContexteSubventionsForm = ({
  gouvernanceId,
  noteDeContexteSubventions,
}: {
  gouvernanceId: string
  noteDeContexteSubventions?: string | null
}) => {
  const form = useForm<NoteDeContexteSubventionsData>({
    resolver: zodResolver(NoteDeContexteSubventionsValidation),
    defaultValues: {
      gouvernanceId,
      noteDeContexteSubventions: noteDeContexteSubventions ?? undefined,
    },
  })

  const mutation =
    trpc.demandesDeSubvention.updateNoteDeContexteSubventions.useMutation()

  const onSubmit = async (data: NoteDeContexteSubventionsData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'La note de contexte a bien été enregistrée',
      })
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement de la note de contexte',
      })
    }
  }

  const isLoading = form.formState.isSubmitting

  const { error } = mutation

  return (
    <form id="signup-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      {error ? (
        <div className="fr-fieldset__element">
          <div className="fr-alert fr-alert--error fr-alert--sm">
            <p>{error.message}</p>
          </div>
        </div>
      ) : null}
      <RichTextFormField
        label={
          <h2 className="fr-h5 fr-mb-1v">
            Note de contexte <RedAsterisk />
          </h2>
        }
        labelClassName="fr-mb-8v"
        hint={
          <span className="fr-text--sm">
            Dans le cadre France Numérique Ensemble, les gouvernances peuvent
            solliciter un soutien budgétaire auprès de l’Etat permettant de
            réaliser différents types d’action relevant de la stratégie
            d’inclusion numérique. Afin de mieux comprendre le contexte de vos
            demandes de subvention, l’ANCT vous demande d’actualiser les notes
            de contexte que vous avez fournies lors de la complétion du
            formulaire de gouvernance.
            <br />
            <br />
            Il existe ainsi deux cas de figures&nbsp;:
            <ul>
              <li>
                Vous n’avez pas encore de feuille de route territoriale et vos
                demandes portent sur la formalisation de feuilles de route :
                précisez dans cette note les démarches de concertation et
                réflexion entreprises, précisez également les prochaines étapes
                qui vous permettront d’aboutir à la rédaction de feuilles de
                route.
              </li>
              <li>
                Vous avez une feuille de route territoriale et votre demande
                porte sur sa mise en oeuvre (financement du déploiement,
                outillage, formation) : précisez les axes stratégiques de
                votre/vos feuilles de route. Ces axes pourront évoluer jusqu’au
                dépôt définitif de vos feuilles de route.
              </li>
            </ul>
            NB&nbsp;:Vous veillerez à préciser le rôle du conseiller numérique
            coordinateur et son articulation au sein de votre/vos feuille(s) de
            route.
          </span>
        }
        info={noteDeContexteSubventionInfoText}
        form={form}
        path="noteDeContexteSubventions"
        disabled={isLoading}
      />

      <div className="fr-flex fr-justify-content-end fr-width-full fr-mb-4v">
        <Button {...buttonLoadingClassname(isLoading)} type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(NoteDeContexteSubventionsForm)
