import { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'

export const toLieuActiviteRichOptions = (options: LieuActiviteOption[]) =>
  options.map(({ label, value, extra }) =>
    extra
      ? {
          value,
          label: (
            <span className="fr-flex fr-align-items-center">
              {extra.mostUsed && (
                <span className="fr-text-title--blue-france fr-icon--sm fr-icon-star-line fr-mr-2v" />
              )}
              <span className="fr-flex fr-direction-column ">
                <span className="fr-text--sm fr-mb-0">{extra.nom}</span>
                <span className="fr-text--xs fr-mb-0 fr-text-mention--grey">
                  {extra.adresse}
                </span>
              </span>
            </span>
          ),
          extra: {
            searchable: `${extra.nom} ${extra.adresse}`.toLocaleLowerCase(),
          },
        }
      : { value, label },
  )

export type LieuActiviteRichOption = ReturnType<
  typeof toLieuActiviteRichOptions
>[number]

export const lieuActiviteFilterOption: (
  option: { data: LieuActiviteRichOption },
  inputValue: string,
) => boolean = ({ data }, inputValue) => {
  if (!inputValue.trim()) {
    return true
  }

  if (!data.extra?.searchable) {
    return false
  }
  const parts = inputValue.toLocaleLowerCase().split(' ')

  return parts.every((part) => data.extra.searchable.includes(part))
}
