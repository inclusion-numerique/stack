import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { redirect } from 'next/navigation'

export const generateMetadata = () => {
  redirect(PublicWebAppConfig.centreAideUrl)
}

export default () => null
