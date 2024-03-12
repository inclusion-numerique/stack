import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { limiteModificationDesGouvernances } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { ListeGouvernance } from '@app/web/app/(with-navigation)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import GouvernanceCardCtas from '@app/web/app/(with-navigation)/gouvernances/GouvernanceCardCtas'
import GouvernanceCard from '@app/web/app/(with-navigation)/gouvernances/GouvernanceCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import GouvernanceCompletedModal from '@app/web/app/(with-navigation)/gouvernances/GouvernanceCompletedModal'
import { detailGouvernancePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'

const GouvernanceList = ({
  scope,
  gouvernances,
}: {
  scope: GouvernanceScope
  gouvernances: ListeGouvernance
}) => {
  const canAdd = gouvernances.length === 0 && !!scope.codeDepartement
  const canEdit = !!scope.codeDepartement

  const gouvernancesPressenties = gouvernances.filter(
    ({ v2Enregistree }) => !v2Enregistree,
  )
  const gouvernanceFinale = gouvernances.find(
    ({ v2Enregistree }) => !!v2Enregistree,
  )

  const showCtasOnPressenties = canEdit && !gouvernanceFinale

  return (
    <>
      {/* Empty state */}
      {!canAdd && gouvernances.length === 0 && (
        <>
          <h4 className="fr-mb-2v">Gouvernance sur votre territoire</h4>
          <p className="fr-mb-12v">
            Aucune gouvernance n’a été remontée pour le moment.
            <br />
            <strong>
              Elles pourront encore être déposées jusqu’au{' '}
              {dateAsDay(limiteModificationDesGouvernances)}.
            </strong>
          </p>
        </>
      )}

      {/* Empty state is a creation CTA for v2 gouvernanceif the user can create gouvernance */}
      {canAdd && (
        <>
          <h4 className="fr-mb-2v">Gouvernance sur votre territoire</h4>
          <p className="fr-mb-12v">
            Renseignez la gouvernance finale sur votre territoire.
          </p>

          <WhiteCard>
            <GouvernanceCardCtas
              canEdit
              canCreateInDepartementCode={scope.codeDepartement}
            />
          </WhiteCard>
        </>
      )}

      {/* Show v2 gouvernances. It can be only one but it is in the array of gouvernances */}
      {!!gouvernanceFinale && (
        <>
          <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-12v fr-mb-12v">
            <div>
              <h3 className="fr-mb-2v">
                Gérer la politique d’inclusion numérique de votre territoire
              </h3>
              <p className="fr-text--xl fr-mb-0" style={{ maxWidth: 680 }}>
                Retrouvez ci-dessous les informations et demandes de subventions
                liées à votre gouvernance.
              </p>
            </div>
            <Button
              priority="secondary"
              iconId="fr-icon-arrow-right-line"
              iconPosition="right"
              linkProps={{
                href: detailGouvernancePath(scope, gouvernanceFinale.id),
              }}
            >
              Voir le détail
            </Button>
          </div>
          <GouvernanceCard
            key={gouvernanceFinale.id}
            gouvernance={gouvernanceFinale}
            scope={{ codeDepartement: gouvernanceFinale.departement.code }}
            canEdit={canEdit}
            showCtas
          />
        </>
      )}

      {/* Show v1 gouvernances if none finalized */}
      {canEdit && !gouvernanceFinale && gouvernancesPressenties.length > 0 && (
        <>
          <h3 className="fr-mb-2v">Gouvernances pressenties</h3>
          <Notice
            title={
              gouvernancesPressenties.length > 1 ? (
                <>
                  Retrouvez ci-dessous vos propositions de gouvernances
                  pressenties.{' '}
                  <strong>
                    Vous devez maintenant en choisir une, finaliser votre
                    proposition et renseigner vos besoins en ingénierie
                    financière.
                  </strong>
                </>
              ) : (
                <>
                  Afin de finaliser votre proposition de gouvernance,{' '}
                  <strong>
                    veuillez compléter le formulaire de gouvernance & feuilles
                    de routes ainsi que vos besoins en ingénierie financière.
                  </strong>
                </>
              )
            }
            className="fr-notice--warning fr-mt-6v fr-mb-12v"
          />
          {gouvernancesPressenties.map((gouvernance, index) => (
            <GouvernanceCard
              key={gouvernance.id}
              gouvernance={gouvernance}
              titleIndex={
                gouvernancesPressenties.length > 0
                  ? `${index + 1}`.padStart(2, '0')
                  : undefined
              }
              scope={{ codeDepartement: gouvernance.departement.code }}
              canEdit={canEdit}
              showCtas={showCtasOnPressenties}
            />
          ))}
        </>
      )}
      <GouvernanceCompletedModal />
    </>
  )
}

export default GouvernanceList
