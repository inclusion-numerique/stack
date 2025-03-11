import type { UserRoleLabel } from '@app/web/utils/getUserRoleLabel'

export const ProfileView = ({
  email,
  name,
  phone,
}: {
  email: string
  name?: string | null
  phone?: string | null
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-6v">
    <div>
      <span className="fr-text-mention--grey">Prénom Nom</span>
      <div className="fr-text--medium" data-testid="informations-generales-nom">
        {name}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Adresse e-mail</span>
      <div className="fr-text--medium" data-testid="informations-generales-nom">
        {email}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">
        Numéro de téléphone professionnel
      </span>
      <div
        className="fr-text--medium"
        data-testid="informations-generales-complement-adresse"
      >
        {(phone?.length ?? 0) > 0 ? phone : 'Non renseigné'}
      </div>
    </div>
  </div>
)
