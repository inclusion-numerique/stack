'use client'

import { UseFormReturn } from 'react-hook-form'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'

const TextEdition = ({
  form,
}: {
  form: UseFormReturn<AddContentCommand | EditContentCommand>
}) => (
  <RichInputFormField
    data-testid="text-input"
    form={form}
    path="payload.text"
    label="Tapez votre texte"
  />
)

export default TextEdition
