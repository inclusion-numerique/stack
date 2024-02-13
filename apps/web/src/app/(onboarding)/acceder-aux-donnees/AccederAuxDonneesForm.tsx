'use client'

import SelectFormField from '@app/ui/components/Form/SelectFormField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  emptyOptionTuple,
  OptionTuple,
  optionTuplesToOptions,
} from '@app/web/utils/options'

const AccederAuxDonneesForm = ({
  optionsDepartements,
  defaultDepartementCode,
}: {
  optionsDepartements: OptionTuple[]
  defaultDepartementCode?: string
}) => {
  const { watch, handleSubmit, control } = useForm<{ codeDepartement: string }>(
    {
      defaultValues: {
        codeDepartement: defaultDepartementCode,
      },
    },
  )

  const router = useRouter()

  const onSubmit = ({ codeDepartement }: { codeDepartement: string }) => {
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
