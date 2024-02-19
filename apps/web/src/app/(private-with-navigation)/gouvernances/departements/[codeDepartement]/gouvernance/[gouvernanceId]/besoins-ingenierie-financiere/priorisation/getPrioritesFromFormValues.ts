import { DefaultValues } from 'react-hook-form/dist/types/form'
import { BesoinsEnIngenierieFinancierePrioriteData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'

export const getPrioritesFromFormValues = (
  values: DefaultValues<BesoinsEnIngenierieFinancierePrioriteData>['priorites'],
) => {
  // We can have minus ones etc ...

  const priorityKeysWithInitialPriorities = Object.entries(values ?? {}).filter(
    ([key, value]) => key.endsWith('Priorite') && typeof value === 'number',
  )

  const orderedPriorityKeys = priorityKeysWithInitialPriorities
    .sort(([, a], [, b]) => {
      if (a === b) {
        return 0
      }
      if (a === null) {
        return 1
      }
      if (b === null) {
        return -1
      }
      return a - b
    })
    .map(([key]) => key)

  const newPriorities: BesoinsEnIngenierieFinancierePrioriteData['priorites'] =
    {}

  for (const [index, key] of orderedPriorityKeys.entries()) {
    newPriorities[
      key as keyof BesoinsEnIngenierieFinancierePrioriteData['priorites']
    ] = index
  }

  return newPriorities
}
