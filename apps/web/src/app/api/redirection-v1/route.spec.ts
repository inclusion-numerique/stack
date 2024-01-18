import { NextResponse } from 'next/server'
import { mapLegacyPath } from '@app/web/legacyRedirection/legacyRedirection'
import { GET } from './route'

jest.mock('@app/web/legacyRedirection/legacyRedirection')

const mockedMapLegacyPath = mapLegacyPath as jest.MockedFunction<
  typeof mapLegacyPath
>

describe('Redirection Route', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    mockedMapLegacyPath.mockClear()
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('redirects to migrated path with https and status 301', async () => {
    process.env.BASE_URL = 'lesbases.test'
    mockedMapLegacyPath.mockResolvedValue('/migrated-path')

    const request = new Request(
      'https://lesbases.test/api/redirection-v1?original=https://labase.anct.gouv.fr/resource/42',
    )
    const response = await GET(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toBe(
      'https://lesbases.test/migrated-path',
    )
  })
})
