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
) => {
  const { id, ...rest } = data

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest, // Spread the rest of the input
    anonyme: data.anonyme ?? undefined,
    attributionsAleatoires: data.attributionsAleatoires ?? undefined,
    telephone: data.telephone ?? null,
    pasDeTelephone: data.pasDeTelephone ?? null,
    email: data.email ?? null,
    anneeNaissance: data.anneeNaissance ?? null,
    adresse: data.adresse ?? null,
    commune: data.commune ?? null,
    communeCodePostal: data.communeCodePostal ?? null,
    communeCodeInsee: data.communeCodeInsee ?? null,
    vaPoursuivreParcoursAccompagnement:
      data.vaPoursuivreParcoursAccompagnement ?? null,
    genre: data.genre ?? null,
    trancheAge: data.trancheAge ?? null,
    statutSocial: data.statutSocial ?? null,
    notes: data.notes ?? null,
    creation: data.creation ?? undefined,
    modification: data.modification ?? undefined,
    suppression: data.suppression ?? null,
    accompagnements: data.accompagnements ?? undefined, // This can be omitted
  } satisfies Prisma.BeneficiaireUncheckedCreateInput
}

export const givenBeneficiaireAnonyme = <
  T extends Partial<Prisma.BeneficiaireUncheckedCreateInput> & {
    prenom?: null
    nom?: null
    mediateurId: string
  },
>(
  data: T,
) => {
  const { id, ...rest } = data

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest,
    anonyme: true,
    attributionsAleatoires: data.attributionsAleatoires ?? undefined,
    telephone: data.telephone ?? null,
    pasDeTelephone: data.pasDeTelephone ?? null,
    email: data.email ?? null,
    anneeNaissance: data.anneeNaissance ?? null,
    adresse: data.adresse ?? null,
    commune: data.commune ?? null,
    communeCodePostal: data.communeCodePostal ?? null,
    communeCodeInsee: data.communeCodeInsee ?? null,
    vaPoursuivreParcoursAccompagnement:
      data.vaPoursuivreParcoursAccompagnement ?? null,
    genre: data.genre ?? null,
    trancheAge: data.trancheAge ?? null,
    statutSocial: data.statutSocial ?? null,
    notes: data.notes ?? null,
    creation: data.creation ?? undefined,
    modification: data.modification ?? undefined,
    suppression: data.suppression ?? null,
    accompagnements: data.accompagnements ?? undefined, // This can be omitted
  } satisfies Prisma.BeneficiaireUncheckedCreateInput
}
