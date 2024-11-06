import Link from 'next/link'
import Image from 'next/image'
import type { OutilPageData } from '../../outilPageData'

export const AccessInfoLink = ({
  illustration,
  icon,
  how,
  info,
}: Pick<
  NonNullable<OutilPageData['access']>,
  'illustration' | 'icon' | 'info' | 'how'
>) => (
  <div className="fr-text--center fr-background-alt--blue-france fr-border-radius--8 fr-p-3w fr-mb-3w">
    {illustration && (
      <Image width={114} height={48} src={illustration} alt="" />
    )}
    {icon && (
      <div
        className={`${icon} fr-text-label--blue-france ri-2x fr-mt-1w fr-mb-3w`}
        aria-hidden
      />
    )}
    <p className="fr-text--medium fr-my-2w">{how}</p>

    {info?.link.startsWith('http') ? (
      <Link
        className="fr-link"
        target="_blank"
        rel="noreferrer"
        title={`${info.label} - nouvel onglet`}
        href={info.link}
      >
        {info.label}
      </Link>
    ) : info ? (
      <Link className="fr-link" href={info.link}>
        {info.label} <span className="ri-arrow-right-line" aria-hidden />
      </Link>
    ) : null}
  </div>
)
