import { expect } from '@storybook/jest'
import { waitFor, within } from '@storybook/testing-library'

export const withinDSFR = async (canvasElement: HTMLElement) => {
  const html = document.querySelectorAll('html')[0]

  await waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-floating-promises
    expect(html).toHaveAttribute('data-fr-js', 'true')
  })
  return within(canvasElement)
}
