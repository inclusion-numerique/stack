import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { trpc } from '@app/web/trpc'
import { getUserDisplayName } from '@app/web/utils/user'
import { useCallback, useRef } from 'react'

type UserRef = {
  name: string | null
  id: string
  firstName: string | null
  lastName: string | null
  email: string
}

export const useMediateursSearch = ({
  initialMediateursOptions,
  allowTextValue = false,
}: {
  initialMediateursOptions: MediateurOption[]
  allowTextValue?: boolean
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
            isDisabled: true,
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
          isDisabled: true,
        },
        ...result.mediateurs.map((mediateur) => ({
          label: getUserDisplayName(mediateur.user),
          value: {
            mediateurId: mediateur.id,
            email: mediateur.user.email,
            isConseillerNumerique: mediateur.conseillerNumerique != null,
          },
        })),
        ...(allowTextValue
          ? [
              {
                label: search,
                value: { email: search, mediateurId: search },
              },
            ]
          : []),
        ...(hasMoreMessage
          ? [{ label: hasMoreMessage, value: null, isDisabled: true }]
          : []),
      ]
    },
    [mediateursMapRef, trpcClient],
  )

  return {
    initialOptions,
    loadOptions,
  }
}
