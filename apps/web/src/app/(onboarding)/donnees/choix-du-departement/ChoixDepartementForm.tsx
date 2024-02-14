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
import { OptionTuple, optionTuplesToOptions } from '@app/web/utils/options'

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fr-flex fr-direction-column fr-flex-grow-1"
    >
      <SelectFormField
        className="fr-mt-8v"
        label=""
        control={control}
        placeholder="Sélectionner un département"
        options={optionTuplesToOptions([...optionsDepartements])}
        path="codeDepartement"
      />

      <div className="fr-mt-8v">
        <Link
          href="/en-savoir-plus/donnees/tableau-de-bord"
          className="fr-link"
        >
          En savoir plus{' '}
          <span className="fr-ml-1v fr-icon-arrow-right-line fr-icon--sm" />
        </Link>
      </div>

      {/* Push button at the bottom */}
      <div className="fr-flex-grow-1" />
      <div>
        <Button
          priority="tertiary"
          className="fr-mr-2w"
          linkProps={{ href: '/' }}
        >
          Retour à l’accueil
        </Button>
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Accéder
        </Button>
      </div>
    </form>
  )
}

export default ChoixDepartementForm
