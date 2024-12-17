import { getServerUrl } from '@app/web/utils/baseUrl'

export const apiV1Url = (
  path: string,
  params?: string | URLSearchParams | string[][] | Record<string, string>,
) => {
  const queryParams = params ? new URLSearchParams(params).toString() : ''

  if (queryParams.length > 0) {
    return getServerUrl(`/api/v1${path}?${queryParams}`)
  }

  return getServerUrl(`/api/v1${path}`)
}
