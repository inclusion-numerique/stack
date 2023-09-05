import { trpc } from '@app/web/trpc'

export const usePerimetreMutation = () =>
  trpc.formulaireGouvernance.perimetreFeuilleDeRoute.useMutation()

export type UsePerimetreMutation = ReturnType<typeof usePerimetreMutation>
