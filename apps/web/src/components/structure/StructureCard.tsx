import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

const StructureCard = ({
  structure: { nom, adresse, siretOuRna, typologie },
  topRight,
  infoLinkHref,
  className,
}: {
  className?: string
  structure: {
    nom: string
    adresse: string
    siretOuRna: string | null
    typologie: string | null
  }
  topRight?: React.ReactNode
  infoLinkHref?: string
}) => {
  const siret =
    !!siretOuRna && validateValidSiretDigits(siretOuRna) ? siretOuRna : null
  const rna =
    !!siretOuRna && validateValidRnaDigits(siretOuRna) ? siretOuRna : null
  console.log('STRUCTURE CARD', {
    nom,
    adresse,
    siretOuRna,
    typologie,
    siret,
    rna,
  })

  return (
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
        {adresse}
      </p>
      {(siretOuRna || typologie) && (
        <p className="fr-mt-1v fr-text--sm fr-text-mention--grey fr-mb-0">
          {typologie ? (
            <>
              <span className="fr-icon-government-line fr-icon--sm fr-mr-1w" />
              {typologie}
            </>
          ) : null}
          {typologie && (siret || rna) ? ' · ' : null}
          {siret ? (
            <>
              <span className="fr-icon-government-line fr-icon--sm fr-mr-1w" />
              <span className="fr-text--medium">SIRET</span>&nbsp;: {siretOuRna}
            </>
          ) : null}
          {rna ? (
            <>
              <span className="fr-icon-government-line fr-icon--sm fr-mr-1w" />
              <span className="fr-text--medium">RNA</span>&nbsp;: {siretOuRna}
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
}

export default StructureCard
