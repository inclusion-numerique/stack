import Link from 'next/link'
import Tag from '@codegouvfr/react-dsfr/Tag'

export const ModalitesAccesAuServiceView = ({
  fraisACharge = [],
  modalitesAcces,
}: {
  fraisACharge?: string[]
  modalitesAcces?: {
    surPlace?: boolean | null
    parTelephone?: boolean | null
    parMail?: boolean | null
    numeroTelephone?: string | null
    adresseMail?: string | null
  }
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-4v">
    <div data-testid="modalites-acces">
      Modalités d’accès
      <p className="fr-text--sm fr-text-mention--grey fr-mb-1w">
        Indiquez comment bénéficier de ses services. Sélectionnez un ou
        plusieurs choix.
      </p>
      {modalitesAcces?.surPlace ||
      modalitesAcces?.parTelephone ||
      modalitesAcces?.parMail ? (
        <ul className="fr-tags-group">
          {modalitesAcces?.surPlace && (
            <li>
              <Tag>Se présenter sur place</Tag>
            </li>
          )}
          {modalitesAcces?.parTelephone && (
            <li>
              <Tag>Téléphoner</Tag>
            </li>
          )}
          {modalitesAcces?.parMail && (
            <li>
              <Tag>Contacter par mail</Tag>
            </li>
          )}
        </ul>
      ) : (
        <div className="fr-text--medium">Non renseigné</div>
      )}
    </div>
    {modalitesAcces?.numeroTelephone && (
      <div data-testid="modalites-acces-numero-de-telephone">
        <div className="fr-text-mention--grey">Téléphone de contact</div>
        <div className="fr-text--medium">{modalitesAcces?.numeroTelephone}</div>
      </div>
    )}
    {modalitesAcces?.adresseMail && (
      <div data-testid="modalites-acces-adresse-mail">
        <div className="fr-text-mention--grey">Adresse mail de contact</div>
        <Link
          className="fr-link"
          href={`mailto:${modalitesAcces?.adresseMail}`}
        >
          {modalitesAcces?.adresseMail}
        </Link>
      </div>
    )}
    <div data-testid="modalites-acces-frais-a-charge">
      <div className="fr-mb-1w">
        Frais à charge
        <p className="fr-text--sm fr-mb-0 fr-text-mention--grey">
          Indiquez les types d’accompagnements proposés dans ce lieu.
        </p>
      </div>
      {fraisACharge.length > 0 ? (
        <ul className="fr-tags-group">
          {fraisACharge.map((frais) => (
            <li key={frais}>
              <Tag>{frais}</Tag>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fr-text--medium">Non renseigné</div>
      )}
    </div>
  </div>
)
