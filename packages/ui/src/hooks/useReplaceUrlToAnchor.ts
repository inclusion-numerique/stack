import { usePathname, useRouter } from 'next/navigation'

export const useReplaceUrlToAnchor = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (anchor: string) => router.replace(`${pathname}#${anchor}`)
}

export type ReplaceUrlToAnchor = ReturnType<typeof useReplaceUrlToAnchor>
