import { prismaClient } from '@app/web/prismaClient'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { AccompagnementType } from '@app/web/cra/cra'

export const mediateurStructureSelect = ({
  mediateurId,
}: {
  mediateurId: string
}) => ({
  nom: true,
  id: true,
  _count: {
    select: {
      crasIndividuels: {
        where: {
          creeParMediateurId: mediateurId,
        },
      },
      crasCollectifs: {
        where: {
          creeParMediateurId: mediateurId,
        },
      },
      crasDemarchesAdministratives: {
        where: {
          creeParMediateurId: mediateurId,
        },
      },
    },
  },
})

export const getInitialLieuxActiviteOptionsForSearch = async ({
  withMost,
  mediateurId,
}: {
  mediateurId: string
  withMost: AccompagnementType
}) => {
  const structureSelect = mediateurStructureSelect({
    mediateurId,
  })

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    select: {
      id: true,
      structure: {
        select: structureSelect,
      },
    },
    orderBy: [
      {
        structure:
          withMost === 'collectif'
            ? {
                crasCollectifs: {
                  _count: 'desc',
                },
              }
            : withMost === 'demarche'
              ? {
                  crasDemarchesAdministratives: {
                    _count: 'desc',
                  },
                }
              : {
                  crasIndividuels: {
                    _count: 'desc',
                  },
                },
      },
      {
        structure: {
          nom: 'asc',
        },
      },
    ],
  })

  const mostUsedLieuActivite = lieuxActivite.at(0)

  const lieuxActiviteOptions = lieuxActivite.map(
    ({ structure: { id, nom } }) =>
      ({
        value: id,
        label: nom,
      }) satisfies SelectOption,
  )

  return {
    lieuxActiviteOptions,
    mostUsedLieuActivite,
  }
}
