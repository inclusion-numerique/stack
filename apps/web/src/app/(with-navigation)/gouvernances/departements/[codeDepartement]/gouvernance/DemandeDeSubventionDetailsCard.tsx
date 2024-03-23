import classNames from 'classnames'
import React from 'react'
import { DemandeSubventionForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { besoinSubventionLabel } from '@app/web/gouvernance/besoinSubvention'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { numberToEuros } from '@app/web/utils/formatNumber'
import styles from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails.module.css'

const DemandeDeSubventionDetailsCard = ({
  publicView,
  demandeDeSubvention,
}: {
  publicView: boolean
  demandeDeSubvention: DemandeSubventionForForm
}) => {
  const {
    nomAction,
    besoins,
    feuilleDeRoute,
    beneficiaires,
    budgetGlobal,
    subventionDemandee,
    description,
    contexte,
    subventionEtp,
    subventionPrestation,
  } = demandeDeSubvention

  return (
    <>
      <p className="fr-text--xl fr-text--bold">{nomAction}</p>
      <InfoLabelValue
        label="Contexte de l’action"
        value={
          <div
            dangerouslySetInnerHTML={{
              __html: contexte,
            }}
            className={classNames('fr-mb-0', styles.noteDeContexteContainer)}
          />
        }
        labelClassName="fr-mt-4v"
      />
      <InfoLabelValue
        label="Description de l’action"
        value={
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            className={classNames('fr-mb-0', styles.noteDeContexteContainer)}
          />
        }
        labelClassName="fr-mt-4v"
      />
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
      {!!subventionEtp && subventionEtp.gt(0) && (
        <InfoLabelValue
          label="Montant de la subvention pour ressources humaines"
          value={numberToEuros(subventionEtp)}
          labelClassName="fr-mt-4v"
        />
      )}
      {!!subventionPrestation && subventionPrestation.gt(0) && (
        <InfoLabelValue
          label="Montant de la subvention pour prestations"
          value={numberToEuros(subventionPrestation)}
          labelClassName="fr-mt-4v"
        />
      )}
      {!publicView && (
        <p className="fr-mt-4v fr-mb-2v fr-text--bold fr-flex fr-justify-content-space-between fr-flex-gap-4v">
          <span>Budget global de l’action</span>
          <span>{numberToEuros(budgetGlobal)}</span>
        </p>
      )}
      <p
        className={classNames(
          publicView && 'fr-mt-4v ',
          'fr-mb-8v fr-text--bold fr-flex fr-justify-content-space-between  fr-flex-gap-4v',
        )}
      >
        <span>Montant de la subvention demandée pour cette action</span>
        <span>{numberToEuros(subventionDemandee)}</span>
      </p>
    </>
  )
}

export default DemandeDeSubventionDetailsCard
