'use client'

import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import React, { useCallback } from 'react'
import PlusMinusNumberFormField from '@app/ui/components/Form/PlusMinusNumberFormField'
import InlinePlusMinusNumberFormField from '@app/ui/components/Form/InlinePlusMinusNumberFormField'
import classNames from 'classnames'
import { useWatchSubscription } from '@app/ui/hooks/useWatchSubscription'
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

const NonCommuniqueCount = ({
  count,
  label,
}: {
  label: string
  count: number
}) => (
  <div className={styles.nonCommuniqueCountContainer}>
    <p
      className={classNames(
        'fr-text--sm fr-text--medium fr-m-0',
        styles.nonCommuniqueCountLabel,
      )}
    >
      {label}
    </p>
    <p
      className={classNames(
        styles.nonCommuniqueCountNumber,
        'fr-text--md fr-text--medium fr-m-0',
      )}
    >
      {count}
    </p>
  </div>
)

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
  useWatchSubscription(
    watch,
    useCallback(
      (data, { name }) => {
        // Set values of non communique to right value if total changes
        if (name === 'participantsAnonymes.total') {
          // This is only for type safety
          if (!data.participantsAnonymes) {
            return
          }

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
      },
      [setValue],
    ),
  )

  const genreNonCommuniqueCount = watch(
    'participantsAnonymes.genreNonCommunique',
  )
  const trancheAgeNonCommuniqueCount = watch(
    'participantsAnonymes.trancheAgeNonCommunique',
  )
  const statutSocialNonCommuniqueCount = watch(
    'participantsAnonymes.statutSocialNonCommunique',
  )

  return (
    <>
      <InlinePlusMinusNumberFormField
        control={control}
        disabled={isLoading}
        path="participantsAnonymes.total"
        min={0}
        step={1}
        label="Bénéficiaires anonymes"
        classes={{
          label: 'fr-text--bold fr-text--md fr-m-0',
          input: 'fr-input--white fr-text--medium',
        }}
      />
      <p className="fr-text--xs fr-text-mention--grey fr-my-6v">
        Ajoutez des informations anonymes sur les bénéficiaires que vous ne
        souhaitez pas enregistrer afin d’enrichir vos statistiques.
      </p>
      <p className="fr-text--medium fr-mb-3v fr-mt-6v">Genre</p>
      <div className={styles.genreContainer}>
        {genreValues.map((genre) =>
          genre === 'NonCommunique' ? (
            <NonCommuniqueCount
              label={genreLabels[genre]}
              key={genre}
              count={genreNonCommuniqueCount}
            />
          ) : (
            <PlusMinusNumberFormField
              key={genre}
              control={control}
              disabled={isLoading}
              path={`participantsAnonymes.genre${genre}`}
              min={0}
              label={genreLabels[genre]}
            />
          ),
        )}
      </div>
      <div className="fr-flex fr-flex-gap-12v">
        <div className="fr-flex-basis-0 fr-flex-grow-1">
          <p className="fr-text--medium fr-mb-3v fr-mt-6v">Tranche d’âge</p>
          {trancheAgeValues.map((trancheAge) =>
            trancheAge === 'NonCommunique' ? (
              <NonCommuniqueCount
                label={trancheAgeLabels[trancheAge]}
                key={trancheAge}
                count={trancheAgeNonCommuniqueCount}
              />
            ) : (
              <PlusMinusNumberFormField
                key={trancheAge}
                control={control}
                disabled={isLoading}
                path={`participantsAnonymes.trancheAge${trancheAge}`}
                min={0}
                label={trancheAgeLabels[trancheAge]}
              />
            ),
          )}
        </div>
        <div className="fr-flex-basis-0 fr-flex-grow-1">
          <p className="fr-text--medium fr-mb-3v fr-mt-6v">
            Statut du bénéficiaire
          </p>
          {statutSocialValues.map((statutSocial) =>
            statutSocial === 'NonCommunique' ? (
              <NonCommuniqueCount
                label={statutSocialLabels[statutSocial]}
                key={statutSocial}
                count={statutSocialNonCommuniqueCount}
              />
            ) : (
              <PlusMinusNumberFormField
                key={statutSocial}
                control={control}
                disabled={isLoading}
                path={`participantsAnonymes.statutSocial${statutSocial}`}
                min={0}
                label={statutSocialLabels[statutSocial]}
              />
            ),
          )}
        </div>
      </div>
    </>
  )
}

export default CraBeneficiairesMultiplesForm
