import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { gouvernanceHomePath } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceNational } from '@app/web/app/(private-with-navigation)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(private-with-navigation)/gouvernances/ContactsGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private-with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Contacts - National`,
})

const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const contactsGouvernance = await getContactsGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })

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
                href: gouvernanceHomePath({ national: true }),
              },
            },
          ]}
        />
      </div>
      <ContactsGouvernances
        national
        contactsGouvernance={contactsGouvernance}
        scopeTitle={scopeTitle}
      />
    </>
  )
}

export default Page
