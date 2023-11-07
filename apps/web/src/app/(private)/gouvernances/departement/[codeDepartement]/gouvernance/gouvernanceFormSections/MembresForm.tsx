import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import React from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { gouvernanceFormSections } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import { GouvernanceData, MembreData } from '@app/web/gouvernance/Gouvernance'
import GouvernanceFormSectionCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import {
  filterMemberOptions,
  MembreOptionItem,
  MembreOptions,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import FindMemberNotice from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/FindMemberNotice'
import { getActorFromPorteurCode } from '@app/web/gouvernance/GouvernanceActor'
import { sPluriel } from '@app/web/utils/sPluriel'

const MembresForm = ({
  form,
  membresOptions,
  disabled,
  membreFields,
  removeMembre,
  appendMembre,
}: {
  form: UseFormReturn<GouvernanceData>
  disabled?: boolean
  membresOptions: MembreOptions
  membreFields: MembreData[]
  appendMembre: (membre: MembreData) => void
  removeMembre: (index: number) => void
}) => {
  const { control } = form

  const addMembreForm = useForm<{ code: string }>({
    defaultValues: {
      code: '',
    },
  })

  const onMembreChange = (option: MembreOptionItem | null) => {
    if (!option) {
      return
    }
    appendMembre({
      code: option.value,
      nom: option.stringLabel,
      coporteur: false,
    })
    addMembreForm.reset({ code: '' })
  }

  const collectiviteMembres = membreFields.filter(
    ({ code }) => getActorFromPorteurCode(code).type !== 'structure',
  )
  const structureMembres = membreFields.filter(
    ({ code }) => getActorFromPorteurCode(code).type === 'structure',
  )

  const membreSelectOptions = filterMemberOptions(membresOptions, {
    excludeCodes: membreFields.map(({ code }) => code),
  })

  console.log('MEMBRES - Membres', membreFields)

  return (
    <GouvernanceFormSectionCard
      {...gouvernanceFormSections.membresDeLaGouvernance}
    >
      <CustomSelectFormField
        label="Quelle collectivité/structure sera membre de la gouvernance ?"
        asterisk
        control={addMembreForm.control}
        path="code"
        options={membreSelectOptions}
        placeholder="Rechercher"
        disabled={disabled}
        onInputChange={(value) => {
          console.log('SELECT INPUT CHANGE', value)
        }}
        onSelectChange={onMembreChange}
        defaultValue={{
          // TODO
          value: '',
          label: '',
        }}
      />
      <FindMemberNotice className="fr-mb-8v" />
      <div className="fr-flex fr-width-full fr-justify-content-space-between">
        <p className="fr-text--xl fr-my-0 fr-text--bold">
          Collectivité{sPluriel(collectiviteMembres.length)}
        </p>
        <p className="fr-text--xl fr-my-0 fr-text--bold">
          {collectiviteMembres.length}
        </p>
      </div>
      {membreFields.map(({ code, nom, coporteur }, index) =>
        getActorFromPorteurCode(code).type === 'structure' ? null : (
          <div
            key={code}
            className="fr-mt-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center"
          >
            <span>{nom}</span>
            {coporteur ? (
              <span className="fr-text--xs fr-my-0 fr-ml-2v">Co-porteur</span>
            ) : (
              <Button
                className="fr-ml-2w"
                type="button"
                priority="tertiary no outline"
                size="small"
                iconId="fr-icon-delete-bin-line"
                title="Supprimer"
                onClick={() => removeMembre(index)}
              />
            )}
          </div>
        ),
      )}
      <hr className="fr-separator-8v" />
      <div className="fr-flex fr-width-full fr-justify-content-space-between">
        <p className="fr-text--xl fr-my-0 fr-text--bold">
          Structure{sPluriel(structureMembres.length)}
        </p>
        <p className="fr-text--xl fr-my-0 fr-text--bold">
          {structureMembres.length}
        </p>
      </div>
      {membreFields.map(({ code, nom, coporteur }, index) =>
        getActorFromPorteurCode(code).type === 'structure' ? (
          <div
            key={code}
            className="fr-mt-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center"
          >
            <span>{nom}</span>
            {coporteur ? (
              <span className="fr-text--xs fr-my-0 fr-ml-2v">Co-porteur</span>
            ) : (
              <Button
                className="fr-ml-2w"
                type="button"
                priority="tertiary no outline"
                size="small"
                iconId="fr-icon-delete-bin-line"
                title="Supprimer"
                onClick={() => removeMembre(index)}
              />
            )}
          </div>
        ) : null,
      )}
    </GouvernanceFormSectionCard>
  )
}

export default MembresForm
