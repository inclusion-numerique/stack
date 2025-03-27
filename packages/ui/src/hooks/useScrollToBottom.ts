import { RefObject, useCallback } from 'react'

export const useScrollToBottom = ({
  containerRef,
  ignoreOffset: _ignoreOffset = 30,
}: {
  containerRef: RefObject<HTMLElement>
  ignoreOffset?: number // The offset above which a user not scrolled to the bottom will disable the behavior
}) => {
  const scrollToBottom = useCallback(() => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = containerElement

    const lastElement = containerElement.lastElementChild ?? containerElement

    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight

    if (!isScrolledToBottom) {
      lastElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      })
    }
  }, [containerRef.current])

  return { scrollToBottom }
}
