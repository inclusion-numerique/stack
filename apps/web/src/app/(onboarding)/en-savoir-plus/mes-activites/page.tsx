import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { OnboardingMesActivites } from './OnboardingMesActivites'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes activités'),
}

const Page = async () => {
  const user = await authenticateUser()

  return user.mediateur ? (
    <OnboardingMesActivites
      isConseillerNumerique={user.mediateur.conseillerNumerique?.id != null}
    />
  ) : (
    redirect('/')
  )
}

export default Page
