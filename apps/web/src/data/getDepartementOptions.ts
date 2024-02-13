import { prismaClient } from '@app/web/prismaClient'
import { OptionTuple } from '@app/web/utils/options'

export const getDepartementOptions = () =>
  prismaClient.departement
    .findMany({
      select: {
        code: true,
        nom: true,
      },
      orderBy: {
        code: 'asc',
      },
    })
    .then((departements) =>
      departements.map(
        ({ code, nom }): OptionTuple => [code, `${code} · ${nom}`],
      ),
    )
