import { SessionUser } from '@app/web/auth/sessionUser'
import Link from 'next/link'

export const HeaderUserMenu = ({
  user: { email, name },
}: {
  user: SessionUser
}) => {
  // TODO load bases from database. From prisma or from trpc ?
  const bases = [
    { slug: 'base1', title: 'Base 01' },
    { slug: 'base2', title: 'Base 02' },
  ]

  /**
   * In mobile, the user menu is displayed in the menu modal.
   * In desktop, the user menu is a button + a dropdown.
   */

  return (
    <>
      <button
        className="fr-nav__btn fr-btn "
        type="button"
        aria-expanded="false"
        aria-controls="header-user-menu"
      >
        {name}
      </button>
      <div
        className="fr-collapse fr-menu"
        id="header-user-menu"
        style={{ right: 0, left: 'auto' }}
      >
        <ul className="fr-menu__list">
          <li>
            <span className="fr-nav__link fr-py-4v">
              <p className="fr-text--medium fr-text--sm">{name}</p>
              <p className="fr-text--sm fr-text-default--grey">{email}</p>
            </span>
          </li>
          <li>
            <Link className="fr-nav__link" href="/">
              {/* TODO css module for this file and class for icons */}
              <span
                className="fr-icon-user-setting-line fr-icon--sm fr-mr-1w"
                style={{ color: 'var(--blue-france-sun-113-625)' }}
              />
              Voir mon profil
            </Link>
          </li>
          {bases.length > 0 ? (
            <>
              <li>
                <p className="fr-text--sm fr-nav__link  fr-text-default--grey">
                  Mes bases
                </p>
              </li>
              {bases.map(({ slug, title }, index) => (
                <li key={slug}>
                  <Link
                    className="fr-nav__link"
                    href="/"
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      className="fr-icon-home-4-line fr-icon--sm fr-mr-1w"
                      style={{
                        color: 'var(--blue-france-sun-113-625)',
                      }}
                    />
                    {title}
                  </Link>
                </li>
              ))}
            </>
          ) : null}
          <li>
            <Link className="fr-nav__link" href="/deconnexion">
              <span
                className="fr-icon-logout-box-r-line fr-icon--sm fr-mr-1w"
                style={{ color: 'var(--blue-france-sun-113-625)' }}
              />
              Se déconnecter
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
