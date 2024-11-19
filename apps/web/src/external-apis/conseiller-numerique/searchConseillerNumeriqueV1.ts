import { Filter, ObjectId } from 'mongodb'
import escapeStringRegexp from 'escape-string-regexp'
import {
  conseillerNumeriqueMongoCollection,
  objectIdFromString,
} from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import {
  cleanConseillerNumeriqueV1Document,
  ConseillerNumeriqueV1Document,
} from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import {
  MiseEnRelationConseillerNumeriqueV1MinimalProjection,
  MiseEnRelationV1MinimalProjection,
} from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import { getActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/getActiveMiseEnRelation'

export type FindConseillerNumeriqueV1Input =
  | {
      email: string
      id?: undefined
      includeDeleted?: boolean
    }
  | {
      id: string
      email?: undefined
      includeDeleted?: boolean
    }

export const findConseillerNumeriqueV1 = async (
  input: FindConseillerNumeriqueV1Input,
) => {
  if (!input.email && !input.id) {
    return null
  }
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const email = input.email?.trim().toLowerCase()

  const filter: Filter<ConseillerNumeriqueV1Document> = email
    ? {
        emailPro: { $regex: `^${email}$`, $options: 'i' },
      }
    : {
        _id: new ObjectId(input.id),
      }

  if (!input.includeDeleted) {
    // deletedAt is null or not present
    filter.deletedAt = {
      $in: [null, undefined],
    }
  }

  // Mongodb select but only the fields we need
  const conseillerDocument = await conseillerCollection.findOne(filter)

  if (!conseillerDocument) {
    return null
  }

  const miseEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  const miseEnRelationDocuments = (await miseEnRelationCollection
    .find(
      {
        'conseillerObj._id': conseillerDocument._id,
      },
      {
        projection: MiseEnRelationV1MinimalProjection,
      },
    )
    .toArray()) as unknown as MiseEnRelationConseillerNumeriqueV1MinimalProjection[]

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

  const conseiller = cleanConseillerNumeriqueV1Document(conseillerDocument)

  return conseillerDocument
    ? {
        conseiller,
        // Relation contractuelle avec structure employeuse
        miseEnRelations: miseEnRelationDocuments,
        miseEnRelationActive: getActiveMiseEnRelation(miseEnRelationDocuments),
        permanences: permanenceDocuments,
      }
    : null
}

const mongoRegex = (value: string) => ({
  // escape value so it is valid regex
  // e.g. { $regex: 'ic.bliaux@ville-draguignan.fr', $options: 'i' }
  $regex: escapeStringRegexp(value),
  $options: 'i',
})

export const searchConseillerNumeriqueV1 = async ({
  recherche,
}: {
  recherche: string
}) => {
  const conseillerCollection =
    await conseillerNumeriqueMongoCollection('conseillers')

  const rechercheParts = recherche.trim().toLowerCase().split(' ')
  if (rechercheParts.length === 0) {
    return []
  }

  const filter = {
    $and: rechercheParts.map((part) => {
      const regex = mongoRegex(part)

      // Check if it is a valid mongo id
      const searchId = objectIdFromString(part)

      if (searchId) {
        return {
          _id: searchId,
        }
      }

      return {
        $or: [
          { nom: regex },
          { prenom: regex },
          { nomCommune: regex },
          {
            email: regex,
          },
          {
            emailPro: regex,
          },
          {
            'emailCN.address': regex,
          },
        ],
      }
    }),
  }

  // Mongodb select but only the fields we need
  const conseillers = await conseillerCollection.find(filter).toArray()

  return conseillers.map(cleanConseillerNumeriqueV1Document)
}
