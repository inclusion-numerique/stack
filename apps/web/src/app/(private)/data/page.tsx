import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDataAnalysis } from '@app/web/security/securityRules'
import {
  debugAidantsConnectStructures,
  debugCnfsStructures,
  debugDataInclusion,
  valueToPercentage,
} from '@app/web/data/dataAnalysis'
import { CartoInclusionLieuxMediation } from '@app/web/data/dataInclusion'
import { CnfsStructures } from '@app/web/data/cnfsStructures'
import { AidantsConnectStructures } from '@app/web/data/aidantsConnectStructures'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

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
  const aidantsConnectStructures = await debugAidantsConnectStructures(
    dataInclusionAnalysis,
  )

  return (
    <>
      <Breadcrumbs currentPage="Analyses des données" />

      <h1>Analyses des données</h1>

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
                    ? valueToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Points d&apos;attention Data Inclusion</h3>

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
                    ? valueToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Structures Aidants Connect</h2>
      <p className="fr-hint-text">
        Source :{' '}
        <Link href={AidantsConnectStructures.url} target="_blank">
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
                    ? valueToPercentage((100 * row.value) / row.percentage)
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Page
