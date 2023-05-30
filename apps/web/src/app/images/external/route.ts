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

  const { data } = await axios.get<ReadableStream>(source, {
    responseType: 'stream',
  })

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
