import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { typologieStructureLabels } from '@app/web/app/structure/typologieStructure'

export const Typologies = ({
  id,
  typologies,
}: {
  id: string
  typologies: string[]
}) =>
  typologies.length > 0 && (
    <div className="fr-flex fr-align-items-center">
      <span className="ri-government-line fr-mr-1v" />
      {typologies?.join(', ')}
      <Button
        className="fr-btn--tooltip"
        priority="tertiary no outline"
        aria-describedby={`tooltip-typologie-${id}`}
      >
        Détail des acronymes
      </Button>
      <span
        className="fr-tooltip fr-placement"
        id={`tooltip-typologie-${id}`}
        role="tooltip"
        aria-hidden="true"
      >
        {typologies
          .map((typologie) => typologieStructureLabels[typologie])
          ?.join(', ')}
      </span>
    </div>
  )
