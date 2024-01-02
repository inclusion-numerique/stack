'use client'

import { UseFormReturn } from 'react-hook-form'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'

const TextContentEdition = ({
  form,
}: {
  form: UseFormReturn<ClientContentPayload>
}) => <RichInputFormField data-testid="text-input" form={form} path="text" />

export default TextContentEdition
