import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { gouvernanceWelcome } from '@app/emails/templates/gouvernanceWelcome'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: gouvernanceWelcome', () => {
  const output = createMjmlTemplateOutput('gouvernanceWelcome')

  for (const gouvernancePersona of Object.values(gouvernancePersonas)) {
    it(`Compiles mjml template for ${gouvernancePersona.title}`, async () => {
      const mjml = gouvernanceWelcome.mjml({
        gouvernancePersona,
      })

      expect(mjml).toContain('Inscription confirmée')

      await output(mjml)
    })
  }
})
