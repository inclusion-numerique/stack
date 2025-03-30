import Button from '@codegouvfr/react-dsfr/Button'
import type { PropsWithChildren, ReactNode } from 'react'
import styles from '../ChatThread.module.css'

const ToolResultCard = ({
  icon,
  title,
  url,
  children,
}: PropsWithChildren<{
  icon?: ReactNode
  title?: string | null
  url?: string | null
}>) => {
  return (
    <div className={styles.toolResultCard}>
      <div className={styles.toolResultHeader}>
        <div className="fr-flex fr-align-items-center fr-flex-gap-4v">
          {icon}
          {!!title && url ? (
            <a
              href={url}
              target="_blank"
              className="fr-btn--no-after fr-link--no-underline"
            >
              <h3 className={styles.toolResultSourceTitle}>{title}</h3>
            </a>
          ) : (
            <h3 className={styles.toolResultSourceTitle}>{title}</h3>
          )}
        </div>
        {!!url && (
          <Button
            size="small"
            priority="tertiary"
            linkProps={{
              href: url,
              target: '_blank',
            }}
          >
            Voir
          </Button>
        )}
      </div>
      <div className={styles.toolResultContent}>{children}</div>
    </div>
  )
}

export default ToolResultCard
