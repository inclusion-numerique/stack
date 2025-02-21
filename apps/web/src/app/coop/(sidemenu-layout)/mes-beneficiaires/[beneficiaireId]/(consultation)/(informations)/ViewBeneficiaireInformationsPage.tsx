import { BeneficiaireInformationsPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/getBeneficiaireInformationsPageData'
import BeneficiairePageNavigationBar from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/BeneficiairePageNavigationBar'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import InfoLabelValue from '@app/web/components/InfoLabelValue'
import Tag from '@codegouvfr/react-dsfr/Tag'
import styles from './ViewBeneficiaireInformationsPage.module.css'

const ViewBeneficiaireInformationsPage = ({
  data: { beneficiaire, thematiquesCounts },
}: {
  data: BeneficiaireInformationsPageData
}) => {
  const {
    notes,
    telephone,
    email,
    pasDeTelephone,
    communeCodePostal,
    commune,
    communeCodeInsee,
    genre,
    statutSocial,
    trancheAge,
  } = beneficiaire
  return (
    <>
      <BeneficiairePageNavigationBar
        beneficiaireId={beneficiaire.id}
        accompagnementsCount={beneficiaire._count.accompagnements}
        current="informations"
      />
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-1v">Thématiques d’accompagnements</h2>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-4v">
          Retrouvez les thématiques d’accompagnements vues avec ce bénéficiaire.
        </p>
        {thematiquesCounts.length > 0 ? (
          <div className="fr-flex fr-flex-wrap fr-flex-gap-3v">
            {thematiquesCounts.map(({ thematique, label, count }) => (
              <Tag key={thematique}>
                {label}
                {count > 1 ? (
                  <>
                    &nbsp;·&nbsp;<span className="fr-text--bold">{count}</span>
                  </>
                ) : null}
              </Tag>
            ))}
          </div>
        ) : (
          <p className="fr-text--sm">-</p>
        )}
      </div>
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-4v">Coordonnées</h2>
        <div className={styles.infosGrid}>
          <div>
            <InfoLabelValue
              label="Numéro de téléphone"
              value={pasDeTelephone ? 'Pas de téléphone' : telephone || '-'}
            />
          </div>
          <div>
            <InfoLabelValue label="E-mail" value={email || '-'} />
          </div>
        </div>
      </div>
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-4v">Informations complémentaires</h2>
        <div className={styles.infosGrid}>
          <div>
            <InfoLabelValue
              label="Commune de résidence"
              value={
                commune && communeCodeInsee && communeCodePostal
                  ? `${communeCodePostal} ${commune}`
                  : '-'
              }
            />
          </div>
          <div>
            <InfoLabelValue
              label="Genre"
              value={genre ? genreLabels[genre] : '-'}
            />
          </div>
          <div>
            <InfoLabelValue
              label="Tranche d’âge"
              value={trancheAge ? trancheAgeLabels[trancheAge] : '-'}
            />
          </div>
          <div>
            <InfoLabelValue
              label="Statut social"
              value={statutSocial ? statutSocialLabels[statutSocial] : '-'}
            />
          </div>
        </div>
      </div>
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-4v">Notes supplémentaires</h2>
        {notes ? (
          <div
            dangerouslySetInnerHTML={{
              __html: notes,
            }}
          />
        ) : (
          <p className="fr-text--sm">-</p>
        )}
      </div>
    </>
  )
}

export default ViewBeneficiaireInformationsPage
