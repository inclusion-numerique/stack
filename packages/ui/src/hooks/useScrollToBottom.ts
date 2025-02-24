import { RefObject } from 'react'

export const useScrollToBottom = ({
  containerRef,
  enabled,
  ignoreOffset: _ignoreOffset = 30,
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
    if (!isScrolledToBottom) {
      lastElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { scrollToBottom }
}
