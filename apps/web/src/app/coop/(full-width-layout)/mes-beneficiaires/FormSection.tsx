import { PropsWithChildren, ReactNode } from 'react'

const FormSection = ({
  children,
  description,
  title,
}: PropsWithChildren<{ title?: ReactNode; description?: ReactNode }>) => (
  <div className="fr-mt-3v fr-p-8v fr-pb-6v fr-width-full fr-border fr-border-radius--8 fr-background-default--grey">
    {!!title && <h2 className="fr-h5 fr-mb-1v">{title}</h2>}
    {!!description && (
      <p className="fr-text--xs fr-text-mention--grey fr-mb-4v">
        {description}
      </p>
    )}
    {children}
  </div>
)

export default FormSection
