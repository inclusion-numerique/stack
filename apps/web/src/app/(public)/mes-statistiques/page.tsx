import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

const MesStatistiquesPage = () => {
  const mesStatistiques = getMesStatistiquesPageData()

  return <MesStatistiques {...mesStatistiques} />
}

export default MesStatistiquesPage
