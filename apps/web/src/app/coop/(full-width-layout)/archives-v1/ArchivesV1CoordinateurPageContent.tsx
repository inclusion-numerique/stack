import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import classNames from 'classnames'
import ContactSupportLink from '@app/web/components/ContactSupportLink'
import IconInSquare from '@app/web/components/IconInSquare'
import { dateAsMonthFull } from '@app/web/utils/dateAsMonth'
import ArchivesV1Card from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1Card'
import ArchivesV1PageContent from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1PageContent'
import type { ArchivesV1CoordinateurPageData } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1CoordinateurPageData'

const ArchivesV1CoordinateurPageContent = ({
  data: {
    ownData,
    aggregatedData,
    conseillersData,
    communesData,
    coordinateurV1Id,
  },
}: {
  data: ArchivesV1CoordinateurPageData
}) => {
  if (ownData.empty && aggregatedData.empty) {
    return (
      <ArchivesV1Card>
        <h2 className="fr-h6 fr-mb-0">
          Vos archives de compte-rendus d’activités
        </h2>
        <p className="fr-mb-0">
          Aucune archive de compte-rendus d’activités n’a été trouvée.
          <br />
          Si vous pensez que c’est une erreur,{' '}
          <ContactSupportLink>veuillez contacter le support</ContactSupportLink>
          .
        </p>
      </ArchivesV1Card>
    )
  }

  const { firstDate, lastDate } = aggregatedData

  const hasOwnData = !ownData.empty

  return (
    <>
      {ownData ? (
        <ArchivesV1PageContent
          hideEmptyDisclamer
          data={ownData}
          conseillerNumeriqueV1Id={coordinateurV1Id}
        />
      ) : null}
      <div className="fr-border fr-border-radius--8 fr-p-10v fr-mt-6v">
        <IconInSquare iconId="ri-bar-chart-2-line" size="medium" />
        <h2 className="fr-h6 fr-text-title--blue-france fr-mt-6v fr-mb-1v">
          Statistiques mensuelles des conseillers numériques que vous coordonnez
          avant la date du 15.11.2024
        </h2>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-6v">
          Retrouvez l’historique des statistiques mensuelles des conseillers
          numériques que vous coordonnez enregistrées sur la version précédente
          de l’espace Coop. Pour chaque conseiller numérique, retrouvez sur un
          même fichier tableur ses statistiques mensuels. Vous pouvez l’exporter
          au format tableur Excel (.xlsx).
        </p>
        <p className="fr-text--lg fr-text--bold fr-mt-12v fr-mb-4v">
          Statistiques agrégées des {conseillersData.length} conseillers
          numériques que vous coordonnez{' '}
          {hasOwnData && (
            <>
              <br />
              (inclus vos cras personnels)
            </>
          )}
        </p>
        <div className="fr-border--top fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center">
          <div>
            <span className="fr-text--medium">
              {conseillersData.length} conseillers numériques
            </span>
            <span className="fr-text-mention--grey">
              <span className="fr-text-mention--grey">
                &nbsp;&nbsp;·&nbsp; statistiques de {dateAsMonthFull(firstDate)}{' '}
                à {dateAsMonthFull(lastDate)}
              </span>
            </span>
          </div>
          <Button
            size="small"
            priority="tertiary no outline"
            linkProps={{
              href: `/coop/archives-v1/exporter/statistiques?coordinateur=${coordinateurV1Id}`,
              download: true,
            }}
          >
            Exporter
          </Button>
        </div>
        <p className="fr-text--lg fr-text--bold fr-mt-12v fr-mb-4v">
          Statistiques par conseiller numérique
        </p>
        {conseillersData.map((conseillerData, index) => (
          <div
            key={conseillerData.conseiller.id}
            className={classNames(
              index === 0 && 'fr-border--top',
              'fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center',
            )}
          >
            {conseillerData.data.empty ? (
              <div>
                <span className="fr-text--medium">
                  {conseillerData.conseiller.prenom}{' '}
                  {conseillerData.conseiller.nom}
                </span>
                <span className="fr-text-mention--grey">
                  &nbsp;&nbsp;·&nbsp; aucun compte-rendu d’activité
                </span>
              </div>
            ) : (
              <>
                <div>
                  <span className="fr-text--medium">
                    {conseillerData.conseiller.prenom}{' '}
                    {conseillerData.conseiller.nom}
                  </span>
                  <span className="fr-text-mention--grey">
                    &nbsp;&nbsp;·&nbsp; statistiques de{' '}
                    {dateAsMonthFull(conseillerData.data.firstDate)} à{' '}
                    {dateAsMonthFull(conseillerData.data.lastDate)}
                  </span>
                </div>
                <Button
                  size="small"
                  priority="tertiary no outline"
                  linkProps={{
                    href: `/coop/archives-v1/exporter/statistiques?conseiller=${conseillerData.conseiller.id}`,
                    download: true,
                  }}
                >
                  Exporter
                </Button>
              </>
            )}
          </div>
        ))}

        <p className="fr-text--lg fr-text--bold fr-mt-12v fr-mb-4v">
          Statistiques par commune{' '}
          {hasOwnData && (
            <>
              <br />
              (inclus vos cras personnels)
            </>
          )}
        </p>
        {communesData.map((communeData, index) => (
          <div
            key={communeData.commune.codeInsee}
            className={classNames(
              index === 0 && 'fr-border--top',
              'fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center',
            )}
          >
            {communeData.data.empty ? (
              <div data-code={communeData.commune.codeInsee}>
                <span className="fr-text--medium">
                  {communeData.commune.codePostal} {communeData.commune.nom}
                </span>
                <span className="fr-text-mention--grey">
                  &nbsp;&nbsp;·&nbsp; aucun compte-rendu d’activité
                </span>
              </div>
            ) : (
              <>
                <div>
                  <span className="fr-text--medium">
                    {communeData.commune.codePostal} {communeData.commune.nom}
                  </span>
                  <span className="fr-text-mention--grey">
                    &nbsp;&nbsp;·&nbsp; statistiques de{' '}
                    {dateAsMonthFull(communeData.data.firstDate)} à{' '}
                    {dateAsMonthFull(communeData.data.lastDate)}
                  </span>
                </div>
                <Button
                  size="small"
                  priority="tertiary no outline"
                  linkProps={{
                    href: `/coop/archives-v1/exporter/statistiques?coordinateur=${coordinateurV1Id}&commune=${communeData.commune.codeInsee}`,
                    download: true,
                  }}
                >
                  Exporter
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default ArchivesV1CoordinateurPageContent
