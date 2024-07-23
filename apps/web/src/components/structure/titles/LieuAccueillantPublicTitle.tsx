import React from 'react'

export const LieuAccueillantPublicTitle = () => (
  <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
    <div>
      <div
        className="fr-display-inline-block fr-icon-map-pin-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
        aria-hidden
      />
    </div>
    <div>
      <h2 className="fr-h4 fr-mb-0 fr-text-label--blue-france" id="description">
        Lieu accueillant du public
      </h2>
      <p className="fr-text--sm fr-mb-0">
        Renseignez ici des informations supplémentaires permettant d’ajouter du
        contexte sur le lieu et de faciliter l’accès au public.
      </p>
    </div>
  </div>
)
