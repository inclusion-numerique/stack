import React from 'react'
import { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { ListeGouvernance } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import GouvernanceCardCtas from '@app/web/app/(private)/gouvernances/GouvernanceCardCtas'

const GouvernanceList = ({
  scope,
  gouvernances,
}: {
  scope: GouvernanceScope
  gouvernances: ListeGouvernance
}) => {
  const canAdd = gouvernances.length === 0 && !!scope.codeDepartement
  // const canEdit = !!scope.codeDepartement

  const gouvernancesPressenties = gouvernances.filter(
    ({ v2Enregistree }) => !v2Enregistree,
  )
  const gouvernancesProposees = gouvernances.filter(
    ({ v2Enregistree }) => !!v2Enregistree,
  )

  return (
    <>
      {gouvernancesProposees.length > 0 && (
        <>
          <h3 className="fr-mb-2v">
            Proposition de gouvernance sur votre territoire
          </h3>
          <p>
            Retrouvez ci-dessous votre proposition de gouvernance finale sur
            votre territoire. Vous pouvez encore la compléter et/ou la modifier
            jusqu’au 31/12/2023.
          </p>
        </>
      )}
      {gouvernancesPressenties.length > 0 && (
        <>
          <h3 className="fr-mb-2v">
            Historique de vos gouvernances pressenties
          </h3>
          <p>
            Retrouvez ici vos précédentes propositions de gouvernances et
            porteurs pressentis.
          </p>
        </>
      )}
      {canAdd && (
        <>
          <h3 className="fr-mb-2v">
            Proposition de gouvernance sur votre territoire
          </h3>
          <p>
            Renseignez la proposition de gouvernance finale sur votre
            territoire, les feuilles de route ainsi que vos besoins en
            ingénierie financière.
          </p>

          <WhiteCard>
            <GouvernanceCardCtas
              canEdit
              canCreateInDepartementCode={scope.codeDepartement}
            />
          </WhiteCard>
        </>
      )}
      {!canAdd && gouvernances.length === 0 && (
        <>
          <h3 className="fr-mb-2v">
            Proposition de gouvernance sur votre territoire
          </h3>
          <p>Aucune gouvernance pressentie n’a été remontée pour le moment.</p>
        </>
      )}
    </>
  )
}

export default GouvernanceList
