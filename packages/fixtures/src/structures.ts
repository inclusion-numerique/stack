import type { Prisma } from '@prisma/client'
import { typologieStructureValue } from '@app/web/app/structure/typologieStructure'
import { givenStructure } from '@app/fixtures/givenStructure'

export const structureEmployeuse = givenStructure({
  id: 'f4dbca97-6fe8-4be1-97be-bdf5e66b9ea8',
  nom: 'Exemple de structure employeuse',
  adresse: '1 rue du vide',
  codePostal: '75001',
  codeInsee: '75101',
  commune: 'Paris 1er',
}) satisfies Prisma.StructureCreateInput

export const mediateque = givenStructure({
  id: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
  nom: 'Exemple de Mediateque',
  adresse: '2 rue des livres',
  codePostal: '69002',
  codeInsee: '69382',
  commune: 'Lyon 2eme',
  typologies: [
    typologieStructureValue.BIB,
    typologieStructureValue.MUNI,
    typologieStructureValue.CIDFF,
  ],
})

export const centreSocial = givenStructure({
  id: '36f20d7e-90ed-4932-911a-55320617ad56',
  nom: 'Exemple de Centre Social',
  adresse: '3 rue des amis',
  codePostal: '75003',
  commune: 'Paris 3eme',
  codeInsee: '75103',
  typologies: [
    typologieStructureValue.PREVENTION,
    typologieStructureValue.REG,
    typologieStructureValue.CCAS,
    typologieStructureValue.CAARUD,
  ],
})

export const fixtureStructures = [structureEmployeuse, mediateque, centreSocial]

export const seedStructures = (transaction: Prisma.TransactionClient) =>
  Promise.all(
    fixtureStructures.map((structure) =>
      transaction.structure.upsert({
        where: { id: structure.id },
        create: structure,
        update: structure,
        select: {
          id: true,
          nom: true,
        },
      }),
    ),
  )
