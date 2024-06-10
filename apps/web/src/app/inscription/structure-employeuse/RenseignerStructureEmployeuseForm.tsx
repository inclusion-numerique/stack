'use client'

import React, { useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type RenseignerStructureEmployeuseData,
  RenseignerStructureEmployeuseValidation,
} from '@app/web/inscription/RenseignerStructureEmployeuse'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { trpc } from '@app/web/trpc'
import { rechercheApiEntreprise } from '@app/web/external-apis/rechercheApiEntreprise'
import { structureCreationDataWithSiretFromUniteLegale } from '@app/web/structure/structuresInfoFromUniteLegale'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import StructureCard from '@app/web/components/structure/StructureCard'
import { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'

const RenseignerStructureEmployeuseForm = ({
  defaultValues,
  structureEmployeuse,
}: {
  defaultValues: DefaultValues<RenseignerStructureEmployeuseData>
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
      typologie: structure.typologie,
      commune: structure.commune,
      codeInsee: structure.codeInsee,
      nom: structure.nom,
    })
  }, [selectedStructureSiret, setValue])

  const loadOptions = async (search: string) => {
    if (search.length < 3) {
      return [
        {
          label: `La recherche doit contenir au moins 3 caractères`,
          value: '',
        },
      ]
    }
    const result = await rechercheApiEntreprise({
      q: search,
      minimal: true,
      include: 'complements,matching_etablissements',
    })

    console.log('SERACH RESULTS IN CLIENT', result)

    const structures = result.results.flatMap(
      structureCreationDataWithSiretFromUniteLegale,
    )

    const structuresCount = structures.length

    const hasMore = result.total_results - result.results.length
    const hasMoreMessage = hasMore
      ? hasMore === 1
        ? `Veuillez préciser votre recherche - 1 structure n’est pas affichée`
        : `Veuillez préciser votre recherche - ${hasMore} structures ne sont pas affichées`
      : null

    for (const structure of structures) {
      structuresMapRef.current.set(structure.siret, structure)
    }

    return [
      {
        label: `${structuresCount} résultat${sPluriel(structuresCount)}`,
        value: '',
      },
      ...structures.map(({ adresse, nom, siret, typologie }) => ({
        label: (
          <>
            <div className="fr-width-full fr-text--sm fr-mb-0">{nom}</div>
            <div className="fr-width-full fr-text--xs fr-text-mention--grey fr-mb-0">
              {typologie ? `${typologie} · ` : null}
              {adresse}
            </div>
          </>
        ),
        value: siret,
      })),
      ...(hasMoreMessage
        ? [
            {
              label: hasMoreMessage,
              value: '',
            },
          ]
        : []),
    ] as {
      // Type does not accept ReactNode as label but react-select works with it
      label: string
      value: string
    }[]
  }

  const onSubmit = async (data: RenseignerStructureEmployeuseData) => {
    try {
      await mutation.mutateAsync(data)
      router.push('/inscription/structure-employeuse-lieu-activite')
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomSelectFormField
        key={selectedStructure?.siret}
        label={null}
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
