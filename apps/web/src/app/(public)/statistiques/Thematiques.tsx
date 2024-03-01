'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useState } from 'react'
import Card from '@app/web/components/Card'
import ProgressBar from '@app/web/ui/ProgressBar'

const Thematiques = ({
  thematiques,
}: {
  thematiques: { label: string; value: number; progress: number }[]
}) => {
  const [showAllThematiques, setShowAllThematiques] = useState(false)

  return (
    <Card title="Les 10 thématiques les plus utilisées">
      {thematiques
        .slice(0, showAllThematiques ? -1 : 10)
        .map((thematique, index) => (
          <ProgressBar
            key={thematique.label}
            className="fr-mb-5v"
            title={thematique.label}
            progress={thematique.progress}
            value={thematique.value}
            displayTitle
            colorIndex={index}
          />
        ))}
      <Button
        type="button"
        className="fr-btn--tertiary"
        onClick={() => setShowAllThematiques(!showAllThematiques)}
      >
        Voir {showAllThematiques ? 'moins de' : 'tous les'} thématiques
      </Button>
    </Card>
  )
}

export default Thematiques
