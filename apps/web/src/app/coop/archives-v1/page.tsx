import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import { notFound } from 'next/navigation'
import { getConseillerNumeriqueCras } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Button from '@codegouvfr/react-dsfr/Button'

const MesActivitesPage = async ({
  searchParams: rawSearchParams = {},
}: {
  searchParams?: ActivitesDataTableSearchParams
}) => {
  const user = await getAuthenticatedMediateur()

  const { conseillerNumerique } = user.mediateur

  if (!conseillerNumerique) {
    notFound()
    return null
  }

  const getCrasResult = await getConseillerNumeriqueCras({
    // conseillerNumeriqueId: conseillerNumerique.id,
    conseillerNumeriqueId: '606f0ce5250d66297efceb6f',
  })

  return (
    <div>
      <h1>Mes archives&nbsp;-&nbsp;Coop V.1</h1>
      <pre>{JSON.stringify(conseillerNumerique, null, 2)}</pre>
      {getCrasResult.empty ? (
        <h3>Pas de cras</h3>
      ) : (
        <>
          <h3>
            Vos compte-rendus d’activités enregistrés avant le{' '}
            {dateAsDay(getCrasResult.lastDate)}
          </h3>
          <p className="fr-text--xs fr-text-mention--grey">
            Retrouvez l’historique de l’ensemble de vos activités enregistrées
            sur la version précédente de l’espace Coop. Vous pouvez l’exporter
            au format tableur Excel (.xls).
          </p>

          <div>
            CRA enregistrés du {dateAsDay(getCrasResult.firstDate)} au{' '}
            {dateAsDay(getCrasResult.lastDate)}&nbsp;·&nbsp;
            {getCrasResult.cras.length} activité
            {sPluriel(getCrasResult.cras.length)}
            <Button
              size="small"
              priority="tertiary no outline"
              linkProps={{
                href: `/coop/archives-v1/exporter/cras/${conseillerNumerique.id}`,
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
                expectedStructures: getCrasResult.expectedStructures,
                firstDate: getCrasResult.firstDate,
                lastDate: getCrasResult.lastDate,
                count: getCrasResult.cras.length,
                structuresCount: getCrasResult.structures.length,
              },
              null,
              2,
            )}
          </pre>
          <h3>CRAS</h3>
          <pre>{JSON.stringify(getCrasResult.cras, null, 2)}</pre>
          <h3>Structures</h3>
          <pre>{JSON.stringify(getCrasResult.structures, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default MesActivitesPage
