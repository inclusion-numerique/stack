import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { OnboardingMonEquipeCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/mon-equipe-coordinateur/OnboardingMonEquipeCoordinateur'
import { OnboardingMesArchivesCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/mes-archives-coordinateur/OnboardingMesArchivesCoordinateur'

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes activités'),
}

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return user.coordinateur ? (
    <OnboardingMesArchivesCoordinateur />
  ) : (
    redirect('/')
  )
}

export default Page
