import React, { useState } from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeContrat } from '@prisma/client'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import { ReplaceUrlToAnchor } from '@app/ui/hooks/useReplaceUrlToAnchor'
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
  ouiOuNonOptions,
  perimetreFeuilleDeRouteLabels,
  typeContratLabels,
  typeContratOptions,
} from '@app/web/gouvernance/gouvernanceWordingsAndOptions'
import { MembreOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import { Option } from '@app/web/utils/options'
import FindMemberNotice from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/FindMemberNotice'

const FeuillesDeRouteForm = ({
  form,
  disabled,
  membreFields,
  appendMembre,
  membresOptions,
  perimetreEpciOptions,
  replaceUrlToAnchor,
  feuillesDeRouteErrorRef,
  departementHasRegion,
}: {
  form: UseFormReturn<GouvernanceData>
  membresOptions: MembreOptions
  appendMembre: (membre: MembreData) => void
  perimetreEpciOptions: Option[]
  membreFields: MembreData[]
  disabled?: boolean
  replaceUrlToAnchor: ReplaceUrlToAnchor
  feuillesDeRouteErrorRef: React.RefObject<HTMLParagraphElement>
  departementHasRegion: boolean
}) => {
  const {
    control,
    formState: { errors },
  } = form

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
    defaultValues: {
      perimetreEpciCodes: [],
    },
  })

  const onEditFeuilleDeRoute = (index: number) => {
    const item = feuilleDeRouteFields[index]

    addFeuilleDeRouteForm.reset({
      id: item.id,
      nom: item.nom,
      porteur: item.porteur,
      contratPreexistant: item.contratPreexistant,
      perimetreEpciCodes: item.perimetreEpciCodes,
      typeContrat: item.typeContrat,
      typeContratAutrePrecisions: item.typeContratAutrePrecisions,
      perimetreScope: item.perimetreScope,
    })

    setEditingFeuilleDeRoute(index)
  }

  const onAddFeuilleDeRoute = () => {
    addFeuilleDeRouteForm.handleSubmit((data) => {
      // TODO: oui / non en boolean
      // TODO remove type si non
      // TODO remove precision si non ou type !== autre

      console.log('ON ADD Feuille de route', data)

      const cleanedData = {
        ...data,
      }

      const existingMembre = membreFields.findIndex(
        ({ code }) => code === data.porteur.code,
      )

      if (existingMembre === -1) {
        appendMembre(data.porteur)
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
      replaceUrlToAnchor(gouvernanceFormSections.feuillesDeRouteEtPorteurs.id)
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

  const showEpciPerimeter =
    addFeuilleDeRouteForm.watch('perimetreScope') === 'epci'

  const membreSelectOptions = membresOptions

  return (
    <GouvernanceFormSectionCard
      {...gouvernanceFormSections.feuillesDeRouteEtPorteurs}
    >
      {/* eslint-disable-next-line no-return-assign */}
      {feuilleDeRouteFields.map(
        (
          { id, nom, porteur: fieldPorteur, perimetreScope, typeContrat },
          index,
        ) => (
          <div key={id}>
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
              <span>
                <InfoLabelValue
                  label={`Feuille de route ${index + 1} : ${nom}`}
                  value={
                    <>
                      Porteur&nbsp;: {fieldPorteur.nom}
                      <br />
                      Périmètre géographique&nbsp;:{' '}
                      {perimetreFeuilleDeRouteLabels[perimetreScope]}
                      {typeContrat ? (
                        <>
                          <br />
                          Contrat préexistant&nbsp;:{' '}
                          {typeContratLabels[typeContrat]}
                        </>
                      ) : null}
                    </>
                  }
                />
              </span>
              <span>
                <Button
                  type="button"
                  priority="tertiary no outline"
                  disabled={disabled}
                  size="small"
                  className="fr-ml-1w"
                  iconId="fr-icon-edit-line"
                  title="Modifier"
                  onClick={() => onEditFeuilleDeRoute(index)}
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
              </span>
            </div>
            <hr className="fr-separator-8v" />
          </div>
        ),
      )}
      {(addingFeuilleDeRoute || editingFeuilleDeRoute !== null) && (
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
            label="Quel membre de la gouvernance porte la feuille de route ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="porteur"
            options={membreSelectOptions}
            placeholder="Rechercher"
            disabled={disabled}
            onInputChange={(value) => {
              console.log('SELECT INPUT CHANGE', value)
            }}
            transformOptionToValue={(option) => ({
              code: option.value,
              nom: option.stringLabel,
              coporteur: false,
            })}
          />
          <FindMemberNotice className="fr-mb-8v" />
          <RadioFormField
            label="Quel est le périmètre géographique de la feuille de route ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="perimetreScope"
            options={feuilleDeRoutePerimetreOptions.filter(
              // Departements without region can't have region perimeter
              ({ value }) => value !== 'region' || departementHasRegion,
            )}
          />
          {showEpciPerimeter && (
            <CheckboxGroupFormField
              label="Veuillez préciser l’EPCI ou les EPCI dans le cas d’un autre groupement de collectivités :"
              asterisk
              control={addFeuilleDeRouteForm.control}
              path="perimetreEpciCodes"
              options={perimetreEpciOptions}
            />
          )}
          <RadioFormField
            label="La feuille de route s’appuie-t-elle sur un contrat préexistant ?"
            asterisk
            control={addFeuilleDeRouteForm.control}
            path="contratPreexistant"
            options={ouiOuNonOptions}
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
      {!!errors.feuillesDeRoute && (
        <p
          ref={feuillesDeRouteErrorRef}
          id="feuilles_de_route__error"
          className="fr-error-text fr-mb-4v"
        >
          {errors.feuillesDeRoute.message}
        </p>
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
