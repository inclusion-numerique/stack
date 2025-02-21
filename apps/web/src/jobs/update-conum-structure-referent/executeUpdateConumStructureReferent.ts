import { output } from '@app/cli/output'
import { MiseEnRelationWithStructureAdministrativeInfo } from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { MiseEnRelationV1MinimalProjection } from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { prismaClient } from '@app/web/prismaClient'
import { miseAJourStructureEmployeuseFor } from '@app/web/server/rpc/conseillers-numerique/miseAJourStructureEmployeuseFor'
import { ObjectId } from 'mongodb'

export const executeUpdateConumStructureReferent = async () => {
  output('Starting update conseillers numériques structure referents...')

  const users = await prismaClient.user.findMany({
    where: {
      mediateur: { conseillerNumerique: { isNot: null } },
      emplois: {
        every: {
          structure: { nomReferent: null },
        },
      },
    },
    include: {
      mediateur: {
        include: { conseillerNumerique: true },
      },
      emplois: {
        include: { structure: true },
      },
    },
  })

  output(`${users.length} conseillers numériques found`)

  const misesEnRelationCollection =
    await conseillerNumeriqueMongoCollection('misesEnRelation')

  output('Find all mises en relation from mongo...')

  await Promise.allSettled(
    users.map(async (user) => {
      const miseEnRelation = (await misesEnRelationCollection.findOne(
        {
          'conseillerObj._id': new ObjectId(
            user.mediateur!.conseillerNumerique!.id,
          ),
        },
        { projection: MiseEnRelationV1MinimalProjection },
      )) as MiseEnRelationWithStructureAdministrativeInfo | null

      if (miseEnRelation) {
        return miseAJourStructureEmployeuseFor(user.id)(miseEnRelation)
      }
    }),
  )

  output('All updates done')
}
