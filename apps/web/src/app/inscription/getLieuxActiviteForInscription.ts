import { prismaClient } from '@app/web/prismaClient'
import { StructureData } from '@app/web/app/structure/StructureValidation'

export const getLieuxActiviteForInscription = async ({
  mediateurId,
}: {
  mediateurId: string
}) => {
  const enActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    orderBy: {
      creation: 'asc',
    },
    select: {
      id: true,
      structure: {
        select: {
          id: true,
          structureCartographieNationaleId: true,
          nom: true,
          commune: true,
          codePostal: true,
          codeInsee: true,
          siret: true,
          rna: true,
          adresse: true,
          complementAdresse: true,
          typologies: true,
        },
      },
    },
  })

  const lieuxActivite: StructureData[] = enActivite.map(
    (lieuActivite) => lieuActivite.structure,
  )

  return lieuxActivite
}
