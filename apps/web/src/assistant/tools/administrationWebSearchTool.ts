import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import {
  executeBraveWebSearch,
  formatResultToMarkdownForAssistant,
} from '@app/web/assistant/tools/brave/braveSearch'

export const administrationWebSearchToolParameters = z.object({
  query: z
    .string()
    .describe('Les termes de recherches pour le moteur de recherche web'),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export const administrationWebSearchToolOptions = {
  name: 'administration_web_search',
  description:
    'recherche sur internet, utilise les résultats pour trouver quelles informations sont utiles afin de mieux répondre. ' +
    'utilise ce tool pour toutes les questions liées à la médiation numérique, aux démarches administratives, ' +
    'à l’état français ou à un organisme public. à privilégier si la question a un lien direct avec les services publics, ' +
    'la vie administrative ou la recherche d’informations officielles.',
  parameters: administrationWebSearchToolParameters,
  function: async ({ query }) => {
    const results = await executeBraveWebSearch({
      q: query,
      count: 4,
      goggles_id:
        'https://gist.githubusercontent.com/Clrk/800bf69ac450d9fd07846c1dcb012d1f',
    })

    if (results.length === 0) {
      return `Aucun résultat de recherche sur les sites de l’administration. L’assistant doit utiliser un autre tool pour répondre à la question.`
    }

    return `
Voici les résultats de la recherche que l’assistant doit utiliser pour répondre (si pertinent) et générer les liens vers les sources pour l’utilisateur :

${results.map(formatResultToMarkdownForAssistant).join('\n\n')}
`
  },
} satisfies ZodFunctionOptions<typeof administrationWebSearchToolParameters>

export const administrationWebSearchTool = zodFunction(
  administrationWebSearchToolOptions,
)
