import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'

export const getLegacyImages = async () => {
  // Legacy dataset has images in the resizableimage table
  // But also in the main_filecontent table (not resized images)
  // for image file types (marked with with_preview = true in the main_filecontent table)
  const resizableImages =
    await migrationPrismaClient.main_resizableimage.findMany({
      where: {
        image: {
          not: '',
        },
      },
    })
  const fileContentImages =
    await migrationPrismaClient.main_filecontent.findMany({
      where: {
        with_preview: true,
      },
    })

  return [...resizableImages, ...fileContentImages]
}

export type LegacyImage = FindManyItemType<typeof getLegacyImages>

export const getExistingImages = async (): Promise<{
  idMap: LegacyIdMap
}> => {
  const images = await prismaClient.image.findMany({
    select: {
      id: true,
      legacyId: true,
      upload: { select: { key: true, legacyKey: true } },
    },
  })

  const idMap = new Map<number, string>(
    images
      .filter(
        (image): image is (typeof images)[0] & { legacyId: number } =>
          !!image.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  return { idMap }
}

export type MigrateImageInput = {
  legacyImage: LegacyImage
  transaction: Prisma.TransactionClient
  uploadKeyFromLegacyKey: (legacyKey: string) => string
}

/**
 * We have some wierd legacy data with some negative crop values
 */
const normalizeCropBetween0and1 = (value: number) =>
  Number.parseFloat(Math.min(Math.max(value, 0), 1).toFixed(4))

const cropFromLegacyImage = ({
  relative_top,
  relative_width,
  relative_left,
  relative_height,
}: {
  relative_top: number
  relative_left: number
  relative_height: number
  relative_width: number
}) => {
  const cropTop = normalizeCropBetween0and1(relative_top)
  const cropLeft = normalizeCropBetween0and1(relative_left)
  const cropHeight = normalizeCropBetween0and1(relative_height)
  const cropWidth = normalizeCropBetween0and1(relative_width)

  // Do not crop images that have legacy invalid data
  const isValidCrop =
    // We have some wierd legacy data fully cropped (no pixel remaining)
    cropTop < 1 &&
    cropLeft < 1 &&
    // Crop height cannot be greater than 1 - crop top
    cropTop + cropHeight <= 1 &&
    // Crop width cannot be greater than 1 - crop left
    cropLeft + cropWidth <= 1

  if (!isValidCrop) {
    return defaultCropValues
  }

  return { cropTop, cropLeft, cropHeight, cropWidth }
}

export const migrateImage = async ({
  legacyImage,
  transaction,
  uploadKeyFromLegacyKey,
}: MigrateImageInput) => {
  const legacyId =
    'contentblock_ptr_id' in legacyImage
      ? Number(legacyImage.contentblock_ptr_id)
      : Number(legacyImage.id)
  const data =
    'contentblock_ptr_id' in legacyImage
      ? {
          uploadKey: uploadKeyFromLegacyKey(legacyImage.file),
          altText: legacyImage.image_alt,
        }
      : ({
          ...cropFromLegacyImage(legacyImage),
          uploadKey: uploadKeyFromLegacyKey(legacyImage.image),
        } satisfies Parameters<typeof transaction.image.upsert>[0]['update'])

  return transaction.image.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, legacyId: true },
  })
}
