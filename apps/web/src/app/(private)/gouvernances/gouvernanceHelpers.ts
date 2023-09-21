import { perimetreOptions } from '@app/web/gouvernance/GouvernancePressentie'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'

export const getPorteurString = ({
  porteurRegion,
  porteurDepartement,
  porteurEpci,
  porteurSiretInformations,
}: Pick<
  ListeGouvernanceItem,
  | 'porteurRegion'
  | 'porteurDepartement'
  | 'porteurEpci'
  | 'porteurSiretInformations'
>) =>
  porteurRegion
    ? `Conseil régional  · ${porteurRegion.nom}`
    : porteurDepartement
    ? `Conseil départemental  · ${porteurDepartement.nom} (${porteurDepartement.code})`
    : porteurEpci
    ? porteurEpci.nom
    : porteurSiretInformations
    ? porteurSiretInformations.siret
    : 'Non renseigné'

export const getPerimetreString = ({
  perimetre,
}: Pick<ListeGouvernanceItem, 'perimetre'>) =>
  perimetreOptions.find((option) => option.value === perimetre)?.name ||
  'Non renseigné'
