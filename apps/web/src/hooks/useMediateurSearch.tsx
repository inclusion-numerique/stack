import { useCallback, useRef } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { trpc } from '@app/web/trpc'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { getUserDisplayName } from '@app/web/utils/user'

type UserRef = {
  name: string | null
  id: string
  firstName: string | null
  lastName: string | null
  email: string
}

export const useMediateursSearch = ({
  initialMediateursOptions,
}: {
  initialMediateursOptions: MediateurOption[]
}) => {
  const mediateursMapRef = useRef(new Map<string, UserRef>())

  const { client: trpcClient } = trpc.useContext()

  const initialOptions = initialMediateursOptions.map((option) => option)

  const loadOptions = useCallback(
    async (search: string): Promise<MediateurOption[]> => {
      if (search.trim().length < 3) {
        return [
          {
            label: `La recherche doit contenir au moins 3 caractères`,
            value: null,
          },
        ]
      }

      const result = await trpcClient.mediateur.search.query({
        query: search,
      })

      const hasMore = result.matchesCount - result.mediateurs.length
      const hasMoreMessage = hasMore
        ? hasMore === 1
          ? `Veuillez préciser votre recherche - 1 médiateur n’est pas affiché`
          : `Veuillez préciser votre recherche - ${hasMore} médiateur ne sont pas affichés`
        : null

      for (const mediateur of result.mediateurs) {
        if (mediateur.id)
          mediateursMapRef.current.set(mediateur.id, mediateur.user)
      }

      return [
        {
          label: `${result.matchesCount} résultat${sPluriel(result.matchesCount)}`,
          value: null,
        },
        ...result.mediateurs.map((mediateur) => ({
          label: getUserDisplayName(mediateur.user),
          value: { mediateurId: mediateur.id },
        })),
        ...(hasMoreMessage ? [{ label: hasMoreMessage, value: null }] : []),
      ]
    },
    [mediateursMapRef, trpcClient],
  )

  return {
    initialOptions,
    loadOptions,
  }
}
