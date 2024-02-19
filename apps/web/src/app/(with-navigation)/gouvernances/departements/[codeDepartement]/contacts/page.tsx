import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceDepartement } from '@app/web/app/(with-navigation)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(with-navigation)/gouvernances/ContactsGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Contacts')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const contactsGouvernance =
    await getContactsGouvernanceDepartement(codeDepartement)
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

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
        scopeTitle={scopeTitle}
      />
    </>
  )
}

export default Page
