import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedUploadUrl } from '@stack/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@stack/web/webAppConfig'

export type AttachmentUploadApiResponse = { url: string; key: string }

const upload = async (
  request: NextApiRequest,
  response: NextApiResponse<AttachmentUploadApiResponse | { error: string }>,
) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get info from body
    const { name, type, directory } = request.body

    const { url, key } = await createSignedUploadUrl({
      name,
      type,
      directory,
      bucket: ServerWebAppConfig.S3.documentsBucket,
    })

    response.status(200).json({ url, key })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    response.status(400).json({ error: error as string })
  }
}
export default upload
