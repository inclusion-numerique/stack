import { JSDOM } from 'jsdom'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'

type StyleOptions = {
  pStyleName?: string
  ulStyleName?: string
  liStyleName?: string
}

/**
 * XXX TODO: this is incomplete implementation and does not work for FNE use case from WYSIWYG to odf file
 */
export const htmlToOdf = (html: string, options: StyleOptions = {}) => {
  const { window } = new JSDOM(html)
  const { document } = window
  const {
    pStyleName = 'Standard',
    ulStyleName = 'L1',
    liStyleName = 'Standard',
  } = options

  let odfContent = ''

  // Iterate over all nodes in the document body.
  for (const node of document.body.childNodes) {
    // Check if the node is an element node.
    if (node.nodeType === window.Node.ELEMENT_NODE) {
      const element = node as Element

      if (element.tagName === 'UL') {
        odfContent += `<text:list text:style-name='${ulStyleName}'>`
        for (const li of element.querySelectorAll('li')) {
          odfContent += `<text:list-item><text:p text:style-name='${liStyleName}'>${stripHtmlTags(li.innerHTML)}</text:p></text:list-item>`
        }
        odfContent += '</text:list>'
      } else {
        // Convert all other element nodes to paragraphs with the specified style.
        odfContent += `<text:p text:style-name='${pStyleName}'>${stripHtmlTags(element.innerHTML)}</text:p>`
      }
    } else if (
      node.nodeType === window.Node.TEXT_NODE && // Convert text nodes that are not within an element node to paragraphs.
      node.textContent?.trim()
    ) {
      odfContent += `<text:p text:style-name='${pStyleName}'>${stripHtmlTags(node.textContent)}</text:p>`
    }
  }

  return odfContent
}
