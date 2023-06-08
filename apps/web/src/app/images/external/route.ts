import { NextRequest } from 'next/server'
import axios from 'axios'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

// We proxy external images to avoid RGPD issues
// TODO Cache them ?
export const GET = async (request: NextRequest) => {
  const source = request.nextUrl.searchParams.get('src')

  if (!source) {
    return notFoundResponse()
  }

  const { headers, data, status, statusText } = await axios.get<ReadableStream>(
    source,
    {
      responseType: 'stream',
    },
  )

  if (!headers || !data) {
    return new Response('', {
      status,
      statusText,
    })
  }

  const contentType = headers['content-type'] as string
  const cacheControl = headers['cache-control'] as string

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl || 'public, max-age=31536000, immutable',
    },
  })
}
