import { prismaClient } from '@app/web/prismaClient'

export const countMediateursCoordonnesBy = async (
  coordinateur?: { id: string } | null,
): Promise<{
  total: number
  totalAncien: number
  conseillersNumeriques: number
  mediateursNumeriques: number
}> => {
  if (!coordinateur?.id) {
    return {
      total: 0,
      totalAncien: 0,
      conseillersNumeriques: 0,
      mediateursNumeriques: 0,
    }
  }

  const [total, totalAncien, conseillersNumeriques] = await Promise.all([
    prismaClient.mediateurCoordonne.count({
      where: { coordinateurId: coordinateur.id, suppression: null },
    }),
    prismaClient.mediateurCoordonne.count({
      where: { coordinateurId: coordinateur.id, suppression: { not: null } },
    }),
    prismaClient.mediateurCoordonne.count({
      where: {
        coordinateurId: coordinateur.id,
        suppression: null,
        mediateur: { conseillerNumerique: { isNot: null } },
      },
    }),
  ])

  return {
    total,
    totalAncien,
    conseillersNumeriques,
    mediateursNumeriques: total - conseillersNumeriques,
  }
}
