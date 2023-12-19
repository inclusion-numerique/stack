'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import type { ProfileTab } from '@app/web/app/(public)/profils/[slug]/(consultation)/ProfileTab'
import styles from './Menu.module.css'

const getCurrentTabFromPath = (path: string): ProfileTab => {
  const lastSegment = path?.split('/').at(-1) ?? ''

  return lastSegment === 'bases'
    ? 'bases'
    : lastSegment === 'collections'
      ? 'collections'
      : lastSegment === 'suivis'
        ? 'suivis'
        : 'ressources'
}

const Menu = ({
  profile,
  resourcesCount,
  basesCount,
  collectionsCount,
  followsCount,
  isConnectedUser,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  collectionsCount: number
  followsCount: number
  isConnectedUser: boolean
}) => {
  const path = usePathname()
  const currentTab = getCurrentTabFromPath(path ?? '')

  return (
    <div className={styles.menu}>
      <div className="fr-container">
        <nav className="fr-nav">
          <ul className="fr-nav__list">
            <li className="fr-nav__item">
              <Link
                data-testid="ressources-menu-button"
                className="fr-nav__link fr-link--md"
                href={`/profils/${profile.id}`}
                aria-current={currentTab === 'ressources' ? 'page' : undefined}
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
                aria-current={currentTab === 'collections' ? 'page' : undefined}
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
                aria-current={currentTab === 'bases' ? 'page' : undefined}
              >
                {isConnectedUser ? 'Mes bases' : 'Bases'} · <b>{basesCount}</b>
              </Link>
            </li>
            <li className="fr-nav__item">
              <Link
                data-testid="follows-menu-button"
                className="fr-nav__link fr-link--md"
                href={`/profils/${profile.id}/suivis`}
                aria-current={currentTab === 'suivis' ? 'page' : undefined}
              >
                {isConnectedUser ? 'Mes suivis' : 'Suivis'} ·{' '}
                <b>{followsCount}</b>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Menu
