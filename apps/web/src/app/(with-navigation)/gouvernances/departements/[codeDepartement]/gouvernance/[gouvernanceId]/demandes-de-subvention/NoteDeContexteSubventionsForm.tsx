'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'

import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import React, { useState } from 'react'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  noteDeContexteSubventionMinChars,
  NoteDeContexteSubventionsData,
  NoteDeContexteSubventionsValidation,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'
import styles from './DemandeDeSubventionForm.module.css'

export const noteDeContexteSubventionInfoText = (title?: string | null) =>
  `${title ? stripHtmlTags(title).length : 0} caractères sur un minimum de ${noteDeContexteSubventionMinChars} `

const NoteDeContexteSubventionsForm = ({
  gouvernanceId,
  noteDeContexteSubventions,
}: {
  gouvernanceId: string
  noteDeContexteSubventions?: string | null
}) => {
  const [isEditing, setIsEditing] = useState(!noteDeContexteSubventions)

  const form = useForm<NoteDeContexteSubventionsData>({
    resolver: zodResolver(NoteDeContexteSubventionsValidation),
    defaultValues: {
      gouvernanceId,
      noteDeContexteSubventions: noteDeContexteSubventions ?? undefined,
    },
  })

  const mutation =
    trpc.demandesDeSubvention.updateNoteDeContexteSubventions.useMutation()

  const router = useRouter()

  const onSubmit = async (data: NoteDeContexteSubventionsData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message:
          'La contextualisation des demandes de subvention a bien été enregistrée',
      })
      setIsEditing(false)
      router.refresh()
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

  const title = (
    <h2 className="fr-h5 fr-mb-0">
      Contextualisation des demandes de subvention <RedAsterisk />
    </h2>
  )

  const hintContent = (
    <span className="fr-text--sm fr-text-mention--grey">
      Dans le cadre de France Numérique Ensemble, les gouvernances peuvent
      solliciter un soutien budgétaire auprès de l’Etat permettant de réaliser
      différents types d’action relevant de la stratégie d’inclusion numérique.
      Afin d’instruire vos demandes, nous vous invitons à nous apporter des
      précisions sur le contexte dans lequel elles s’inscrivent. Nous vous
      invitons également à préciser quelle est la place de la coordination
      conseillers numériques dans la feuille de route.
      <br />
      <br />
      Il existe deux cas de figure&nbsp;:
      <br />
      <br />
      <span className="fr-text--bold">
        1 - Vous n’avez pas encore de feuille de route territoriale et vos
        demandes portent sur la formalisation de feuilles de route : précisez
        les démarches de concertation et de réflexion déjà entreprises le cas
        échéant, et précisez les prochaines étapes qui vous permettront
        d’aboutir à la rédaction de feuilles de route.
      </span>
      <br />
      <br />
      <u>Exemple&nbsp;:</u>
      <br />
      Le [nom du territoire] ne dispose pas encore d’une feuille de route France
      Numérique Ensemble. Des premières réunions de mobilisation et de
      concertation autour de la stratégie ont été organisée en [mois] avec
      [partenaires] sur [thématique]. La gouvernance souhaite bénéficier d’un
      accompagnement sur l’élaboration de la feuille de route et sur [autre]
      pour [objectif].
      <br />
      <br />
      <span className="fr-text--bold">
        2 - Vous avez une feuille de route territoriale et vos demandes portent
        sur sa mise en œuvre (financement du déploiement, outillage, formation)
        : précisez les axes stratégiques de votre feuille de route (même s’ils
        ne sont pas définitifs). Ces axes pourront évoluer jusqu’au dépôt des
        feuilles de route en octobre 2024.
      </span>
      <br />
      <br />
      <u>Exemple&nbsp;:</u>
      <br />
      Le [nom du territoire] a élaboré une feuille de route en [mois année] en
      concertation avec les acteurs du territoire. Elle est co-portée par [x] et
      [x] et s’articule autour de 4 axes qui sont [axe 1], [axe 2], [axe 3],
      [axe 4]. Les demandes de subvention exprimées visent à développer l’action
      [x] qui s’inscrit dans l’axe 1 et l’action [x] qui s’inscrit dans l’axe 2.
      <br />
      OU
      <br />
      Le [nom du territoire] est en cours de finalisation d’une feuille de route
      élaborée en concertation avec les acteurs du territoire. Elle est
      co-portée par [x] et [x] et s’articulera autour de 4 axes qui sont [axe
      1], [axe 2], [axe 3], [axe 4]. Les demandes de subvention exprimées visent
      à développer l’action [x] qui s’inscrit dans l’axe 1 et l’action [x] qui
      s’inscrit dans l’axe 2.
    </span>
  )

  if (!isEditing) {
    return (
      <>
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-justify-content-space-between fr-mb-2v">
          {title}
          <Button
            type="button"
            priority="secondary"
            size="small"
            iconId="fr-icon-edit-line"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            Modifier
          </Button>
        </div>
        <div>{hintContent}</div>
        <hr className="fr-separator-8v" />
        <div
          className={styles.htmlContainer}
          dangerouslySetInnerHTML={{
            __html: noteDeContexteSubventions ?? '',
          }}
        />
      </>
    )
  }

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
        label={<span className="fr-display-block fr-mb-3v">{title}</span>}
        labelClassName="fr-mb-8v"
        hint={hintContent}
        info={noteDeContexteSubventionInfoText}
        form={form}
        path="noteDeContexteSubventions"
        disabled={isLoading}
      />

      <div className="fr-flex fr-justify-content-end fr-width-full">
        <Button {...buttonLoadingClassname(isLoading)} type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(NoteDeContexteSubventionsForm)
