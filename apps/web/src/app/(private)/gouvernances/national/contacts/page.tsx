import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceNational } from '@app/web/app/(private)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(private)/gouvernances/ContactsGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Contacts - National`,
})

const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const contactsGouvernance = await getContactsGouvernanceNational()

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
                href: gouvernanceHomePath({ national: true }),
              },
            },
          ]}
        />
      </div>
      <ContactsGouvernances
        national
        contactsGouvernance={contactsGouvernance}
      />
    </>
  )
}

export default Page
