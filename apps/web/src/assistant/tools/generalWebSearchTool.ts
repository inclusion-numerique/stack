import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'
import type { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import {
  executeBraveWebSearch,
  formatResultToMarkdownForAssistant,
} from '@app/web/assistant/tools/brave/braveSearch'

export const generalWebSearchToolParameters = z.object({
  query: z
    .string()
    .describe('Les termes de recherches pour le moteur de recherche web'),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export const generalWebSearchToolOptions = {
  name: 'general_web_search',
  description:
    'recherche sur internet, utilise les résultats pour trouver quelles informations sont utiles afin de mieux répondre. ' +
    'utilise ce tool pour toutes les questions qui ne concernent pas la médiation numérique, les démarches administratives, ' +
    'l’état français ou un organisme public. à privilégier si la requête porte sur un autre sujet général, ' +
    'par exemple la technique, la science, la culture, ou toute autre information qui ne relève pas de la sphère administrative.',
  parameters: generalWebSearchToolParameters,
  function: async ({ query }) => {
    const results = await executeBraveWebSearch({
      q: query,
      count: 4,
    })

    return results.length > 0
      ? {
          sources: `
       Voici les résultats de la recherche que l’assistant doit utiliser pour répondre (si pertinent) et générer les liens vers les sources pour l’utilisateur :
       
       ${results.map(formatResultToMarkdownForAssistant).join('\n\n')}
      `,
        }
      : {
          sources:
            'Aucun résultat de recherche sur les sites de l’administration. L’assistant doit utiliser un autre tool pour répondre à la question.',
        }
  },
} satisfies ZodFunctionOptions<typeof generalWebSearchToolParameters>

export const generalWebSearchTool = zodFunction(generalWebSearchToolOptions)
