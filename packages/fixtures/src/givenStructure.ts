import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'

export const givenStructure = <
  T extends Partial<Prisma.StructureCreateInput> & {
    nom: string
    adresse: string
    commune: string
    codePostal: string
  },
>(
  data: T,
): Omit<T, 'id'> & {
  id: string
} => {
  const { id, ...rest } = data

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest,
  } satisfies Prisma.StructureCreateInput
}
