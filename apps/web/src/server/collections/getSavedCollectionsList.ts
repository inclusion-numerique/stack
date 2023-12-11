import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  collectionSelect,
  getWhereCollectionsProfileList,
} from '@app/web/server/collections/getCollectionsList'

export const getProfileSavedCollections = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereCollectionsProfileList(profileId, user)
  return prismaClient.savedCollection.findMany({
    where: {
      base: null,
      savedById: profileId,
      collection: where,
    },
    select: { id: true, saved: true, collection: { select: collectionSelect } },
    orderBy: {
      saved: 'desc',
    },
  })
}
