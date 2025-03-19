const AdditionDiff = ({ diff }: { diff: number }) =>
  diff === 0 ? null : (
    <span className="fr-text--bold fr-text-label--green-bourgeon fr-mb-0">
      &nbsp;
      <span className="ri-add-line" aria-hidden={true} />
      {diff}
    </span>
  )

const SubtractionDiff = ({ sourceIds }: { sourceIds: string[] }) =>
  sourceIds.length === 0 ? null : (
    <span className="fr-text--bold fr-text-label--red-marianne fr-mb-0">
      &nbsp;
      <span className="ri-subtract-line" aria-hidden={true} />
      {sourceIds.length}
    </span>
  )

export const MergeDiff = ({
  isAddition = true,
  sourceIds,
  commonIds,
}: {
  isAddition?: boolean
  sourceIds: string[]
  commonIds: string[]
}) =>
  isAddition ? (
    <AdditionDiff diff={(sourceIds.length ?? 0) - (commonIds.length ?? 0)} />
  ) : (
    <SubtractionDiff sourceIds={sourceIds} />
  )
