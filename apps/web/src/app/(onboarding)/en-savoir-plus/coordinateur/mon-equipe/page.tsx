import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { OnboardingMonEquipeCoordinateur } from '@app/web/app/(onboarding)/en-savoir-plus/coordinateur/mon-equipe/OnboardingMonEquipeCoordinateur'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mon équipe'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.coordinateur ? <OnboardingMonEquipeCoordinateur /> : redirect('/')
}

export default Page
