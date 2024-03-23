import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import {
  GouvernanceForForm,
  GouvernanceWithDemandesSubventionsForForm,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import GouvernanceDetails from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

const GouvernancePrint = ({
  gouvernance,
  demandeDeSubvention,
  scope,
}: {
  gouvernance: GouvernanceForForm
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
      scope={scope}
      demandeDeSubvention={demandeDeSubvention}
      publicView={false}
      print
    />
  </div>
)

export default GouvernancePrint
