'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import {
  CreerLieuActiviteData,
  CreerLieuActiviteValidation,
} from '@app/web/app/lieu-activite/CreerLieuActiviteValidation'
import { CompleteFields } from '@app/web/components/form/CompleteFields'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import { DescriptionFields } from '@app/web/components/structure/fields/DescriptionFields'
import { InformationsGeneralesFields } from '@app/web/components/structure/fields/InformationsGeneralesFields'
import { InformationsPratiquesFields } from '@app/web/components/structure/fields/InformationsPratiquesFields'
import { ModalitesAccesAuServiceFields } from '@app/web/components/structure/fields/ModalitesAccesAuServiceFields'
import { ServicesEtAccompagnementFields } from '@app/web/components/structure/fields/ServicesEtAccompagnementFields'
import { TypesDePublicsAccueillisFields } from '@app/web/components/structure/fields/TypesDePublicsAccueillisFields'
import { VisiblePourCartographieNationaleFields } from '@app/web/components/structure/fields/VisiblePourCartographieNationaleFields'
import {
  appendComment,
  emptyOpeningHours,
} from '@app/web/components/structure/fields/openingHoursHelpers'
import { LieuAccueillantPublicTitle } from '@app/web/components/structure/titles/LieuAccueillantPublicTitle'
import { ServiceInclusionNumeriqueTitle } from '@app/web/components/structure/titles/ServiceInclusionNumeriqueTitle'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  Schedule,
  fromTimetableOpeningHours,
} from '@gouvfr-anct/timetable-to-osm-opening-hours'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const CreerLieuActiviteForm = ({
  onVisiblePourCartographieNationaleChange,
}: {
  onVisiblePourCartographieNationaleChange?: (visible: boolean) => void
}) => {
  const router = useRouter()
  const mutation = trpc.lieuActivite.create.useMutation()
  const form = useForm<CreerLieuActiviteData>({
    resolver: zodResolver(CreerLieuActiviteValidation),
    defaultValues: {
      openingHours: emptyOpeningHours,
    },
  })

  const handleMutation = async (data: CreerLieuActiviteData) => {
    try {
      await mutation.mutateAsync({
        ...data,
        horaires: appendComment(
          fromTimetableOpeningHours(data.openingHours as Schedule),
          data?.horairesComment,
        ),
      })

      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été créé.',
      })

      router.push('/coop/lieux-activite/')
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleMutation)}>
      <div className="fr-border fr-border-radius--8">
        <h2
          id="informations-generales"
          className="fr-text-title--blue-france fr-h4 fr-p-4w fr-mb-0"
        >
          Informations générales
        </h2>
        <hr className="fr-separator fr-separator-1px" />
        <InformationsGeneralesFields className="fr-p-4w" form={form} />
      </div>
      <div className="fr-border fr-border-radius--8 fr-mt-5w fr-mb-6w">
        <DisplayOnCartography />
        <hr className="fr-separator fr-separator-1px" />
        <VisiblePourCartographieNationaleFields
          className="fr-px-4w fr-pt-4w"
          onChange={onVisiblePourCartographieNationaleChange}
          form={form}
        >
          <hr className="fr-separator-1px" />
          <LieuAccueillantPublicTitle />
          <hr className="fr-separator-1px" />
          <div className="fr-px-4w">
            <CompleteFields
              id="description"
              title="Description du lieu"
              description="Décrivez ici le lieu et les activités qu’il propose."
            >
              <DescriptionFields form={form} />
            </CompleteFields>
            <hr className="fr-separator-1px" />
            <CompleteFields
              id="informations-pratiques"
              title="Informations pratiques"
              description="Horaires, accès et site internet du lieu."
            >
              <InformationsPratiquesFields form={form} />
            </CompleteFields>
          </div>
          <hr className="fr-separator-1px" />
          <ServiceInclusionNumeriqueTitle />
          <hr className="fr-separator-1px" />
          <div className="fr-px-4w">
            <CompleteFields
              id="services-et-accompagnement"
              title="Services & types d’accompagnement"
              description="Renseignez ici les services et les types d’accompagnements proposés dans ce lieu."
            >
              <ServicesEtAccompagnementFields form={form} />
            </CompleteFields>
            <hr className="fr-separator-1px" />
            <CompleteFields
              id="modalites-acces-au-service"
              title="Modalités d’accès au service"
              description="Indiquez comment bénéficier des services d’inclusion numérique."
            >
              <ModalitesAccesAuServiceFields form={form} />
            </CompleteFields>
            <hr className="fr-separator-1px" />
            <CompleteFields
              id="types-publics-accueillis"
              title="Types de publics accueillis"
              description="Indiquez si ce lieu accueille des publics spécifiques."
            >
              <TypesDePublicsAccueillisFields form={form} />
            </CompleteFields>
          </div>
        </VisiblePourCartographieNationaleFields>
      </div>
      <Button
        type="submit"
        {...buttonLoadingClassname(
          mutation.isPending,
          'fr-display-block fr-width-full fr-mb-4w',
        )}
      >
        Créer le lieu d’activité
      </Button>
      <Button
        className="fr-display-block fr-width-full fr-text--center"
        priority="secondary"
        linkProps={{
          href: '/coop/lieux-activite/',
          'aria-disabled': mutation.isPending,
        }}
      >
        Annuler
      </Button>
    </form>
  )
}

export default withTrpc(CreerLieuActiviteForm)
