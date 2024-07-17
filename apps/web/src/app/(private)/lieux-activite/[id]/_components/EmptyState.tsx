import Notice from '@codegouvfr/react-dsfr/Notice'

export const EmptyState = ({ title }: { title: string }) => (
  <Notice
    title={
      <span className="fr-text-default--grey fr-text--regular">{title}</span>
    }
  />
)
