import type { ApiClientScope } from '@prisma/client'
import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const apiClientScopeLabels: { [key in ApiClientScope]: string } = {
  Activites: 'Activités',
  Statistiques: 'Statistiques',
  Structures: 'Structures',
  Utilisateurs: 'Utilisateurs',
}

export const apiClientScopeOptions = labelsToOptions(apiClientScopeLabels)

export const apiClientScopeValues = Object.keys(apiClientScopeLabels) as [
  ApiClientScope,
  ...ApiClientScope[],
]
