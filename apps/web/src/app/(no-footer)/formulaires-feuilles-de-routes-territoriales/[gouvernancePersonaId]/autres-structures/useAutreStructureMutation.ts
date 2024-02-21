import { useRouter } from 'next/navigation'
import { trpc } from '@app/web/trpc'

export const useAutreStructureMutation = () => {
  const router = useRouter()
  return trpc.formulaireGouvernance.autreStructure.useMutation({
    onSuccess: () => {
      // Refresh client router data to have fresh data
      router.refresh()
    },
  })
}

export type UseAutreStructureMutation = ReturnType<
  typeof useAutreStructureMutation
>
