'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import React, { useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import classNames from 'classnames'
import CreerStructureForm from '@app/web/app/inscription/creer-un-lieu-d-activite/CreerStructureForm'
import IconInSquare from '@app/web/components/IconInSquare'
import { CreerStructureData } from '@app/web/app/structure/CreerStructureValidation'
import CreerStructureSideMenu from '@app/web/app/inscription/creer-un-lieu-d-activite/CreerStructureSideMenu'
import styles from './CreerStructurePageContent.module.css'

const CreerStructurePageContent = ({
  backLinkHref,
  nextHref,
  backLinkTitle,
  lieuActiviteMediateurId,
  title,
  defaultValues,
}: {
  backLinkHref: string
  nextHref: string
  backLinkTitle?: string
  lieuActiviteMediateurId?: string
  title: string
  defaultValues?: DefaultValues<CreerStructureData>
}) => {
  const [showSideMenu, setShowSideMenu] = useState(false)

  return (
    <div
      className={classNames('fr-container', styles.container)}
      style={{ flex: 1 }}
    >
      <div
        className={classNames(
          'fr-hidden fr-unhidden-lg fr-mt-30v fr-pt-23v',
          styles.sideNavContainer,
        )}
      >
        {showSideMenu ? <CreerStructureSideMenu /> : null}
      </div>
      <div
        className={classNames(
          'fr-container fr-container--narrow fr-ml-0 fr-mb-30v',
          styles.pageContainer,
        )}
      >
        <Button
          priority="tertiary no outline"
          size="small"
          linkProps={{
            href: backLinkHref,
          }}
          className="fr-mt-12v fr-mb-10v"
          iconId="fr-icon-arrow-left-line"
        >
          {backLinkTitle ?? 'Retour'}
        </Button>
        <h1 className="fr-page-title fr-flex fr-align-items-center fr-flex-gap-6v">
          <IconInSquare iconId="ri-home-office-line" />
          {title}
        </h1>

        <CreerStructureForm
          lieuActiviteMediateurId={lieuActiviteMediateurId}
          backLinkHref={backLinkHref}
          nextHref={nextHref}
          onVisiblePourCartographieNationaleChange={setShowSideMenu}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  )
}

export default CreerStructurePageContent
