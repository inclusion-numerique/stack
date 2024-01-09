import { chunk } from 'lodash'
import { v4 } from 'uuid'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { getDepartmentFromTags } from '@app/migration/modelMigrations/getDepartmentFromTags'
import {
  computeSlugAndUpdateExistingSlugs,
  SlugToLegacyIdMap,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'

export const getLegacyUsers = () =>
  migrationPrismaClient.main_user.findMany({
    include: {
      main_user_tags: {
        select: {
          main_tag: {
            select: { category_id: true, name: true },
          },
        },
      },
    },
  })

export type LegacyUser = FindManyItemType<typeof getLegacyUsers>

export const getExistingUsers = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      legacyId: true,
      id: true,
      email: true,
      slug: true,
      collections: {
        select: {
          id: true,
        },
        where: {
          isFavorites: true,
        },
      },
    },
  })

  const idMap = new Map<number, string>(
    users
      .filter(
        (user): user is (typeof users)[0] & { legacyId: number } =>
          !!user.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  ) satisfies LegacyIdMap

  const emailMap = new Map<string, string>(
    users.map(({ id, email }) => [email, id]),
  )

  const slugMap = new Map<string, number | null>(
    users
      .map(({ slug, legacyId }) => ({ slug, legacyId }))
      .filter(
        (user): user is { slug: string; legacyId: number | null } =>
          !!user.slug,
      )
      .map(({ slug, legacyId }) => [slug, legacyId]),
  )

  return { idMap, emailMap, users, slugMap }
}

type ExistingUsers = Awaited<ReturnType<typeof getExistingUsers>>

export const transformUser = ({
  legacyUser,
  emailMap,
  existingUser,
  existingSlugs,
}: {
  legacyUser: LegacyUser
  emailMap: Map<string, string>
  existingUser: ExistingUsers['users'][number] | undefined
  existingSlugs: SlugToLegacyIdMap
}) => {
  const legacyId = Number(legacyUser.id)

  // We manage the edge case of a new user created in new app with same email as not yet migrated legacy user
  const existingIdFromEmail = emailMap.get(legacyUser.email)

  const firstName = legacyUser.first_name?.trim() || null
  const lastName = legacyUser.last_name?.trim() || null
  const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || null

  const slugTitle = name || 'p'

  const slug = computeSlugAndUpdateExistingSlugs(
    { title: slugTitle, id: legacyUser.id },
    existingSlugs,
  )

  const data = {
    id: existingIdFromEmail ?? v4(),
    email: legacyUser.email,
    firstName,
    lastName,
    name,
    slug,
    created: legacyUser.created,
    updated: legacyUser.modified,
    emailVerified: legacyUser.is_active ? legacyUser.created : null,
    legacyId,
    department: getDepartmentFromTags(
      legacyUser.main_user_tags.map(({ main_tag }) => main_tag),
    ),
    collections: existingUser?.collections.length
      ? undefined
      : {
          create: {
            title: 'Mes favoris',
            isFavorites: true,
            slug: `${slug}-favoris`,
          },
        },
  } satisfies UpsertCreateType<typeof prismaClient.user.upsert>

  return data
}

export const migrateUsers = async () => {
  const legacyUsers = await getLegacyUsers()
  output(`- Found ${legacyUsers.length} users to migrate`)

  const existingUsers = await getExistingUsers()
  output(`- Found ${existingUsers.idMap.size} already migrated users`)

  const existingUsersById = new Map(
    existingUsers.users.map((user) => [user.id, user]),
  )

  const usersData = legacyUsers.map((legacyUser) => {
    const existingUserId = existingUsers.idMap.get(Number(legacyUser.id))
    return transformUser({
      legacyUser,
      emailMap: existingUsers.emailMap,
      existingUser: existingUserId
        ? existingUsersById.get(existingUserId)
        : undefined,
      existingSlugs: existingUsers.slugMap,
    })
  })

  const chunkSize = 200
  let migratedUserCount = 0

  const upserted = await Promise.all(
    chunk(usersData, chunkSize).map((userChunk) =>
      prismaClient
        .$transaction(
          userChunk.map((user) => {
            const existingIdFromEmail = existingUsers.emailMap.get(user.email)

            return prismaClient.user.upsert({
              where: existingIdFromEmail
                ? { id: existingIdFromEmail }
                : { legacyId: user.legacyId },
              create: user,
              update: user,
              select: { id: true, legacyId: true, email: true },
            })
          }),
        )
        .then((users) => {
          migratedUserCount += users.length
          output(
            `-- ${migratedUserCount} ${(
              (migratedUserCount * 100) /
              legacyUsers.length
            ).toFixed(0)}%`,
          )
          return users
        }),
    ),
  )

  return upserted.flat()
}
