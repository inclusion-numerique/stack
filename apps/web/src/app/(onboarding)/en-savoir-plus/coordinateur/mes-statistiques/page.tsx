import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { OnboardingMesStatistiquesCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/coordinateur/mes-statistiques/OnboardingMesStatistiquesCoordinateur'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes statistiques'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.mediateur ? (
    <OnboardingMesStatistiquesCoordinateur />
  ) : (
    redirect('/')
  )
}

export default Page
