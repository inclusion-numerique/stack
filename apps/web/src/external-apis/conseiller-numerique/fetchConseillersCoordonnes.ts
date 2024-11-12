import { ObjectId } from 'mongodb'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { cleanConseillerNumeriqueV1Document } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'

export const fetchConseillersCoordonnes = async ({
  coordinateurV1Id,
}: {
  coordinateurV1Id: string
}) => {
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const conseillersCoordonnesDocument = await conseillerCollection
    .find({
      coordinateurs: { $elemMatch: { id: new ObjectId(coordinateurV1Id) } },
    })
    .toArray()

  return conseillersCoordonnesDocument.map(cleanConseillerNumeriqueV1Document)
}
