import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { getHomepage } from '@app/web/security/getHomepage'
import LogoCoop from '@app/web/components/LogoCoop'
import styles from './Header.module.css'

const Header = ({
  user,
  backLink,
  fullWidth,
}: {
  user?: SessionUser | null
  backLink?: boolean
  fullWidth?: boolean
}) => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className={fullWidth ? styles.bodyContainer : 'fr-container'}>
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              {backLink ? (
                <HeaderBackLink />
              ) : (
                <div className="fr-header__logo">
                  <Link
                    href={getHomepage(user)}
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
                href={getHomepage(user)}
                aria-current="page"
                target="_self"
                title={`Accueil - ${PublicWebAppConfig.projectTitle}`}
              >
                <p
                  className={classNames(
                    'fr-header__service-title fr-flex fr-align-items-center',
                    styles.serviceTitle,
                  )}
                >
                  <LogoCoop className={classNames(styles.logo, 'fr-mr-4v')} />
                  {PublicWebAppConfig.projectTitle}
                </p>
              </Link>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-btns-group">
                <li>
                  <Link
                    href="https://incubateurdesterritoires.notion.site/Centre-d-aide-de-La-Coop-de-la-m-diation-num-rique-e2db421ac63249769c1a9aa155af5f2f"
                    className="fr-btn icon-only fr-btn--no-after"
                    target="_blank"
                    title="Aide"
                  >
                    <span className="fr-icon-question-line fr-icon--sm" />
                    <span className="fr-ml-1w">Aide</span>
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
