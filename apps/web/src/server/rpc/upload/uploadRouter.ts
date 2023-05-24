import { z } from 'zod'
import { fileValidation } from '@app/ui/components/Form/utils/fileValidation.server'
import { prismaClient } from '@app/web/prismaClient'
import {
  createSignedGetUrl,
  createSignedUploadUrl,
} from '@app/web/server/createSignedUrl'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { ServerWebAppConfig } from '@app/web/webAppConfig'

export const uploadRouter = router({
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
      const result = await prismaClient.upload.create({
        data: {
          ...file,
          uploadedById: user.id,
        },
      })

      return result
    }),
  generateDownloadUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input: { key }, ctx: { user } }) => {
      // You can put your own security logic here
      const file = await prismaClient.upload.findUnique({
        where: {
          key,
        },
      })
      if (!file) {
        throw notFoundError()
      }

      if (file.uploadedById !== user.id) {
        throw forbiddenError()
      }

      const { url } = await createSignedGetUrl({
        key,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
      })

      return { url }
    }),
  generateUploadUrl: protectedProcedure
    .input(z.object({ filename: z.string(), mimeType: z.string() }))
    .mutation(async ({ input: { filename, mimeType }, ctx: { user } }) => {
      const { url, key } = await createSignedUploadUrl({
        name: filename,
        directory: `user/${user.id}`,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
        mimeType,
      })

      return { url, key }
    }),
})
