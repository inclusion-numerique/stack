import type { ObjectId } from 'mongodb'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerProjection,
  Conseiller,
  ConseillerNumeriqueProjection,
  mongoQueryConseillerProjection,
} from '@app/web/external-apis/conseiller-numerique/conseillersProjection'
import { PremanenceConseillerNumerique } from './PremanenceConseillerNumerique'
import { StructureConseillerNumerique } from './StructureConseillerNumerique'

export type ConseillerNumeriqueFound = {
  conseiller: Conseiller
  miseEnRelation: StructureConseillerNumerique
  permanences: PremanenceConseillerNumerique[]
  conseillersCoordonnes: Conseiller[]
}

export type ConseillerNumeriqueByEmailFinder = (
  email: string,
) => Promise<ConseillerNumeriqueFound | null>

export const findConseillerNumeriqueByEmail: ConseillerNumeriqueByEmailFinder =
  async (userEmail: string): Promise<ConseillerNumeriqueFound | null> => {
    const conseillerCollection =
      await conseillerNumeriqueMongoCollection('conseillers')

    const email = userEmail.trim().toLowerCase()

    // Mongodb select but only the fields we need
    const conseillerDocument = (await conseillerCollection.findOne(
      {
        deletedAt: { $in: [null, undefined] },
        $or: [{ email }, { emailPro: email }, { 'emailCN.address': email }],
      },
      { projection: mongoQueryConseillerProjection },
    )) as unknown as ConseillerNumeriqueProjection | null

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

    const conseillersCoordonnesDocument = (await conseillerCollection
      .find(
        { coordinateurs: { $elemMatch: { id: conseillerDocument._id } } },
        { projection: mongoQueryConseillerProjection },
      )
      .toArray()) as unknown as ConseillerNumeriqueProjection[]

    return conseillerDocument
      ? {
          conseiller: cleanConseillerProjection(conseillerDocument),
          miseEnRelation: miseEnRelation.structureObj,
          permanences,
          conseillersCoordonnes: conseillersCoordonnesDocument.map(
            cleanConseillerProjection,
          ),
        }
      : null
  }
