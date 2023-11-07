import React, { useState } from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { TypeComite } from '@prisma/client'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { gouvernanceFormSections } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import {
  ComiteData,
  ComiteValidation,
  GouvernanceData,
} from '@app/web/gouvernance/Gouvernance'
import GouvernanceFormSectionCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import {
  frequenceComite,
  frequenceComiteOptions,
  typeComite,
  typeComiteOptions,
} from '@app/web/gouvernance/gouvernanceWordingsAndOptions'

const ComitologieForm = ({
  form,
  disabled,
}: {
  form: UseFormReturn<GouvernanceData>
  disabled?: boolean
}) => {
  const { control } = form

  const [addingComite, setAddingComite] = useState(false)

  const {
    fields: comiteFields,
    append: appendComite,
    remove: removeComite,
  } = useFieldArray({
    control,
    name: 'comites',
    keyName: 'id',
  })

  const addComiteForm = useForm<ComiteData>({
    resolver: zodResolver(ComiteValidation),
  })

  const onAddComite = () => {
    addComiteForm.handleSubmit((data) => {
      appendComite({
        ...data,
        typeAutrePrecisions:
          data.type === TypeComite.Autre ? data.typeAutrePrecisions : null,
      })

      setAddingComite(false)
      addComiteForm.reset()
    })()
  }

  const onCancel = () => {
    setAddingComite(false)
    addComiteForm.reset()
  }

  const showPrecisez = addComiteForm.watch('type') === TypeComite.Autre

  return (
    <GouvernanceFormSectionCard {...gouvernanceFormSections.comitologie}>
      {/* eslint-disable-next-line no-return-assign */}
      {comiteFields.map(({ id, type, frequence, commentaire }, index) => (
        <div key={id}>
          <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
            <span>
              <InfoLabelValue
                label={`Comite ${index + 1}`}
                value={
                  <>
                    {typeComite[type]} - {frequenceComite[frequence]}
                    {commentaire ? (
                      <>
                        <br />
                        {commentaire}
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
              iconId="fr-icon-delete-bin-line"
              title="Supprimer"
              onClick={() => removeComite(index)}
            />
          </div>
          <hr className="fr-separator-8v" />
        </div>
      ))}
      {addingComite && (
        <>
          <h6 className="fr-mb-8v">Ajout d’un comité</h6>
          <RadioFormField
            label="Quel type de comité allez-vous organiser ?"
            asterisk
            control={addComiteForm.control}
            path="type"
            options={typeComiteOptions}
            className="fr-mb-0"
          />
          {showPrecisez && (
            <InputFormField
              label="Précisez"
              asterisk
              control={addComiteForm.control}
              path="typeAutrePrecisions"
              className="fr-mb-8v"
            />
          )}
          <RadioFormField
            className="fr-mt-4v"
            label="À quelle fréquence se réunit le comité ?"
            asterisk
            control={addComiteForm.control}
            path="frequence"
            options={frequenceComiteOptions}
          />
          <InputFormField
            type="textarea"
            label="Laissez ici un commentaire général sur le comité"
            control={addComiteForm.control}
            rows={3}
            path="commentaire"
          />
          <div className="fr-flex fr-width-full fr-justify-content-end">
            <Button type="button" onClick={onCancel} priority="secondary">
              Annuler
            </Button>
            <Button
              type="button"
              className="fr-ml-2w"
              onClick={onAddComite}
              iconId="fr-icon-check-line"
              iconPosition="right"
            >
              Ajouter
            </Button>
          </div>
        </>
      )}

      {!addingComite && (
        <div className="fr-btns-group fr-mt-8v fr-mb-0 fr-btns-group--icon-left">
          <Button
            type="button"
            iconId="fr-icon-add-line"
            className="fr-my-0"
            priority="secondary"
            onClick={() => setAddingComite(true)}
          >
            Ajouter un comité
          </Button>
        </div>
      )}
    </GouvernanceFormSectionCard>
  )
}

export default ComitologieForm
