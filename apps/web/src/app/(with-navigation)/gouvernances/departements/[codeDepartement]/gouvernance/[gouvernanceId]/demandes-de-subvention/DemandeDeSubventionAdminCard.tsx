import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { DemandeSubventionForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { besoinSubventionLabel } from '@app/web/gouvernance/besoinSubvention'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { numberToEuros } from '@app/web/utils/formatNumber'
import AccepterDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/AccepterDemandeDeSubventionButton'
import DemandeDeModificationDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeModificationDemandeDeSubventionButton'
import styles from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreFeuilleDeRoute.module.css'
import { getDownloadUrl } from '@app/web/utils/getDownloadUrl'

const DemandeDeSubventionAdminCard = ({
  demandeDeSubvention,
}: {
  demandeDeSubvention: DemandeSubventionForForm
}) => {
  const {
    id,
    nomAction,
    creation,
    modification,
    createur,
    derniereModificationPar,
    besoins,
    feuilleDeRoute,
    beneficiaires,
    budgetGlobal,
    subventionDemandee,
    subventionEtp,
    subventionPrestation,
    pieceJointeBudgetKey,
    acceptee,
    valideeEtEnvoyee,
    description,
    contexte,
  } = demandeDeSubvention

  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta

  return (
    <div>
      <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v">
        <div>
          <h5 className="fr-h2 fr-mb-2v">{nomAction}</h5>
          <p className="fr-mb-0 fr-mt-2v fr-text--sm">
            Déposée le {creationMeta}
            {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
          </p>
        </div>
      </div>
      <InfoLabelValue
        label="Besoins relatif à la formalisation des feuilles de route"
        value={besoins.map((besoin) => (
          <span key={besoin}>
            {besoinSubventionLabel[besoin]}
            <br />
          </span>
        ))}
        labelClassName="fr-mt-4v"
      />
      <InfoLabelValue
        label="Associé à la feuille de route"
        value={feuilleDeRoute.nom}
        labelClassName="fr-mt-4v"
      />
      <Accordion
        className="fr-mt-4v"
        label="Contexte & description de l’action"
      >
        <>
          <InfoLabelValue
            label="Contexte"
            value={
              <span
                className={styles.htmlContainer}
                dangerouslySetInnerHTML={{
                  __html: contexte,
                }}
              />
            }
          />
          <InfoLabelValue
            label="Description"
            value={
              <span
                className={styles.htmlContainer}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            }
            labelClassName="fr-mt-4v"
          />
        </>
      </Accordion>
      <hr className="fr-separator-8v" />
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v">
        <h5 className="fr-h6 fr-mb-0">
          Informations sur le budget et le financement
        </h5>
        <Button
          iconPosition="right"
          size="small"
          iconId="fr-icon-download-line"
          priority="tertiary"
          linkProps={{
            href: getDownloadUrl(pieceJointeBudgetKey, { download: true }),
          }}
        >
          Télécharger&nbsp;pièce&nbsp;jointe
        </Button>
      </div>
      <p className="fr-mt-4v fr-mb-0 fr-text--bold fr-flex fr-justify-content-space-between fr-flex-gap-4v">
        <span>Budget global de l’action</span>
        <span>{numberToEuros(budgetGlobal)}</span>
      </p>
      <p className="fr-mt-1v fr-mb-0 fr-text--bold fr-flex fr-justify-content-space-between  fr-flex-gap-4v">
        <span>Montant de la subvention demandée pour cette action</span>
        <span>{numberToEuros(subventionDemandee)}</span>
      </p>
      <p className="fr-mt-1v fr-mb-0 fr-flex fr-justify-content-space-between  fr-flex-gap-4v">
        <span>Montant ETP</span>
        <span>{subventionEtp?.gt(0) ? numberToEuros(subventionEtp) : '-'}</span>
      </p>
      <p className="fr-mt-1v fr-mb-0 fr-flex fr-justify-content-space-between  fr-flex-gap-4v">
        <span>Montant Prestation de service</span>
        <span>
          {subventionPrestation?.gt(0)
            ? numberToEuros(subventionPrestation)
            : '-'}
        </span>
      </p>
      <hr className="fr-separator-8v" />
      <h5 className="fr-h6 fr-mb-4v">
        Bénéficiaire{sPluriel(beneficiaires.length)} des fonds
      </h5>
      {beneficiaires.map((beneficiaire) => (
        <p
          key={beneficiaire.id}
          className="fr-mt-1v fr-mb-0 fr-flex fr-justify-content-space-between  fr-flex-gap-4v"
        >
          <span>
            {getMembreGouvernanceStringName(beneficiaire.membreGouvernance)}
          </span>
          <span>{numberToEuros(beneficiaire.subvention)}</span>
        </p>
      ))}
      <hr className="fr-separator-8v" />

      {acceptee ? (
        <Notice
          className="fr-mt-4v fr-notice--success"
          title={<>Demande de subvention validée le {dateAsDay(acceptee)}.</>}
        />
      ) : valideeEtEnvoyee ? (
        <Notice
          className="fr-mt-8v fr-notice--no-icon"
          title={
            <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between fr-flex-gap-4v">
              <span>
                En attente de validation depuis le {dateAsDay(valideeEtEnvoyee)}
                .
              </span>
              <span className="fr-flex fr-direction-column fr-flex-gap-2v fr-direction-md-row">
                <DemandeDeModificationDemandeDeSubventionButton
                  demandeDeSubventionId={id}
                />
                <AccepterDemandeDeSubventionButton demandeDeSubventionId={id} />
              </span>
            </span>
          }
        />
      ) : (
        <Notice
          className="fr-mt-4v fr-notice--no-icon"
          title={
            <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between fr-flex-gap-4v">
              <span>
                Demande en cours, pas encore validée et envoyée par la
                préfecture.
              </span>
            </span>
          }
        />
      )}
    </div>
  )
}

export default DemandeDeSubventionAdminCard
