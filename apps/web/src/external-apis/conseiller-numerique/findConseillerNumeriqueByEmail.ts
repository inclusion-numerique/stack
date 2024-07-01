import type { ObjectId } from 'mongodb'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerProjection,
  ConseillerNumeriqueProjection,
  mongoQueryConseillerProjection,
} from '@app/web/external-apis/conseiller-numerique/conseillersProjection'
import { StructureConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/StructureConseillerNumerique'

export type FindConseillerNumeriqueByEmailOptions = {
  email: string
}

export const findConseillerNumeriqueByEmail = async (
  options: FindConseillerNumeriqueByEmailOptions,
) => {
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const email = options.email.trim().toLowerCase()

  // Mongodb select but only the fields we need
  const conseillerDocument = (await conseillerCollection.findOne(
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

  if (!conseillerDocument) {
    return null
  }

  const miseEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  const miseEnRelationDocument = (await miseEnRelationCollection.findOne(
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

  const permanenceDocuments = (await permanencesCollection
    .find({
      // Where "conseillers" array field  CONTAINS conseiller id
      conseillers: conseillerDocument._id,
    })
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

  const conseiller = cleanConseillerProjection(conseillerDocument)

  return conseillerDocument
    ? {
        conseiller,
        // Relation contractuelle avec structure employeuse
        miseEnRelation: miseEnRelationDocument,
        permanences: permanenceDocuments,
      }
    : null
}
