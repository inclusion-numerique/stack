'use client'

import SelectFormField from '@app/ui/components/Form/SelectFormField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  emptyOptionTuple,
  OptionTuple,
  optionTuplesToOptions,
} from '@app/web/utils/options'

const codeDepartementValidation = z.object({
  codeDepartement: z.string({
    required_error: 'Veuillez sélectionner un département',
  }),
})

type CodeDepartementData = z.infer<typeof codeDepartementValidation>

const AccederAuxDonneesForm = ({
  optionsDepartements,
  defaultDepartementCode,
}: {
  optionsDepartements: OptionTuple[]
  defaultDepartementCode?: string
}) => {
  const { handleSubmit, control } = useForm<CodeDepartementData>({
    resolver: zodResolver(codeDepartementValidation),
    defaultValues: {
      codeDepartement: defaultDepartementCode,
    },
  })

  const router = useRouter()

  const onSubmit = ({ codeDepartement }: CodeDepartementData) => {
    if (!codeDepartement) {
      return
    }
    router.push(`/donnees/departements/${codeDepartement}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectFormField
        label="Département"
        control={control}
        options={optionTuplesToOptions([
          emptyOptionTuple,
          ...optionsDepartements,
        ])}
        path="codeDepartement"
      />

      <Button type="submit">Accéder</Button>
    </form>
  )
}

export default AccederAuxDonneesForm
