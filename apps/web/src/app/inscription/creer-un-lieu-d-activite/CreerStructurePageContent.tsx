import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import FormSideMenu from '@app/web/components/form/FormSideMenu'
import CreerStructureForm from '@app/web/app/inscription/creer-un-lieu-d-activite/CreerStructureForm'
import IconInSquare from '@app/web/components/IconInSquare'

const CreateStructureSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-mt-30v fr-pt-23v">
    <div className="fr-width-full">
      <FormSideMenu
        items={[
          {
            text: 'Informations',
            linkProps: { href: `#informations` },
          },
          {
            text: 'Lieu accueillant du public',
            expandedByDefault: true,
            items: [
              {
                text: 'Description de l’activité du lieu',
                linkProps: { href: `#description` },
              },
              {
                text: 'Informations pratiques',
                linkProps: { href: `#informations-pratiques` },
              },
            ],
          },
          {
            text: 'Services d’inclusion numérique',
            expandedByDefault: true,
            items: [
              {
                text: 'Services & types d’accompagnement',
                linkProps: { href: `#services` },
              },
              {
                text: 'Modalités d’accès au service',
                linkProps: { href: `#acces` },
              },
              {
                text: 'Types de publics accueillis',
                linkProps: { href: `#publics` },
              },
            ],
          },
        ]}
        burgerMenuButtonText="Sections"
        contentId="form"
        sticky
      />
    </div>
  </div>
)

const CreerStructurePageContent = ({
  backLinkHref,
  backLinkTitle,
  lieuActiviteMediateurId,
  title,
}: {
  backLinkHref: string
  backLinkTitle?: string
  lieuActiviteMediateurId?: string
  title: string
}) => (
  <div className="fr-container" style={{ flex: 1 }}>
    <div className="fr-flex">
      <CreateStructureSideMenu />
      <div className="fr-container fr-container--narrow fr-ml-0 fr-mb-30v">
        <Button
          priority="tertiary no outline"
          size="small"
          linkProps={{
            href: backLinkHref,
          }}
          className="fr-mt-12v fr-mb-10v"
          iconId="fr-icon-arrow-left-line"
        >
          {backLinkTitle ?? 'Retour'}
        </Button>
        <h1 className="fr-page-title fr-flex fr-align-items-center fr-flex-gap-6v">
          <IconInSquare iconId="ri-home-office-line" />
          {title}
        </h1>

        <CreerStructureForm
          lieuActiviteMediateurId={lieuActiviteMediateurId}
          backLinkHref={backLinkHref}
        />
      </div>
    </div>
  </div>
)

export default CreerStructurePageContent
