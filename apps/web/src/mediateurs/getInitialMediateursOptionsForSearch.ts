import { prismaClient } from '@app/web/prismaClient'
import { getUserDisplayName } from '../utils/user'
import { MediateurOption } from './MediateurOption'

export const getInitialMediateursOptionsForSearch = async ({
  mediateurId,
  mediateurIds,
}: {
  mediateurId?: string
  mediateurIds: string[]
}) => {
  const mediateurSelect = {
    id: true,
    user: {
      select: {
        id: true,
        lastName: true,
        firstName: true,
        name: true,
        email: true,
      },
    },
  }

  const mediateur = await prismaClient.mediateur.findUnique({
    where: { id: mediateurId },
    select: mediateurSelect,
  })

  const mediateursForSelect = await prismaClient.mediateur.findMany({
    where: { id: { in: mediateurIds } },
    select: mediateurSelect,
    orderBy: [{ user: { lastName: 'asc' } }, { user: { firstName: 'asc' } }],
    take: 20,
  })

  const totalCountMediateurs = await prismaClient.mediateur.count({
    where: { id: { in: mediateurIds } },
  })

  const initialMedtateursOptions: MediateurOption[] = mediateursForSelect.map(
    ({ user, id }) => ({
      label: getUserDisplayName(user),
      value: { mediateurId: id },
    }),
  )

  const mediateursNotDisplayed =
    totalCountMediateurs - initialMedtateursOptions.length

  return [
    ...(mediateursNotDisplayed > 0
      ? [
          {
            label: `Veuillez préciser votre recherche - ${
              mediateursNotDisplayed
            } médiateur${mediateursNotDisplayed === 1 ? ' n’est pas affiché' : 's ne sont pas affichés'}`,
            value: null,
          },
        ]
      : []),
    ...(mediateurId == null || mediateur?.user == null
      ? []
      : [
          {
            label: `${getUserDisplayName(mediateur.user)} (Mes statistiques)`,
            value: { mediateurId },
          },
        ]),
    ...initialMedtateursOptions,
  ]
}
