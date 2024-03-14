import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { getDemandesSubventionsForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { canEditGouvernance } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import NoteDeContexteSubventionsForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/NoteDeContexteSubventionsForm'
import RedAsterisk from '@app/web/ui/RedAsterisk'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  const accessCheck = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/gouvernance/${gouvernanceId}/demandes-de-subvention`,
  })
  if (
    !canEditGouvernance(accessCheck.user, {
      departementCode: codeDepartement,
    })
  ) {
    notFound()
  }

  const gouvernance = await getDemandesSubventionsForForm({
    gouvernanceId,
  })

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Demandes de subvention"
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
      <div className="fr-container fr-container--800 fr-pb-10v fr-mb-20v">
        <BackLink
          href={gouvernanceHomePath({ codeDepartement })}
          label={`Retour à la gouvernance · ${scopeTitle}`}
        />

        <h1 className="fr-text-title--blue-france fr-mt-6v fr-mb-2v">
          Mes actions et demandes de subventions
        </h1>
        <p className="fr-text--sm fr-hint-text fr-my-2v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <p className="fr-text--lg fr-text-default--grey fr-mb-12v">
          Cette page vous permet de faire vos demandes de subventions sur la
          base de la dotation à laquelle vous êtes éligibles. Vous êtes invités
          à remplir un formulaire par action que vous souhaitez faire financer.
          Une note précisant le contexte dans lequel ces demandes de subventions
          s’inscrivent vous est demandée. Vous pouvez retrouver à{' '}
          <span className="wip">[endroit]</span> le cahier des charges qui vous
          guidera dans vos demandes de subventions.
        </p>
        <div className="fr-border--slim-grey fr-p-8v fr-pb-10v">
          <NoteDeContexteSubventionsForm
            noteDeContexteSubventions={gouvernance.noteDeContexteSubventions}
            gouvernanceId={gouvernance.id}
          />
        </div>
      </div>
    </>
  )
}

export default Page
