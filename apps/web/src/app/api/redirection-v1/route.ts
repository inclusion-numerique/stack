import { NextResponse } from 'next/server'
import { mapLegacyPath } from '@app/web/legacyRedirection/legacyRedirection'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const handler = async (request: Request) => {
  const baseUrl = process.env.BASE_URL
  const httpsBase = `https://${baseUrl ?? ''}`
  const requestUrl = new URL(request.url)

  const migratedPath = await mapLegacyPath(requestUrl)

  const redirectTo = `${httpsBase}${migratedPath}`

  // 301 permanent and post => get
  return NextResponse.redirect(redirectTo, { status: 301 })
}
export { handler as GET, handler as POST }
