import { dateAsDay } from '@app/web/utils/dateAsDay'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Button from '@codegouvfr/react-dsfr/Button'
import { ArchivesV1PageData } from '@app/web/app/coop/archives-v1/getArchivesV1PageData'
import IconInSquare from '@app/web/components/IconInSquare'
import React from 'react'

const ArchivesV1PageContent = ({
  data: { v1Cras, user },
}: {
  data: ArchivesV1PageData
}) => {
  return (
    <div>
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
        <IconInSquare iconId="fr-icon-archive-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">
          Mes archives&nbsp;-&nbsp;Coop V.1
        </h1>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {v1Cras.empty ? (
        <h3>Pas de cras</h3>
      ) : (
        <>
          <h3>
            Vos compte-rendus d’activités enregistrés avant le{' '}
            {dateAsDay(v1Cras.lastDate)}
          </h3>
          <p className="fr-text--xs fr-text-mention--grey">
            Retrouvez l’historique de l’ensemble de vos activités enregistrées
            sur la version précédente de l’espace Coop. Vous pouvez l’exporter
            au format tableur Excel (.xls).
          </p>

          <div>
            CRA enregistrés du {dateAsDay(v1Cras.firstDate)} au{' '}
            {dateAsDay(v1Cras.lastDate)}&nbsp;·&nbsp;
            {v1Cras.cras.length} activité
            {sPluriel(v1Cras.cras.length)}
            <Button
              size="small"
              priority="tertiary no outline"
              linkProps={{
                href: `/coop/archives-v1/exporter/cras/${user.id}`,
                download: true,
              }}
            >
              Exporter en .xlsx
            </Button>
          </div>

          <h3>Meta</h3>
          <pre>
            {JSON.stringify(
              {
                expectedStructures: v1Cras.expectedStructures,
                firstDate: v1Cras.firstDate,
                lastDate: v1Cras.lastDate,
                count: v1Cras.cras.length,
                structuresCount: v1Cras.structures.length,
              },
              null,
              2,
            )}
          </pre>
          <h3>CRAS</h3>
          <pre>{JSON.stringify(v1Cras.cras, null, 2)}</pre>
          <h3>Structures</h3>
          <pre>{JSON.stringify(v1Cras.structures, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default ArchivesV1PageContent
