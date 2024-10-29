import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerProjection,
  Conseiller,
  ConseillerNumeriqueProjection,
  mongoQueryConseillerProjection,
} from '@app/web/external-apis/conseiller-numerique/conseillersProjection'

export type GetConseillersNumeriquesOptions = {
  estCoordinateur?: boolean
}

export const getConseillersNumeriques = async (
  options?: GetConseillersNumeriquesOptions,
): Promise<Conseiller[]> => {
  const { estCoordinateur } = options ?? {}

  const collection = await conseillerNumeriqueMongoCollection('conseillers')

  // Mongodb select but only the fields we need
  const documents = (await collection
    .find({ estCoordinateur }, { projection: mongoQueryConseillerProjection })
    .toArray()) as unknown as ConseillerNumeriqueProjection[]

  return documents.map(cleanConseillerProjection)
}
