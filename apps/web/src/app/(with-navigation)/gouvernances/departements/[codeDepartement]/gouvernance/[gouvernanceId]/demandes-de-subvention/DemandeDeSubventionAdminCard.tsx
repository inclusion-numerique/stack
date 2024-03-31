import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { DemandeSubventionForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { besoinSubventionLabel } from '@app/web/gouvernance/besoinSubvention'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { numberToEuros } from '@app/web/utils/formatNumber'
import AccepterDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/AccepterDemandeDeSubventionButton'
import DemandeDeModificationDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeModificationDemandeDeSubventionButton'

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
    acceptee,
    valideeEtEnvoyee,
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
          <h5 className="fr-mb-2v">{nomAction}</h5>
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
      <InfoLabelValue
        label="Bénéficiaires"
        value={beneficiaires.map((beneficiaire) => (
          <span key={beneficiaire.id}>
            {getMembreGouvernanceStringName(beneficiaire.membreGouvernance)}
            {beneficiaires.length > 1 && (
              <>&nbsp;·&nbsp;{numberToEuros(beneficiaire.subvention)}</>
            )}
            <br />
          </span>
        ))}
        labelClassName="fr-mt-4v"
      />
      <p className="fr-mt-4v fr-mb-2v fr-text--bold fr-flex fr-justify-content-space-between fr-flex-gap-4v">
        <span>Budget global de l’action</span>
        <span>{numberToEuros(budgetGlobal)}</span>
      </p>
      <p className="fr-mb-8v fr-text--bold fr-flex fr-justify-content-space-between  fr-flex-gap-4v">
        <span>Montant de la subvention demandée pour cette action</span>
        <span>{numberToEuros(subventionDemandee)}</span>
      </p>
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
                Demande en cours, pas encore validée et envoyéee par la
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
