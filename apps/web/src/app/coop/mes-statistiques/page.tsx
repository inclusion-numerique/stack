import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

const MesStatistiquesPage = async () => {
  const user = await getAuthenticatedMediateur()

  const mesStatistiques = await getMesStatistiquesPageData(user.mediateur.id)

  return <MesStatistiques {...mesStatistiques} />
}

export default MesStatistiquesPage
