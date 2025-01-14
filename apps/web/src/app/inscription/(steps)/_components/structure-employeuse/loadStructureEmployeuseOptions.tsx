import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import React from 'react'
import debounce from 'debounce-promise'
import { structureCreationDataWithSiretFromUniteLegale } from '@app/web/structure/structuresInfoFromUniteLegale'
import { rechercheApiEntreprise } from '@app/web/external-apis/rechercheApiEntreprise'
import type { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'

const loadStructureEmployeuseOptions = async (
  search: string,
  {
    structuresMap,
  }: {
    structuresMap: Map<string, StructureCreationDataWithSiret>
  },
) => {
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
    structuresMap.set(structure.siret, structure)
  }

  return [
    {
      label: `${structuresCount} résultat${sPluriel(structuresCount)}`,
      value: '',
    },
    ...structures.map(({ adresse, nom, siret, typologies }) => ({
      label: (
        <>
          <div className="fr-width-full fr-text--sm fr-mb-0">{nom}</div>
          <div className="fr-width-full fr-text--xs fr-text-mention--grey fr-mb-0">
            {typologies ? `${typologies.join(', ')} · ` : null}
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

export const debouncedLoadStructureEmployeuseOptions = debounce(
  loadStructureEmployeuseOptions,
  800,
)
