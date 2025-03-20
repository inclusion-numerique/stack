'use client'

import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import {
  CreerEmployeStructureData,
  CreerEmployeStructureValidation,
} from '@app/web/app/employe-structure/CreerEmployeStructureValidation'
import { debouncedLoadStructureEmployeuseOptions } from '@app/web/app/inscription/(steps)/_components/structure-employeuse/loadStructureEmployeuseOptions'
import type { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'
import type { SessionUser } from '@app/web/auth/sessionUser'
import StructureCard from '@app/web/components/structure/StructureCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const CreerEmployeStructureForm = ({
  user,
}: {
  user: Pick<SessionUser, 'id' | 'name'>
}) => {
  const form = useForm<CreerEmployeStructureData>({
    resolver: zodResolver(CreerEmployeStructureValidation),
    defaultValues: {
      userId: user.id,
    },
  })

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = form

  const mutation = trpc.employeStructure.creer.useMutation()

  const router = useRouter()

  const onSubmit = async (data: CreerEmployeStructureData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: `La structure employeuse de ${user.name} a bien été ajoutée.`,
      })
      router.push(`/administration/utilisateurs/${user.id}/emplois`)
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

  const structuresMapRef = useRef(
    new Map<string, StructureCreationDataWithSiret>(),
  )

  const [selectedStructure, setSelectedStructure] =
    useState<StructureCreationDataWithSiret | null>(null)

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
      {!!selectedStructure && (
        <StructureCard
          className="fr-mt-6v fr-mb-6v"
          structure={selectedStructure}
        />
      )}
      <InputFormField
        control={control}
        path="creation"
        label="Date de début de l’emploi"
        asterisk
        disabled={isLoading}
        type="date"
      />
      <InputFormField
        control={control}
        hint="Renseigner uniquement si c’est une structure employeuse historique qui n’est plus d’actualité"
        path="suppression"
        label="Date de fin de l’emploi"
        disabled={isLoading}
        type="date"
      />

      <div className="fr-btns-group fr-btns-group--icon-left">
        <Button
          type="submit"
          priority="primary"
          {...buttonLoadingClassname(isLoading, 'fr-mb-0 ')}
        >
          Ajouter
        </Button>
        <Button
          priority="tertiary"
          className="fr-mt-4v"
          linkProps={{
            href: `/administration/utilisateurs/${user.id}/emplois`,
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(CreerEmployeStructureForm)
