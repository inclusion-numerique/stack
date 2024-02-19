import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { trpc } from '@app/web/trpc'
import { gouvernanceHomePath } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernancePaths'

export const useEraseBesoinsIngenierieFinanciere = ({
  gouvernanceId,
  codeDepartement,
}: {
  gouvernanceId: string
  codeDepartement: string
}) => {
  const router = useRouter()
  const eraseMutation = trpc.besoinsIngenierieFinanciere.erase.useMutation()
  const onCancel = async () => {
    await eraseMutation.mutateAsync({
      gouvernanceId,
    })
    createToast({
      priority: 'success',
      message: 'Vos besoins en ingénierie financière ont bien été effacés',
    })
    router.refresh()
    router.push(gouvernanceHomePath({ codeDepartement }))
  }
  return {
    onCancel,
    eraseMutation,
  }
}
