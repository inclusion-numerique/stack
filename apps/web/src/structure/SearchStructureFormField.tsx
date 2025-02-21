'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import { getSiretInfoUrl } from '@app/web/siret/getSiretInfoUrl'
import { requiredSiretValidation } from '@app/web/siret/siretValidation'
import { trpc } from '@app/web/trpc'
import { Spinner } from '@app/web/ui/Spinner'
import Link from 'next/link'
import React, { ReactNode, useEffect } from 'react'
import type {
  DefaultValues,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'

export type SearchStructureFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  SiretPath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  SiretNamePath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues>
  siretPath: SiretPath
  siretNamePath: SiretNamePath
  disabled?: boolean
  label?: ReactNode
  hint?: string
  placeholder?: string
  valid?: string
  icon?: string
  asterisk?: boolean
  defaultValue?: DefaultValues<TFieldValues>
}

const SearchStructureFormField = <
  TFieldValues extends FieldValues = FieldValues,
  SiretPath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  SiretNamePath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  form,
  defaultValue,
  siretPath,
  siretNamePath,
  ...fieldProps
}: SearchStructureFormFieldProps<TFieldValues, SiretPath, SiretNamePath>) => {
  const siret = form.watch(siretPath) ?? ''
  const nom = form.watch(siretNamePath) ?? ''

  const checkSiretMutation = trpc.siret.checkSiret.useMutation()

  const { isPending, mutateAsync } = checkSiretMutation

  useEffect(() => {
    if (!requiredSiretValidation.safeParse(siret).success) {
      // Value is invalid siret, do nothing
      form.setValue(siretNamePath, '' as PathValue<TFieldValues, SiretNamePath>)
      return
    }

    const defaultValueSiret = defaultValue?.[siretPath]

    if (!!nom && siret === defaultValueSiret) {
      // Value is same as default value, do nothing
      return
    }
    form.setValue(siretNamePath, '' as PathValue<TFieldValues, SiretNamePath>)
    checkSiretMutation
      .mutateAsync({ siret })
      .then((result) => {
        if (result.error) {
          form.setValue(
            siretNamePath,
            '' as PathValue<TFieldValues, SiretNamePath>,
          )
          form.setError(siretPath, {
            type: 'custom',
            message: result.error.message ?? 'Ce SIRET n’est pas valide',
          })
          return null
        }

        form.setValue(
          siretPath,
          result.siretInfo.siret as PathValue<TFieldValues, SiretPath>,
        )
        form.setValue(
          siretNamePath,
          (result.siretInfo.nom ?? result.siretInfo.siret) as PathValue<
            TFieldValues,
            SiretNamePath
          >,
        )
        form.clearErrors(siretNamePath)

        return result
      })
      .catch((mutationError) => {
        // TODO What now ?
        form.setError(siretPath, {
          type: 'custom',
          message:
            (mutationError as Error).message ??
            'Une erreur est survenue, merci de réessayer',
        })
        throw mutationError
      })
  }, [mutateAsync, siret])

  const siretError = form.formState.errors[siretPath]
  // Error is fetched from check API
  const nomError = form.formState.errors[siretNamePath]

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
          {nomError.message as string}
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
      path={siretPath}
      info={info}
    />
  )
}

export default withTrpc(SearchStructureFormField)
