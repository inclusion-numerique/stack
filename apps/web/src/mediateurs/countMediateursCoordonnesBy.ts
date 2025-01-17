import { prismaClient } from '@app/web/prismaClient'

export const countMediateursCoordonnesBy = async (
  coordinateur?: { id: string } | null,
): Promise<{
  total: number
  conseillersNumeriques: number
  mediateursNumeriques: number
}> => {
  if (!coordinateur?.id) {
    return { total: 0, conseillersNumeriques: 0, mediateursNumeriques: 0 }
  }

  const [total, conseillersNumeriques] = await Promise.all([
    prismaClient.mediateurCoordonne.count({
      where: { coordinateurId: coordinateur.id },
    }),
    prismaClient.mediateurCoordonne.count({
      where: {
        coordinateurId: coordinateur.id,
        mediateur: { conseillerNumerique: { isNot: null } },
      },
    }),
  ])

  return {
    total,
    conseillersNumeriques,
    mediateursNumeriques: total - conseillersNumeriques,
  }
}
