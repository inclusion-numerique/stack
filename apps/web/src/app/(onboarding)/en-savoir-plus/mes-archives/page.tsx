import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { OnboardingMesArchives } from './OnboardingMesArchives'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes activités'),
}

const Page = () => <OnboardingMesArchives />

export default Page
