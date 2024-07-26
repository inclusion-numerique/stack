export const InformationsGeneralesView = ({
  nom,
  adresse,
  commune,
  codePostal,
  complementAdresse,
  siret,
  rna,
}: {
  nom: string
  adresse: string
  commune: string
  codePostal: string
  complementAdresse?: string | null
  siret?: string | null
  rna?: string | null
}) => (
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
        {adresse}, {codePostal} {commune}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Complément d’adresse</span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-complement-adresse"
      >
        {(complementAdresse?.length ?? 0) > 0
          ? complementAdresse
          : 'Non renseigné'}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">SIRET structure (ou RNA)</span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-pivot"
      >
        {(siret?.length ?? 0) > 0 || (rna?.length ?? 0) > 0
          ? (siret ?? rna)
          : 'Non renseigné'}
      </div>
    </div>
  </div>
)
