import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { DemandeSubventionForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import ValiderEtEnvoyerDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/ValiderEtEnvoyerDemandeDeSubventionButton'
import { gouvernanceDemandesDeSubventionPath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModicitaionDesDemandesDeSubvention } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { besoinSubventionLabel } from '@app/web/gouvernance/besoinSubvention'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { numberToEuros } from '@app/web/utils/formatNumber'
import DeleteDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DeleteDemandeDeSubventionButton'
import AccepterDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/AccepterDemandeDeSubventionButton'
import DemandeDeModificationDemandeDeSubventionButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeModificationDemandeDeSubventionButton'

const DemandeDeSubventionCard = ({
  demandeDeSubvention,
  canInstruct,
  canValidate,
  codeDepartement,
  gouvernanceId,
}: {
  codeDepartement: string
  gouvernanceId: string
  demandeDeSubvention: DemandeSubventionForForm
  // Can edit, accept, delete, etc.. whatever the state of the demande de subvention
  canInstruct: boolean
  // User cannot validate if context is not done
  canValidate: boolean
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

  const mustEditContextBeforeValidate = !canInstruct && !canValidate
  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta

  const canEdit = canInstruct || !valideeEtEnvoyee
  const canDelete = canInstruct || !valideeEtEnvoyee

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
        <div className="fr-flex fr-flex-gap-4v fr-align-items-start">
          {canEdit && (
            <Button
              priority="secondary"
              linkProps={{
                href: gouvernanceDemandesDeSubventionPath(
                  { codeDepartement },
                  gouvernanceId,
                  `/${id}`,
                ),
              }}
              iconId="fr-icon-edit-line"
              iconPosition="right"
            >
              Modifier
            </Button>
          )}
          {canDelete && (
            <DeleteDemandeDeSubventionButton demandeDeSubventionId={id} />
          )}
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
          className="fr-mt-4v fr-notice--icon-airplane"
          title={
            <>
              Demande de subvention envoyée le {dateAsDay(valideeEtEnvoyee)}.
              <br />
              <span className="fr-text--regular">
                Nos équipes instruisent les demandes de subvention au fur et à
                mesure de leur réception.{' '}
              </span>
            </>
          }
        />
      ) : (
        <Notice
          className="fr-mt-4v fr-notice--no-icon"
          title={
            <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between fr-flex-gap-4v">
              <span>
                Valider votre formulaire avant le{' '}
                {dateAsDay(limiteModicitaionDesDemandesDeSubvention)} pour que
                votre demande soit instruite. Vous ne pourrez ensuite plus le
                modifier.
              </span>
              <ValiderEtEnvoyerDemandeDeSubventionButton
                disabled={mustEditContextBeforeValidate}
                demandeDeSubventionId={id}
              />
            </span>
          }
        />
      )}
      {mustEditContextBeforeValidate && (
        <Notice
          className="fr-mt-4v fr-notice--warning"
          title="Veuiller enregistrer la contextualisation des demandes de subvention pour pouvoir valider et envoyer votre demande"
        />
      )}
      {valideeEtEnvoyee && !acceptee && canInstruct && (
        <Notice
          className="fr-mt-4v fr-notice--success"
          title={
            <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between fr-flex-gap-4v">
              <span>
                En tant qu’administrateur, vous pouvez accepter cette demande de
                subvention
              </span>
              <AccepterDemandeDeSubventionButton demandeDeSubventionId={id} />
            </span>
          }
        />
      )}
      {valideeEtEnvoyee && canInstruct && (
        <Notice
          className="fr-mt-4v fr-notice--warning"
          title={
            <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between fr-flex-gap-4v">
              <span>
                En tant qu’administrateur, vous pouvez demander des
                modifications, et rendre la demande de subvention éditable à
                nouveau pour la préfécture.
              </span>
              <DemandeDeModificationDemandeDeSubventionButton
                demandeDeSubventionId={id}
              />
            </span>
          }
        />
      )}
    </div>
  )
}

export default DemandeDeSubventionCard
