import { RefObject } from 'react'

export const useScrollToBottom = ({
  containerRef,
  enabled,
  ignoreOffset = 30,
}: {
  enabled?: boolean
  containerRef: RefObject<HTMLElement>
  ignoreOffset?: number // The offset above which a user not scrolled to the bottom will disable the behavior
}) => {
  const scrollToBottom = () => {
    if (!enabled) {
      return
    }

    const containerElement = containerRef.current

    if (!containerElement) {
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = containerElement

    const lastElement = containerElement.lastElementChild ?? containerElement

    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight
    console.log('IS SCROLLED', {
      scrollTop,
      scrollHeight,
      clientHeight,
      isScrolledToBottom,
      ignoreOffset,
    })

    // TODO apply ignore offset

    if (!isScrolledToBottom) {
      console.log('Scrolling to', lastElement)
      lastElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { scrollToBottom }
}
