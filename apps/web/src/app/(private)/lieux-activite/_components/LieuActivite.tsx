import Image from 'next/image'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export const LieuActivite = ({
  id,
  nom,
  adresse,
  complementAdresse,
  codePostal,
  commune,
  typologies = [],
  siret,
  rna,
  visiblePourCartographieNationale = false,
  structureCartographieNationaleId,
  creation,
  modification,
  onDelete,
}: {
  id: string
  nom: string
  adresse: string
  complementAdresse?: string | null
  codePostal: string
  commune: string
  typologies?: string[]
  siret?: string | null
  rna?: string | null
  visiblePourCartographieNationale?: boolean
  structureCartographieNationaleId?: string | null
  creation: Date
  modification: Date
  onDelete: (id: string) => void
}) => (
  <div className="fr-border fr-border-radius--8 fr-p-4w">
    <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
      <span className="fr-text--sm fr-m-0">
        {modification.getTime() === creation.getTime() ? (
          <>Création&nbsp;le&nbsp;{dateAsDay(creation)}</>
        ) : (
          <>Mise&nbsp;à&nbsp;jour&nbsp;le&nbsp;{dateAsDay(modification)}</>
        )}
      </span>
      <span>
        <Button type="button" size="small" priority="tertiary no outline">
          Modifier <span className="ri-edit-line fr-ml-1w" />
        </Button>
        <Button
          type="button"
          size="small"
          priority="tertiary no outline"
          title="Supprimer"
          onClick={() => onDelete(id)}
        >
          <span className="ri-delete-bin-6-line" />
        </Button>
      </span>
    </div>
    <div className="fr-my-2w">
      <h2 className="fr-text--lg fr-mb-0">{nom}</h2>
      <div className="fr-text--sm fr-text-mention--grey fr-flex fr-direction-column fr-flex-gap-1v">
        <div>
          <span className="ri-map-pin-2-line fr-mr-1v" /> {adresse}{' '}
          {complementAdresse}, {codePostal} {commune}
        </div>
        {typologies.length > 0 && (
          <div>
            <span className="ri-government-line fr-mr-1v" />
            {typologies?.join(', ')}
          </div>
        )}
        {siret && <div>SIRET : {siret}</div>}
        {rna && <div>RNA : {rna}</div>}
      </div>
    </div>
    {visiblePourCartographieNationale && structureCartographieNationaleId && (
      <div className="fr-flex fr-align-items-center fr-flex-gap-4v">
        <div className="fr-p-1w fr-background-contrast--info fr-border-radius--8">
          <Image
            className="fr-display-block"
            src="/images/cartographie-nationale/icon.png"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <Link
          className="fr-link"
          target="_blank"
          rel="noreferrer"
          href={`https://cartographie.societenumerique.gouv.fr/cartographie/${structureCartographieNationaleId}/details`}
        >
          Voir sur la cartographie nationale des lieux d’inclusion numérique
        </Link>
      </div>
    )}
    {visiblePourCartographieNationale && !structureCartographieNationaleId && (
      <div className="fr-background-alt--yellow-tournesol fr-py-1w fr-px-2w fr-border-radius--4">
        Lieu en cours d’ajout sur la cartographie nationale des lieux
        d’inclusion numérique
      </div>
    )}
    {!visiblePourCartographieNationale && (
      <div className="fr-background-alt--blue-france fr-py-1w fr-px-2w fr-border-radius--4">
        Lieu non répertorié sur la cartographie nationale des lieux d’inclusion
        numérique
      </div>
    )}
  </div>
)
