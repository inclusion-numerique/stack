import Link from 'next/link'

export type BreadCrumbParent = { title: string; path: string }
export type BreadCrumbParents = BreadCrumbParent[]

export const Breadcrumbs = ({
  currentPage,
  parents = [],
  hideRoot,
  className,
}: {
  currentPage: string
  parents?: BreadCrumbParents
  hideRoot?: boolean
  className?: string
}) => (
    <nav
      role="navigation"
      className={`fr-breadcrumb ${className}`}
      aria-label="vous êtes ici :"
    >
      <button
        className="fr-breadcrumb__button"
        aria-expanded="false"
        aria-controls="breadcrumbs"
      >
        Voir le fil d&apos;Ariane
      </button>
      <div className="fr-collapse" id="breadcrumbs">
        <ol className="fr-breadcrumb__list">
          {hideRoot ? null : (
            <li>
              <Link className="fr-breadcrumb__link" href="/">
                Accueil
              </Link>
            </li>
          )}
          {parents.map(({ title, path }) => (
            <li key={path}>
              <Link className="fr-breadcrumb__link" href={path}>
                {title}
              </Link>
            </li>
          ))}
          <li>
            <a className="fr-breadcrumb__link" aria-current="page">
              {currentPage}
            </a>
          </li>
        </ol>
      </div>
    </nav>
  )
