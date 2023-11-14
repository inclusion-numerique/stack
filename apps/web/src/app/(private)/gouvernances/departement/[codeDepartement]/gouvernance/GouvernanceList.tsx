import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import {
  ajouterGouvernancePath,
  GouvernanceScope,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import {
  getListeGouvernanceDepartement,
  getListeGouvernanceNational,
  getListeGouvernanceRegion,
} from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernancePressentieMetadata'

const GouvernanceList = async ({ scope }: { scope: GouvernanceScope }) => {
  const gouvernances = await (scope.codeDepartement
    ? getListeGouvernanceDepartement(scope.codeDepartement)
    : scope.codeRegion
    ? getListeGouvernanceRegion(scope.codeRegion)
    : getListeGouvernanceNational())

  const canAdd = gouvernances.length === 0 && !!scope.codeDepartement

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
          <h3>Proposition de gouvernance sur votre territoire</h3>
          <p>
            Retrouvez ci-dessous votre proposition de gouvernance finale sur
            votre territoire. Vous pouvez encore la compléter et/ou la modifier
            jusqu’au 31/12/2023.
          </p>
        </>
      )}
      {gouvernancesPressenties.length > 0 && (
        <>
          <h3>Historique de vos gouvernances pressenties</h3>
          <p>
            Retrouvez ici vos précédentes propositions de gouvernances et
            porteurs pressentis.
          </p>
        </>
      )}
      {canAdd && (
        <>
          <h3>Proposition de gouvernance sur votre territoire</h3>
          <p>
            Renseignez la proposition de gouvernance finale sur votre
            territoire, les feuilles de route ainsi que vos besoins en
            ingénierie financière.
          </p>
          <span>
            {gouvernances.length === 0 && (
              <div className="fr-badge fr-badge--warning fr-mb-3v">
                À renseigner avant le{' '}
                {dateAsDay(limiteModificationDesGouvernancesPressenties)}
              </div>
            )}
            <p className="fr-mb-0">
              <strong>
                Une ou plusieurs gouvernances se dessinent sur votre territoire.
              </strong>
              <br />
              Faites remonter les porteurs de feuilles de route territoriale et
              les périmètres des gouvernances pressenties.
            </p>
          </span>
          <Button
            iconId="fr-icon-add-line"
            size="large"
            priority={gouvernances.length === 0 ? 'primary' : 'secondary'}
            linkProps={{
              href: ajouterGouvernancePath(scope),
            }}
          >
            Remonter une gouvernance pressentie
          </Button>
        </>
      )}
      {!canAdd && gouvernances.length === 0 && (
        <p>Aucune gouvernance pressentie n’a été remontée pour le moment</p>
      )}
    </>
  )
}

export default GouvernanceList
