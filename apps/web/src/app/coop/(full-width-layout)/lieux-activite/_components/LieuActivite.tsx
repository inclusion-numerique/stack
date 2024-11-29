import Image from 'next/image'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { Typologies } from '@app/web/components/structure/Typologies'
import DeleteMediateurActivite from './DeleteMediateurActivite'

export const LieuActivite = ({
  mediateurEnActiviteId,
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
  canDelete = true,
}: {
  mediateurEnActiviteId: string
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
  canDelete?: boolean
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
        <Link
          className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
          href={`lieux-activite/${mediateurEnActiviteId}`}
        >
          Modifier <span className="ri-edit-line fr-ml-1w" />
        </Link>
        {canDelete && (
          <DeleteMediateurActivite
            mediateurEnActiviteId={mediateurEnActiviteId}
          />
        )}
      </span>
    </div>
    <div className="fr-my-2w">
      <h2 className="fr-text--lg fr-mb-0">{nom}</h2>
      <div className="fr-text--sm fr-text-mention--grey fr-flex fr-direction-column fr-flex-gap-1v">
        <div>
          <span className="ri-map-pin-2-line fr-mr-1v" /> {adresse}
          {complementAdresse ? ` ${complementAdresse}` : ''}, {codePostal}{' '}
          {commune}
        </div>
        <Typologies
          id={`typologies-lieu-activite-${mediateurEnActiviteId}`}
          typologies={typologies}
        />
        {siret && <div>SIRET : {siret}</div>}
        {rna && <div>RNA : {rna}</div>}
      </div>
    </div>
    {visiblePourCartographieNationale && structureCartographieNationaleId && (
      <div className="fr-flex fr-align-items-center fr-flex-gap-4v">
        <div className="fr-p-1w fr-background-contrast--info fr-border-radius--8">
          <Image
            className="fr-display-block"
            src="/images/services/cartographie-icon.svg"
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
      <div className="fr-background-alt--yellow-tournesol fr-py-1w fr-px-2w fr-border-radius--4 fr-flex fr-justify-content-space-between fr-align-items-center">
        Lieu en cours d’ajout sur la cartographie nationale des lieux
        d’inclusion numérique
        <Button
          type="button"
          className="fr-btn--tooltip"
          priority="tertiary no outline"
          aria-describedby={`tooltip-visible-no-id-${mediateurEnActiviteId}`}
        >
          Plus d’information
        </Button>
        <span
          className="fr-tooltip fr-placement"
          id={`tooltip-visible-no-id-${mediateurEnActiviteId}`}
          role="tooltip"
          aria-hidden="true"
        >
          Votre lieu d’activité sera visible sur la cartographie dans un délai
          de 24h.
        </span>
      </div>
    )}
    {!visiblePourCartographieNationale && (
      <div className="fr-background-alt--blue-france fr-py-1w fr-px-2w fr-border-radius--4 fr-flex fr-justify-content-space-between fr-align-items-center">
        Lieu non répertorié sur la cartographie nationale des lieux d’inclusion
        numérique
        <Button
          className="fr-btn--tooltip"
          priority="tertiary no outline"
          aria-describedby={`tooltip-visible-${mediateurEnActiviteId}`}
        >
          Plus d’information
        </Button>
        <span
          className="fr-tooltip fr-placement"
          id={`tooltip-visible-${mediateurEnActiviteId}`}
          role="tooltip"
          aria-hidden="true"
        >
          Pour que ce lieu soit visible sur la cartographie, renseignez des
          informations sur le lieu et les services d’inclusion numérique qui y
          sont proposés en cliquant sur le bouton{' '}
          <span className="fr-text--bold">‘Modifier’</span>
        </span>
      </div>
    )}
  </div>
)
