import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'

export const givenBeneficiaire = <
  T extends Partial<Prisma.BeneficiaireUncheckedCreateInput> & {
    prenom: string
    nom: string
    mediateurId: string
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
  } satisfies Prisma.BeneficiaireUncheckedCreateInput
}
