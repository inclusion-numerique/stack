import React from 'react'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceDepartement } from '@app/web/app/(with-navigation)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(with-navigation)/gouvernances/ContactsGouvernances'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Contacts')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/contacts`,
  })
  const contactsGouvernance =
    await getContactsGouvernanceDepartement(codeDepartement)
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <>
      <div className="fr-container fr-pt-15v">
        <BackLink
          href={gouvernanceHomePath({ codeDepartement })}
          label={`Retour à Gouvernance · ${scopeTitle}`}
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
