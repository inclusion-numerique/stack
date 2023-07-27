import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { ProjectStack } from '@app/cdk/ProjectStack'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDataAnalysis } from '@app/web/security/securityRules'
import {
  debugAidantsConnectStructures,
  debugCnfsPermanences,
  debugCnfsStructures,
  debugDataInclusion,
} from '@app/web/data/dataAnalysis'
import { CartoInclusionLieuxMediation } from '@app/web/data/dataInclusion'
import { CnfsStructures } from '@app/web/data/cnfsStructures'
import { AidantsConnectStructures } from '@app/web/data/aidantsConnectStructures'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { CnfsPermanences } from '@app/web/data/cnfsPermanences'
import {
  getDepartementDataQuery,
  queryDonneesEtTerritoires,
} from '@app/web/data/donneesEtTerritoires'
import { numberToPercentage } from '@app/web/utils/formatNumber'

export const generateMetadata = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/data`)
    return
  }

  if (!hasAccessToDataAnalysis(user)) {
    notFound()
  }

  return {
    title: 'Analyses des données',
  }
}

const Page = async () => {
  const dataInclusionAnalysis = await debugDataInclusion()
  const cnfsStructures = await debugCnfsStructures(dataInclusionAnalysis)
  const cnfsPermanences = await debugCnfsPermanences(dataInclusionAnalysis)
  const aidantsConnectStructures = await debugAidantsConnectStructures(
    dataInclusionAnalysis,
  )

  const dataFromGraphql = await queryDonneesEtTerritoires(
    getDepartementDataQuery,
    {
      code: '08',
    },
  )

  return (
    <div className="fr-container">
      <Breadcrumbs currentPage="Analyses des données" />

      <h1>Analyses des données</h1>

      <h2>Données et territoires</h2>
      <p>
        Données et territoire centralise nos données et les exposent via une API
        pour consultation sur {ProjectStack.name}.
      </p>
      <pre className="fr-background-alt--grey fr-p-4v fr-text--sm">
        <code>
          ✅ Connexion aux indicateurs Données et Territoires OK&nbsp;:
          <br />
          {JSON.stringify(dataFromGraphql, null, 2)}
        </code>
      </pre>

      <h2>Structures Data Inclusion</h2>
      <p className="fr-hint-text">
        Source :{' '}
        <Link href={CartoInclusionLieuxMediation.url} target="_blank">
          {CartoInclusionLieuxMediation.url}
        </Link>
      </p>
      <div className="fr-table">
        <table>
          <tbody>
            {dataInclusionAnalysis.analysis.map((row) => (
              <tr key={row.title}>
                <td>{row.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {row.stringify(row.value)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {row.percentage
                    ? numberToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Structures CNFS</h2>
      <p className="fr-hint-text">
        Source :{' '}
        <Link href={CnfsStructures.url} target="_blank">
          {CnfsStructures.url}
        </Link>
      </p>
      <div className="fr-table">
        <table>
          <tbody>
            {cnfsStructures.analysis.map((row) => (
              <tr key={row.title}>
                <td>{row.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {row.stringify(row.value)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {row.percentage
                    ? numberToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Permanences CNFS</h2>
      <p className="fr-hint-text">
        Source :{' '}
        <Link href={CnfsPermanences.url} target="_blank">
          {CnfsPermanences.url}
        </Link>
      </p>
      <div className="fr-table">
        <table>
          <tbody>
            {cnfsPermanences.analysis.map((row) => (
              <tr key={row.title}>
                <td>{row.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {row.stringify(row.value)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {row.percentage
                    ? numberToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Accordion
        label={`Détail des ${cnfsPermanences.withoutInclusionPermanenceId.length} permanences non ratachées par Id composite`}
        className="fr-mb-8v"
      >
        <div className="fr-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Siret</th>
                <th>Nb. Aidants</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Code postal</th>
                <th>Commune</th>
                <th>Id Structure</th>
              </tr>
            </thead>
            <tbody>
              {cnfsPermanences.withoutInclusionPermanenceId.map(
                ({
                  permanence: {
                    id,
                    pivot,
                    aidants,
                    nom,
                    adresse,
                    code_postal,
                    commune,
                    structureId,
                  },
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{pivot}</td>
                    <td style={{ textAlign: 'right' }}>
                      {aidants?.length ?? 0}
                    </td>
                    <td>{nom}</td>
                    <td>{adresse}</td>
                    <td>{code_postal}</td>
                    <td>{commune}</td>
                    <td>{structureId}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Accordion>

      <h2>Structures Aidants Connect</h2>
      <p
        className="fr-hint-text"
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        Source :
        <Link
          href={AidantsConnectStructures.url}
          target="_blank"
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {AidantsConnectStructures.url}
        </Link>
      </p>
      <div className="fr-table">
        <table>
          <tbody>
            {aidantsConnectStructures.analysis.map((row) => (
              <tr key={row.title}>
                <td>{row.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {row.stringify(row.value)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {row.percentage
                    ? numberToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Accordion
        label={`Détail des ${aidantsConnectStructures.withoutInclusionStructureId.length} structures non ratachées par Id composite`}
        className="fr-mb-8v"
      >
        <div className="fr-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Siret</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Code postal</th>
                <th>Code Commune INSEE</th>
              </tr>
            </thead>
            <tbody>
              {aidantsConnectStructures.withoutInclusionStructureId.map(
                ({ structure }) => (
                  <tr key={structure.id}>
                    <td>{structure.id}</td>
                    <td>{structure.siret}</td>
                    <td>{structure.name}</td>
                    <td>{structure.address}</td>
                    <td>{structure.zipCode}</td>
                    <td>{structure.cityCode}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Accordion>
    </div>
  )
}

export default Page
