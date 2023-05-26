import classNames from 'classnames'
import Link from 'next/link'
import { ResourceContent } from '@app/web/server/resources/getResource'
import LinkPreview from './LinkPreview'
import styles from './LinkView.module.css'

const LinkView = ({
  content: {
    title,
    caption,
    showPreview,
    url,
    linkImageUrl,
    linkTitle,
    linkDescription,
  },
}: {
  content: Pick<
    ResourceContent,
    | 'title'
    | 'caption'
    | 'showPreview'
    | 'url'
    | 'linkTitle'
    | 'linkDescription'
    | 'linkImageUrl'
  >
}) => {
  const shouldShowPreview =
    showPreview && !!url && (!!linkImageUrl || !!linkTitle || !!linkDescription)
  return (
    <div data-testid="content-link">
      <h6 className="fr-mb-2w">{title}</h6>
      {shouldShowPreview ? (
        <LinkPreview
          url={url}
          imageUrl={linkImageUrl}
          title={linkTitle}
          description={linkDescription}
        />
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
      <p className="fr-text--sm fr-mb-0" data-testid="link-caption">
        {caption}
      </p>
    </div>
  )
}

export default LinkView
