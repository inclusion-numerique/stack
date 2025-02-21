import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import type { ConseillerNumeriqueV1Collection } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import * as mongoDB from 'mongodb'
import { type Collection, type Document, ObjectId } from 'mongodb'

let client: mongoDB.MongoClient

export const getMongoClient = async () => {
  if (client) {
    return client
  }

  const createdClient: mongoDB.MongoClient = new mongoDB.MongoClient(
    ServerWebAppConfig.ConseillerNumerique.mongodbUrl,
  )

  await createdClient.connect()

  client = createdClient

  return client
}

export const closeMongoClient = () => {
  if (client) {
    return client.close(true)
  }
  return Promise.resolve()
}

export type ConseillerNumeriqueMongoCollectionName =
  | 'conseillers'
  | 'communes'
  | 'conseillersRuptures'
  | 'conseillersSupprimes'
  | 'cras'
  | 'cras_deleted'
  | 'hubs'
  | 'misesEnRelation'
  | 'permanences'
  | 'qpv'
  | 'sondages'
  | 'stats_conseillers_cras'
  | 'stats_Territoires'
  | 'structures'
  | 'users'

// Overload types for specific collections
export function conseillerNumeriqueMongoCollection(
  collectionName: 'conseillers',
): Promise<ConseillerNumeriqueV1Collection>
export function conseillerNumeriqueMongoCollection<
  TSchema extends Document = Document,
>(
  collectionName: ConseillerNumeriqueMongoCollectionName,
): Promise<Collection<TSchema>>
export function conseillerNumeriqueMongoCollection<
  TSchema extends Document = Document,
>(
  collectionName: ConseillerNumeriqueMongoCollectionName,
): Promise<Collection<TSchema> | ConseillerNumeriqueV1Collection> {
  return getMongoClient().then((mongoClient) => {
    if (collectionName === 'conseillers') {
      return mongoClient
        .db()
        .collection('conseillers') as ConseillerNumeriqueV1Collection
    }
    return mongoClient.db().collection<TSchema>(collectionName)
  })
}

export const objectIdFromString = (id: string) => {
  try {
    return new ObjectId(id)
  } catch {
    return null
  }
}
