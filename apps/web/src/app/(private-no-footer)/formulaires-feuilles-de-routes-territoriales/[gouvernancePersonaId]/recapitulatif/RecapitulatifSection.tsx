import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import {
  GouvernancePersona,
  GouvernancePersonaId,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'

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
const RecapitulatifSection = ({
  formulaireGouvernance,
  persona,
  totalContacts,
  totalCollectivites,
  missingContacts,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  persona: GouvernancePersona
  missingContacts: number
  totalContacts: number
  totalCollectivites: number
}) => {
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
    </>
  )
}

export default RecapitulatifSection
