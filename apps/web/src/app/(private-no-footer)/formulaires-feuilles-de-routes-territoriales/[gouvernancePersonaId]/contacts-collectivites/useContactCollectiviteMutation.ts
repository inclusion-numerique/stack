import { trpc } from '@app/web/trpc'

export const useContactCollectiviteMutation = () =>
  trpc.formulaireGouvernance.contactCollectivite.useMutation()

export type UseContactCollectiviteMutation = ReturnType<
  typeof useContactCollectiviteMutation
>
