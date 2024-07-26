import React from 'react'
import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import IconInSquare from '@app/web/components/IconInSquare'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import { LieuAccueillantPublicTitle } from '@app/web/components/structure/titles/LieuAccueillantPublicTitle'
import { ServiceInclusionNumeriqueTitle } from '@app/web/components/structure/titles/ServiceInclusionNumeriqueTitle'
import LieuActiviteSideMenu from '../_components/LieuActiviteSideMenu'
import InformationsGeneralesEditCard from './_components/informations-generales/InformationsGeneralesEditCard'
import VisiblePourCartographieNationaleFields from './_components/VisiblePourCartographieNationaleFields'
import DescriptionEditCard from './_components/description/DescriptionEditCard'
import InformationsPratiquesEditCard from './_components/informations-pratiques/InformationsPratiquesEditCard'
import ServicesEtAccompagnementEditCard from './_components/services-et-accompagnement/ServicesEtAccompagnementEditCard'
import ModalitesAccesAuServiceEditCard from './_components/modalites-acces-au-service/ModalitesAccesAuServiceEditCard'
import TypesDePublicsAccueillisEditCard from './_components/types-de-publics-accueillis/TypesDePublicsAccueillisEditCard'

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
            <h1 className="fr-page-title fr-m-0 fr-h2">Lieu d’activité</h1>
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
              <hr className="fr-separator-1px" />
              <LieuAccueillantPublicTitle />
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
              <ServiceInclusionNumeriqueTitle />
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
