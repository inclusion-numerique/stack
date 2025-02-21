import type { StructureData } from '@app/web/app/structure/StructureValidation'
import { typologieStructureLabels } from '@app/web/app/structure/typologieStructure'
import { addresseFromParts } from '@app/web/utils/addresseFromParts'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'

const StructureCard = ({
  structure: { nom, adresse, rna, siret, codePostal, commune, typologies },
  topRight,
  infoLinkHref,
  className,
}: {
  className?: string
  structure: Pick<
    StructureData,
    | 'nom'
    | 'typologies'
    | 'adresse'
    | 'commune'
    | 'codePostal'
    | 'siret'
    | 'rna'
  >
  topRight?: React.ReactNode
  infoLinkHref?: string
}) => {
  const tooltipId = `tooltip-${nom.replaceAll('"', '')}-${typologies?.join(',')}-${siret}-${rna}-${codePostal}-${commune}-${adresse}`

  return (
    <div
      className={classNames(
        'fr-width-full fr-border-radius--8 fr-border fr-p-6v fr-p-md-8v fr-mt-12v',
        className,
      )}
    >
      <div className="fr-width-full fr-flex fr-justify-content-space-between fr-align-items-start">
        <p className="fr-h6 fr-mb-0">{nom}</p>
        {!!topRight && <div>{topRight}</div>}
      </div>
      <p className="fr-text--sm fr-mt-1v fr-text-mention--grey fr-mb-0">
        <span className="fr-icon-map-pin-2-line fr-icon--sm fr-mr-1w" />
        {addresseFromParts({ adresse, codePostal, commune })}
      </p>

      {!!typologies && typologies?.length > 0 && (
        <p className="fr-mt-1v fr-text--sm fr-text-mention--grey fr-mb-0 fr-flex fr-align-items-center">
          <span className="fr-icon-government-line fr-icon--sm fr-mr-1w" />
          {typologies.join(', ')}
          <button
            type="button"
            className="fr-btn--tooltip fr-btn"
            aria-describedby={tooltipId}
          >
            Information typologies
          </button>
          <span
            className="fr-tooltip fr-placement"
            id={tooltipId}
            role="tooltip"
            aria-hidden="true"
          >
            {typologies
              .map((typologie) =>
                typologie in typologieStructureLabels
                  ? typologieStructureLabels[typologie]
                  : typologie,
              )
              .join(', ')}
          </span>
        </p>
      )}

      {(siret || rna) && (
        <p className="fr-mt-1v fr-text--sm fr-text-mention--grey fr-mb-0">
          {siret ? (
            <>
              <span className="fr-text--medium">SIRET</span>&nbsp;: {siret}
            </>
          ) : null}
          {rna ? (
            <>
              <span className="fr-text--medium">RNA</span>&nbsp;: {rna}
            </>
          ) : null}
        </p>
      )}
      {!!infoLinkHref && (
        <Button
          className="fr-mt-4v"
          priority="tertiary no outline"
          linkProps={{ href: infoLinkHref }}
          iconPosition="right"
          iconId="fr-icon-eye-line"
          size="small"
        >
          Voir plus d’infos
        </Button>
      )}
    </div>
  )
}

export default StructureCard
