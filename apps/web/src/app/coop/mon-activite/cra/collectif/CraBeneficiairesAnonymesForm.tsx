'use client'

import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import InputFormField from '@app/ui/components/Form/InputFormField'
import styles from './CraBeneficiairesAnonymesForm.module.css'
import React from 'react'
import {
  genreLabels,
  genreValues,
  statutSocialLabels,
  statutSocialValues,
  trancheAgeLabels,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import OneLineIntegerWithPlusAndMinusFormField from '@app/ui/components/Form/OneLineIntegerWithPlusAndMinusFormField'

const CraBeneficiairesMultiplesForm = ({
  control,
  setValue,
  getValues,
  watch,
  isLoading,
}: {
  isLoading?: boolean
  getValues: UseFormGetValues<CraCollectifData>
  setValue: UseFormSetValue<CraCollectifData>
  watch: UseFormWatch<CraCollectifData>
  control: Control<CraCollectifData>
}) => {
  const router = useRouter()

  watch((data, { name, type }) => {
    if (name?.startsWith('participantsAnonymes')) {
      console.log('CHANGE', {
        name,
        type,
        participantsAnonymes: data.participantsAnonymes,
      })
    }
  })

  return (
    <>
      <InputFormField
        control={control}
        disabled={isLoading}
        path="participantsAnonymes.total"
        type="number"
        min={0}
        max={10_000}
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
            max={10_000}
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
              max={10_000}
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
              max={10_000}
              label={statutSocialLabels[statutSocial]}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CraBeneficiairesMultiplesForm
