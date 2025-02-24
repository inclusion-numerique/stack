import { readFile } from 'node:fs/promises'
import { preProcessHtmlForSummary } from '@app/web/assistant/tasks/preProcessHtmlForSummary'

describe('preProcessHtmlForSummary', () => {
  it('should prepare a web page for summary', async () => {
    const html = await readFile(
      `${__dirname}/_test/testCase.legifrance.html`,
      'utf8',
    )

    const body = preProcessHtmlForSummary({
      html,
    })

    expect(body).not.toContain('<script')
  })
})
