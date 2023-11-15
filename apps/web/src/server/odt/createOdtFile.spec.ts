import { createOdtFile } from '@app/web/server/odt/createOdtFile'
import { childrenExample } from '@app/web/server/odt/createOdtContent'
import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'

describe('createOdtFile', () => {
  const variablePath = resolve(__dirname, '../../../../../var')

  it('creates a valid odt file', async () => {
    const data = await createOdtFile({ children: childrenExample })
    writeFileSync(`${variablePath}/test.odt`, data)
  })
})
