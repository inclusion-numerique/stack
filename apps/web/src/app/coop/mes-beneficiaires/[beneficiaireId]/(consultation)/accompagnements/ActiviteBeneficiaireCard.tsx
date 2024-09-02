import Tag from '@codegouvfr/react-dsfr/Tag'
import {
  autonomieStars,
  niveauAtelierStars,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteIllustrations,
  typeActiviteLabels,
} from '@app/web/cra/cra'
import Stars from '@app/web/components/Stars'
import ActiviteBeneficiaireCardOpenModalLink from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ActiviteBeneficiaireCardOpenModalLink'
import { Activite } from '@app/web/cra/activitesQueries'

const ActiviteBeneficiaireCard = ({ activite }: { activite: Activite }) => {
  const { hasStars, starsCount } =
    (activite.type === 'individuel' || activite.type === 'demarche') &&
    activite.cra.autonomie
      ? { hasStars: true, starsCount: autonomieStars[activite.cra.autonomie] }
      : activite.type === 'collectif' && activite.cra.niveau
        ? {
            hasStars: true,
            starsCount: niveauAtelierStars[activite.cra.niveau],
          }
        : { hasStars: false, starsCount: 0 }

  return (
    <div className="fr-py-2v fr-px-4v fr-flex fr-align-items-center fr-flex-gap-4v fr-my-2v fr-enlarge-button fr-border-radius--8">
      <div className="fr-background-alt--blue-france fr-p-2v fr-border-radius--8 fr-flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="fr-display-block"
          alt=""
          src={typeActiviteIllustrations[activite.type]}
          style={{ width: 40, height: 40 }}
        />
      </div>
      <div className="fr-flex-grow-1">
        <p className=" fr-mb-2v">
          <span className="fr-text--xs fr-text--bold fr-text--uppercase fr-mb-0">
            {typeActiviteLabels[activite.type]}
          </span>
          {activite.type === 'collectif' && activite.cra.titreAtelier ? (
            <span className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0">
              &nbsp;·&nbsp;{activite.cra.titreAtelier}
            </span>
          ) : null}
        </p>
        <div className="fr-flex fr-align-items-center fr-justify-content-start">
          <div className="fr-flex fr-flex-wrap fr-flex-gap-2v">
            {activite.type === 'individuel' || activite.type === 'collectif' ? (
              <>
                {activite.cra.thematiques.map((thematique) => (
                  <Tag key={thematique} small>
                    {thematiqueLabels[thematique]}
                  </Tag>
                ))}
              </>
            ) : (
              <>
                {activite.cra.thematiques.map((thematique) => (
                  <Tag key={thematique} small>
                    {thematiqueDemarcheAdministrativeLabels[thematique]}
                  </Tag>
                ))}
              </>
            )}
          </div>

          {hasStars && (
            <div className="fr-flex fr-flex-grow-1 fr-flex-shrink-0 fr-flex-nowrap fr-flex-gap-2v fr-ml-2v">
              <span className="fr-text-mention--grey">·</span>
              <Stars count={starsCount} max={3} />
            </div>
          )}
        </div>
      </div>
      <ActiviteBeneficiaireCardOpenModalLink activite={activite} />
    </div>
  )
}

export default ActiviteBeneficiaireCard
