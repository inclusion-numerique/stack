import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerProjection,
  ConseillerNumeriqueProjection,
  mongoQueryConseillerProjection,
} from '@app/web/external-apis/conseiller-numerique/conseillersProjection'

export type FindConseillerNumeriqueByEmailOptions = {
  email: string
}

export const findConseillerNumeriqueByEmail = async (
  options: FindConseillerNumeriqueByEmailOptions,
) => {
  const collection = await conseillerNumeriqueMongoCollection('conseillers')

  const email = options.email.trim().toLowerCase()

  // Mongodb select but only the fields we need
  const document = (await collection.findOne(
    {
      deletedAt: {
        $in: [null, undefined],
      },
      $or: [{ email }, { emailPro: email }, { 'emailCN.address': email }],
    },
    {
      projection: mongoQueryConseillerProjection,
    },
  )) as unknown as ConseillerNumeriqueProjection | null

  return document ? cleanConseillerProjection(document) : null
}
