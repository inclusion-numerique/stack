import { ObjectId } from 'mongodb'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerNumeriqueV1Document,
  ConseillerNumeriqueV1Collection,
} from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import {
  MiseEnRelationConseillerNumeriqueV1MinimalProjection,
  MiseEnRelationV1MinimalProjection,
} from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'

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

const findConseillersDocumentByEmails =
  (conseillerCollection: ConseillerNumeriqueV1Collection) =>
  (emails: string[]) => {
    const formattedEmails = emails.map((email) => email.trim().toLowerCase())
    return conseillerCollection
      .find({
        deletedAt: { $in: [null, undefined] },
        $or: formattedEmails.map((email) => ({
          emailPro: { $regex: `^${email}$`, $options: 'i' },
        })),
      })
      .toArray()
  }

export const findConseillersNumeriquesContractInfoByEmails = async (
  userEmails: string[],
) => {
  if (userEmails.length === 0) return []

  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const miseEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  const conseillersDocuments =
    await findConseillersDocumentByEmails(conseillerCollection)(userEmails)

  if (conseillersDocuments.length === 0) return []

  return Promise.all(
    conseillersDocuments.map(async (conseillerDocument) => {
      const contractInfo = (await miseEnRelationCollection.findOne(
        {
          'conseillerObj._id': conseillerDocument._id,
          statut: {
            $in: ['finalisee', 'nouvelle_rupture'],
          },
        },
        { projection: MiseEnRelationV1MinimalProjection },
      )) as unknown as MiseEnRelationConseillerNumeriqueV1MinimalProjection | null

      return {
        conseillerNumeriqueId:
          cleanConseillerNumeriqueV1Document(conseillerDocument).id,
        contractInfo: contractInfo
          ? {
              dateDebutDeContrat: contractInfo.dateDebutDeContrat,
              dateFinDeContrat: contractInfo.dateFinDeContrat,
              typeDeContrat: contractInfo.typeDeContrat,
            }
          : null,
      }
    }),
  )
}
