import Tag from '@codegouvfr/react-dsfr/Tag'

export const ServicesEtAccompagnementView = ({
  services = [],
  modalitesAccompagnement = [],
}: {
  services?: string[]
  modalitesAccompagnement?: string[]
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-4v">
    <div data-testid="services-et-accompagnement-services">
      <div className="fr-mb-1w">
        Thématiques des services d’inclusion numérique
        <p className="fr-text--sm fr-mb-0 fr-text-mention--grey">
          Renseignez ici les services proposés dans ce lieu.
        </p>
      </div>
      {services.length > 0 ? (
        <ul className="fr-tags-group">
          {services.map((service) => (
            <li key={service}>
              <Tag>{service}</Tag>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fr-text--medium">Non renseigné</div>
      )}
    </div>
    <div data-testid="services-et-accompagnement-modalite-accompagnements">
      <div className="fr-mb-1w">Types d’accompagnements proposés</div>
      {modalitesAccompagnement.length > 0 ? (
        <ul className="fr-tags-group">
          {modalitesAccompagnement.map((modaliteAccompagnement) => (
            <li key={modaliteAccompagnement}>
              <Tag>{modaliteAccompagnement}</Tag>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fr-text--medium">Non renseigné</div>
      )}
    </div>
  </div>
)
