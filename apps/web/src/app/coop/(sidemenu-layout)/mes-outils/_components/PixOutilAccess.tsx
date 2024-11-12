import { Access } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/_components/Access'
import type { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'
import { getSessionUser } from '@app/web/auth/getSessionUser'

const accessConum = {
  how: 'Les conseillers numériques ont un accès à Pix Orga, il vous suffit de faire la demande.',
  illustration: '/images/services/conseillers-numerique-icon.svg',
  info: {
    label: 'Demander l’accès',
    link: 'https://pix.fr/abc-pix-cnfs',
  },
  title: 'J’ai déjà accès à Pix',
  description: 'Vous pouvez vous connecter avec votre identifiant Pix :',
  callToAction: {
    label: 'Se connecter',
    link: 'https://orga.pix.fr/connexion',
  },
} satisfies OutilPageData['access']

const accessMediateur = {
  how: 'Votre structure doit déposer une demande d’accès à Pix Orga. ',
  icon: 'ri-home-office-line',
  info: {
    label: 'Demander l’accès',
    link: 'https://www.demarches-simplifiees.fr/commencer/demande-abc-pix-mednum',
  },
  title: 'Ma structure a déjà accès à Pix',
  description:
    'Si votre structure a déjà un accès, vous pouvez vous connecter avec votre identifiant Pix :',
  callToAction: {
    label: 'Se connecter',
    link: 'https://orga.pix.fr/connexion',
  },
} satisfies OutilPageData['access']

const PixOutilAccess = async () => {
  const user = await getSessionUser()

  const isConseillerNumerique = !!user?.mediateur?.conseillerNumerique

  return (
    <div>
      {isConseillerNumerique ? (
        <Access {...accessConum} />
      ) : (
        <Access {...accessMediateur} />
      )}
    </div>
  )
}

export default PixOutilAccess
