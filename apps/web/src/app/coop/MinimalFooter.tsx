import React from 'react'
import { FooterBottomItem } from '@codegouvfr/react-dsfr/Footer'
import classNames from 'classnames'
import { publicFooterProps } from '@app/web/app/(public)/PublicFooter'
import styles from './MinimalFooter.module.css'

const MinimalFooter = () => (
  <footer
    role="contentinfo"
    id="fr-footer"
    className={classNames('fr-footer__bottom fr-px-8v', styles.footer)}
  >
    <ul className="fr-footer__bottom-list">
      {...publicFooterProps.bottomItems.map((bottomItem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li className="fr-footer__bottom-item" key={index}>
          {'text' in bottomItem ? (
            <FooterBottomItem bottomItem={bottomItem} />
          ) : (
            bottomItem
          )}
        </li>
      ))}
    </ul>
  </footer>
)

export default MinimalFooter
