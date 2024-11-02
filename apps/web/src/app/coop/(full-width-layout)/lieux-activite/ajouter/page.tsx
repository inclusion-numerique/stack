import React from 'react'
import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import IconInSquare from '@app/web/components/IconInSquare'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import LieuxActiviteForm from './_components/LieuxActiviteForm'

const AjouterLieuPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur || user.mediateur._count.enActivite === 0) {
    return redirect('/')
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container fr-container--narrow">
        <CoopBreadcrumbs
          parents={[
            {
              label: `Mes lieux d'activités`,
              linkProps: { href: '/coop/lieux-activite/' },
            },
          ]}
          currentPage={"Ajouter un lieu d'activité"}
        />
        <main id={contentId} className="fr-mb-30v">
          <Button
            priority="tertiary no outline"
            size="small"
            linkProps={{
              href: '/coop/lieux-activite',
            }}
            className="fr-mt-2v fr-mb-10v"
            iconId="fr-icon-arrow-left-line"
          >
            Retour aux lieux d’activité
          </Button>
          <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-6v fr-mb-5w">
            <IconInSquare iconId="ri-home-office-line" />
            <h1 className="fr-page-title fr-m-0 fr-h2">
              Ajouter un lieu d’activité
            </h1>
          </span>
          <div className="fr-border fr-border-radius--8 fr-p-4w">
            <p className="fr-mb-6w">
              Rechercher dans les lieux déjà référencés. Si vous ne trouvez pas
              vos lieux, vous pouvez les créer afin d’être référencé.
            </p>
            <LieuxActiviteForm
              nextHref="/coop/lieux-activite"
              createStructureHref="/coop/lieux-activite/creer"
              userId={user.id}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default AjouterLieuPage
