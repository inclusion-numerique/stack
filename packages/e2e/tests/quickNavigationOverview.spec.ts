import { test, expect } from '@playwright/test'

test('homepage has title and links to projects page', async ({ page }) => {
  await page.goto('./')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Stack/)

  // create a locator
  const seeProjects = page.getByRole('link', { name: 'Voir tous les projets' })

  // Expect an attribute "to be strictly equal" to the value.
  await expect(seeProjects).toHaveAttribute('href', '/projets')

  // Click the get started link.
  await seeProjects.click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL('./projets')

  // TODO check that project list works
})
