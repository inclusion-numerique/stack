import { infosGouvernancePourMembres } from '@app/emails/templates/infosGouvernancePourMembres'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: infosGouvernancePourMembres', () => {
  const avecBesoins = createMjmlTemplateOutput(
    'infosGouvernancePourMembres.avecBesoins',
  )

  const sansBesoins = createMjmlTemplateOutput(
    'infosGouvernancePourMembres.sansBesoins',
  )

  it('Version avec besoins', async () => {
    const mjml = infosGouvernancePourMembres.mjml({
      departement: 'Rhône',
      hasBesoins: true,
      url: 'https://test.local',
    })

    expect(mjml).toContain('Rhône')
    expect(mjml).toContain('https://test.local')

    await avecBesoins(mjml)
  })

  it('Version sans besoins', async () => {
    const mjml = infosGouvernancePourMembres.mjml({
      departement: 'Gironde',
      hasBesoins: false,
      url: 'https://test.local',
    })

    expect(mjml).toContain('Gironde')
    expect(mjml).toContain('https://test.local')

    await sansBesoins(mjml)
  })
})
