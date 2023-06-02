import { ResourceContent } from '@app/web/server/resources/getResource'

const SectionTitleView = ({
  content: { title },
}: {
  content: Pick<ResourceContent, 'title'>
}) =>
  title ? (
    <h2 data-testid="content-section-title" className="fr-mb-0">
      {title}
    </h2>
  ) : null

export default SectionTitleView
