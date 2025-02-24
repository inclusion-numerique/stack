import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { InformationsPratiquesData } from '@app/web/app/structure/InformationsPratiquesValidation'
import { OSM_DAYS_OF_WEEK } from '@gouvfr-anct/timetable-to-osm-opening-hours'
import { OsmDaysOfWeek } from '@gouvfr-anct/timetable-to-osm-opening-hours/lib/cjs/utilities'
import Link from 'next/link'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { OpeningHourField } from './OpeningHourField'

export const InformationsPratiquesFields = <
  T extends Omit<InformationsPratiquesData, 'id'>,
>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { control, formState } =
    form as unknown as UseFormReturn<InformationsPratiquesData>

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <InputFormField
        path="siteWeb"
        label="Site internet du lieu"
        hint="Exemple: https://mastructure.fr"
        control={control}
        disabled={formState.isSubmitting}
      />
      <CheckboxFormField
        className="fr-mt-6v fr-mb-2v"
        path="lieuItinerant"
        label="Lieu d’activité itinérant (exemple : bus)"
        control={control}
        disabled={formState.isSubmitting}
      />
      <InputFormField
        path="ficheAccesLibre"
        label="Accessibilité"
        hint={
          <>
            Afin de renseigner les informations d’accessibilité sur la
            structure, retrouvez-la via la plateforme{' '}
            <Link
              href="https://acceslibre.beta.gouv.fr"
              target="_blank"
              className="fr-link fr-link--xs"
              title="Site d’accès libre (nouvel onglet)"
            >
              accès libre
            </Link>{' '}
            et copiez l’url dans le champs ci-dessous.
          </>
        }
        placeholder="https://acceslibre.beta.gouv.fr/..."
        control={control}
        disabled={formState.isSubmitting}
      />
      <InputFormField
        path="priseRdv"
        label="Prise de rendez-vous en ligne"
        hint={
          <>
            Si la structure dispose d’un outil en ligne de prise de rendez-vous
            (par exemple RDV Service Public{' '}
            <Link
              href="https://www.rdv-aide-numerique.fr/presentation_agent"
              target="_blank"
              className="fr-link fr-link--xs"
              title="Site de RDV Service Public (nouvel onglet)"
            >
              https://www.rdv-aide-numerique.fr/presentation_agent
            </Link>
            ) , vous pouvez ajouter le lien ici.
          </>
        }
        placeholder="https://..."
        control={control}
        disabled={formState.isSubmitting}
      />
      <hr
        className="fr-separator fr-separator-8v"
        id="informations-pratiques"
      />
      <p>Horaires d’ouverture du lieu</p>
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-2w">
        {(OSM_DAYS_OF_WEEK as unknown as OsmDaysOfWeek[]).map((day) => (
          <React.Fragment key={day}>
            <div className="fr-col-6 ">
              <OpeningHourField day={day} period="am" form={form} />
            </div>
            <div className="fr-col-6">
              <OpeningHourField day={day} period="pm" form={form} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <InputFormField
        path="horairesComment"
        label="Détail horaires"
        hint="Vous pouvez renseigner ici des informations spécifiques concernant les horaires."
        control={control}
        disabled={formState.isSubmitting}
      />
    </>
  )
}
