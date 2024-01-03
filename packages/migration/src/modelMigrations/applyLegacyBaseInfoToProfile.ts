import { prismaClient } from '@app/web/prismaClient'
import { LegacyBaseOwnerFromLegacyBaseId } from '@app/migration/modelMigrations/getLegacyBaseOwnerFromLegacyBaseId'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'
import {
  departmentTagCategory,
  getDepartmentFromTags,
} from '@app/migration/modelMigrations/getDepartmentFromTags'
import { sanitizeLegacyHtml } from '@app/migration/sanitizeLegacyHtml'

// Bases transformed to v2 profile only
// Their legacy base info will be applied to the profile
export const applyLegacyBaseInfoToProfile = async ({
  legacyBaseOwnerFromLegacyBaseId,
  userIdFromLegacyId,
  imageIdFromLegacyId,
}: {
  legacyBaseOwnerFromLegacyBaseId: LegacyBaseOwnerFromLegacyBaseId
  userIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyInfos = await migrationPrismaClient.main_base.findMany({
    where: {
      id: {
        in: [...legacyBasesIdsToTransformToProfile.values()],
      },
    },
    select: {
      id: true,
      description: true,
      profile_image_id: true,
      main_base_tags: {
        select: {
          main_tag: {
            select: { category_id: true, name: true },
          },
        },
        where: {
          main_tag: {
            category_id: departmentTagCategory,
          },
        },
      },
    },
  })

  const userInfos = legacyInfos.map((legacyInfo) => {
    const legacyUserId = legacyBaseOwnerFromLegacyBaseId(legacyInfo.id)
    const newUserId = userIdFromLegacyId(Number(legacyUserId))

    return {
      id: newUserId,
      description: sanitizeLegacyHtml(legacyInfo.description) ?? undefined,
      imageId: legacyInfo.profile_image_id
        ? imageIdFromLegacyId(Number(legacyInfo.profile_image_id))
        : undefined,
      department:
        getDepartmentFromTags(
          legacyInfo.main_base_tags.map(({ main_tag }) => main_tag),
        ) ?? undefined,
    }
  })

  await Promise.all(
    userInfos.map(({ id, ...data }) =>
      prismaClient.user.update({
        where: { id },
        data,
      }),
    ),
  )
}
