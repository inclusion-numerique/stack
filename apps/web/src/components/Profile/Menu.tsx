import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import styles from './Menu.module.css'

const Menu = ({
  profile,
  resourcesCount,
  basesCount,
  collectionsCount,
  followsCount,
  currentPage,
  isConnectedUser,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  collectionsCount: number
  // Null if non accessible / hidden
  followsCount: number | null
  currentPage: string
  isConnectedUser: boolean
}) => (
  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              data-testid="ressources-menu-button"
              className="fr-nav__link fr-link--md"
              href={`/profils/${profile.id}`}
              aria-current={currentPage === '/' ? 'page' : undefined}
            >
              {isConnectedUser ? 'Mes ressources' : 'Ressources'} ·{' '}
              <b>{resourcesCount}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              data-testid="collections-menu-button"
              className="fr-nav__link fr-link--md"
              href={`/profils/${profile.id}/collections`}
              aria-current={currentPage === '/collections' ? 'page' : undefined}
            >
              {isConnectedUser ? 'Mes collections' : 'Collections'} ·{' '}
              <b>{collectionsCount}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              data-testid="bases-menu-button"
              className="fr-nav__link fr-link--md"
              href={`/profils/${profile.id}/bases`}
              aria-current={currentPage === '/bases' ? 'page' : undefined}
            >
              {isConnectedUser ? 'Mes bases' : 'Bases'} · <b>{basesCount}</b>
            </Link>
          </li>
          {followsCount !== null && (
            <li className="fr-nav__item">
              <Link
                data-testid="follows-menu-button"
                className="fr-nav__link fr-link--md"
                href={`/profils/${profile.id}/suivis`}
                aria-current={currentPage === '/suivis' ? 'page' : undefined}
              >
                {isConnectedUser ? 'Mes suivis' : 'Suivis'} ·{' '}
                <b>{followsCount}</b>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
