import { trpc } from '@app/web/trpc'

export const useFileOpen = () => {
  const generateDownloadUrl = trpc.upload.generateDownloadUrl.useMutation()

  const open = async (key: string) => {
    const { url } = await generateDownloadUrl.mutateAsync({ key })

    window.open(url, '_blank')?.focus()
  }

  return {
    error: generateDownloadUrl.error,
    open,
  }
}
