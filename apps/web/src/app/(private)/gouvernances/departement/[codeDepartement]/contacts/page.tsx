import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceDepartement } from '@app/web/app/(private)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(private)/gouvernances/ContactsGouvernances'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
    },
  })
  if (!departement) {
    notFound()
  }

  return {
    title: `${departement.nom} - Contacts`,
  }
}

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/gouvernances/departement/${codeDepartement}`)
  }

  const departementWithRegion = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
      region: {
        select: {
          code: true,
          nom: true,
          departements: {
            select: {
              code: true,
              nom: true,
            },
          },
        },
      },
    },
  })
  if (!departementWithRegion) {
    notFound()
    return null
  }
  if (
    !hasAccessToDepartementDashboard(user, {
      regionCode: departementWithRegion.region?.code,
      departementCode: departementWithRegion.code,
    })
  ) {
    redirect(`/profil`)
  }

  const contactsGouvernance = await getContactsGouvernanceDepartement(
    codeDepartement,
  )

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Contacts"
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
                href: gouvernanceHomePath({
                  codeDepartement,
                }),
              },
            },
          ]}
        />
      </div>
      <ContactsGouvernances
        codeDepartement={codeDepartement}
        contactsGouvernance={contactsGouvernance}
      />
    </>
  )
}

export default Page
