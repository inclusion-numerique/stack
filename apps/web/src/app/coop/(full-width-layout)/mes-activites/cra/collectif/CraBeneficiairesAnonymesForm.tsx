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
  countNonCommunique,
  countTotal,
  countTotalGenre,
  countTotalStatutSocial,
  countTotalTrancheAge,
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

          for (const type of ['genre', 'trancheAge', 'statutSocial'] as const) {
            const nonCommunique = Math.max(
              countNonCommunique[type](data.participantsAnonymes),
              0,
            )

            if (
              nonCommunique !==
              data.participantsAnonymes[`${type}NonCommunique`]
            ) {
              setValue(
                `participantsAnonymes.${type}NonCommunique`,
                nonCommunique,
              )
            }
          }
        }

        /**
         * If a count value for a sub type is changed, we need to update the "nonCommunique"
         * for this type, and to update the total if needed
         */
        for (const type of ['genre', 'trancheAge', 'statutSocial'] as const) {
          if (
            name?.startsWith(`participantsAnonymes.${type}`) &&
            name !== `participantsAnonymes.${type}NonCommunique` &&
            data.participantsAnonymes
          ) {
            const nonCommunique = countNonCommunique[type](
              data.participantsAnonymes,
            )
            setValue(
              `participantsAnonymes.${type}NonCommunique`,
              Math.max(nonCommunique, 0),
            )

            // If there is more type total than current total, we need to update the total
            if (nonCommunique < 0) {
              // Need to update the value of total
              setValue(
                'participantsAnonymes.total',
                countTotal[type]({
                  ...data.participantsAnonymes,
                  [`${type}NonCommunique`]: 0,
                }),
              )
            }
          }
        }
      },
      [setValue],
    ),
  )

  const data = watch('participantsAnonymes')

  const { total } = data
  const totalGenre = countTotalGenre(data)
  const totalTrancheAge = countTotalTrancheAge(data)
  const totalStatutSocial = countTotalStatutSocial(data)

  const genreNonCommuniqueCount = watch(
    'participantsAnonymes.genreNonCommunique',
  )
  const trancheAgeNonCommuniqueCount = watch(
    'participantsAnonymes.trancheAgeNonCommunique',
  )
  const statutSocialNonCommuniqueCount = watch(
    'participantsAnonymes.statutSocialNonCommunique',
  )

  const disableAddGenre = totalGenre - genreNonCommuniqueCount >= total
  const disableAddTrancheAge =
    totalTrancheAge - trancheAgeNonCommuniqueCount >= total
  const disableAddStatutSocial =
    totalStatutSocial - statutSocialNonCommuniqueCount >= total

  const showCounters =
    total !== 0 ||
    totalGenre !== 0 ||
    totalTrancheAge !== 0 ||
    totalStatutSocial !== 0

  return (
    <>
      <InlinePlusMinusNumberFormField
        control={control}
        disabled={isLoading}
        path="participantsAnonymes.total"
        min={0}
        step={1}
        label="Bénéficiaires anonymes"
        className="fr-mb-0"
        classes={{
          label: 'fr-text--bold fr-text--md fr-m-0',
          input: 'fr-input--white fr-text--medium',
        }}
      />
      {showCounters && (
        <>
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
                  disabledAdd={disableAddGenre}
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
                    disabledAdd={disableAddTrancheAge}
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
                    disabledAdd={disableAddStatutSocial}
                  />
                ),
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CraBeneficiairesMultiplesForm
