import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { ListeGouvernance } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import GouvernanceCardCtas from '@app/web/app/(private)/gouvernances/GouvernanceCardCtas'
import GouvernanceCard from '@app/web/app/(private)/gouvernances/GouvernanceCard'
import { laOuLes } from '@app/web/utils/laOuLes'
import { votreOuVos } from '@app/web/utils/votreOuVos'
import { sPluriel } from '@app/web/utils/sPluriel'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'

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
  const gouvernancesProposees = gouvernances.filter(
    ({ v2Enregistree }) => !!v2Enregistree,
  )

  const showCtasOnPressenties = canEdit && gouvernancesProposees.length === 0

  return (
    <>
      {/* Empty state */}
      {!canAdd && gouvernances.length === 0 && (
        <>
          <h3 className="fr-mb-2v">
            Proposition de gouvernance sur votre territoire
          </h3>
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
          <h3 className="fr-mb-2v">
            Proposition de gouvernance sur votre territoire
          </h3>
          <p className="fr-mb-12v">
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

      {/* Show v2 gouvernances if any. It can be only one but it is in the array of gouvernances */}
      {gouvernancesProposees.length > 0 && (
        <>
          <h3 className="fr-mb-2v">
            Proposition{sPluriel(gouvernancesProposees.length)} de gouvernance
            sur votre territoire
          </h3>
          <p className="fr-mb-12v">
            Retrouvez ci-dessous {votreOuVos(gouvernancesProposees.length)}{' '}
            proposition{sPluriel(gouvernancesProposees.length)} de gouvernance
            finale{sPluriel(gouvernancesProposees.length)} sur votre territoire.
            <br />
            {canEdit ? (
              <strong>
                Vous pouvez encore {laOuLes(gouvernancesProposees.length)}{' '}
                compléter et/ou {laOuLes(gouvernancesProposees.length)} modifier
                jusqu’au {dateAsDay(limiteModificationDesGouvernances)}.
              </strong>
            ) : (
              <strong>
                Elles pourront encore être déposées et/ou modifiées jusqu’au{' '}
                {dateAsDay(limiteModificationDesGouvernances)}.
              </strong>
            )}
          </p>
          {gouvernancesProposees.map((gouvernance) => (
            <GouvernanceCard
              key={gouvernance.id}
              gouvernance={gouvernance}
              scope={scope}
              canEdit={canEdit}
              showCtas
            />
          ))}
        </>
      )}

      {/* Separator between 2 lists if v2 and v1 gouvernances are both present */}
      {gouvernancesProposees.length > 0 &&
        gouvernancesPressenties.length > 0 && (
          <hr className="fr-separator-12v" />
        )}

      {/* Show v1 gouvernances if any */}
      {gouvernancesPressenties.length > 0 && (
        <>
          <h3 className="fr-mb-2v">
            Historique de vos gouvernances pressenties
          </h3>
          {canEdit && gouvernancesProposees.length === 0 ? (
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
          ) : (
            <p className="fr-mb-12v">
              Retrouvez ici vos précédentes propositions de gouvernances et
              porteurs pressentis.
            </p>
          )}
          {gouvernancesPressenties.map((gouvernance, index) => (
            <GouvernanceCard
              key={gouvernance.id}
              gouvernance={gouvernance}
              titleIndex={
                gouvernancesPressenties.length > 0
                  ? `${index + 1}`.padStart(2, '0')
                  : undefined
              }
              scope={scope}
              canEdit={canEdit}
              showCtas={showCtasOnPressenties}
            />
          ))}
        </>
      )}
    </>
  )
}

export default GouvernanceList
