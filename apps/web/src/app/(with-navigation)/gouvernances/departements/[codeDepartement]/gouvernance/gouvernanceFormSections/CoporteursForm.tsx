import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import React, { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { gouvernanceFormSections } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceFormSections'
import GouvernanceFormSectionCard from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import {
  filterMemberOptions,
  MembreOptionItem,
  MembreOptions,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getMembresOptions'
import FindMemberNotice from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/FindMemberNotice'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { GouvernanceData, MembreData } from '@app/web/gouvernance/Gouvernance'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

const CoporteursForm = ({
  form,
  membresOptions,
  disabled,
  appendMembre,
  membreFields,
  removeMembre,
  updateMembre,
}: {
  form: UseFormReturn<GouvernanceData>
  disabled?: boolean
  membresOptions: MembreOptions
  membreFields: (MembreData & { _formKey: string })[]
  appendMembre: (membre: MembreData) => void
  removeMembre: (index: number) => void
  updateMembre: (index: number, membre: MembreData) => void
}) => {
  const { control, setValue } = form

  const [addingCoporteur, setAddingCoporteur] = useState(false)

  const addCoporteurForm = useForm<{ code: string }>({
    defaultValues: {
      code: '',
    },
  })

  const coporteurCodes = membreFields
    .filter(({ coporteur }) => coporteur)
    .map(({ code }) => code)

  const onCoporteurChange = (option: MembreOptionItem | null) => {
    if (!option) {
      return
    }
    const membreData = {
      code: option.value,
      nom: option.stringLabel,
      coporteur: true,
    }

    const existingMembre = membreFields.findIndex(
      ({ code }) => code === option.value,
    )

    if (existingMembre === -1) {
      appendMembre(membreData)
    } else {
      updateMembre(existingMembre, membreData)
    }

    setValue('pasDeCoporteurs', false)
    setAddingCoporteur(false)
  }

  const onDelete = ({
    porteurFeuilleDeRoute,
    index,
  }: {
    index: number
    porteurFeuilleDeRoute: boolean
  }) => {
    if (porteurFeuilleDeRoute) {
      // Only remove coporteur flag
      updateMembre(index, { ...membreFields[index], coporteur: false })
    } else {
      removeMembre(index)
    }
  }

  const membreSelectOptions = filterMemberOptions(membresOptions, {
    excludeCodes: coporteurCodes,
  })

  const feuillesDeRoutes = form.watch('feuillesDeRoute')
  const membresPorteursFeuillesDeRoute = new Set(
    feuillesDeRoutes
      .map(({ porteur }) => porteur?.code)
      .filter(isDefinedAndNotNull),
  )

  /**
   * Pas de porteur de gouvernance, pas de porteur de feuille de route
   * Si on essaye d’ajouter un membre à la gouvernance, message d’erreur ‘vous ne pouvez pas ajouter de porteur de gouvernance sans porteur de feuille de feuille de route”
   */
  const hasFeuilleDeRoutePorteeSeulementParPrefecture = feuillesDeRoutes.some(
    ({ porteur }) => !porteur,
  )
  const hasNoCoporteurs = coporteurCodes.length === 0
  const cannotAddCoporteur =
    hasNoCoporteurs && hasFeuilleDeRoutePorteeSeulementParPrefecture
  const pasDeCoporteurs = !!form.watch('pasDeCoporteurs')

  let coporteurListIndex = 0

  return (
    <GouvernanceFormSectionCard
      {...gouvernanceFormSections.coporteursDeLaGouvernance}
    >
      {/* eslint-disable-next-line no-return-assign */}
      {membreFields.map(({ code, nom, coporteur }, index) =>
        coporteur ? (
          <div key={code}>
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
              <span>
                <InfoLabelValue
                  label={`Co-porteur ${(coporteurListIndex += 1)}`}
                  value={nom}
                />
              </span>
              <Button
                type="button"
                priority="tertiary no outline"
                size="small"
                iconId="fr-icon-delete-bin-line"
                title="Supprimer"
                onClick={() =>
                  onDelete({
                    index,
                    porteurFeuilleDeRoute:
                      membresPorteursFeuillesDeRoute.has(code),
                  })
                }
              />
            </div>
            <hr className="fr-separator-8v" />
          </div>
        ) : null,
      )}
      {addingCoporteur && (
        <>
          <div className="fr-flex fr-width-full fr-justify-content-space-between fr-align-items-start">
            <h6>Ajout d’une collectivité co-porteuse</h6>
            <Button
              type="button"
              priority="tertiary no outline"
              size="small"
              iconId="fr-icon-close-line"
              title="Annuler"
              onClick={() => setAddingCoporteur(false)}
            />
          </div>
          <CustomSelectFormField
            label="Rechercher un co-porteur de la gouvernance"
            asterisk
            control={addCoporteurForm.control}
            path="code"
            options={membreSelectOptions}
            placeholder="Rechercher"
            disabled={disabled}
            isClearable
            onSelectChange={onCoporteurChange}
          />
          <FindMemberNotice />
        </>
      )}

      {!addingCoporteur && (
        <>
          <div className="fr-btns-group fr-my-8v fr-btns-group--icon-left">
            <Button
              type="button"
              iconId="fr-icon-add-line"
              className="fr-my-0"
              priority="secondary"
              disabled={disabled || cannotAddCoporteur}
              onClick={() => setAddingCoporteur(true)}
            >
              Ajouter un co-porteur
            </Button>
          </div>
          <Notice title="Vous ne pouvez pas ajouter de porteur de gouvernance sans porteur de feuille de feuille de route" />
          {hasNoCoporteurs && (
            <CheckboxFormField
              control={control}
              path="pasDeCoporteurs"
              disabled={disabled || (pasDeCoporteurs && cannotAddCoporteur)}
              className="fr-mt-8v fr-mb-0"
              label={
                <>
                  <strong>Pas de co-porteur de la gouvernance.</strong> Si vous
                  n’avez pas identifié de collectivité co-porteuse, la
                  préfecture sera l’unique porteuse de la gouvernance
                </>
              }
            />
          )}
        </>
      )}
    </GouvernanceFormSectionCard>
  )
}

export default CoporteursForm
