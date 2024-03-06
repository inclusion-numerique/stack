'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useState } from 'react'
import Card from '@app/web/components/Card'
import ProgressBar from '@app/web/ui/ProgressBar'

const Publics = ({
  publics,
}: {
  publics: { label: string; value: number; progress: number }[]
}) => {
  const [showAllPublics, setShowAllPublics] = useState(false)

  return (
    <Card title="Les 10 publics cibles les plus utilisés">
      {publics.slice(0, showAllPublics ? -1 : 10).map((targetPublic, index) => (
        <ProgressBar
          key={targetPublic.label}
          className="fr-mb-5v"
          title={targetPublic.label}
          progress={targetPublic.progress}
          value={targetPublic.value}
          displayTitle
          colorIndex={index}
        />
      ))}
      <Button
        type="button"
        className="fr-btn--tertiary"
        onClick={() => setShowAllPublics(!showAllPublics)}
      >
        Voir {showAllPublics ? 'moins de' : 'tous les'} publics cibles
      </Button>
    </Card>
  )
}

export default Publics
