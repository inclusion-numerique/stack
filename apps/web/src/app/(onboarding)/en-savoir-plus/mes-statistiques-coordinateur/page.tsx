import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { OnboardingMesStatistiquesCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/mes-statistiques-coordinateur/OnboardingMesStatistiquesCoordinateur'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes statistiques'),
}

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return user.mediateur ? (
    <OnboardingMesStatistiquesCoordinateur />
  ) : (
    redirect('/')
  )
}

export default Page
