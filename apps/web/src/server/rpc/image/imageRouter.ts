import { z } from 'zod'
import { fileValidation } from '@app/ui/components/Form/utils/fileValidation.server'
import { prismaClient } from '@app/web/prismaClient'
import { computeImageMetadata } from '@app/web/server/image/computeImageMetadata'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'

export const imageRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        file: fileValidation({
          maxSizeInBytes: 5_000_000,
        }),
      }),
    )
    .mutation(async ({ input: { file }, ctx: { user } }) => {
      // The file is already in storage, we get its metadata and store it in database

      const { height, width, originalHeight, originalWidth } =
        await computeImageMetadata({
          uploadKey: file.key,
          ...defaultCropValues,
        })

      const result = await prismaClient.image.create({
        data: {
          height,
          width,
          originalHeight,
          originalWidth,
          upload: {
            create: {
              uploadedBy: { connect: { id: user.id } },
              ...file,
            },
          },
        },
        include: {
          upload: true,
        },
      })

      return result
    }),
})
