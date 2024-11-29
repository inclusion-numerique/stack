import { Access } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/_components/Access'
import type { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getLieuxActiviteForCartographie } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/getLieuxActiviteForCartographie'

const access = {
  how: 'de vos lieux d’activités sont déjà visibles sur la cartographie.',
  icon: 'ri-home-office-line',
  description:
    'Lien vers le parcours d’orientation des bénéficiaires vers un lieu d’inclusion numérique :',
  callToAction: {
    label: 'Orienter un bénéficiaire',
    link: 'https://cartographie.societenumerique.gouv.fr/orientation',
  },
} satisfies OutilPageData['access']

const onlyVisibleForCartographieNationale = ({
  structure: { visiblePourCartographieNationale },
}: {
  structure: { visiblePourCartographieNationale: boolean }
}) => visiblePourCartographieNationale

const CartographieNationaleOutilAccess = async () => {
  const user = await getSessionUser()

  const lieuxActivite = user?.mediateur
    ? await getLieuxActiviteForCartographie(user.mediateur.id)
    : null

  return (
    <Access
      {...access}
      info={
        lieuxActivite
          ? {
              label: 'Voir mes lieux d’activités',
              link: '/coop/lieux-activite',
            }
          : undefined
      }
      how={
        lieuxActivite ? (
          <>
            <strong>
              {lieuxActivite.filter(onlyVisibleForCartographieNationale).length}
              /{lieuxActivite.length}
            </strong>{' '}
            {access.how}
          </>
        ) : undefined
      }
    />
  )
}

export default CartographieNationaleOutilAccess
