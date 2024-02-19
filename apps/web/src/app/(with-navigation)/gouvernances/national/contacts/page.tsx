import React from 'react'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getContactsGouvernanceNational } from '@app/web/app/(with-navigation)/gouvernances/getContactsGouvernances'
import ContactsGouvernances from '@app/web/app/(with-navigation)/gouvernances/ContactsGouvernances'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Contacts · National`,
})

const Page = async () => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { national: true }, user }),
    signinNextPath: `/gouvernances/national/candidats-a-la-gouvernance`,
  })
  const contactsGouvernance = await getContactsGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })

  return (
    <>
      <div className="fr-container fr-pt-15v">
        <BackLink
          href={gouvernanceHomePath({ national: true })}
          label="Retour à Gouvernance · National"
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
