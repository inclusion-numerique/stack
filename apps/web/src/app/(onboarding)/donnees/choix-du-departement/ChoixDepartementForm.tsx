'use client'

import SelectFormField from '@app/ui/components/Form/SelectFormField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
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

const ChoixDepartementForm = ({
  optionsDepartements,
  defaultDepartementCode,
}: {
  optionsDepartements: OptionTuple[]
  defaultDepartementCode?: string
}) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<CodeDepartementData>({
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

  const isLoading = isSubmitting || isSubmitSuccessful

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

      <div>
        <Link
          href="/en-savoir-plus/donnees/tableau-de-bord"
          className="fr-link"
        >
          En savoir plus{' '}
          <span className="fr-icon-arrow-right-line fr-icon--sm" />
        </Link>
      </div>

      <Button type="submit" {...buttonLoadingClassname(isLoading)}>
        Accéder
      </Button>
    </form>
  )
}

export default ChoixDepartementForm
