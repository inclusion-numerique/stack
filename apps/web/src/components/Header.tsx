import Link from 'next/link'
import React from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

const Header = ({
  user,
  backLink,
  backLinkHref,
  prefet,
}: {
  user?: SessionUser | null
  backLink?: string
  backLinkHref?: string
  prefet?: boolean
}) => {
  const baseLinkProps = prefet
    ? { href: '/prefet', title: "Les données de l'Inclusion Numérique" }
    : {
        href: '/',
        title: PublicWebAppConfig.projectTitle,
      }

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                {backLink ? (
                  <HeaderBackLink backLink={backLink} href={backLinkHref} />
                ) : (
                  !prefet && (
                    <div className="fr-header__logo">
                      <Link
                        aria-current="page"
                        target="_self"
                        {...baseLinkProps}
                      >
                        <p className="fr-logo">
                          République
                          <br />
                          Française
                        </p>
                      </Link>
                    </div>
                  )
                )}
                <div className="fr-header__navbar">
                  <button
                    id="fr-btn-menu-mobile"
                    data-fr-opened="false"
                    aria-controls="modal-menu-mobile"
                    aria-haspopup="menu"
                    title="Menu"
                    type="button"
                    className="fr-btn--menu fr-btn"
                    data-fr-js-modal-button="true"
                  >
                    Menu
                  </button>
                </div>
              </div>
              {!backLink && (
                <div className="fr-header__service">
                  <Link aria-current="page" target="_self" {...baseLinkProps}>
                    <p className="fr-header__service-title">
                      {baseLinkProps.title}
                    </p>
                  </Link>
                </div>
              )}
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-btns-group">
                  <li style={{ position: 'relative' }}>
                    {user ? (
                      <HeaderUserMenu user={user} />
                    ) : (
                      <Link
                        href="/connexion?suivant=/prefet"
                        className="fr-btn fr-icon-user-setting-line"
                      >
                        Espace Préfet
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal-menu-mobile" className="fr-header__menu fr-modal">
        <div className="fr-container">
          <button
            aria-controls="modal-menu-mobile"
            className="fr-btn--close fr-btn"
            type="button"
          >
            Fermer
          </button>
          <div className="fr-header__menu-links">
            <ul className="fr-btns-group">
              {/* {menu.map((item) => ( */}
              {/*  <li key={item.name}> */}
              {/*    <Link */}
              {/*      className="fr-btn" */}
              {/*      href={item.href} */}
              {/*      aria-controls="modal-menu-mobile" */}
              {/*    > */}
              {/*      {item.name} */}
              {/*    </Link> */}
              {/*  </li> */}
              {/* ))} */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
