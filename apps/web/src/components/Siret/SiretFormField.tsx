'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import React, { ReactNode, useEffect } from 'react'
import { FieldPath, UseFormReturn } from 'react-hook-form'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import Link from 'next/link'
import SiretInputInfo from '@app/web/components/SiretInputInfo'
import { trpc } from '@app/web/trpc'
import { requiredSiretValidation } from '@app/web/validation/siretValidation'
import { Spinner } from '@app/web/ui/Spinner'
import { getSiretInfoUrl } from '@app/web/components/Siret/getSiretInfoUrl'
import { SiretInfoData } from '@app/web/gouvernance/Gouvernance'

export type SiretFormFieldProps<T extends SiretInfoData> = {
  form: UseFormReturn<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: ReactNode
  hint?: string
  placeholder?: string
  valid?: string
  icon?: string
  asterisk?: boolean
  defaultValue?: DefaultValues<T>
}

const SiretFormField = ({
  form,
  defaultValue,
  ...fieldProps
}: SiretFormFieldProps<SiretInfoData>) => {
  const siret = form.watch('siret') ?? ''
  const nom = form.watch('nom') ?? ''

  const checkSiretMutation = trpc.siret.upsertSiret.useMutation()

  const { isPending, mutateAsync } = checkSiretMutation

  useEffect(() => {
    if (!requiredSiretValidation.safeParse(siret).success) {
      // Value is invalid siret, do nothing
      form.setValue('nom', '')
      return
    }

    if (!!nom && siret === defaultValue?.siret) {
      // Value is same as default value, do nothing
      return
    }
    form.setValue('nom', '')
    checkSiretMutation
      .mutateAsync({ siret })
      .then((result) => {
        if (result.status !== 'Valid') {
          form.setValue('nom', '')
          form.setError('siret', {
            type: 'custom',
            message: result.erreurVerification ?? 'Ce SIRET n’est pas valide',
          })
          return null
        }

        form.setValue('siret', result.siret)
        form.setValue('nom', result.nom ?? result.siret)
        form.clearErrors('nom')

        return result
      })
      .catch((mutationError) => {
        // TODO What now ?
        form.setError('siret', {
          type: 'custom',
          message:
            (mutationError as Error).message ??
            'Une erreur est survenue, merci de réessayer',
        })
        throw mutationError
      })
  }, [mutateAsync, siret])

  const siretError = form.formState.errors.siret
  // Error is fetched from check API
  const nomError = form.formState.errors.nom

  // Info depends of the state of the values and of the state of the check
  // Show loading if check is pending or if check is done and there is no error on SIRET but there is an error on NOM that should be set by check mutation
  const showLoadingInfo = isPending
  // Show value if everything is ok
  const showValueInfo = !!siret && !!nom && !siretError && !nomError

  const info = showLoadingInfo ? (
    <>
      <span className="fr-flex fr-align-items-center  fr-mt-2v ">
        <Spinner size="small" className="fr-mr-1v" /> Vérification du SIRET...
      </span>
      {/* nomError is present if verification is not done yet */}
      {!!nomError && (
        <span className="fr-mt-1v fr-text-default--error fr-mb-0">
          {nomError.message}
        </span>
      )}
    </>
  ) : // Siret and Nom are valid, show the value
  showValueInfo ? (
    <span className="fr-flex fr-direction-column fr-align-items-start fr-justify-content-center fr-mt-2v fr-text-action-high--blue-france">
      <span>
        <span className="fr-icon-checkbox-fill fr-icon--sm fr-mr-1v" />
        {nom}
      </span>
      <Link className="fr-mt-1v" href={getSiretInfoUrl(siret)} target="_blank">
        Fiche établissement sur l’Annuaire des entreprises
      </Link>
    </span>
  ) : (
    // Show default SIRET field helper
    <SiretInputInfo />
  )

  return (
    <InputFormField
      {...fieldProps}
      control={form.control}
      path="siret"
      info={info}
    />
  )
}

export default SiretFormField
