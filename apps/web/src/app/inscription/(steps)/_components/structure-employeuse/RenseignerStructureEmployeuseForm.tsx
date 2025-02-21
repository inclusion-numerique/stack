'use client'

import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import type { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'
import StructureCard from '@app/web/components/structure/StructureCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type RenseignerStructureEmployeuseData,
  RenseignerStructureEmployeuseValidation,
} from '@app/web/inscription/RenseignerStructureEmployeuse'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { debouncedLoadStructureEmployeuseOptions } from './loadStructureEmployeuseOptions'

const RenseignerStructureEmployeuseForm = ({
  defaultValues,
  nextStep,
  structureEmployeuse,
}: {
  defaultValues: DefaultValues<RenseignerStructureEmployeuseData>
  nextStep: string
  structureEmployeuse: StructureCreationDataWithSiret | null
}) => {
  const form = useForm<RenseignerStructureEmployeuseData>({
    defaultValues,
    resolver: zodResolver(RenseignerStructureEmployeuseValidation),
  })

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = form

  const mutation = trpc.inscription.renseignerStructureEmployeuse.useMutation()

  const router = useRouter()

  const structuresMapRef = useRef(
    new Map<string, StructureCreationDataWithSiret>(),
  )

  const [selectedStructure, setSelectedStructure] =
    useState<StructureCreationDataWithSiret | null>(structureEmployeuse)

  const selectedStructureSiret = form.watch('structureEmployeuse.siret')

  useEffect(() => {
    if (!selectedStructureSiret) {
      return
    }
    const structure = structuresMapRef.current.get(selectedStructureSiret)
    if (!structure) {
      return
    }

    setSelectedStructure(structure)

    setValue('structureEmployeuse', {
      siret: selectedStructureSiret,
      adresse: structure.adresse,
      typologies: structure.typologies,
      commune: structure.commune,
      codeInsee: structure.codeInsee,
      nom: structure.nom,
    })
  }, [selectedStructureSiret, setValue])

  const onSubmit = async (data: RenseignerStructureEmployeuseData) => {
    try {
      await mutation.mutateAsync(data)
      router.push(nextStep)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  const isLoading = isSubmitting || isSubmitSuccessful

  const loadOptions = async (search: string) =>
    debouncedLoadStructureEmployeuseOptions(search, {
      structuresMap: structuresMapRef.current,
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomSelectFormField
        key={selectedStructure?.siret}
        label="Rechercher par SIRET, nom ou adresse de votre structure"
        control={control}
        path="structureEmployeuse.siret"
        placeholder="Rechercher"
        loadOptions={loadOptions}
        isOptionDisabled={(option) => option.value === ''}
        cacheOptions
        info={<SiretInputInfo />}
      />
      {errors.structureEmployeuse?.root ? (
        <p className="fr-text-default--error fr-mb-0">
          {errors.structureEmployeuse.root.message}
        </p>
      ) : null}
      {!!selectedStructure && <StructureCard structure={selectedStructure} />}
      <div className="fr-btns-group">
        <Button
          type="submit"
          priority="primary"
          {...buttonLoadingClassname(isLoading, 'fr-mb-0 fr-mt-12v')}
        >
          Suivant
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(RenseignerStructureEmployeuseForm)
