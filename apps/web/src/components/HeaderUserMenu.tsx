'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { KeyboardEvent, MouseEvent as ReactMouseEvent, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getUserDisplayName } from '@app/web/utils/user'
import TerminerUsurpationHeaderUserMenuItem from '@app/web/components/TerminerUsurpationHeaderUserMenuItem'
import { isAuthenticatedConseillerNumerique } from '@app/web/auth/getAuthenticatedConseillerNumerique'
import styles from './HeaderUserMenu.module.css'

export const HeaderUserMenu = ({ user }: { user: SessionUser }) => {
  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)
  const displayName = getUserDisplayName(user)
  const onClickOrEnterInsideDropdown = (
    event: KeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    // Close the dropdown if a link has been clicked
    if (event.target instanceof HTMLAnchorElement) {
      buttonRef.current?.click()
    }
  }
  useOnClickOutside(collapseRef, (event) => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    // Close the dropdown if open on outside click
    if (buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
      return
    }

    buttonRef.current.click()
  })
  const structureEmployeuse = user.emplois.at(0)

  const menuContent = (
    <ul className="fr-menu__list">
      <li>
        <span className="fr-nav__link fr-pt-4v fr-pb-2v">
          {!!user.name && (
            <span className="fr-text--medium fr-text--sm fr-display-block">
              {user.name}
            </span>
          )}
          <span className="fr-text--sm fr-text-default--grey">
            {user.email}
          </span>
        </span>
      </li>
      <li>
        <Link
          className="fr-nav__link"
          href="/mon-profil"
          style={{ boxShadow: 'none' }}
        >
          <span
            className="ri-account-circle-line fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
            aria-hidden
          />
          Voir mon profil
        </Link>
      </li>
      {isAuthenticatedConseillerNumerique(user) && (
        <li>
          <Link
            className="fr-nav__link"
            href="/coop/archives-v1"
            style={{ boxShadow: 'none' }}
          >
            <span
              className="fr-icon--sm fr-icon-archive-line fr-mr-1-5v"
              style={{ color: 'var(--blue-france-sun-113-625)' }}
              aria-hidden
            />
            Mes archives&nbsp;-&nbsp;Coop V.1
          </Link>
        </li>
      )}
      {user.mediateur && user.mediateur._count.enActivite > 0 && (
        <li>
          <Link
            className="fr-nav__link fr-border--bottom"
            href="/lieux-activite"
            style={{ boxShadow: 'none' }}
          >
            <span
              className="ri-home-office-line fr-mr-1w"
              style={{ color: 'var(--blue-france-sun-113-625)' }}
              aria-hidden
            />
            Voir mes lieux d’activités ·{' '}
            <span className="fr-text--bold">
              {user.mediateur?._count.enActivite}
            </span>
          </Link>
        </li>
      )}
      {structureEmployeuse && (
        <li>
          <span className="fr-nav__link fr-pb-0 fr-text-mention--grey fr-text--medium fr-text--sm">
            Ma structure employeuse
          </span>
          <Link
            className="fr-nav__link fr-border--bottom"
            href="/ma-structure-employeuse"
            style={{ boxShadow: 'none' }}
          >
            <span
              className="ri-home-smile-2-line fr-mr-1w"
              style={{ color: 'var(--blue-france-sun-113-625)' }}
              aria-hidden
            />
            {structureEmployeuse.structure.nom}
          </Link>
        </li>
      )}
      {user.usurper && <TerminerUsurpationHeaderUserMenuItem />}
      <li>
        <Link className="fr-nav__link" href="/deconnexion">
          <span
            className="fr-icon-logout-box-r-line fr-icon--sm fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
            aria-hidden
          />
          Se déconnecter
        </Link>
      </li>
    </ul>
  )

  /**
   * In mobile, the user menu is displayed in the menu modal.
   * In desktop, the user menu is a button + a dropdown.
   */
  return (
    <>
      <button
        className="fr-nav__btn fr-btn fr-hidden fr-unhidden-lg"
        type="button"
        aria-expanded="false"
        aria-controls="header-user-menu"
        ref={buttonRef}
      >
        {displayName}
      </button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="navigation"
        className={classNames('fr-collapse', 'fr-menu', styles.collapse)}
        id="header-user-menu"
        ref={collapseRef}
        onClick={onClickOrEnterInsideDropdown}
        onKeyDown={onClickOrEnterInsideDropdown}
      >
        {menuContent}
      </div>
      <div
        role="navigation"
        className={classNames('fr-hidden-lg', 'fr-px-1w', styles.mobile)}
      >
        {menuContent}
      </div>
    </>
  )
}
