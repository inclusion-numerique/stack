import { htmlToOdf } from '@app/web/utils/htmlToOdf'

describe('convertHtmlToODF', () => {
  test('converts a paragraph to ODF', () => {
    const html = '<p>This is a test paragraph.</p>'
    const expectedODF =
      '<text:p text:style-name="Standard">This is a test paragraph.</text:p>'
    expect(htmlToOdf(html)).toBe(expectedODF)
  })

  test('converts an unordered list to ODF', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>'
    const expectedODF =
      '<text:list text:style-name="L1"><text:list-item><text:p text:style-name="Standard">Item 1</text:p></text:list-item><text:list-item><text:p text:style-name="Standard">Item 2</text:p></text:list-item></text:list>'
    expect(htmlToOdf(html)).toBe(expectedODF)
  })

  test('applies custom styles', () => {
    const html = '<p>Custom styled paragraph.</p>'
    const options = { pStyleName: 'CustomPStyle' }
    const expectedODF =
      '<text:p text:style-name="CustomPStyle">Custom styled paragraph.</text:p>'
    expect(htmlToOdf(html, options)).toBe(expectedODF)
  })

  test('handles mixed content', () => {
    const html =
      '<p>Paragraph before list.</p><ul><li>List item</li></ul><p>Paragraph after list.</p>'
    const result = htmlToOdf(html)
    expect(result).toContain(
      '<text:p text:style-name="Standard">Paragraph before list.</text:p>',
    )
    expect(result).toContain('<text:list text:style-name="L1">')
    expect(result).toContain(
      '<text:p text:style-name="Standard">Paragraph after list.</text:p>',
    )
  })
})
