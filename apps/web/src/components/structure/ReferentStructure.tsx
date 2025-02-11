import React from 'react'

export const ReferentStructure = ({
  nomReferent,
  courrielReferent,
  telephoneReferent,
}: {
  nomReferent: string | null
  courrielReferent: string | null
  telephoneReferent: string | null
}) => (
  <>
    <h2 className="fr-text-title--blue-france fr-text--xs fr-text--uppercase fr-mb-2v">
      Référent de la structure
    </h2>
    <div className="fr-flex fr-direction-column fr-flex-gap-1v">
      <span className="fr-text--lg fr-text--bold fr-mb-0">{nomReferent}</span>
      {(courrielReferent || telephoneReferent) && (
        <span className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-flex fr-flex-gap-2v">
          {courrielReferent && (
            <span>
              <span className="ri-mail-line fr-mr-2v" aria-hidden />
              {courrielReferent}
            </span>
          )}
          {telephoneReferent && courrielReferent && (
            <span className="fr-hidden fr-unhidden-md" aria-hidden>
              ·
            </span>
          )}
          {telephoneReferent && (
            <span>
              <span className="ri-phone-line fr-mr-2v" aria-hidden />
              {telephoneReferent}
            </span>
          )}
        </span>
      )}
    </div>
  </>
)
