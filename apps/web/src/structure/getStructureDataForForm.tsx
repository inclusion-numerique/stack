import { prismaClient } from '@app/web/prismaClient'
import { toTitleCase } from '@app/web/utils/toTitleCase'

export const getStructureDataForForm = async ({
  structureId,
}: {
  structureId: string
}) => {
  const structure = await prismaClient.structure.findUnique({
    where: { id: structureId },
  })

  if (!structure) {
    return null
  }

  return {
    ...structure,
    titlecase: {
      nom: toTitleCase(structure.nom, { noUpper: true }),
      commune: toTitleCase(structure.commune),
      adresse: toTitleCase(structure.adresse, { noUpper: true }),
    },
  }
}

export type StructureDataForForm = Exclude<
  Awaited<ReturnType<typeof getStructureDataForForm>>,
  null
>
