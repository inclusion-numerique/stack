'use client'

import React, { ReactNode, useState } from 'react'
import IconInSquare from '@app/web/components/IconInSquare'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import { LieuAccueillantPublicTitle } from '@app/web/components/structure/titles/LieuAccueillantPublicTitle'
import { ServiceInclusionNumeriqueTitle } from '@app/web/components/structure/titles/ServiceInclusionNumeriqueTitle'
import LieuActiviteSideMenu from '@app/web/app/coop/(full-width-layout)/lieux-activite/_components/LieuActiviteSideMenu'
import DescriptionEditCard from './description/DescriptionEditCard'
import InformationsGeneralesEditCard from './informations-generales/InformationsGeneralesEditCard'
import InformationsPratiquesEditCard from './informations-pratiques/InformationsPratiquesEditCard'
import ModalitesAccesAuServiceEditCard from './modalites-acces-au-service/ModalitesAccesAuServiceEditCard'
import ServicesEtAccompagnementEditCard from './services-et-accompagnement/ServicesEtAccompagnementEditCard'
import TypesDePublicsAccueillisEditCard from './types-de-publics-accueillis/TypesDePublicsAccueillisEditCard'
import VisiblePourCartographieNationaleFields from './VisiblePourCartographieNationaleFields'

export const LieuActivitePageContent = ({
  structure,
  contentTop,
}: {
  structure: {
    id: string
    nom: string
    adresse: string
    commune: string
    codePostal: string
    codeInsee?: string | null
    complementAdresse?: string | null
    siret?: string | null
    rna?: string | null
    telephone?: string | null
    structureCartographieNationaleId: string | null
    visiblePourCartographieNationale: boolean
    itinerance: string[]
    fraisACharge: string[]
    modalitesAcces: string[]
    courriels: string[]
  }
  contentTop?: ReactNode
}) => {
  const [showSideMenu, setShowSideMenu] = useState(
    structure.visiblePourCartographieNationale,
  )

  return (
    <>
      <div style={{ minWidth: '19em' }}>
        {showSideMenu && (
          <LieuActiviteSideMenu className="fr-hidden fr-unhidden-lg fr-mt-16w" />
        )}
      </div>
      <div className="fr-container fr-container--narrow fr-ml-0 fr-mb-30v">
        {contentTop}
        <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-6v fr-mb-5w">
          <IconInSquare iconId="ri-home-office-line" />
          <h1 className="fr-page-title fr-m-0 fr-h2">{structure.nom}</h1>
        </span>
        <div className="fr-border fr-border-radius--8">
          <InformationsGeneralesEditCard {...structure} />
        </div>
        <div className="fr-border fr-border-radius--8 fr-mt-5w">
          <DisplayOnCartography
            canChangeVisibility={
              structure.structureCartographieNationaleId == null
            }
          />
          <hr className="fr-separator fr-separator-1px" />
          <VisiblePourCartographieNationaleFields
            className="fr-px-4w fr-py-3w"
            canChangeVisibility={
              structure.structureCartographieNationaleId == null
            }
            onChange={setShowSideMenu}
            {...structure}
          >
            <LieuAccueillantPublicTitle />
            <hr className="fr-separator-1px" />
            <DescriptionEditCard {...structure} />
            <hr className="fr-separator-1px fr-mx-4w" />
            <InformationsPratiquesEditCard
              {...structure}
              lieuItinerant={structure.itinerance.includes('Itinérant')}
            />
            <hr className="fr-separator-1px" />
            <ServiceInclusionNumeriqueTitle />
            <hr className="fr-separator-1px" />
            <ServicesEtAccompagnementEditCard {...structure} />
            <hr className="fr-separator-1px fr-mx-4w" />
            <ModalitesAccesAuServiceEditCard
              id={structure.id}
              fraisACharge={structure.fraisACharge}
              modalitesAcces={{
                surPlace: structure.modalitesAcces.includes('Se présenter'),
                parTelephone: structure.modalitesAcces.includes('Téléphoner'),
                parMail:
                  structure.modalitesAcces.includes('Contacter par mail'),
                numeroTelephone: structure.telephone,
                adresseMail: structure.courriels[0] ?? null,
              }}
            />
            <hr className="fr-separator-1px fr-mx-4w" />
            <TypesDePublicsAccueillisEditCard {...structure} />
          </VisiblePourCartographieNationaleFields>
        </div>
      </div>
    </>
  )
}
