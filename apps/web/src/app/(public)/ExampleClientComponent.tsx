'use client'

import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { fr } from '@codegouvfr/react-dsfr'

export const ExampleClientComponent = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <>
      <p className={fr.cx('fr-mt-8v')}>Count: {count}</p>
      <Button className={fr.cx('fr-mt-8v')} onClick={increment}>
        Increment
      </Button>
    </>
  )
}
