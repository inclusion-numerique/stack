import classNames from 'classnames'
import Link from 'next/link'
import { ResourceContent } from '@app/web/server/resources/getResource'
import LinkPreview from './LinkPreview'
import styles from './LinkView.module.css'

const LinkView = ({
  content: { title, caption, showPreview, url, linkTitle, linkDescription },
}: {
  content: Pick<
    ResourceContent,
    | 'title'
    | 'caption'
    | 'showPreview'
    | 'url'
    | 'linkTitle'
    | 'linkDescription'
  >
}) => (
  <div data-testid="content-link">
    <h6 className="fr-mb-2w">{title}</h6>
    {showPreview ? (
      <LinkPreview content={{ linkTitle, linkDescription, url }} />
    ) : (
      url && (
        <div className="fr-mb-2w">
          <span
            className={classNames(
              styles.iconLink,
              'fr-icon-link',
              'fr-icon--sm',
            )}
          />
          <Link target="_blank" href={url} className="fr-link">
            {url}
          </Link>
        </div>
      )
    )}
    <p className="fr-text--sm" data-testid="link-caption">
      {caption}
    </p>
  </div>
)

export default LinkView
