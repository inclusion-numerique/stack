import React from 'react'
import Link from 'next/link'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { CreateCraModalDefinition } from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalDefinition'

export const ActionsRapides = () => (
  <>
    <h2 className="fr-h5 fr-text-mention--grey">
      <span className="ri-apps-line fr-mr-1w" aria-hidden />
      Mes actions rapides
    </h2>
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
        <Button
          type="button"
          {...CreateCraModalDefinition.buttonProps}
          className="fr-quick-action"
        >
          <span
            className="ri-add-line ri-2x fr-mr-3w fr-text--regular"
            aria-hidden
          />
          Enregistrer une activité
        </Button>
      </div>
      <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
        <Link
          className="fr-quick-action"
          href="/coop/mes-beneficiaires/nouveau"
        >
          <span
            className="ri-user-add-line ri-2x fr-mr-3w fr-text--regular"
            aria-hidden
          />
          Créer un·e bénéficiaire
        </Link>
      </div>
    </div>
  </>
)
