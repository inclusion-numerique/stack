import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { notFound } from 'next/navigation'
import { MergeWithUser } from '../MergeWithUser'
import { MergePreview } from './_components/MergePreview'
import ValiderFusion from './_components/ValiderFusion'
import { getMergeData } from './getMergeData'

export const metadata = {
  title: metadataTitle('Utilisateurs - Fusion'),
}

const Page = async ({
  params: { id, mergeId },
}: {
  params: { id: string; mergeId: string }
}) => {
  const mergeData = await getMergeData(mergeId, id)

  if (!mergeData) notFound()

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage="Fusionner"
        parents={[
          {
            label: 'Utilisateurs',
            linkProps: { href: '/administration/utilisateurs' },
          },
          {
            label: mergeData.mergeTarget.name,
            linkProps: { href: `/administration/utilisateurs/${id}` },
          },
        ]}
      />
      <AdministrationTitle icon="fr-icon-git-merge-line">
        Fusionner {mergeData.mergeTarget.name} avec un autre utilisateur
      </AdministrationTitle>
      <MergeWithUser userId={id} defaultMergeUser={mergeData.mergeSource} />
      <div className="fr-flex fr-flex-gap-6v fr-mb-6v fr-direction-lg-row fr-direction-column">
        <div className="fr-border-radius--8 fr-border fr-p-8v fr-width-full">
          <MergePreview
            common={mergeData.mergeCommon}
            merge={mergeData.mergeSource}
          />
        </div>
        <span
          className="ri-arrow-right-line ri-2x fr-my-auto fr-hidden fr-unhidden-lg"
          aria-hidden={true}
        />
        <span
          className="ri-arrow-down-line ri-2x fr-mx-auto fr-hidden-lg"
          aria-hidden={true}
        />
        <div className="fr-border-radius--8 fr-border fr-p-8v fr-width-full">
          <MergePreview
            common={mergeData.mergeCommon}
            merge={mergeData.mergeTarget}
            source={mergeData.mergeSource}
          />
        </div>
      </div>
      <ValiderFusion
        sourceUser={mergeData.mergeSource}
        targetUser={mergeData.mergeTarget}
      />
    </CoopPageContainer>
  )
}

export default Page
