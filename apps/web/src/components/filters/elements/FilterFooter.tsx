import Button from '@codegouvfr/react-dsfr/Button'

export const FilterFooter = ({
  onClearFilters,
}: {
  onClearFilters: () => void
}) => {
  return (
    <>
      <hr className="fr-separator-1px fr-my-6v fr-mx-n8v" />
      <div className="fr-flex fr-flex-gap-4v fr-direction-row-reverse fr-align-items-center">
        <Button type="submit">Valider</Button>
        <Button
          type="button"
          className="fr-ml-auto"
          priority="secondary"
          onClick={onClearFilters}
        >
          Effacer
        </Button>
      </div>
    </>
  )
}
