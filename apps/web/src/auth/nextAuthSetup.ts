import { getServerBaseUrl } from '@app/web/utils/baseUrl'

// This should be setup before using next auth as url is not available in Scalingo context in env variables
process.env.NEXTAUTH_URL = getServerBaseUrl()
