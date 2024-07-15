import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import Link from 'next/link'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'

import { StructureInformationsPratiquesData } from '@app/web/app/structure/StructureInformationsPratiquesCommandValidation'

export const InformationsPratiquesInputs = ({
  form,
}: {
  form: UseFormReturn<StructureInformationsPratiquesData>
}) => {
  const {
    control,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <>
      <p className="fr-mb-4w fr-text--sm fr-text-mention--grey">
        Ces champs sont optionnels
      </p>
      <InputFormField
        control={control}
        path="siteWeb"
        label="Site internet du lieu"
        hint="Exemple: https://mastructure.fr"
        disabled={isLoading}
      />
      <CheckboxFormField
        className="fr-mt-6v fr-mb-2v"
        control={control}
        path="lieuItinerant"
        label="Lieu d’activité itinérant (exemple : bus)"
      />

      <InputFormField
        control={control}
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
            >
              accès libre
            </Link>{' '}
            et copiez l’url dans le champs ci-dessous.
          </>
        }
        placeholder="https://acceslibre.beta.gouv.fr/..."
        disabled={isLoading}
      />
      <hr
        className="fr-separator fr-separator-8v"
        id="informations-pratiques"
      />
      <p className="wip-outline">Horaires d’ouverture du lieu</p>
      <p className="fr-text--sm">
        La cartographie nationale utilise des horaires au format open-source{' '}
        <Link
          href="https://www.openstreetmap.org"
          target="_blank"
          className="fr-link fr-link--sm"
        >
          OpenStreetMap
        </Link>
        .<br /> Pour les générer, rendez-vous sur &nbsp;:{' '}
        <Link
          href="https://projets.pavie.info/yohours"
          target="_blank"
          className="fr-link fr-link--sm"
        >
          https://projets.pavie.info/yohours
        </Link>
        <br />
        puis copiez-coller le résultat dans le champ suivant.
      </p>

      <InputFormField
        control={control}
        path="horaires"
        label="Horaires au format Open Street Map"
        hint={
          <>
            Généré depuis{' '}
            <Link
              href="https://projets.pavie.info/yohours"
              target="_blank"
              className="fr-link fr-link--xs"
            >
              https://projets.pavie.info/yohours
            </Link>
          </>
        }
        disabled={isLoading}
      />
    </>
  )
}
