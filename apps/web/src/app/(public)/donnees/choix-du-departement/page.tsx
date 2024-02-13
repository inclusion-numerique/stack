import { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Données de l’inclusion numérique'),
}

const ChoixDuDepartementPage = async () => {
  const user = await getSessionUser()

  return <>TODO</>
}

export default ChoixDuDepartementPage
