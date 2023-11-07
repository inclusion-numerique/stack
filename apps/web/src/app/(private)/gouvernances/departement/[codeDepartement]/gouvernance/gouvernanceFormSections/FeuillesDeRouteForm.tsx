import React, { useState } from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeContrat } from '@prisma/client'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { gouvernanceFormSections } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import {
  FeuilleDeRouteData,
  FeuilleDeRouteValidation,
  GouvernanceData,
  MembreData,
} from '@app/web/gouvernance/Gouvernance'
import GouvernanceFormSectionCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import {
  feuilleDeRoutePerimetreOptions,
  perimetreFeuilleDeRouteLabels,
  typeContratLabels,
  typeContratOptions,
} from '@app/web/gouvernance/gouvernanceWordingsAndOptions'
import {
  filterMemberOptions,
  MembreOptions,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import { Option } from '@app/web/utils/options'
import FindMemberNotice from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/FindMemberNotice'

const FeuillesDeRouteForm = ({
  form,
  disabled,
  membreFields,
  membresOptions,
  possibleEpciPerimeterOptions,
}: {
  form: UseFormReturn<GouvernanceData>
  membresOptions: MembreOptions
  possibleEpciPerimeterOptions: Option[]
  membreFields: MembreData[]
  disabled?: boolean
}) => {
  const { control } = form

  const [addingFeuilleDeRoute, setAddingFeuilleDeRoute] = useState(false)

  // Index of the form field item being edited
  const [editingFeuilleDeRoute, setEditingFeuilleDeRoute] = useState<
    number | null
  >(null)

  const {
    fields: feuilleDeRouteFields,
    append: appendFeuilleDeRoute,
    remove: removeFeuilleDeRoute,
    update: updateFeuilleDeRoute,
  } = useFieldArray({
    control,
    name: 'feuillesDeRoute',
    keyName: 'id',
  })

  const addFeuilleDeRouteForm = useForm<FeuilleDeRouteData>({
    resolver: zodResolver(FeuilleDeRouteValidation),
  })

  const onAddFeuilleDeRoute = () => {
    addFeuilleDeRouteForm.handleSubmit((data) => {
      // TODO: oui / non en boolean
      // TODO remove type si non
      // TODO remove precision si non ou type !== autre

      const cleanedData = {
        ...data,
      }
      if (addingFeuilleDeRoute) {
        appendFeuilleDeRoute(cleanedData)
        setAddingFeuilleDeRoute(false)
      }

      if (editingFeuilleDeRoute !== null) {
        updateFeuilleDeRoute(editingFeuilleDeRoute, cleanedData)
        setEditingFeuilleDeRoute(null)
      }

      addFeuilleDeRouteForm.reset()
    })()
  }

  const onCancel = () => {
    setAddingFeuilleDeRoute(false)
    addFeuilleDeRouteForm.reset()
  }

  const showTypeContrat =
    addFeuilleDeRouteForm.watch('contratPreexistant') === 'oui'

  const showPrecisez =
    addFeuilleDeRouteForm.watch('typeContrat') === TypeContrat.Autre &&
    showTypeContrat

  const membreSelectOptions = filterMemberOptions(membresOptions, {
    onlyCodes: membreFields.map(({ code }) => code),
  })

  const porteur = addFeuilleDeRouteForm.watch('porteur')
  console.log('PORTEUR VALUE', porteur)

  return (
    <GouvernanceFormSectionCard
      {...gouvernanceFormSections.feuillesDeRouteEtPorteurs}
    >
      {/* eslint-disable-next-line no-return-assign */}
      {feuilleDeRouteFields.map(
        ({ id, porteur, perimetreScope, typeContrat }, index) => (
          <div key={id}>
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
              <span>
                <InfoLabelValue
                  label={`FeuilleDeRoute ${index + 1}`}
                  value={
                    <>
                      {porteur.nom}
                      <br />
                      {perimetreFeuilleDeRouteLabels[perimetreScope]}
                      {typeContrat ? (
                        <>
                          <br />
                          {typeContratLabels[typeContrat]}
                        </>
                      ) : null}
                    </>
                  }
                />
              </span>
              <Button
                type="button"
                priority="tertiary no outline"
                disabled={disabled}
                size="small"
                iconId="fr-icon-edit-line"
                title="Modifier"
                onClick={() => setEditingFeuilleDeRoute(index)}
              />
              <Button
                className="fr-ml-1w"
                type="button"
                priority="tertiary no outline"
                disabled={disabled}
                size="small"
                iconId="fr-icon-delete-bin-line"
                title="Supprimer"
                onClick={() => removeFeuilleDeRoute(index)}
              />
            </div>
            <hr className="fr-separator-8v" />
          </div>
        ),
      )}
      {addingFeuilleDeRoute && (
        <>
          <h6 className="fr-mb-8v">Ajout d’une feuille de route</h6>
          <InputFormField
            label="Quel est le nom de la feuille de route ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="nom"
            className="fr-mb-8v"
          />
          <CustomSelectFormField
            label="Quelle collectivité/structure porte la feuille de route ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="porteur"
            options={membreSelectOptions}
            placeholder="Rechercher"
            disabled={disabled}
            onInputChange={(value) => {
              console.log('SELECT INPUT CHANGE', value)
            }}
            transformOptionToValue={(option) => ({ ...option })}
            defaultValue={{
              // TODO
              value: '',
              label: '',
            }}
          />
          <FindMemberNotice className="fr-mb-8v" />
          <RadioFormField
            label="Quel est le périmètre géographique de la feuille de route ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="perimetreScope"
            options={feuilleDeRoutePerimetreOptions}
          />
          <RadioFormField
            label="La feuille de route s’appuie-t-elle sur un contrat préexistant ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="contratPreexistant"
            options={[
              { value: 'oui', name: 'Oui' },
              { value: 'non', name: 'Non' },
            ]}
          />
          {showTypeContrat && (
            <RadioFormField
              label="Sélectionnez le type de contrat"
              asterisk
              control={addFeuilleDeRouteForm.control}
              path="typeContrat"
              options={typeContratOptions}
              className="fr-mb-0"
            />
          )}
          {showPrecisez && (
            <InputFormField
              label="Précisez"
              asterisk
              control={addFeuilleDeRouteForm.control}
              path="typeContratAutrePrecisions"
              className="fr-mb-8v"
            />
          )}
          <div className="fr-flex fr-width-full fr-justify-content-end">
            <Button type="button" onClick={onCancel} priority="secondary">
              Annuler
            </Button>
            <Button
              type="button"
              className="fr-ml-2w"
              onClick={onAddFeuilleDeRoute}
              iconId="fr-icon-check-line"
              iconPosition="right"
            >
              Ajouter
            </Button>
          </div>
        </>
      )}

      {!addingFeuilleDeRoute && (
        <div className="fr-btns-group fr-mt-8v fr-mb-0 fr-btns-group--icon-left">
          <Button
            type="button"
            iconId="fr-icon-add-line"
            className="fr-my-0"
            priority="secondary"
            onClick={() => setAddingFeuilleDeRoute(true)}
          >
            Ajouter une feuille de route
          </Button>
        </div>
      )}
    </GouvernanceFormSectionCard>
  )
}

export default FeuillesDeRouteForm
