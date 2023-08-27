import { trpc } from '@app/web/trpc'

export const useAutreStructureMutation = () =>
  trpc.formulaireGouvernance.autreStructure.useMutation()

export type UseAutreStructureMutation = ReturnType<
  typeof useAutreStructureMutation
>
