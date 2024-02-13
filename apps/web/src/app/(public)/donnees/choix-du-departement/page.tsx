import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Données de l’inclusion numérique'),
}

const ChoixDuDepartementPage = () => <>TODO</>

export default ChoixDuDepartementPage
