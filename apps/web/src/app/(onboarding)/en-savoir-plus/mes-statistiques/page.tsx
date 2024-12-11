import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { OnboardingMesStatistiques } from './OnboardingMesStatistiques'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes statistiques'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.mediateur ? (
    <OnboardingMesStatistiques
      isConseillerNumerique={user.mediateur.conseillerNumerique?.id != null}
    />
  ) : (
    redirect('/')
  )
}

export default Page
