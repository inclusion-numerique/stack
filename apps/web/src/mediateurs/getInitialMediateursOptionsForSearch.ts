import { prismaClient } from '@app/web/prismaClient'
import { getUserDisplayName, UserDisplayName } from '@app/web/utils/user'
import { MediateurOption } from './MediateurOption'

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

const cannotSearchMediateurCoordonnesWith = (
  coordinateurId?: string,
  mediateurId?: string,
  mediateurCoordonnesIds: string[] = [],
) =>
  coordinateurId == null ||
  (mediateurId == null && mediateurCoordonnesIds.length === 0)

const initialOptionFor = (
  mediateur?: {
    id: string
    user: UserDisplayName
  } | null,
) =>
  mediateur?.id && mediateur?.user
    ? [
        {
          label: `${getUserDisplayName(mediateur.user)} (Mes statistiques)`,
          value: { mediateurId: mediateur.id, email: mediateur.user.email },
        },
      ]
    : []

const sortByName = (
  a: { user: { firstName: string | null; lastName: string | null } },
  b: { user: { firstName: string | null; lastName: string | null } },
) => {
  const lastNameA = a.user?.lastName?.toLowerCase() || ''
  const lastNameB = b.user?.lastName?.toLowerCase() || ''
  const lastNameComparison = lastNameA.localeCompare(lastNameB)

  if (lastNameComparison !== 0) {
    return lastNameComparison
  }

  const firstNameA = a.user?.firstName?.toLowerCase() || ''
  const firstNameB = b.user?.firstName?.toLowerCase() || ''
  return firstNameA.localeCompare(firstNameB)
}

const isRemoved = ({ suppression }: { suppression: Date | null }) => suppression

const toMedtateursByTeam = <
  T extends { coordinations: { suppression: Date | null }[] }[],
>(
  { actifs, anciens }: { actifs: T; anciens: T },
  mediateur: T[number],
): { actifs: T; anciens: T } =>
  mediateur.coordinations.some(isRemoved)
    ? { actifs, anciens: [...anciens, mediateur] as T }
    : { actifs: [...actifs, mediateur] as T, anciens }

export const getInitialMediateursOptionsForSearch = async ({
  mediateurId,
  coordinateurId,
  mediateurCoordonnesIds = [],
}: {
  mediateurId?: string
  coordinateurId?: string
  mediateurCoordonnesIds?: string[]
}) => {
  if (
    cannotSearchMediateurCoordonnesWith(
      coordinateurId,
      mediateurId,
      mediateurCoordonnesIds,
    )
  )
    return []

  const mediateur =
    mediateurId == null
      ? undefined
      : await prismaClient.mediateur.findUnique({
          where: { id: mediateurId },
          select: mediateurSelect,
        })

  if (mediateurCoordonnesIds.length === 0 && mediateur != null)
    return initialOptionFor(mediateur)

  const mediateursForSelect = await prismaClient.mediateur.findMany({
    where: { id: { in: mediateurCoordonnesIds } },
    select: {
      ...mediateurSelect,
      coordinations: {
        where: { coordinateurId },
        select: { suppression: true },
      },
    },
  })

  const { actifs, anciens } = mediateursForSelect.reduce(
    toMedtateursByTeam<typeof mediateursForSelect>,
    { actifs: [], anciens: [] },
  )

  const initialMediateursOptions: MediateurOption[] = [
    ...actifs.sort(sortByName),
    ...anciens.sort(sortByName),
  ].map(({ user, id, coordinations }) => ({
    label: `${coordinations.some(isRemoved) ? 'Ancien membre - ' : ''}${getUserDisplayName(user)}`,
    value: { mediateurId: id, email: user.email },
  }))

  return [...initialOptionFor(mediateur), ...initialMediateursOptions]
}
