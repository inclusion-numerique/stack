import { ResourceContent } from '@app/web/server/resources/getResource'

const SectionTitleContentView = ({
  content: { title },
}: {
  content: Pick<ResourceContent, 'title'>
}) =>
  title ? (
    <h2 data-testid="content-section-title" className="fr-mb-0 fr-mt-4v">
      {title}
    </h2>
  ) : null

export default SectionTitleContentView
