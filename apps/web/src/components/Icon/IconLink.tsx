import classNames from 'classnames'
import { Route } from 'next'
import Link from 'next/link'
import React from 'react'
import styles from './IconLink.module.css'

const IconLink = ({
  title,
  icon,
  href,
  small,
}: {
  title: string
  icon: string
  href: Route
  small?: boolean
}) => (
  <Link
    title={title}
    className={classNames('fr-link', styles.iconLink)}
    href={href}
  >
    <span className={classNames(icon, { 'fr-icon--sm': small })} />
  </Link>
)

export default IconLink
