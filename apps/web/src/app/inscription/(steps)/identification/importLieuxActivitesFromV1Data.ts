import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import {
  createMediateurEnActivites,
  createStructures,
  findExistingStructuresCartoFromPermanencesV1,
  toId,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { toStructureFromCartoStructure } from '@app/web/structure/toStructureFromCartoStructure'
import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import type { PermanenceConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/PermanenceConseillerNumerique'

const createStructureDataFromPermanence = (
  permanence: PermanenceConseillerNumerique,
) =>
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
    visiblePourCartographieNationale: !permanence.nonAffichageCarto,
  }) satisfies Prisma.StructureCreateManyInput

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
  const existingCartoStructuresFromPermanences =
    await findExistingStructuresCartoFromPermanencesV1(conseillerV1Data)

  const permanencesWithoutExistingStructureNorCartoStructure =
    existingCartoStructuresFromPermanences
      // We only keep permanences that do not have an existing structure or a structure carto
      .filter(({ structure, structureCarto }) => !structure && !structureCarto)
      .map(({ permanence }) => createStructureDataFromPermanence(permanence))

  const existingCartoButNoStructureWithThePermanenceIds =
    existingCartoStructuresFromPermanences
      // We only keep permanences that have an existing carto structure but no structure
      .filter(({ structure, structureCarto }) => !structure && !!structureCarto)
      .map(({ structureCarto }) => structureCarto)
      .filter(onlyDefinedAndNotNull) // Already filtered but need type safety

      .map(toStructureFromCartoStructure)

  // No need to create data for permanences that already have a structure and a carto structure
  const existingCartoAndStructureWithThePermanenceIds =
    existingCartoStructuresFromPermanences
      // We only keep permanences that have an existing carto structure and a structure
      .filter(
        ({ structure, structureCarto }) => !!structure && !!structureCarto,
      )
      .map(({ structure }) => structure)
      .filter(onlyDefinedAndNotNull) // Already filtered but need type safeity

  const structuresToCreate = [
    ...permanencesWithoutExistingStructureNorCartoStructure,
    ...existingCartoButNoStructureWithThePermanenceIds,
  ]

  // We create the missing structures
  await createStructures(structuresToCreate)

  // We concatenate the structure ids to create the "mediateurEnActivite" relation
  const lieuxActiviteStructureIds = [
    ...permanencesWithoutExistingStructureNorCartoStructure.map(toId),
    ...existingCartoButNoStructureWithThePermanenceIds.map(toId),
    ...existingCartoAndStructureWithThePermanenceIds.map(toId),
  ]

  await createMediateurEnActivites({
    mediateurId,
    structureIds: lieuxActiviteStructureIds,
  })

  return lieuxActiviteStructureIds
}
