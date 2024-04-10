import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import type {
  BesoinsIngenierieFinanciereForForm,
  GouvernanceForForm,
  GouvernanceWithDemandesSubventionsForForm,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import GouvernanceDetails from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

const GouvernancePrint = ({
  gouvernance,
  demandeDeSubvention,
  besoins,
  scope,
}: {
  gouvernance: GouvernanceForForm
  besoins: BesoinsIngenierieFinanciereForForm | null
  demandeDeSubvention: GouvernanceWithDemandesSubventionsForForm
  scope: GouvernanceScope
}) => (
  <div className="fr-container fr-container--medium fr-py-10v ">
    <Notice
      className="fr-hidden-print fr-mb-6v"
      title={
        <>
          Pour télécharger cette page au format .pdf, cliquez sur Imprimer, puis
          à la ligne <strong>Destination</strong> (sur Chrome) ou{' '}
          <strong>Nom de l’imprimante</strong> (sur Firefox), choisissez{' '}
          <strong>Enregistrer au format PDF</strong>
        </>
      }
    />

    <GouvernanceDetails
      gouvernance={gouvernance}
      besoins={besoins}
      scope={scope}
      demandeDeSubvention={demandeDeSubvention}
      publicView={false}
      print
    />
  </div>
)

export default GouvernancePrint
