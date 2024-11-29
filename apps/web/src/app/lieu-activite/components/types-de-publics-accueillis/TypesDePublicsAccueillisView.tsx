import Tag from '@codegouvfr/react-dsfr/Tag'

export const TypesDePublicsAccueillisView = ({
  priseEnChargeSpecifique = [],
  toutPublic = false,
  publicsSpecifiquementAdresses = [],
}: {
  priseEnChargeSpecifique?: string[]
  toutPublic?: boolean
  publicsSpecifiquementAdresses?: string[]
}) => (
  <>
    <div
      className="fr-mt-1w fr-mb-2w"
      data-testid="types-de-pubic-accueillis-prise-en-charge"
    >
      <div>Précisez les publics accueillis dans ce lieu</div>
      {!toutPublic && publicsSpecifiquementAdresses.length > 0 && (
        <ul className="fr-tags-group fr-mt-3v fr-mt-1v">
          {publicsSpecifiquementAdresses.map((publicSpecifiquementAdresse) => (
            <li key={publicSpecifiquementAdresse}>
              <Tag>{publicSpecifiquementAdresse}</Tag>
            </li>
          ))}
        </ul>
      )}
      {!toutPublic && publicsSpecifiquementAdresses.length === 0 && (
        <div className="fr-text--medium fr-mt-2w">Non renseigné</div>
      )}
      {toutPublic && <Tag className="fr-my-3v">Tout public</Tag>}
    </div>
    <div data-testid="types-de-pubic-accueillis-public-specifiquement-adresse">
      <div className="fr-mb-1w">
        Prise en charge spécifique
        <p className="fr-text--sm fr-mb-0 fr-text-mention--grey">
          Indiquez si le lieu est en mesure d’accompagner et soutenir des
          publics ayant des besoins particuliers.
        </p>
      </div>
      {priseEnChargeSpecifique.length > 0 ? (
        <ul className="fr-tags-group">
          {priseEnChargeSpecifique.map((priseEnCharge) => (
            <li key={priseEnCharge}>
              <Tag>{priseEnCharge}</Tag>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fr-text--medium">Non renseigné</div>
      )}
    </div>
  </>
)
