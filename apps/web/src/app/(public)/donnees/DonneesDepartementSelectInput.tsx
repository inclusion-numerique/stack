'use client'

import SelectFormField from '@app/ui/components/Form/SelectFormField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  emptyOptionTuple,
  OptionTuple,
  optionTuplesToOptions,
} from '@app/web/utils/options'

const DonneesDepartementSelectInput = ({
  optionsDepartements,
  defaultDepartementCode,
}: {
  optionsDepartements: OptionTuple[]
  defaultDepartementCode?: string
}) => {
  const { watch, control } = useForm<{ codeDepartement: string }>({
    defaultValues: {
      codeDepartement: defaultDepartementCode,
    },
  })

  const router = useRouter()

  watch(({ codeDepartement }) => {
    if (!codeDepartement) {
      return
    }

    router.push(`/donnees/departements/${codeDepartement}`)
  })

  return (
    <SelectFormField
      label="Département"
      control={control}
      options={optionTuplesToOptions([
        emptyOptionTuple,
        ...optionsDepartements,
      ])}
      path="codeDepartement"
    />
  )
}

export default DonneesDepartementSelectInput
