import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { addresseFromParts } from '@app/web/utils/addresseFromParts'
import { StructureData } from '@app/web/app/structure/StructureValidation'

const StructureCard = ({
  structure: { nom, adresse, rna, siret, codePostal, commune, typologie },
  topRight,
  infoLinkHref,
  className,
}: {
  className?: string
  structure: Pick<
    StructureData,
    'nom' | 'typologie' | 'adresse' | 'commune' | 'codePostal' | 'siret' | 'rna'
  >
  topRight?: React.ReactNode
  infoLinkHref?: string
}) => (
  <div
    className={classNames(
      'fr-width-full fr-border-radius--8 fr-border fr-p-6v fr-p-md-8v',
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
    {(siret || rna || typologie) && (
      <p className="fr-mt-1v fr-text--sm fr-text-mention--grey fr-mb-0">
        {typologie || siret || rna ? (
          <span className="fr-icon-government-line fr-icon--sm fr-mr-1w" />
        ) : null}
        {typologie || null}
        {typologie && (siret || rna) ? ' · ' : null}
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
        linkProps={{ href: infoLinkHref, target: '_blank' }}
      >
        Voir plus d’infos
      </Button>
    )}
  </div>
)

export default StructureCard
