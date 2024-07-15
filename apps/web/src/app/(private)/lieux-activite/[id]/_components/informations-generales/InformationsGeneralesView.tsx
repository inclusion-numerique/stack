import { InformationsGeneralesProps } from './InformationsGeneralesProps'

export const InformationsGeneralesView = ({
  nom,
  adresseBan,
  complementAdresse,
  siret,
  rna,
}: InformationsGeneralesProps) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-6v">
    <div>
      <span className="fr-text-mention--grey">Nom de la structure</span>
      <div className="fr-text--medium" data-testid="informations-generales-nom">
        {nom}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Adresse</span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-adresse"
      >
        {adresseBan.nom}, {adresseBan.codePostal} {adresseBan.commune}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Complément d’adresse</span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-complement-adresse"
      >
        {complementAdresse ?? 'Non renseigné'}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">SIRET structure (ou RNA)</span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-pivot"
      >
        {siret ?? rna ?? 'Non renseigné'}
      </div>
    </div>
  </div>
)
