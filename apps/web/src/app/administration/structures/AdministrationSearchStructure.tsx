'use client'

import { useForm } from 'react-hook-form'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { useRef } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { SearchStructureResultStructure } from '@app/web/structure/searchStructure'

const AdministrationSearchStructure = () => {
  const form = useForm<{ structure: string }>()

  const selectedStructureId = form.watch('structure')
  const { client: trpcClient } = trpc.useContext()

  const structuresMapRef = useRef(
    new Map<string, SearchStructureResultStructure>(),
  )

  const selectedStructure = structuresMapRef.current.get(selectedStructureId)

  const loadOptions = async (search: string) => {
    const result = await trpcClient.structures.search.query({
      query: search,
    })

    console.log('SERACH RESULTS IN CLIENT', result)

    const hasMore = result.matchesCount - result.structures.length
    const hasMoreMessage = hasMore
      ? hasMore === 1
        ? `Veuillez préciser votre recherche - 1 structure n’est pas affichée`
        : `Veuillez préciser votre recherche - ${hasMore} structures ne sont pas affichées`
      : null

    for (const structure of result.structures) {
      structuresMapRef.current.set(structure.id, structure)
    }

    return [
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

  return (
    <>
      <form>
        <CustomSelectFormField
          label={null}
          control={form.control}
          path="structure"
          placeholder="Rechercher"
          loadOptions={loadOptions}
          isOptionDisabled={(option) => option.value === ''}
          cacheOptions
        />
      </form>

      {!!selectedStructure && (
        <>
          <Button
            className="fr-mb-6v fr-mt-2v"
            linkProps={{
              href: `/administration/structures/${selectedStructureId}/modifier`,
            }}
            priority="tertiary"
            iconId="fr-icon-edit-line"
          >
            Modifier cette structure
          </Button>
          <pre className="fr-background-alt--blue-france fr-p-4v fr-border-radius--16 fr-text--xs fr-mb-0">
            {JSON.stringify(selectedStructure, null, 2)}
          </pre>
        </>
      )}
    </>
  )
}

export default withTrpc(AdministrationSearchStructure)
