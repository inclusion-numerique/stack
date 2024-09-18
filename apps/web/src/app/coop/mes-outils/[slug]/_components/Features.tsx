import Link from 'next/link'
import { OutilPageData } from '../../outilPageData'

export const Features = ({
  features,
}: {
  features: OutilPageData['features']
}) => (
  <>
    <h2 className="fr-text--sm fr-text-mention--grey fr-text--uppercase">
      Les fonctionnalités clés de l’outil
    </h2>
    <ul className="fr-raw-list fr-flex fr-direction-column fr-flex-gap-7v">
      {features?.map((feature) => (
        <li key={feature.title}>
          <div className="fr-flex fr-flex-gap-4v">
            <span>
              <span
                className={`${feature.icon} fr-background-contrast--info fr-text-label--blue-france fr-p-1w fr-border-radius--8 fr-display-inline-block ri-lg fr-line-height-1`}
                aria-hidden
              />
            </span>
            <div>
              <strong>{feature.title}</strong>
              <p className="fr-text-mention--grey fr-text--sm fr-mb-0">
                {feature.description}
                {feature.link && (
                  <>
                    {' '}
                    <Link
                      className="fr-link fr-text--sm"
                      target="_blank"
                      rel="noreferrer"
                      href={feature.link}
                    >
                      En savoir plus
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>
)
