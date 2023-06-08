'use client'

import { UseFormReturn } from 'react-hook-form'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import { ContentPayload } from '@app/web/server/resources/feature/Content'

const TextEdition = ({ form }: { form: UseFormReturn<ContentPayload> }) => (
  <RichInputFormField
    data-testid="text-input"
    form={form}
    path="text"
    label="Tapez votre texte"
  />
)

export default TextEdition
