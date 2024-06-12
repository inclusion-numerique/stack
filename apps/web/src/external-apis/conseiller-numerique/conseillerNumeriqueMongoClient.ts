import type { Document } from 'mongodb'
import * as mongoDB from 'mongodb'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import type { ConseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoCollections'

let client: mongoDB.MongoClient

const getMongoClient = async () => {
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

export const conseillerNumeriqueMongoCollection = async <
  TSchema extends Document = Document,
>(
  collectionName: ConseillerNumeriqueMongoCollection,
) =>
  getMongoClient().then((mongoClient) =>
    mongoClient.db().collection<TSchema>(collectionName),
  )
