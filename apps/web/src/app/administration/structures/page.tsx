import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import AdministrationSearchStructure from '@app/web/app/administration/structures/AdministrationSearchStructure'
import { numberToString } from '@app/web/utils/formatNumber'
import AdministrationCheckSiret from '@app/web/app/administration/structures/AdministrationCheckSiret'
import { getServerUrl } from '@app/web/utils/baseUrl'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'

export const metadata = {
  title: metadataTitle('Structures'),
}

const Page = async () => {
  const structuresMeta = await prismaClient.structure.count()

  return (
    <div className="fr-container">
      <AdministrationBreadcrumbs currentPage="Structures" />
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">
        Structures cartographie nationale
      </h1>

      <p className="fr-text--sm">
        <b>{numberToString(structuresMeta)}</b> structures importées depuis data
        inclusion
        <br />
        Notre API de structures créées ou modifiées à destination de la carto et
        data-inclusion:{' '}
        <Link
          href={getServerUrl('/api/lieux-mediation-numerique')}
          target="_blank"
          className="fr-link fr-link--sm"
        >
          {getServerUrl('/api/lieux-mediation-numerique')}
        </Link>
      </p>

      <div className="fr-border-radius--16 fr-border  fr-py-6v fr-px-12v fr-mb-6v">
        <h2 className="fr-h6">Rechercher une structure cartographie nationale</h2>
        <AdministrationSearchStructure />
      </div>

      <div className="fr-border-radius--16 fr-border  fr-py-6v fr-px-12v fr-mb-6v">
        <h2 className="fr-h6">Vérifier un SIRET</h2>
        <AdministrationCheckSiret />
      </div>
    </div>
  )
}

export default Page
