import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { ObjectId } from 'mongodb'
import {
  createMediateurEnActivites,
  createStructures,
  type ExistingStructureCartoFromPermanencesV1,
  type ExistingStructuresCartoFromPermanencesV1,
  findExistingStructuresCartoFromPermanencesV1,
  toId,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { toStructureFromCartoStructure } from '@app/web/structure/toStructureFromCartoStructure'
import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import type { PremanenceConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/PremanenceConseillerNumerique'

const toStructureToCreate = (permanence: PremanenceConseillerNumerique) =>
  ({
    id: v4(),
    nom: permanence.nomEnseigne,
    siteWeb: permanence.siteWeb,
    adresse: `${permanence.adresse.numeroRue} ${permanence.adresse.rue}`.trim(),
    commune: permanence.adresse.ville,
    codePostal: permanence.adresse.codePostal,
    latitude: permanence.location.coordinates[1],
    longitude: permanence.location.coordinates[0],
    siret: permanence.siret,
    codeInsee: permanence.adresse.codeCommune,
  }) satisfies Prisma.StructureCreateManyInput

const onlyWithoutStructure = (
  structureCarto: ExistingStructureCartoFromPermanencesV1,
) => !structureCarto.structures

const withAPermanenceMatchingIdOf =
  ({ _id }: { _id: ObjectId }) =>
  (structure: ExistingStructureCartoFromPermanencesV1) =>
    structure.conseillerNumeriquePermanenceIds.includes(_id.toString())

const toMatchingCartoStructureIn =
  (structures: ExistingStructuresCartoFromPermanencesV1) =>
  (permanence: { _id: ObjectId }) =>
    structures.find(withAPermanenceMatchingIdOf(permanence))

const onlyWithoutMatchingPermanenceIn =
  (structures: ExistingStructuresCartoFromPermanencesV1) =>
  (permanence: { _id: ObjectId }) =>
    !structures.some(withAPermanenceMatchingIdOf(permanence))

/**
 * Create needed structures and mediateurEnActivite for a given conseiller v1 data
 * This should be idempotent
 */
export const importLieuxActivitesFromV1Data = async ({
  conseillerV1Data,
  mediateurId,
}: {
  mediateurId: string
  conseillerV1Data: ConseillerNumeriqueV1Data
}) => {
  const existingCartoStructures =
    await findExistingStructuresCartoFromPermanencesV1(conseillerV1Data)

  const noExistingCartoNorStructureWithThePermanenceIds =
    conseillerV1Data.permanences
      .filter(onlyWithoutMatchingPermanenceIn(existingCartoStructures))
      .map(toStructureToCreate)

  const existingCartoButNoStructureWithThePermanenceIds =
    conseillerV1Data.permanences
      .map(toMatchingCartoStructureIn(existingCartoStructures))
      .filter(onlyDefinedAndNotNull)
      .filter(onlyWithoutStructure)
      .map(toStructureFromCartoStructure)

  const existingCartoAndStructureWithThePermanenceIds =
    conseillerV1Data.permanences
      .map(toMatchingCartoStructureIn(existingCartoStructures))
      .filter(onlyDefinedAndNotNull)
      .map(toId)

  const structuresToCreate = [
    ...noExistingCartoNorStructureWithThePermanenceIds,
    ...existingCartoButNoStructureWithThePermanenceIds,
  ]

  await createStructures(structuresToCreate)

  const lieuxActiviteStructureIds = [
    ...existingCartoAndStructureWithThePermanenceIds,
    ...noExistingCartoNorStructureWithThePermanenceIds.map(toId),
    ...existingCartoButNoStructureWithThePermanenceIds.map(toId),
  ]

  await createMediateurEnActivites({
    mediateurId,
    structureIds: lieuxActiviteStructureIds,
  })

  return lieuxActiviteStructureIds
}
