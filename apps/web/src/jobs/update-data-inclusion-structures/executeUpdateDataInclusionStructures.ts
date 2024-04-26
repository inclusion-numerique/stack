import { v4 } from 'uuid'
import { type Prisma } from '@prisma/client'
import { chunk } from 'lodash'
import {
  type DataInclusionStructure,
  downloadDataInclusionStructures,
  getStructuresFromLocalFile,
} from '@app/web/data/data-inclusion/dataInclusionStructures'
import { prismaClient } from '@app/web/prismaClient'
import type { UpdateDataInclusionStructuresJob } from '@app/web/jobs/update-data-inclusion-structures/updateDataInclusionStructuresJob'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { dataInclusionStructureUniqueId } from '@app/web/data/data-inclusion/dataInclusionStructureUniqueId'
import { output } from '@app/web/jobs/output'

const dataInclusionStructureToStructureData = ({
  id: idDataInclusion,
  date_maj,
  source,
  nom,
  rna,
  siret,
  commune,
  adresse,
  antenne,
  accessibilite,
  code_insee,
  code_postal,
  complement_adresse,
  courriel,
  labels_autres,
  horaires_ouverture,
  labels_nationaux,
  lien_source,
  thematiques,
  latitude,
  longitude,
  presentation_detail,
  presentation_resume,
  site_web,
  telephone,
  typologie,
}: DataInclusionStructure): Prisma.StructureCreateManyInput => ({
  idDataInclusion: dataInclusionStructureUniqueId({
    id: idDataInclusion,
    source,
  }),
  dateMaj: new Date(date_maj),
  source,
  nom,
  rna,
  siret,
  commune: commune ?? '',
  adresse: adresse ?? '',
  antenne,
  accessibilite,
  codeInsee: code_insee ?? '',
  codePostal: code_postal ?? '',
  complementAdresse: complement_adresse,
  courriel,
  labelsAutres: labels_autres ?? [],
  horairesOuverture: horaires_ouverture,
  labelsNationaux: labels_nationaux ?? [],
  lienSource: lien_source,
  thematiques: thematiques ?? [],
  latitude,
  longitude,
  presentationDetail: presentation_detail,
  presentationResume: presentation_resume,
  siteWeb: site_web,
  telephone,
  typologie,
})

export const executeUpdateDataInclusionStructures = async (
  _job: UpdateDataInclusionStructuresJob,
) => {
  output.log(
    `update-di-structures-job: fetching existing and data inclusion dataset`,
  )

  const [existingStructures, dataInclusionStructures] = await Promise.all([
    prismaClient.structure.findMany({
      where: {
        idDataInclusion: {
          not: null,
        },
      },
      select: {
        id: true,
        idDataInclusion: true,
        dateMaj: true,
        creationImport: true,
        modificationImport: true,
        modification: true,
      },
    }),
    downloadDataInclusionStructures().then(() => getStructuresFromLocalFile()),
  ])

  output.log(
    `update-di-structures-job: fetched ${existingStructures.length} existing and ${dataInclusionStructures.length} data inclusion structures`,
  )

  const existingMap = new Map(
    existingStructures.map((s) => [s.idDataInclusion, s]),
  )
  const dataInclusionStructuresMap = new Map(
    dataInclusionStructures.map((s) => [dataInclusionStructureUniqueId(s), s]),
  )

  const toCreate = dataInclusionStructures.filter(
    (s) => !existingMap.has(dataInclusionStructureUniqueId(s)),
  )

  const toUpdate = dataInclusionStructures.filter((s) => {
    const existing = existingMap.get(dataInclusionStructureUniqueId(s))
    return existing && existing.dateMaj.getTime() !== s.date_maj
  })

  const toDelete = existingStructures.filter(
    (s) =>
      !!s.idDataInclusion && !dataInclusionStructuresMap.has(s.idDataInclusion),
  )

  output.log(
    `update-di-structures-job: ${toCreate.length} new, ${toUpdate.length} updated, ${toDelete.length} deleted`,
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
    `update-di-structures-job: creating ${creationChunks.length} chunks of 500 structures`,
  )

  for (const creationChunk of creationChunks) {
    // eslint-disable-next-line no-await-in-loop
    await prismaClient.structure.createMany({
      data: creationChunk.map((structure) => ({
        ...dataInclusionStructureToStructureData(structure),
        creationImport: now,
        modificationImport: now,
        creation: now,
        modification: now,
        id: v4(),
      })),
    })
  }

  output.log(
    `update-di-structures-job: updating ${editionChunks.length} chunks of 10 structures`,
  )

  for (const editionChunk of editionChunks) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      editionChunk.map((structure) =>
        prismaClient.structure.update({
          where: {
            idDataInclusion: dataInclusionStructureUniqueId(structure),
          },
          data: {
            ...dataInclusionStructureToStructureData(structure),
            modificationImport: now,
            modification: now,
          },
        }),
      ),
    )
  }

  output.log(
    `update-di-structures-job: deleting ${deletionChunks.length} chunks of 300 structures`,
  )

  for (const deletionChunk of deletionChunks) {
    // eslint-disable-next-line no-await-in-loop
    await prismaClient.structure.updateMany({
      where: {
        idDataInclusion: {
          in: deletionChunk
            .map((s) => s.idDataInclusion)
            .filter(isDefinedAndNotNull),
        },
      },
      data: {
        modification: now,
        suppression: new Date(),
        suppressionImport: new Date(),
      },
    })
  }

  output.log(`update-di-structures-job: done`)

  return {
    created: toCreate.length,
    updated: toUpdate.length,
    deleted: toDelete.length,
  }
}
