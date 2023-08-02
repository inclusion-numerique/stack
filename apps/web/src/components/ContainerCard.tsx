import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from './ContainerCard.module.css'

const ContainerCardIllustration = ({
  src,
  alt,
}: {
  src: string
  alt?: string
}) => (
  <div className={classNames(styles.pictureContainer)}>
    <picture>
      <img
        src={src}
        alt={alt ?? ''}
        style={{ textAlign: 'center', width: 120 }}
      />
    </picture>
  </div>
)

export const ContainerCard = ({
  children,
  illustrationSrc,
  className,
}: PropsWithChildren<{ className?: string; illustrationSrc?: string }>) => (
  <div className="fr-container">
    <main
      role="main"
      id="content"
      className={classNames(styles.card, className)}
    >
      {illustrationSrc ? (
        <ContainerCardIllustration src={illustrationSrc} />
      ) : null}
      {children}
    </main>
  </div>
)

export default ContainerCard
