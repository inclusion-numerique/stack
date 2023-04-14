import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedGetUrl } from '@stack/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@stack/web/webAppConfig'

export type AttachmentGetApiResponse = { url: string }

const get = async (request: NextApiRequest, res: NextApiResponse) => {
  if (request.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get info from body
    const { key } = request.body

    const { url } = await createSignedGetUrl({
      key,
      bucket: ServerWebAppConfig.S3.documentsBucket,
    })

    res.status(200).json({ url })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    res.status(400).json({ error: error as string })
  }
}
export default get
