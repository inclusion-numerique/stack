import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { OnboardingMesArchivesCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/coordinateur/mes-archives/OnboardingMesArchivesCoordinateur'

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes activités'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.coordinateur ? (
    <OnboardingMesArchivesCoordinateur />
  ) : (
    redirect('/')
  )
}

export default Page
