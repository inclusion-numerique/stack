import React from 'react'
import Link from 'next/link'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { CreateCraModalDefinition } from '@app/web/app/coop/mes-activites/CreateCraModalDefinition'

export const DernieresActivites = () => (
  <>
    <div className="fr-flex fr-flex-wrap fr-flex-gap-4v fr-align-items-center fr-justify-content-space-between fr-mb-3w">
      <h2 className="fr-h5 fr-text-mention--grey fr-mb-0">
        <span className="ri-service-line fr-mr-1w" aria-hidden />
        Mes 3 dernières activités enregistrés
      </h2>
      <Link
        className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
        href="/coop/mes-activites"
      >
        Voir toutes mes activités
      </Link>
    </div>
    <div className="fr-text--center fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
      <p className="fr-text--bold fr-text--lg fr-mb-1w">
        Vous n’avez pas encore enregistré d’activité
      </p>
      <p className="fr-mb-4w">
        Vous pouvez enregistrer votre première activité en cliquant sur
        ‘Enregistrer une activité’.
      </p>
      <Button
        type="button"
        {...CreateCraModalDefinition.buttonProps}
        iconId="fr-icon-add-line"
      >
        Enregistrer une activité
      </Button>
    </div>
  </>
)
