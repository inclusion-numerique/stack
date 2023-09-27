import Link from 'next/link'
import React from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

const Header = ({
  user,
  backLink,
}: {
  user?: SessionUser | null
  backLink?: boolean
}) => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              {backLink ? (
                <HeaderBackLink />
              ) : (
                <div className="fr-header__logo">
                  <Link
                    href="/"
                    aria-current="page"
                    target="_self"
                    title={process.env.NEXT_PUBLIC_APP_NAME}
                  >
                    <p className="fr-logo">
                      République
                      <br />
                      Française
                    </p>
                  </Link>
                </div>
              )}
              <div className="fr-header__navbar">
                <button
                  id="header-mobile-menu-button"
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
            <div className="fr-header__service">
              <Link
                href="/"
                aria-current="page"
                target="_self"
                title={`Accueil - ${PublicWebAppConfig.projectTitle}`}
              >
                <p className="fr-header__service-title">
                  {PublicWebAppConfig.projectTitle}
                </p>
              </Link>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-btns-group">
                <li>
                  <Link href="/" className="fr-btn icon-only" title="Aide">
                    <span className="fr-icon-question-line fr-icon--sm" />
                    <span className="fr-hidden-lg fr-ml-1w">Aide</span>
                  </Link>
                </li>
                <li className="fr-hidden fr-unhidden-lg fr-px-1w fr-py-1w">
                  <span
                    style={{
                      height: '100%',
                      borderLeft: '1px solid var(--border-default-grey)',
                    }}
                  />
                </li>
                <li style={{ position: 'relative' }}>
                  {user ? (
                    <HeaderUserMenu user={user} />
                  ) : (
                    <Link
                      href="/connexion"
                      className="fr-btn fr-icon-user-line"
                    >
                      Se connecter
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="modal-menu-mobile"
      className="fr-header__menu fr-modal"
      title="Menu"
      aria-labelledby="header-mobile-menu-button"
    >
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

export default Header
