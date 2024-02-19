import { perimetreOptions } from '@app/web/gouvernance/GouvernancePressentie'
import { ListeGouvernanceItem } from '@app/web/app/(private-with-navigation)/gouvernances/getListeGouvernances'

export const getPorteurString = ({
  v1PorteurRegion,
  v1PorteurDepartement,
  v1PorteurEpci,
  v1PorteurSiretInformations,
}: Pick<
  ListeGouvernanceItem,
  | 'v1PorteurRegion'
  | 'v1PorteurDepartement'
  | 'v1PorteurEpci'
  | 'v1PorteurSiretInformations'
>) =>
  v1PorteurRegion
    ? `Conseil régional  · ${v1PorteurRegion.nom}`
    : v1PorteurDepartement
      ? `Conseil départemental  · ${v1PorteurDepartement.nom} (${v1PorteurDepartement.code})`
      : v1PorteurEpci
        ? v1PorteurEpci.nom
        : v1PorteurSiretInformations
          ? v1PorteurSiretInformations.siret
          : 'Non renseigné'

export const getPerimetreString = ({
  v1Perimetre,
}: Pick<ListeGouvernanceItem, 'v1Perimetre'>) =>
  perimetreOptions.find((option) => option.value === v1Perimetre)?.name ||
  'Non renseigné'
