import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import classNames from 'classnames'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { CandidatsGouvernance } from '@app/web/app/(private)/gouvernances/getCandidatsGouvernances'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import PartenaireInfoAccordion from '@app/web/app/(private)/gouvernances/PartenaireInfoAccordion'

const CandidatPorteurCard = ({
  porteur,
}: {
  porteur: CandidatsGouvernance['porteurs'][number]
}) => {
  const title = porteur.region
    ? `${porteur.region.nom}`
    : porteur.departement
      ? `${porteur.departement.nom} (${porteur.departement.code})`
      : porteur.epci
        ? `${porteur.epci.nom}`
        : ''

  const persona =
    gouvernancePersonas[porteur.gouvernancePersona as GouvernancePersonaId]

  const collectivitesPartenaires = [
    ...porteur.departementsParticipants,
    ...porteur.epcisParticipantes,
    ...porteur.communesParticipantes,
  ]

  return (
    <div className={styles.candidatCard}>
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
        <div className="fr-badge fr-badge--yellow-tournesol">
          Porteur d’une feuille de route
        </div>
        <p className="fr-mb-0">
          Déposée le {dateAsDay(porteur.confirmeEtEnvoye)}
        </p>
      </div>
      <h4 className="fr-mt-6v fr-mb-4v">{title}</h4>
      <Accordion
        className={styles.detailsAccordion}
        label="Informations & contacts du porteur"
      >
        {!!porteur.schemaOuGouvernanceLocale && (
          <InfoLabelValue
            label="Implication dans un schéma ou une gouvernance locale relative à l'inclusion numérique"
            value={porteur.schemaOuGouvernanceLocale}
          />
        )}
        <InfoLabelValue
          label="Typologie de la collectivité"
          value={persona.shortTitle ?? persona.title}
        />
        {!!porteur.contactPolitique && (
          <InfoLabelValue
            label="Contact politique de la collectivité"
            value={<ContactInfo contact={porteur.contactPolitique} />}
          />
        )}
        {!!porteur.contactTechnique && (
          <InfoLabelValue
            label="Contact technique de la collectivité"
            value={<ContactInfo contact={porteur.contactTechnique} />}
          />
        )}
      </Accordion>
      {/* Server side validation ensures there is at least one item in the list */}
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center  fr-mt-10v fr-mb-4v">
        <div className="fr-badge fr-badge--purple-glycine">
          Collectivités partenaires suggérées
        </div>
        <p
          className={classNames(
            'fr-mb-0 fr-text--xl fr-text--bold',
            styles.alignWithAccordionChevron,
          )}
        >
          {collectivitesPartenaires.length}
        </p>
      </div>
      {collectivitesPartenaires.map((partenaire) => (
        <PartenaireInfoAccordion key={partenaire.id} partenaire={partenaire} />
      ))}
      {porteur.structuresParticipantes.length > 0 && (
        <>
          <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-mt-10v fr-mb-4v">
            <div className="fr-badge fr-badge--purple-glycine">
              Autres structures suggérées
            </div>
            <p
              className={classNames(
                'fr-mb-0 fr-text--xl fr-text--bold',
                styles.alignWithAccordionChevron,
              )}
            >
              {porteur.structuresParticipantes.length}
            </p>
          </div>
          {porteur.structuresParticipantes.map((partenaire) => (
            <PartenaireInfoAccordion
              key={partenaire.id}
              partenaire={partenaire}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default CandidatPorteurCard
