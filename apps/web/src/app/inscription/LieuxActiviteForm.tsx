'use client'

import React, { ReactNode, useEffect, useRef } from 'react'
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { trpc } from '@app/web/trpc'
import StructureCard from '@app/web/components/structure/StructureCard'
import {
  LieuxActiviteData,
  LieuxActiviteValidation,
} from '@app/web/inscription/LieuxActivite'
import { SearchStructureCartographieNationaleResultStructure } from '@app/web/structure/searchStructureCartographieNationale'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

const LieuxActiviteForm = ({
  defaultValues,
  nextHref,
}: {
  defaultValues: DefaultValues<LieuxActiviteData>
  nextHref: string
}) => {
  const form = useForm<LieuxActiviteData>({
    defaultValues,
    resolver: zodResolver(LieuxActiviteValidation),
  })

  const { client: trpcClient } = trpc.useContext()

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = form

  const {
    fields: structureFields,
    append: appendStructure,
    remove: removeStructure,
  } = useFieldArray({
    control,
    name: 'lieuxActivite',
    keyName: '_formKey',
  })

  const reversedFields = structureFields
    .map((field, index) => ({ field, index }))
    .reverse()

  const mutation = trpc.inscription.renseignerLieuxActivite.useMutation()

  const router = useRouter()

  const structuresMapRef = useRef(
    new Map<string, SearchStructureCartographieNationaleResultStructure>(),
  )

  const selectedCartographieNationaleId = form.watch(
    'addLieuActiviteCartographieNationaleId',
  )

  useEffect(() => {
    if (!selectedCartographieNationaleId) {
      return
    }
    const structure = structuresMapRef.current.get(
      selectedCartographieNationaleId,
    )
    if (!structure) {
      return
    }
    appendStructure({
      structureCartographieNationaleId: selectedCartographieNationaleId,
      id: structure.structure?.id,
      adresse: structure.adresse,
      codeInsee: structure.codeInsee,
      codePostal: structure.codePostal,
      commune: structure.commune,
      complementAdresse: structure.complementAdresse,
      nom: structure.nom,
      siret: structure.pivot,
      typologie: structure.typologie,
    })

    createToast({
      priority: 'success',
      message: `Le lieu d’activité ${structure.nom} a bien été ajouté.`,
    })

    setValue('addLieuActiviteCartographieNationaleId', '')
  }, [selectedCartographieNationaleId, setValue, appendStructure])

  // Used to prevent adding the same structure multiple times
  const alreadySelectedStructureCartoIds = new Set<string>(
    form
      .watch('lieuxActivite')
      .map((structure) => structure.structureCartographieNationaleId)
      .filter(isDefinedAndNotNull),
  )

  const loadOptions = async (search: string) => {
    if (search.length < 3) {
      return [
        {
          label: `La recherche doit contenir au moins 3 caractères`,
          value: '',
        },
      ]
    }
    const result =
      await trpcClient.structures.searchCartographieNationale.query({
        query: search,
        except: [...alreadySelectedStructureCartoIds.values()],
      })

    const hasMore = result.matchesCount - result.structures.length
    const hasMoreMessage = hasMore
      ? hasMore === 1
        ? `Veuillez préciser votre recherche - 1 structure n’est pas affichée`
        : `Veuillez préciser votre recherche - ${hasMore} structures ne sont pas affichées`
      : null

    for (const structure of result.structures) {
      structuresMapRef.current.set(structure.id, structure)
    }

    const options: {
      // Type does not accept ReactNode as label but react-select works with it
      label: ReactNode
      value: string
    }[] = [
      {
        label: `${result.matchesCount} résultat${sPluriel(result.matchesCount)}`,
        value: '',
      },
      ...result.structures.map(
        ({ nom, id, adresse, commune, codePostal, typologie }) => ({
          label: (
            <>
              <div className="fr-width-full fr-text--sm fr-mb-0">{nom}</div>
              <div className="fr-width-full fr-text--xs fr-text-mention--grey fr-mb-0">
                {typologie ? `${typologie} · ` : null}
                {adresse}
                {adresse && (codePostal || commune) ? ', ' : null}
                {codePostal}
                {codePostal && commune ? ' ' : null}
                {commune}
              </div>
            </>
          ),
          value: id,
        }),
      ),
    ]

    if (hasMoreMessage) {
      options.push({
        label: hasMoreMessage,
        value: '',
      })
    } else {
      options.push(
        {
          label: (
            <div style={{ marginBottom: -16 }}>
              Vous ne trouvez pas votre lieu d’activité ?
            </div>
          ),
          value: '',
        },
        {
          label: (
            <div className="fr-btns-group">
              <Button
                priority="secondary"
                className="fr-width-full fr-mb-0"
                linkProps={{
                  href: `/inscription/mediateur/creer-un-lieu-d-activite?nom=${search}`,
                }}
              >
                Créer un lieu d’activité
              </Button>
            </div>
          ),
          value: '',
        },
      )
    }

    return options as { label: string; value: string }[]
  }

  const onSubmit = async (data: LieuxActiviteData) => {
    try {
      await mutation.mutateAsync(data)
      router.push(nextHref)
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

  // Re-render the custom select when structure added to empty the field
  const customSelectKey = structureFields
    .map(
      (structure) => structure.id ?? structure.structureCartographieNationaleId,
    )
    .join('')

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-background-alt--blue-france fr-pt-6v fr-pb-4v fr-px-8v fr-border-radius--8">
        <p className="fr-text--bold fr-mb-1v">
          Renseignez au moins un lieu d’activité pour finaliser votre
          inscription.
        </p>
        <p className="fr-text--sm fr-mb-2v">
          Vous pourrez également les renseigner plus tard via votre espace.
        </p>
        <CustomSelectFormField
          key={customSelectKey}
          label=" "
          control={control}
          path="addLieuActiviteCartographieNationaleId"
          placeholder="Rechercher un lieu d’activité"
          loadOptions={loadOptions}
          isOptionDisabled={(option) => option.value === ''}
          cacheOptions
        />
      </div>
      {errors.lieuxActivite?.root || errors.lieuxActivite?.message ? (
        <p className="fr-text-default--error fr-mb-0">
          {errors.lieuxActivite.root?.message ?? errors.lieuxActivite.message}
        </p>
      ) : null}
      {reversedFields.map(({ field: structure, index }) => (
        <StructureCard
          key={structure.id ?? structure.structureCartographieNationaleId}
          structure={structure}
          className="fr-mt-6v"
          topRight={
            <Button
              type="button"
              priority="tertiary no outline"
              size="small"
              iconPosition="right"
              iconId="fr-icon-close-line"
              onClick={() => removeStructure(index)}
            >
              Retirer
            </Button>
          }
        />
      ))}
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

export default withTrpc(LieuxActiviteForm)
