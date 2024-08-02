type MaterielValue =
  | 'Ordinateur'
  | 'Smartphone'
  | 'Tablette'
  | 'Autre'
  | 'Sans matériel'

const valueToIcon: Record<MaterielValue, string> = {
  Ordinateur: 'ri-computer-line',
  Smartphone: 'ri-smartphone-line',
  Tablette: 'ri-tablet-line',
  Autre: 'ri-vidicon-2-line',
  'Sans matériel': 'ri-loader-fill',
}

export const StatistiqueMateriel = ({
  value,
  count,
  ratio,
  rotateIcon = 0,
}: {
  value: MaterielValue
  count: number
  ratio: number
  rotateIcon?: number
}) => (
  <div className="fr-col fr-text--center">
    <div className="fr-background-alt--blue-france fr-p-2w fr-mb-3v fr-border-radius--8 fr-display-inline-block">
      <div
        style={rotateIcon ? { transform: `rotate(${rotateIcon}deg)` } : {}}
        className={`${valueToIcon[value]} ri-lg fr-line-height-1 fr-text-label--blue-france`}
        aria-hidden
      />
    </div>
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-center">
      <span className="fr-text--bold">{count}</span>
      <span className="fr-text-mention--grey">{ratio}%</span>
    </div>
    {value}
  </div>
)
