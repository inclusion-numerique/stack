'use client'

import React, { ReactElement, ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'

const EditableCardEditing = ({ children }: { children: ReactNode }) => children

EditableCardEditing.type = 'EditableCardEditing'

const EditableCardPreview = ({ children }: { children: ReactNode }) => children

EditableCardPreview.type = 'EditableCardEditing'

const EditableCard = ({
  id,
  title,
  buttons = [],
  children = [],
}: {
  id: string
  title: string
  buttons?: { children: ReactNode }[]
  children: ReactElement[]
}) => {
  const preview = children.find(({ type }) => type === EditableCardPreview)
  const editing = children.find(({ type }) => type === EditableCardEditing)

  const [isEditMode, setEditMode] = useState(false)

  const toggleEditMode = () => setEditMode(!isEditMode)

  return (
    <div className="fr-card fr-card--editable">
      <div className="fr-card__body">
        <div className="fr-card__header fr-card__separator">
          <h2 id={id} className="fr-card__title">
            {title}
          </h2>
          {!isEditMode && (
            <Button
              data-testid="edit-card-button"
              priority="secondary"
              iconId="fr-icon-edit-line"
              title="Modifier"
              onClick={toggleEditMode}
            />
          )}
        </div>
        {isEditMode && editing && (
          <div className="fr-card__content">{editing}</div>
        )}
        {!isEditMode && preview && (
          <div className="fr-card__content">{preview}</div>
        )}
        {isEditMode && (
          <div className="fr-card__footer">
            <ButtonsGroup
              alignment="right"
              inlineLayoutWhen="always"
              buttons={[
                {
                  children: 'Annuler',
                  priority: 'secondary',
                  onClick: toggleEditMode,
                },
                ...buttons,
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

EditableCard.Editing = EditableCardEditing

EditableCard.Preview = EditableCardPreview

export default EditableCard
