import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedGetUrl } from '@lb/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@lb/web/webAppConfig'

export type AttachmentGetApiResponse = { url: string }

const get = async (request: NextApiRequest, res: NextApiResponse) => {
  if (request.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // TODO: use zod
    const { key } = request.body as Record<string, string>

    const { url } = await createSignedGetUrl({
      key,
      bucket: ServerWebAppConfig.S3.documentsBucket,
    })

    return res.status(200).json({ url })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    return res.status(400).json({ error: error as string })
  }
}
export default get
