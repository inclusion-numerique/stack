import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { OnboardingMesOutilsCoordinateur } from './OnboardingMesOutilsCoordinateur'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes outils'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.coordinateur ? <OnboardingMesOutilsCoordinateur /> : redirect('/')
}

export default Page
