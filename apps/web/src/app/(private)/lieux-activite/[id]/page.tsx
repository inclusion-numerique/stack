import React from 'react'
import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import IconInSquare from '@app/web/components/IconInSquare'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import InformationsGeneralesEditCard from './_components/informations-generales/InformationsGeneralesEditCard'
import VisiblePourCartographieNationaleFields from './_components/visible-pour-cartographie-nationale/VisiblePourCartographieNationaleFields'
import DescriptionEditCard from './_components/description/DescriptionEditCard'
import InformationsPratiquesEditCard from './_components/informations-pratiques/InformationsPratiquesEditCard'
import ServicesEtAccompagnementEditCard from './_components/services-et-accompagnement/ServicesEtAccompagnementEditCard'
import ModalitesAccesAuServiceEditCard from './_components/modalites-acces-au-service/ModalitesAccesAuServiceEditCard'
import TypesDePublicsAccueillisEditCard from './_components/types-de-publics-accueillis/TypesDePublicsAccueillisEditCard'
import LieuActiviteSideMenu from './_components/LieuActiviteSideMenu'

const LieuActiviteDetailPage = async ({
  params,
}: {
  params: { id: string }
}) => {
  const user = await getSessionUser()
  if (!user || !user.mediateur) {
    redirect(`/connexion?suivant=/lieux-activite/${params.id}`)
  }

  const lieuActivite = await prismaClient.mediateurEnActivite.findFirst({
    where: {
      mediateurId: user.mediateur.id,
      structureId: params.id,
    },
    select: {
      structure: true,
    },
  })

  if (lieuActivite?.structure == null) {
    return redirect('/lieux-activite')
  }

  return (
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
          <div className="fr-border fr-border-radius--8">
            <InformationsGeneralesEditCard {...lieuActivite.structure} />
          </div>
          <div className="fr-border fr-border-radius--8 fr-mt-5w">
            <DisplayOnCartography />
            <hr className="fr-separator fr-separator-1px" />
            <VisiblePourCartographieNationaleFields
              className="fr-px-4w fr-pt-4w fr-pb-2w"
              {...lieuActivite.structure}
            >
              <hr className="fr-separator fr-separator-1px" />
              <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
                <div>
                  <div
                    className="fr-display-inline-block fr-icon-map-pin-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
                    aria-hidden
                  />
                </div>
                <div>
                  <h2
                    className="fr-h4 fr-mb-0 fr-text-label--blue-france"
                    id="description"
                  >
                    Lieu accueillant du public
                  </h2>
                  <p className="fr-text--sm fr-mb-0">
                    Renseignez ici des informations supplémentaires permettant
                    d’ajouter du contexte sur le lieu et de faciliter l’accès au
                    public.
                  </p>
                </div>
              </div>
              <hr className="fr-separator-1px" />
              <DescriptionEditCard {...lieuActivite.structure} />
              <hr className="fr-separator-1px fr-mx-4w" />
              <InformationsPratiquesEditCard
                {...lieuActivite.structure}
                lieuItinerant={lieuActivite.structure.itinerance.includes(
                  'Itinérant',
                )}
              />
              <hr className="fr-separator-1px" />
              <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
                <div>
                  <div
                    className="fr-display-inline-block ri-service-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
                    aria-hidden
                  />
                </div>
                <div>
                  <h2
                    className="fr-h4 fr-mb-0 fr-text-label--blue-france"
                    id="services-et-accompagnement"
                  >
                    Services d’inclusion numérique
                  </h2>
                  <p className="fr-text--sm fr-mb-0">
                    Renseignez des informations sur les services d’inclusion
                    numérique proposés dans ce lieu afin d’orienter les
                    bénéficiaires.
                  </p>
                </div>
              </div>
              <hr className="fr-separator-1px" />
              <ServicesEtAccompagnementEditCard {...lieuActivite.structure} />
              <hr className="fr-separator-1px fr-mx-4w" />
              <ModalitesAccesAuServiceEditCard
                id={lieuActivite.structure.id}
                fraisACharge={lieuActivite.structure.fraisACharge}
                modalitesAcces={{
                  surPlace:
                    lieuActivite.structure.modalitesAcces.includes(
                      'Se présenter',
                    ),
                  parTelephone:
                    lieuActivite.structure.modalitesAcces.includes(
                      'Téléphoner',
                    ),
                  parMail:
                    lieuActivite.structure.modalitesAcces.includes(
                      'Contacter par mail',
                    ),
                  numeroTelephone: lieuActivite.structure.telephone,
                  adresseMail: lieuActivite.structure.courriels[0] ?? null,
                }}
              />
              <hr className="fr-separator-1px fr-mx-4w" />
              <TypesDePublicsAccueillisEditCard {...lieuActivite.structure} />
            </VisiblePourCartographieNationaleFields>
          </div>
        </div>
      </main>
    </>
  )
}

export default LieuActiviteDetailPage
