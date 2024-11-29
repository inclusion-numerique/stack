import { prismaClient } from '@app/web/prismaClient'

export const getLieuActiviteById = (id: string) =>
  prismaClient.mediateurEnActivite.findUnique({
    where: { id },
    select: { id: true, structure: true },
  })
