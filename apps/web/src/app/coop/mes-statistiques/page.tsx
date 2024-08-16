import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '../../../auth/getAuthenticatedMediateur'
import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

const MesStatistiquesPage = async () => {
  const user = await getAuthenticatedMediateur()

  const mesStatistiques = getMesStatistiquesPageData(user.mediateur.id)

  if (!mesStatistiques) {
    notFound()
    return null
  }

  return <MesStatistiques {...mesStatistiques} />
}

export default MesStatistiquesPage
