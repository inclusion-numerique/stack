import Tag from '@codegouvfr/react-dsfr/Tag'

export const FilterSelection = ({
  options,
  label,
  onRemoveFilter,
}: {
  options: { label: string; value: string }[]
  label: { singular: string; plural: string }
  onRemoveFilter: (option: { label: string; value: string }) => void
}) => {
  return (
    <>
      <hr className="fr-separator-1px fr-my-6v fr-mx-n8v" />
      <span className="fr-text--bold">
        {options.length}&nbsp;
        {options.length > 1 ? label.plural : label.singular}
      </span>
      <ul className="fr-list-group fr-flex fr-flex-wrap fr-flex-gap-1v fr-mt-2v">
        {options.map((option) => (
          <li key={option.value} className="fr-pb-0">
            <Tag
              nativeButtonProps={{
                type: 'button',
                onClick: () => onRemoveFilter(option),
              }}
            >
              {option.label}&nbsp;
              <span className="fr-icon-close-line fr-icon--sm" />
            </Tag>
          </li>
        ))}
      </ul>
    </>
  )
}
