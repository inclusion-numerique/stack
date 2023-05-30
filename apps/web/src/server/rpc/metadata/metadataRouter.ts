import axios, { AxiosError } from 'axios'
import z from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { getMetadataFromDocument } from '@app/web/server/rpc/metadata/getMetadataFromDocument'

const GetMetaDataValidation = z.object({
  url: z.string().url(),
})

export const metadataRouter = router({
  get: protectedProcedure
    .input(GetMetaDataValidation)
    .query(async ({ input: { url } }) => {
      try {
        const { data } = await axios.get<string>(url)
        return getMetadataFromDocument(data)
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error
        }
        return { error: error.message, status: error.status }
      }
    }),
})
