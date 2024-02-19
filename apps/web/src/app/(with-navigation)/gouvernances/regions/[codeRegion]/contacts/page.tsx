import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { generateRegionMetadata } from '@app/web/app/(with-navigation)/gouvernances/regions/generateRegionMetadata'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceRegion } from '@app/web/app/(with-navigation)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(with-navigation)/gouvernances/ContactsGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata('Contacts')

const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const contactsGouvernance = await getContactsGouvernanceRegion(codeRegion)
  const scopeTitle = await getGouvernanceScopeTitle({ codeRegion })

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
              label: `Gouvernance - ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({
                  codeRegion,
                }),
              },
            },
          ]}
        />
      </div>
      <ContactsGouvernances
        scopeTitle={scopeTitle}
        codeRegion={codeRegion}
        contactsGouvernance={contactsGouvernance}
      />
    </>
  )
}

export default Page
