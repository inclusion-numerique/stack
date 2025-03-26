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

    console.log('CONTAINER ELEMENT', containerElement)

    if (!containerElement) {
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = containerElement

    console.log('SCROLL TOP', { scrollTop, scrollHeight, clientHeight })

    const lastElement = containerElement.lastElementChild ?? containerElement

    console.log('LAST ELEMENT', lastElement)

    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight

    console.log('IS SCROLLED TO BOTTOM', isScrolledToBottom)

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
