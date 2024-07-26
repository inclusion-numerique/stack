import { ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'

export const CompleteFields = ({
  title,
  description,
  id,
  children,
}: {
  title: string
  description: string
  id: string
  children: ReactNode
}) => {
  const [canComplete, setCanComplete] = useState<boolean>(false)

  return (
    <div className="fr-py-4w">
      <div className="fr-flex">
        <div>
          <h3 className="fr-h6 fr-mb-0" id={id}>
            {title}
          </h3>
          <p className="fr-text--sm fr-text-mention--grey fr-mb-0">
            {description}
          </p>
        </div>
        {!canComplete && (
          <div className="fr-ml-auto">
            <Button
              type="button"
              size="small"
              priority="tertiary no outline"
              iconId="fr-icon-edit-line"
              onClick={() => setCanComplete(true)}
            >
              Compléter
            </Button>
          </div>
        )}
      </div>

      {canComplete && <div className="fr-mt-2w">{children}</div>}
    </div>
  )
}
