import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import IconInSquare from '@app/web/components/IconInSquare'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { LieuActiviteDetail } from './_components/LieuActiviteDetail'
import LieuActiviteSideMenu from './_components/LieuActiviteSideMenu'

const LieuActiviteDetailPage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId} className="fr-container fr-flex">
      <LieuActiviteSideMenu className="fr-hidden fr-unhidden-lg fr-mt-16w" />
      <div className="fr-container fr-container--narrow fr-ml-0 fr-mb-30v">
        <Button
          priority="tertiary no outline"
          size="small"
          linkProps={{
            href: '/lieux-activite',
          }}
          className="fr-mt-12v fr-mb-10v"
          iconId="fr-icon-arrow-left-line"
        >
          Retour aux lieux d’activité
        </Button>
        <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-6v fr-mb-5w">
          <IconInSquare iconId="ri-home-office-line" />
          <h1 className="fr-page-title fr-m-0">Lieu d’activité</h1>
        </span>
        <LieuActiviteDetail visiblePourCartographieNationale />
      </div>
    </main>
  </>
)

export default LieuActiviteDetailPage
