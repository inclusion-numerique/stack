'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DefaultValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  fromTimetableOpeningHours,
  Schedule,
} from '@gouvfr-anct/timetable-to-osm-opening-hours'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { useScrollToError } from '@app/ui/hooks/useScrollToError'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  CreerStructureData,
  CreerStructureValidation,
} from '@app/web/app/structure/CreerStructureValidation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { siretOrRna } from '@app/web/rna/rnaValidation'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import { DescriptionFields } from '@app/web/components/structure/fields/DescriptionFields'
import { InformationsGeneralesFields } from '@app/web/components/structure/fields/InformationsGeneralesFields'
import { InformationsPratiquesFields } from '@app/web/components/structure/fields/InformationsPratiquesFields'
import { ModalitesAccesAuServiceFields } from '@app/web/components/structure/fields/ModalitesAccesAuServiceFields'
import { ServicesEtAccompagnementFields } from '@app/web/components/structure/fields/ServicesEtAccompagnementFields'
import { TypesDePublicsAccueillisFields } from '@app/web/components/structure/fields/TypesDePublicsAccueillisFields'
import { LieuAccueillantPublicTitle } from '@app/web/components/structure/titles/LieuAccueillantPublicTitle'
import { ServiceInclusionNumeriqueTitle } from '@app/web/components/structure/titles/ServiceInclusionNumeriqueTitle'
import { VisiblePourCartographieNationaleFields } from '@app/web/components/structure/fields/VisiblePourCartographieNationaleFields'
import { CompleteFields } from '@app/web/components/form/CompleteFields'
import {
  appendComment,
  emptyOpeningHours,
} from '@app/web/components/structure/fields/openingHoursHelpers'

const CreerStructureForm = ({
  lieuActiviteMediateurId,
  backLinkHref,
  nextHref,
  onVisiblePourCartographieNationaleChange,
  defaultValues,
}: {
  lieuActiviteMediateurId?: string
  backLinkHref: string
  nextHref: string
  onVisiblePourCartographieNationaleChange?: (visible: boolean) => void
  defaultValues?: DefaultValues<CreerStructureData>
}) => {
  const form = useForm<CreerStructureData>({
    resolver: zodResolver(CreerStructureValidation),
    defaultValues: {
      ...defaultValues,
      lieuActiviteMediateurId,
      visiblePourCartographieNationale: false,
      openingHours: emptyOpeningHours,
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form

  useScrollToError({ errors })

  const mutation = trpc.structures.create.useMutation()

  const router = useRouter()

  const onSubmit = async (data: CreerStructureData) => {
    try {
      await mutation.mutateAsync({
        ...data,
        ...siretOrRna(data),
        horaires: appendComment(
          fromTimetableOpeningHours(data.openingHours as Schedule),
          data?.horairesComment,
        ),
      })
      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été créé.',
      })

      router.push(nextHref)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="fr-btns-group">
        <Button
          type="submit"
          {...buttonLoadingClassname(
            mutation.isPending,
            'fr-width-full fr-mt-10v fr-mb-4v',
          )}
        >
          Créer le lieu d’activité
        </Button>
        <Button
          className="fr-mb-20v"
          priority="secondary"
          linkProps={{
            href: backLinkHref,
            'aria-disabled': mutation.isPending,
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(CreerStructureForm)
