import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import Link from 'next/link'
import { OSM_DAYS_OF_WEEK } from '@gouvfr-anct/timetable-to-osm-opening-hours'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { InformationsPratiquesData } from '@app/web/app/structure/InformationsPratiquesValidation'
import { OpeningHourField } from './OpeningHourField'

export const InformationsPratiquesFields = ({
  form,
}: {
  form: UseFormReturn<InformationsPratiquesData>
}) => (
  <>
    <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
      Ces champs sont optionnels
    </p>
    <InputFormField
      path="siteWeb"
      label="Site internet du lieu"
      hint="Exemple: https://mastructure.fr"
      control={form.control}
      disabled={form.formState.isSubmitting}
    />
    <CheckboxFormField
      className="fr-mt-6v fr-mb-2v"
      path="lieuItinerant"
      label="Lieu d’activité itinérant (exemple : bus)"
      control={form.control}
      disabled={form.formState.isSubmitting}
    />
    <InputFormField
      path="ficheAccesLibre"
      label="Accessibilité"
      hint={
        <>
          Afin de renseigner les informations d’accessibilité sur la structure,
          retrouvez-la via la plateforme{' '}
          <Link
            href="https://acceslibre.beta.gouv.fr"
            target="_blank"
            className="fr-link fr-link--xs"
          >
            accès libre
          </Link>{' '}
          et copiez l’url dans le champs ci-dessous.
        </>
      }
      placeholder="https://acceslibre.beta.gouv.fr/..."
      control={form.control}
      disabled={form.formState.isSubmitting}
    />
    <hr className="fr-separator fr-separator-8v" id="informations-pratiques" />
    <p>Horaires d’ouverture du lieu</p>
    <div className="fr-grid-row fr-grid-row--gutters fr-mb-2w">
      {OSM_DAYS_OF_WEEK.map((day) => (
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
      control={form.control}
      disabled={form.formState.isSubmitting}
    />
  </>
)
