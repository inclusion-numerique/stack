import Badge from '@codegouvfr/react-dsfr/Badge'

export const StructureEmployeuse = ({
  nom,
  adresse,
  complementAdresse,
  commune,
  codePostal,
  typologies = [],
  siret,
  rna,
  isLieuActivite,
}: {
  nom: string
  adresse: string
  complementAdresse?: string | null
  commune: string
  codePostal: string
  typologies?: string[]
  siret?: string | null
  rna?: string | null
  isLieuActivite: boolean
}) => (
  <div className="fr-border fr-border-radius--8 fr-p-4w">
    <h2 className="fr-text--lg fr-mb-0">{nom}</h2>
    <div className="fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-direction-column fr-flex-gap-1v">
      <div>
        <span className="ri-map-pin-2-line fr-mr-1v" />{' '}
        {[
          adresse,
          ...(complementAdresse ? [`(${complementAdresse})`] : []),
        ].join(' ')}
        , {codePostal} {commune}
      </div>
      <div className="fr-flex fr-flex-gap-2v">
        {typologies.length > 0 && (
          <span className="fr-flex fr-align-items-center">
            <span className="ri-government-line fr-mr-1w" />
            {typologies?.join(', ')}
          </span>
        )}
        {typologies.length > 0 && (siret || rna) && <span>·</span>}
        {siret && (
          <span>
            <span className="fr-text--medium">SIRET</span> : {siret}
          </span>
        )}
        {rna && (
          <span>
            <span className="fr-text--medium">RNA</span> : {rna}
          </span>
        )}
      </div>
    </div>
    {isLieuActivite && (
      <Badge className="fr-mt-3w fr-text--uppercase" noIcon severity="info">
        <span className="ri-home-office-line fr-mr-1v" aria-hidden />
        Référencé dans vos Lieux d’activité
      </Badge>
    )}
  </div>
)
