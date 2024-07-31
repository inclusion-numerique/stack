import { type Prisma } from '@prisma/client'
import { chunk } from 'lodash-es'
import { prismaClient } from '@app/web/prismaClient'
import { output } from '@app/web/jobs/output'
import type { LieuStandardMediationNumerique } from '@app/web/data/standard-mediation-numerique/LieuStandardMediationNumerique'
import type { UpdateStructuresCartographieNationaleJob } from '@app/web/jobs/update-structures-cartographie-nationale/updateStructuresCartographieNationaleJob'
import {
  downloadCartographieNationaleStructures,
  getStructuresCartographieNationaleFromLocalFile,
} from '@app/web/data/cartographie-nationale/cartographieNationaleStructures'
import { extractIdsFromCartographieNationaleStructure } from '@app/web/data/cartographie-nationale/extractIdsFromCartographieNationaleStructure'

const structureCartographieNationaleToPrismaModel = ({
  id,
  date_maj,
  source,
  nom,
  latitude,
  longitude,
  presentation_detail,
  presentation_resume,
  site_web,
  telephone,
  typologie,
  pivot,
  adresse,
  autres_formations_labels,
  code_insee,
  code_postal,
  commune,
  complement_adresse,
  courriels,
  dispositif_programmes_nationaux,
  fiche_acces_libre,
  formations_labels,
  frais_a_charge,
  horaires,
  itinerance,
  modalites_acces,
  modalites_accompagnement,
  prise_en_charge_specifique,
  prise_rdv,
  publics_specifiquement_adresses,
  services,
  structure_parente,
}: LieuStandardMediationNumerique): Prisma.StructureCartographieNationaleCreateManyInput => ({
  id,
  dateMaj: new Date(date_maj),
  source,
  nom,
  pivot,
  commune: commune ?? '',
  adresse: adresse ?? '',
  codeInsee: code_insee ?? '',
  codePostal: code_postal ?? '',
  complementAdresse: complement_adresse,
  latitude,
  longitude,
  presentationDetail: presentation_detail,
  presentationResume: presentation_resume,
  siteWeb: site_web,
  telephone,
  typologie,
  services,
  itinerance,
  horaires,
  courriels,
  autresFormationsLabels: autres_formations_labels,
  dispositifProgrammesNationaux: dispositif_programmes_nationaux,
  ficheAccesLibre: fiche_acces_libre,
  formationsLabels: formations_labels,
  fraisACharge: frais_a_charge,
  modalitesAcces: modalites_acces,
  modalitesAccompagnement: modalites_accompagnement,
  priseEnChargeSpecifique: prise_en_charge_specifique,
  priseRdv: prise_rdv,
  publicsSpecifiquementAdresses: publics_specifiquement_adresses,
  structureParente: structure_parente,
  ...extractIdsFromCartographieNationaleStructure({ id }),
})

export const executeUpdateStructuresCartographieNationale = async (
  _job: UpdateStructuresCartographieNationaleJob,
) => {
  output.log(
    `update-structures-carto: fetching existing and cartographie nationale dataset`,
  )

  const [existingStructures, structuresCartographieNationale] =
    await Promise.all([
      prismaClient.structureCartographieNationale.findMany({
        select: {
          id: true,
          dateMaj: true,
          creationImport: true,
          modificationImport: true,
          modification: true,
        },
        where: {
          suppression: null,
        },
      }),
      downloadCartographieNationaleStructures().then(() =>
        getStructuresCartographieNationaleFromLocalFile(),
      ),
    ])

  output.log(
    `update-structures-carto: fetched ${existingStructures.length} existing and ${structuresCartographieNationale.length} cartographie nationale structures`,
  )

  const existingMap = new Map(existingStructures.map((s) => [s.id, s]))
  const dataInclusionStructuresMap = new Map(
    structuresCartographieNationale.map((s) => [s.id, s]),
  )

  const toCreate = structuresCartographieNationale.filter(
    (s) => !existingMap.has(s.id),
  )

  const toUpdate = structuresCartographieNationale.filter((s) => {
    const existing = existingMap.get(s.id)
    return (
      existing && existing.dateMaj.getTime() !== new Date(s.date_maj).getTime()
    )
  })

  const toDelete = existingStructures.filter(
    (s) => !!s.id && !dataInclusionStructuresMap.has(s.id),
  )

  output.log(
    `update-structures-carto: ${toCreate.length} new, ${toUpdate.length} updated, ${toDelete.length} deleted`,
  )

  const now = new Date()

  /**
   * We cannot use a big transaction because of the number of structures to update timeouts on deployed containers
   * We chunk the updates in smaller batches to avoid memory issues
   */

  const creationChunks = chunk(toCreate, 500)
  const editionChunks = chunk(toUpdate, 10)
  const deletionChunks = chunk(toDelete, 300)

  output.log(
    `update-structures-carto: creating ${creationChunks.length} chunks of 500 structures`,
  )

  for (const creationChunk of creationChunks) {
    // eslint-disable-next-line no-await-in-loop
    await prismaClient.structureCartographieNationale.createMany({
      data: creationChunk.map((structure) => ({
        ...structureCartographieNationaleToPrismaModel(structure),
        creationImport: now,
        modificationImport: now,
        creation: now,
        modification: now,
      })),
    })
  }

  output.log(
    `update-structures-carto: updating ${editionChunks.length} chunks of 10 structures`,
  )

  for (const editionChunk of editionChunks) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      editionChunk.map((structure) =>
        prismaClient.structureCartographieNationale.update({
          where: {
            id: structure.id,
          },
          data: {
            ...structureCartographieNationaleToPrismaModel(structure),
            modificationImport: now,
            modification: now,
          },
        }),
      ),
    )
  }

  output.log(
    `update-structures-carto: deleting ${deletionChunks.length} chunks of 300 structures`,
  )

  for (const deletionChunk of deletionChunks) {
    // eslint-disable-next-line no-await-in-loop
    await prismaClient.structureCartographieNationale.updateMany({
      where: {
        id: {
          in: deletionChunk.map((s) => s.id),
        },
      },
      data: {
        modification: now,
        suppression: new Date(),
        suppressionImport: new Date(),
      },
    })
  }

  output.log(`update-structures-carto: done`)

  return {
    created: toCreate.length,
    updated: toUpdate.length,
    deleted: toDelete.length,
  }
}
