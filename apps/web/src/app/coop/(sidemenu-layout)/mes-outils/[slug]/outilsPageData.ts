import abcDiagPageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/abcDiagPageData'
import aidantsConnectPageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/aidantsConnectPageData'
import cartographieNationalePageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/cartographieNationalePageData'
import espaceFranceNumeriqueEnsemblePageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/espaceFranceNumeriqueEnsemblePageData'
import lesBasesPageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/lesBasesPageData'
import pixPageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/pixPageData'
import rdvPageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/rdvPageData'
import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'

const outilsPageData = {
  'abc-diag': abcDiagPageData,
  'aidants-connect': aidantsConnectPageData,
  'cartographie-nationale-des-lieux-d-inclusion-numerique':
    cartographieNationalePageData,
  'espace-france-numerique-ensemble': espaceFranceNumeriqueEnsemblePageData,
  'les-bases-du-numerique-d-interet-general': lesBasesPageData,
  pix: pixPageData,
  'rdv-aide-numerique': rdvPageData,
} satisfies { [key: string]: OutilPageData }

export type OutilSlug = keyof typeof outilsPageData

export const getOutilsPageData = (outilSlug: string) =>
  outilsPageData[outilSlug as OutilSlug] ?? null
