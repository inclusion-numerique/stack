import { prismaClient } from '@app/web/prismaClient'
import { computeImageMetadata } from '@app/web/server/image/computeImageMetadata'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ImageValidation } from '@app/web/server/rpc/image/imageValidation'

export const imageRouter = router({
  create: protectedProcedure
    .input(ImageValidation)
    .mutation(async ({ input: { file, ...imageData }, ctx: { user } }) => {
      // The file is already in storage, we get its metadata and store it in database

      const { height, width, originalHeight, originalWidth } =
        await computeImageMetadata({
          uploadKey: file.key,
          ...defaultCropValues,
        })

      const data = {
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
        ...imageData,
      }

      return prismaClient.image.create({
        data,
        include: {
          upload: true,
        },
      })
    }),
})
