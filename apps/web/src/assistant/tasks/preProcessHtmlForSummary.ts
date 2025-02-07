import sanitizeHtml from 'sanitize-html'

/**
 * To summarize a web page, we need to:
 * - remove all scripts
 * - remove all attributes
 * - keep only the main body content
 */
export const preProcessHtmlForSummary = ({ html }: { html: string }) => {
  // extraction du contenu du <body> via une regex
  const bodyRegex = /<body[^>]*>((.|\n|\r)*)<\/body>/im
  const match = html.match(bodyRegex)
  // si un <body> est trouvé, on récupère son contenu, sinon on utilise le html complet
  const bodyContent = match && match[1] ? match[1] : html

  const sanitized = sanitizeHtml(bodyContent, {
    allowedAttributes: {}, // désactive tous les attributs
  })

  // on enveloppe le résultat dans une balise <body> pour être sûr d'avoir le body
  return `<body>${sanitized}</body>`
}
