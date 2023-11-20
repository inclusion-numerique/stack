import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { canEditGouvernancePressentie } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import WhiteCard from '@app/web/ui/WhiteCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  const user = await checkUserAccessToGouvernanceScopeOrNavigate({
    codeDepartement,
  })

  if (
    !canEditGouvernancePressentie(user, { departementCode: codeDepartement })
  ) {
    notFound()
  }

  const gouvernance = await getGouvernanceForForm(gouvernanceId)

  console.log('GOUVERNANCE', gouvernance)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  // const defaultValues = getGouvernanceFormDefaultValues(gouvernance)

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Sélection des besoins en ingénierie financière"
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
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <BackLink href={gouvernanceHomePath({ codeDepartement })} />
        <WhiteCard className="fr-mt-12v">TODO</WhiteCard>
      </div>
    </>
  )
}

export default Page
