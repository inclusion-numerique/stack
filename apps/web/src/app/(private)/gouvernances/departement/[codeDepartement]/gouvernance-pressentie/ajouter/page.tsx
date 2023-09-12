import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { prismaClient } from '@app/web/prismaClient'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import GouvernancePressentieForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/GouvernancePressentieForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata(
  'Gouvernance pressentie',
)

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  // Epcis can be in multiple departements / Regions so they are the base for region / departement scopes.

  const epcis = await prismaClient.epci.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      communes: {
        some: {
          departement: {
            code: codeDepartement,
          },
        },
      },
    },
  })

  // All departements that have a commune in the epcis
  const departements = await prismaClient.departement.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      communes: {
        some: {
          epci: {
            code: {
              in: epcis.map((epci) => epci.code),
            },
          },
        },
      },
    },
  })

  // All regions that have a departement in the epcis
  const regions = await prismaClient.region.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      departements: {
        some: {
          code: {
            in: departements.map((departement) => departement.code),
          },
        },
      },
    },
  })

  const optionsRegions = regions.map(({ code, nom }) => ({
    label: nom,
    value: code,
  }))
  const optionsDepartements = departements.map(({ code, nom }) => ({
    label: `${nom} (${code})`,
    value: code,
  }))
  const optionsEpcis = epcis.map(({ code, nom }) => ({
    label: nom,
    value: code,
  }))

  const optionsCollectivitesPorteur = [
    { label: 'Conseil régional', options: optionsRegions },
    { label: 'Conseil départemental', options: optionsDepartements },
    { label: 'EPCI', options: optionsEpcis },
  ]

  return (
    <>
      <div className="fr-container fr-pb-20v">
        <Breadcrumb
          currentPageLabel="Ajouter une gouvernance pressentie"
          segments={[
            {
              label: "Page d'accueil",
              linkProps: {
                href: '/',
              },
            },
            {
              label: 'Gouvernance',
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <GouvernancePressentieForm
          optionsCollectivitesPorteur={optionsCollectivitesPorteur}
        />
      </div>
    </>
  )
}

export default Page
