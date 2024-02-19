import { useRouter } from 'next/navigation'
import { trpc } from '@app/web/trpc'

export const useContactCollectiviteMutation = () => {
  const router = useRouter()
  return trpc.formulaireGouvernance.contactCollectivite.useMutation({
    onSuccess: () => {
      // Update client router cache to have fresh data
      router.refresh()
    },
  })
}

export type UseContactCollectiviteMutation = ReturnType<
  typeof useContactCollectiviteMutation
>
