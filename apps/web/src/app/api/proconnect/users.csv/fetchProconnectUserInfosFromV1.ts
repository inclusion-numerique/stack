import { ObjectId } from 'mongodb'
import type { ProconnectUserInfo } from '@app/web/app/api/proconnect/users.csv/ProconnectUserInfoApiResponse'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { MiseEnRelationV1MinimalProjection } from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'

export const fetchProconnectUserInfosFromV1 = async (): Promise<{
  users: ProconnectUserInfo[]
}> => {
  const misesEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  const misesEnRelation = (await misesEnRelationCollection
    .find(
      {
        'conseillerObj.emailPro': {
          $exists: true,
          $ne: null,
          $regex: String.raw`^(?!.*@conseiller-numerique\.fr$)`,
        },
        statut: {
          $in: ['finalisee', 'nouvelle_rupture'],
        },
        'structureObj.siret': {
          $exists: true,
          $ne: null,
        },
      },
      {
        projection: { ...MiseEnRelationV1MinimalProjection, conseillerObj: 1 },
      },
    )
    .toArray()) as {
    _id: ObjectId
    statut: string
    conseillerObj: {
      _id: ObjectId
      prenom: string
      nom: string
      emailPro: string
      telephone: string | null
    }
    structureObj: {
      _id: ObjectId
      idPG: number
      type: string
      statut: string
      nom: string
      siret: string
      codePostal: string
      nomCommune: string
      codeCommune: string
    }
  }[]

  // convert to a ProconnectUserInfo
  const users = misesEnRelation.map(({ conseillerObj, structureObj }) => ({
    id: conseillerObj._id.toString('hex'),
    prenom: conseillerObj.prenom,
    nom: conseillerObj.nom,
    emailPro: conseillerObj.emailPro,
    telephone: conseillerObj.telephone,
    structureId: structureObj._id.toString('hex'),
    structureSiret: structureObj.siret,
    structureNom: structureObj.nom,
  }))

  // create a map by conseiller id to deduplicate by conseiller

  const usersMap = new Map<string, ProconnectUserInfo>(
    users.map((user) => [user.id, user]),
  )

  const deduplicatedUsers = [...usersMap.values()]

  return {
    users: deduplicatedUsers,
  }
}
