import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import React from 'react'
import type { CandidatsGouvernance } from '@app/web/app/(private)/gouvernances/getCandidatsGouvernances'
import BackLink from '@app/web/components/BackLink'
import CandidatPorteurCard from '@app/web/app/(private)/gouvernances/CandidatPorteurCard'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import PartenaireInfoAccordion from '@app/web/app/(private)/gouvernances/PartenaireInfoAccordion'
import ParticipantInfoAccordion from '@app/web/app/(private)/gouvernances/ParticipantInfoAccordion'

const CandidatsGouvernances = ({
  candidatsGouvernance,
  ...scope
}: {
  candidatsGouvernance: CandidatsGouvernance
} & (
  | {
      codeDepartement: string
      codeRegion?: undefined
    }
  | {
      codeDepartement?: undefined
      codeRegion: string
    }
)) => {
  const backLink = scope.codeRegion
    ? `/gouvernances/region/${scope.codeRegion}`
    : `/gouvernances/departement/${
        // Cannot be empty but typescript does not guess that from the union type
        scope.codeDepartement ?? ''
      }`

  const downloadContactsLink = scope.codeRegion
    ? `/gouvernances/region/${scope.codeRegion}/contacts`
    : `/gouvernances/departement/${
        // Cannot be empty but typescript does not guess that from the union type
        scope.codeDepartement ?? ''
      }/contacts`

  const hasCandidats =
    candidatsGouvernance.porteurs.length +
      candidatsGouvernance.souhaitentParticiper.structures.length +
      candidatsGouvernance.souhaitentParticiper.collectivites.length >
    0

  return (
    <>
      <BackLink href={backLink} />
      <h3 className="fr-text-title--blue-france fr-my-6v">
        Les acteurs de votre territoire souhaitant porter ou participer à une
        feuille de route locale France Numérique Ensemble.
      </h3>
      <p className="fr-mb-6v">
        Retrouvez ici les informations récoltés via les formulaires mises à
        disposition des collectivités et autres personnes morales publiques ou
        privés leur permettant de manifester leur souhait de participer et/ou de
        porter une feuille de route territoriale. Ces informations vous
        permettront d’organiser la gouvernance d’Inclusion Numérique sur votre
        territoire.
      </p>
      {!hasCandidats && (
        <h5 className="fr-mt-12v fr-mb-6v">
          Aucun acteur de votre territoire ne s’est manifesté
        </h5>
      )}
      <Notice
        title={
          <>
            Vous pouvez inviter les collectivités et structures qui n’ont pas
            encore manifesté leur souhait de participer et/ou de porter une
            feuille de route territoriale en leur partageant ce lien vers les
            formulaires prévus à cet effet&nbsp;:{' '}
            <Link
              className="fr-whitespace-nowrap"
              href="https://inclusion-numerique.anct.gouv.fr/gouvernance"
              target="_blank"
            >
              https://inclusion-numerique.anct.gouv.fr/gouvernance
            </Link>
          </>
        }
      />

      {hasCandidats && (
        <>
          <Button
            className="fr-mt-12v fr-mb-0"
            priority="secondary"
            iconId="fr-icon-download-line"
            linkProps={{ href: downloadContactsLink }}
          >
            Voir et exporter la liste des contacts
          </Button>
          {candidatsGouvernance.porteurs.map((porteur) => (
            <CandidatPorteurCard key={porteur.id} porteur={porteur} />
          ))}
          {candidatsGouvernance.souhaitentParticiper.collectivites.length >
            0 && (
            <div className={styles.candidatCard}>
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                <div className="fr-badge fr-badge--blue-cumulus fr-badge--sm">
                  Collectivités qui souhaitent participer
                </div>
                <p className="fr-mb-0 fr-text--xl fr-text--bold">
                  {
                    candidatsGouvernance.souhaitentParticiper.collectivites
                      .length
                  }
                </p>
              </div>
              {candidatsGouvernance.souhaitentParticiper.collectivites.map(
                (participant) => (
                  <ParticipantInfoAccordion
                    key={participant.id}
                    participant={participant}
                  />
                ),
              )}
            </div>
          )}
          {candidatsGouvernance.souhaitentParticiper.structures.length > 0 && (
            <div className={styles.candidatCard}>
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                <div className="fr-badge fr-badge--blue-cumulus fr-badge--sm">
                  Autres structures qui souhaitent participer
                </div>
                <p className="fr-mb-0 fr-text--xl fr-text--bold">
                  {candidatsGouvernance.souhaitentParticiper.structures.length}
                </p>
              </div>
              {candidatsGouvernance.souhaitentParticiper.structures.map(
                (participant) => (
                  <ParticipantInfoAccordion
                    key={participant.id}
                    participant={participant}
                  />
                ),
              )}
            </div>
          )}
          {/* Adding a div to avoid conditions in cards classNames depending on presence */}
          <div className="fr-mb-20v">&nbsp;</div>
        </>
      )}
    </>
  )
}

export default CandidatsGouvernances
