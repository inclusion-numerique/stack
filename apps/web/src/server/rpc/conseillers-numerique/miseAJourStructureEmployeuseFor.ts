import { prismaClient } from '@app/web/prismaClient'
import {
  createStructureEmployeuseFor,
  findExistingStructureForMiseEnRelationActive,
  findStructureCartographieNationaleFromMiseEnRelation,
  MiseEnRelationWithStructureAdministrativeInfo,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'

const createStructureFrom = async (
  miseEnRelation: MiseEnRelationWithStructureAdministrativeInfo,
) => {
  const structureCartographieNationale =
    await findStructureCartographieNationaleFromMiseEnRelation(miseEnRelation)

  return createStructureEmployeuseFor({ miseEnRelationActive: miseEnRelation })(
    structureCartographieNationale,
  )
}

const addMissingReferentTo =
  ({ id }: { id: string }) =>
  async ({
    structureObj: { contact },
  }: MiseEnRelationWithStructureAdministrativeInfo) => {
    await prismaClient.structure.update({
      where: { id },
      data: {
        nomReferent: `${contact?.prenom} ${contact?.nom}`,
        courrielReferent: contact?.email,
        telephoneReferent: contact?.telephone,
      },
    })
  }

export const miseAJourStructureEmployeuseFor =
  (userId: string) =>
  async (miseEnRelation: MiseEnRelationWithStructureAdministrativeInfo) => {
    const existingStructure =
      await findExistingStructureForMiseEnRelationActive({
        miseEnRelationActive: miseEnRelation,
      })

    const structure =
      existingStructure == null
        ? await createStructureFrom(miseEnRelation)
        : existingStructure

    if (structure.nomReferent == null) {
      await addMissingReferentTo(structure)(miseEnRelation)
    }

    // On retire les anciens emplois
    await prismaClient.employeStructure.updateMany({
      where: {
        userId,
        suppression: null,
        structureId: {
          not: structure.id,
        },
      },
      data: {
        suppression: new Date(),
      },
    })

    // We update the "emplois" for the user

    const existingEmploi = await prismaClient.employeStructure.findFirst({
      where: {
        userId,
        structureId: structure.id,
        suppression: null,
      },
      select: {
        id: true,
      },
    })

    // Un doublon de cet emploi existe, on ne fait rien
    if (existingEmploi) {
      return structure
    }

    // On crée un nouvel emploi
    await prismaClient.employeStructure.create({
      data: {
        userId,
        structureId: structure.id,
      },
    })

    return structure
  }
