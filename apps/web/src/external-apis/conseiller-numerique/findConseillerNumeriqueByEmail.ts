import { ObjectId } from 'mongodb'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerNumeriqueV1Document,
  type ConseillerNumeriqueV1,
  type ConseillerNumeriqueV1Collection,
} from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import { PremanenceConseillerNumerique } from './PremanenceConseillerNumerique'
import { StructureConseillerNumerique } from './StructureConseillerNumerique'

export type ConseillerNumeriqueFound = {
  conseiller: ConseillerNumeriqueV1
  miseEnRelation: StructureConseillerNumerique
  permanences: PremanenceConseillerNumerique[]
  conseillersCoordonnes: ConseillerNumeriqueV1[]
}

export type ConseillerNumeriqueByEmailFinder = (
  email: string,
) => Promise<ConseillerNumeriqueFound | null>

const findConseillersCoordonnesById =
  (conseillerCollection: ConseillerNumeriqueV1Collection) =>
  async (id: string) => {
    const conseillersCoordonnesDocument = await conseillerCollection
      .find({ coordinateurs: { $elemMatch: { id: new ObjectId(id) } } })
      .toArray()

    return conseillersCoordonnesDocument.map(cleanConseillerNumeriqueV1Document)
  }

const findConseillerDocumentByEmail =
  (conseillerCollection: ConseillerNumeriqueV1Collection) => (email: string) =>
    conseillerCollection.findOne({
      deletedAt: { $in: [null, undefined] },
      $or: [{ email }, { emailPro: email }, { 'emailCN.address': email }],
    })

export const findConseillersCoordonnesByEmail = async (userEmail: string) => {
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const email = userEmail.trim().toLowerCase()

  const conseillerNumerique =
    await findConseillerDocumentByEmail(conseillerCollection)(email)

  return conseillerNumerique == null
    ? []
    : findConseillersCoordonnesById(conseillerCollection)(
        conseillerNumerique._id.toString(),
      )
}

export const findConseillerNumeriqueByEmail: ConseillerNumeriqueByEmailFinder =
  async (userEmail: string): Promise<ConseillerNumeriqueFound | null> => {
    const conseillerCollection =
      await conseillerNumeriqueMongoCollection('conseillers')

    const email = userEmail.trim().toLowerCase()

    // Mongodb select but only the fields we need
    const conseillerDocument =
      await findConseillerDocumentByEmail(conseillerCollection)(email)

    if (!conseillerDocument) return null

    const miseEnRelationCollection =
      await conseillerNumeriqueMongoCollection('misesEnRelation')

    const miseEnRelation = (await miseEnRelationCollection.findOne(
      {
        statut: 'finalisee',
        'conseillerObj._id': conseillerDocument._id,
      },
      {
        projection: {
          _id: 1,
          statut: 1,
          structureObj: 1,
          dateRecrutement: 1,
          dateDebutDeContrat: 1,
          dateFinDeContrat: 1,
          typeDeContrat: 1,
        },
      },
    )) as unknown as {
      _id: ObjectId
      statut: 'finalisee'
      structureObj: StructureConseillerNumerique
      dateRecrutement: Date | null
      dateDebutDeContrat: Date | null
      dateFinDeContrat: Date | null
      typeDeContrat: string // 'CDD' or other values
    }

    const permanencesCollection =
      await conseillerNumeriqueMongoCollection('permanences')

    const permanences = (await permanencesCollection
      .find({ conseillers: conseillerDocument._id }) // Where "conseillers" array field  CONTAINS conseiller id
      .toArray()) as unknown as {
      _id: ObjectId
      estStructure: boolean
      nomEnseigne: string
      numeroTelephone: string | null
      email: string | null
      siteWeb: string | null
      siret: string
      adresse: {
        numeroRue: string
        rue: string
        codePostal: string
        ville: string
        codeCommune: string
      }
      location: {
        type: 'Point'
        coordinates: number[]
      }
      horaires: {
        matin: string[]
        apresMidi: string[]
      }[]
      typeAcces: string[]
      conseillers: ObjectId[]
      lieuPrincipalPour: ObjectId[]
      conseillersItinerants: ObjectId[]
      structure: {
        _id: ObjectId
      }
      updatedAt: Date
      updatedBy: ObjectId
    }[]

    return conseillerDocument
      ? {
          conseiller: cleanConseillerNumeriqueV1Document(conseillerDocument),
          miseEnRelation: miseEnRelation.structureObj,
          permanences,
          conseillersCoordonnes: await findConseillersCoordonnesById(
            conseillerCollection,
          )(conseillerDocument._id.toString('hex')),
        }
      : null
  }
