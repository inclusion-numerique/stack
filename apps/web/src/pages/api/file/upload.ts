import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedUploadUrl } from '@app/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@app/web/webAppConfig'

export type AttachmentUploadApiResponse = { url: string; key: string }

const upload = async (
  request: NextApiRequest,
  response: NextApiResponse<AttachmentUploadApiResponse | { error: string }>,
) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // TODO: use zod
    const { name, type, directory } = request.body as Record<string, string>

    const { url, key } = await createSignedUploadUrl({
      name,
      type,
      directory,
      bucket: ServerWebAppConfig.S3.uploadsBucket,
    })

    return response.status(200).json({ url, key })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    return response.status(400).json({ error: error as string })
  }
}
export default upload
