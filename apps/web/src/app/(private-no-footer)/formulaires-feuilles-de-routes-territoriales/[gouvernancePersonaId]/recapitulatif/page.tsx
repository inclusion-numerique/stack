import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'
import Progress from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/Progress'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Recapitulatif from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/recapitulatif/Recapitulatif'
import { getEtapeInfo } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

const InfoContact = ({
  contact,
  persona,
  structure,
}: {
  contact?: {
    nom: string
    prenom: string
    fonction: string
    email: string
  } | null
  persona: GouvernancePersonaId
  structure?: boolean
}) =>
  contact ? (
    <InfoLabelValue
      label={`Contact de la ${structure ? 'structure' : 'collectivité'} :`}
      value={<ContactInfo contact={contact} />}
    />
  ) : (
    <>
      <div className="fr-flex">
        <span className="fr-icon-warning-fill fr-icon--sm fr-mr-1w fr-text-default--warning" />
        <p className="fr-mb-3v fr-text--medium fr-text-default--warning">
          Contact de la collectivité
          <br />
          Vous devez renseigner ce contact pour valider le périmètre de votre
          feuille de route.
        </p>
      </div>
      <Button
        className="fr-ml-6v"
        priority="secondary"
        iconId="fr-icon-arrow-right-line"
        iconPosition="right"
        linkProps={{
          href: `/formulaires-feuilles-de-routes-territoriales/${persona}/${
            structure ? 'autres-structures' : 'contacts-collectivites'
          }`,
          prefetch: false,
        }}
      >
        Renseigner un contact
      </Button>
    </>
  )

const Page = async (props: PageFormulaireProps) => {
  const { formulaireGouvernance, persona, retourHref, breadcrumbs } =
    await getPageFormulaireData(props, 'recapitulatif')

  if (!persona) {
    throw new Error('recapitulatif page: persona is missing')
  }

  const nextEtape = getEtapeInfo({
    etape: 'confirmation-formulaire-envoye',
    gouvernancePersonaId: persona.id,
  })

  const totalCollectivites =
    formulaireGouvernance.departementsParticipants.length +
    formulaireGouvernance.epcisParticipantes.length +
    formulaireGouvernance.communesParticipantes.length

  const totalContacts =
    formulaireGouvernance.departementsParticipants.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.epcisParticipantes.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.communesParticipantes.filter(
      (participant) => !!participant.contact,
    ).length

  const missingContacts = totalCollectivites - totalContacts

  const participantName = formulaireGouvernance.region
    ? formulaireGouvernance.region.nom
    : formulaireGouvernance.departement
    ? `${formulaireGouvernance.departement.nom} (${formulaireGouvernance.departement.code})`
    : formulaireGouvernance.epci
    ? formulaireGouvernance.epci.nom
    : formulaireGouvernance.commune?.nom ??
      formulaireGouvernance.nomStructure ??
      null

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>
      <div className="fr-container fr-container--medium formulaire-gouvernance-no-footer-margin-bottom">
        <BackLink href={retourHref} />

        <Progress
          progression={5}
          currentTitle="Récapitulatif de votre feuille de route"
        />
        <h1 className="fr-text-title--blue-france fr-mb-12v">
          Récapitulatif de votre feuille de route
        </h1>

        <h3 className="fr-text-title--blue-france fr-mb-2v">
          Informations sur votre {persona.shortTitle ?? persona.title}
        </h3>
        <p className="fr-text--xl fr-mb-0">{participantName}</p>
        <hr className="fr-pb-4v fr-mt-4v" />
        {!!formulaireGouvernance.contactPolitique && (
          <InfoLabelValue
            label="Contact politique"
            value={
              <ContactInfo contact={formulaireGouvernance.contactPolitique} />
            }
            valueClassName="fr-mb-4v"
          />
        )}
        {!!formulaireGouvernance.contactTechnique && (
          <InfoLabelValue
            label="Contact technique"
            value={
              <ContactInfo contact={formulaireGouvernance.contactTechnique} />
            }
            valueClassName="fr-mb-4v"
          />
        )}
        {!!formulaireGouvernance.contactStructure && (
          <InfoLabelValue
            label="Contact structure"
            value={
              <ContactInfo contact={formulaireGouvernance.contactStructure} />
            }
            valueClassName="fr-mb-4v"
          />
        )}
        {!!formulaireGouvernance.schemaOuGouvernanceLocale && (
          <InfoLabelValue
            label="Schéma ou gouvernance locale"
            value={formulaireGouvernance.schemaOuGouvernanceLocale}
            valueClassName="fr-mb-4v"
          />
        )}

        <hr className="fr-pb-12v fr-mt-0" />

        <h3 className="fr-text-title--blue-france fr-mb-2v">
          Périmètre de votre feuille de route
        </h3>
        <p
          className="fr-text--xl fr-mb-2v"
          data-testid="recapitulatif-nombre-collectivites"
        >
          Nombre de collectivités&nbsp;:&nbsp;
          <span className="fr-text--bold">{totalCollectivites}</span>
        </p>
        {missingContacts > 0 && (
          <p className="fr-text--xl fr-mb-2v fr-text--bold fr-text-default--warning">
            Nombre de contacts manquants&nbsp;:&nbsp;{missingContacts}
          </p>
        )}
        <div className="fr-mt-4v">
          {formulaireGouvernance.departementsParticipants.map((participant) => (
            <Accordion
              key={participant.id}
              label={`${participant.departement.nom} (${participant.departementCode})`}
              defaultExpanded
            >
              <InfoContact contact={participant.contact} persona={persona.id} />
            </Accordion>
          ))}
          {formulaireGouvernance.epcisParticipantes.map((participant) => (
            <Accordion
              key={participant.id}
              label={participant.epci.nom}
              defaultExpanded
            >
              <InfoContact contact={participant.contact} persona={persona.id} />
            </Accordion>
          ))}
          {formulaireGouvernance.communesParticipantes.map((participant) => (
            <Accordion
              key={participant.id}
              label={communeNameWithCodePostaux(participant.commune)}
              defaultExpanded
            >
              <InfoContact contact={participant.contact} persona={persona.id} />
            </Accordion>
          ))}
        </div>
        {formulaireGouvernance.structuresParticipantes.length > 0 && (
          <>
            <h3 className="fr-text-title--blue-france fr-mt-12v fr-mb-2v">
              Autres structures impliquées
            </h3>
            <p
              className="fr-text--xl fr-mb-2v"
              data-testid="recapitulatif-nombre-structures"
            >
              Nombre de structures partenaires&nbsp;:&nbsp;
              <span className="fr-text--bold">
                {formulaireGouvernance.structuresParticipantes.length}
              </span>
            </p>
            <div className="fr-mt-4v">
              {formulaireGouvernance.structuresParticipantes.map(
                (participant) => (
                  <Accordion
                    key={participant.id}
                    label={participant.nomStructure}
                    defaultExpanded
                  >
                    <InfoContact
                      contact={participant.contact}
                      persona={persona.id}
                    />
                  </Accordion>
                ),
              )}
            </div>
          </>
        )}
        <Recapitulatif
          missingContacts={missingContacts}
          formulaireGouvernanceId={formulaireGouvernance.id}
          nextEtapePath={nextEtape.absolutePath}
        />
      </div>
    </>
  )
}

export default Page
