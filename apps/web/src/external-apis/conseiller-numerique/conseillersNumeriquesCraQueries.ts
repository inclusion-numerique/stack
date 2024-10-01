import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { ObjectId } from 'mongodb'
import { CraConseillerNumeriqueCollectionItem } from '@app/web/external-apis/conseiller-numerique/CraConseillerNumerique'
import { StructureConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/StructureConseillerNumerique'

export type GetConseillerNumeriqueCrasOptions = {
  conseillerNumeriqueId: string
}

export const getConseillerNumeriqueCras = async ({
  conseillerNumeriqueId,
}: GetConseillerNumeriqueCrasOptions) => {
  const crasCollection =
    await conseillerNumeriqueMongoCollection<CraConseillerNumeriqueCollectionItem>(
      'cras',
    )

  // Cras collection has _id, conseiller as an ref object {$ref: "conseillers", $id: ObjectId}, createdAt, structure as an ref object {$ref: "structures", $id: ObjectId}
  // and "cra" as an object with the fields of the CRA
  // We want to join with structure, but no need to join with conseiller
  // Order by createdAt ASC

  const cras = await crasCollection
    .find({
      'conseiller.$id': new ObjectId(conseillerNumeriqueId),
    })
    .sort({ createdAt: 1 })
    .toArray()

  // Get a unique set of structure ids
  console.log('CRAS', cras)
  console.log('LAST CRA', cras[cras.length - 1].cra)

  if (cras.length === 0) {
    return {
      cras,
      empty: true,
    }
  }

  const firstDate = cras[0].createdAt
  const lastDate = cras[cras.length - 1].createdAt

  const uniqueStructureIds = new Set(
    cras.map(({ structure }) => structure.oid.toString()),
  )

  console.log('Structure ids', [...uniqueStructureIds.entries()])

  const structuresCollection =
    await conseillerNumeriqueMongoCollection<StructureConseillerNumerique>(
      'structures',
    )

  const structures = await structuresCollection
    // Projection, just get the fields _id, idPG, type, statut, nom, siret, codePostal, nomCommune, codeCommune,codeDepartement,codeRegion,
    .find({
      _id: {
        $in: [...uniqueStructureIds].map(ObjectId.createFromHexString),
      },
    })
    .project({
      _id: 1,
      idPG: 1,
      type: 1,
      statut: 1,
      nom: 1,
      siret: 1,
      codePostal: 1,
      nomCommune: 1,
      codeCommune: 1,
      codeDepartement: 1,
      codeRegion: 1,
    })
    .toArray()

  console.log('Structures', structures)

  const indexedStructures = new Map<string, StructureConseillerNumerique>(
    structures.map((structure) => [structure._id.toString(), structure]),
  )

  const crasWithStructures = cras.map((cra) => ({
    ...cra,
    structure: indexedStructures.get(cra.structure.oid.toString()) ?? null,
  }))

  return {
    cras: crasWithStructures,
    structures,
    expectedStructures: uniqueStructureIds.size,
    empty: false,
    firstDate,
    lastDate,
  }
}
