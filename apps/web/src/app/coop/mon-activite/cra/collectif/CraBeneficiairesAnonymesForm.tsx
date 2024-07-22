'use client'

import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React from 'react'
import OneLineIntegerWithPlusAndMinusFormField from '@app/ui/components/Form/OneLineIntegerWithPlusAndMinusFormField'
import {
  genreLabels,
  genreValues,
  statutSocialLabels,
  statutSocialValues,
  trancheAgeLabels,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import {
  countGenreNonCommunique,
  countStatutSocialNonCommunique,
  countTrancheAgeNonCommunique,
} from '@app/web/cra/participantsAnonymes'
import styles from './CraBeneficiairesAnonymesForm.module.css'

const CraBeneficiairesMultiplesForm = ({
  control,
  setValue,
  watch,
  isLoading,
}: {
  isLoading?: boolean
  setValue: UseFormSetValue<CraCollectifData>
  watch: UseFormWatch<CraCollectifData>
  control: Control<CraCollectifData>
}) => {
  watch((data, { name }) => {
    requestAnimationFrame(() => {
      // Set values of non communique to right value if total changes
      if (
        name === 'participantsAnonymes.total' &&
        // This second condition is only for type safety
        data.participantsAnonymes
      ) {
        const genreNonCommunique = countGenreNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.genreNonCommunique',
          Math.max(genreNonCommunique, 0),
        )

        const trancheAgeNonCommunique = countTrancheAgeNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.trancheAgeNonCommunique',
          Math.max(trancheAgeNonCommunique, 0),
        )

        const statutSocialNonCommunique = countStatutSocialNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.statutSocialNonCommunique',
          Math.max(statutSocialNonCommunique, 0),
        )
      }

      // Set values of genreNonCommunique if genre changes
      if (
        name?.startsWith('participantsAnonymes.genre') &&
        name !== 'participantsAnonymes.genreNonCommunique' &&
        data.participantsAnonymes
      ) {
        const genreNonCommunique = countGenreNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.genreNonCommunique',
          Math.max(genreNonCommunique, 0),
        )
      }

      // Set values of trancheAgeNonCommunique if trancheAge changes
      if (
        name?.startsWith('participantsAnonymes.trancheAge') &&
        name !== 'participantsAnonymes.trancheAgeNonCommunique' &&
        data.participantsAnonymes
      ) {
        const trancheAgeNonCommunique = countTrancheAgeNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.trancheAgeNonCommunique',
          Math.max(trancheAgeNonCommunique, 0),
        )
      }

      // Set values of statutSocialNonCommunique if statutSocial changes
      if (
        name?.startsWith('participantsAnonymes.statutSocial') &&
        name !== 'participantsAnonymes.statutSocialNonCommunique' &&
        data.participantsAnonymes
      ) {
        const statutSocialNonCommunique = countStatutSocialNonCommunique(
          data.participantsAnonymes,
        )
        setValue(
          'participantsAnonymes.statutSocialNonCommunique',
          Math.max(statutSocialNonCommunique, 0),
        )
      }
    })
  })

  return (
    <>
      <InputFormField
        control={control}
        disabled={isLoading}
        path="participantsAnonymes.total"
        type="number"
        min={0}
        step={1}
        label="Bénéficiaires anonymes"
        classes={{
          label: 'fr-text--medium fr-mb-3v',
          input: 'fr-input--white fr-input--14v',
        }}
      />
      <p className="fr-text--xs fr-text-mention--grey fr-my-6v">
        Ajoutez des informations anonymes sur les bénéficiaires que vous ne
        souhaitez pas enregistrer afin d’enrichir vos statistiques.
      </p>
      <p className="fr-text--medium fr-mb-3v fr-mt-6v">Genre</p>
      <div className={styles.genreContainer}>
        {genreValues.map((genre) => (
          <OneLineIntegerWithPlusAndMinusFormField
            key={genre}
            control={control}
            disabled={genre === 'NonCommunique' || isLoading}
            path={`participantsAnonymes.genre${genre}`}
            min={0}
            label={genreLabels[genre]}
          />
        ))}
      </div>
      <div className="fr-flex fr-flex-gap-12v">
        <div className="fr-flex-basis-0 fr-flex-grow-1">
          <p className="fr-text--medium fr-mb-3v fr-mt-6v">Tranche d’âge</p>
          {trancheAgeValues.map((trancheAge) => (
            <OneLineIntegerWithPlusAndMinusFormField
              key={trancheAge}
              control={control}
              disabled={trancheAge === 'NonCommunique' || isLoading}
              path={`participantsAnonymes.trancheAge${trancheAge}`}
              min={0}
              label={trancheAgeLabels[trancheAge]}
            />
          ))}
        </div>
        <div className="fr-flex-basis-0 fr-flex-grow-1">
          <p className="fr-text--medium fr-mb-3v fr-mt-6v">
            Statut du bénéficiaire
          </p>
          {statutSocialValues.map((statutSocial) => (
            <OneLineIntegerWithPlusAndMinusFormField
              key={statutSocial}
              control={control}
              disabled={statutSocial === 'NonCommunique' || isLoading}
              path={`participantsAnonymes.statutSocial${statutSocial}`}
              min={0}
              label={statutSocialLabels[statutSocial]}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CraBeneficiairesMultiplesForm
