import Tag from '@codegouvfr/react-dsfr/Tag'
import { BeneficiaireActivite } from '@app/web/beneficiaire/beneficiaireQueries'
import {
  accompagnementTypeIllustrations,
  accompagnementTypeLabels,
  autonomieStars,
  niveauAtelierStars,
  thematiqueAccompagnementLabels,
  thematiqueDemarcheAdministrativeLabels,
} from '@app/web/cra/cra'
import Stars from '@app/web/components/Stars'

const ActiviteBeneficiaireCard = ({
  activite,
}: {
  activite: BeneficiaireActivite
}) => (
  <div className="fr-py-2v fr-px-4v fr-flex fr-align-items-center fr-flex-gap-4v fr-my-2v">
    <div className="fr-background-alt--blue-france fr-p-2v fr-border-radius--8 fr-flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="fr-display-block"
        alt=""
        src={accompagnementTypeIllustrations[activite.type]}
        style={{ width: 40, height: 40 }}
      />
    </div>
    <div className="fr-flex-grow-1">
      <p className=" fr-mb-2v">
        <span className="fr-text--xs fr-text--bold fr-text--uppercase fr-mb-0">
          {accompagnementTypeLabels[activite.type]}
        </span>
        {activite.type === 'collectif' && activite.titreAtelier ? (
          <span className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0">
            &nbsp;·&nbsp;{activite.titreAtelier}
          </span>
        ) : null}
      </p>
      <div>
        <div className="fr-flex fr-flex-wrap fr-flex-gap-2v">
          {activite.type === 'individuel' || activite.type === 'collectif' ? (
            <>
              {activite.thematiques.map((thematique) => (
                <Tag key={thematique} small>
                  {thematiqueAccompagnementLabels[thematique]}
                </Tag>
              ))}
            </>
          ) : (
            <>
              {activite.thematiques.map((thematique) => (
                <Tag key={thematique} small>
                  {thematiqueDemarcheAdministrativeLabels[thematique]}
                </Tag>
              ))}
            </>
          )}
          {activite.type === 'collectif' && activite.niveau ? (
            <>
              <span className="fr-text-mention--grey">·</span>
              <Stars count={niveauAtelierStars[activite.niveau]} max={3} />
            </>
          ) : null}
          {(activite.type === 'individuel' || activite.type === 'demarche') &&
          activite.autonomie ? (
            <>
              <span className="fr-text-mention--grey">·</span>
              <Stars count={autonomieStars[activite.autonomie]} max={3} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  </div>
)

export default ActiviteBeneficiaireCard
