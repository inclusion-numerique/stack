import { writeFileSync } from 'node:fs'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varDirectory } from '@app/config/varDirectory'
import { generateConventionSubvention } from '@app/web/gouvernance/conventionSubvention'

const outputName = (filename: string) =>
  `${varDirectory}/conventions/${filename}.odt`

describe('generateConventionSubvention', () => {
  beforeAll(() => {
    createVarDirectory('/conventions')
  })

  it('creates a valid odt convention file', async () => {
    const data = await generateConventionSubvention()
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('test'), data)
  })
})
