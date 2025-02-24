import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { ragSources } from '@app/web/assistant/rag/sources'
import { ZodFunctionOptions } from '@app/web/assistant/tools/zodFunctionType'
import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'

export const lesBasesRagToolParameters = z.object({
  query: z
    .string()
    .describe(
      'Le message complet qui sera comparé avec les embeddings de nos collections de ressources de médiation numérique. Cela doit contenir le contexte et assez de sens pour pouvoir faire un RAG efficace.',
    ),
  objectif: z
    .string()
    .describe(
      'L’objectif de la recherche dans le contexte de la discussion. Permet de ranker les résultats par ordre de pertinence.',
    ),
})

export type LesBasesRagToolParameters = z.infer<
  typeof lesBasesRagToolParameters
>

export const lesBasesRagToolOptions = {
  name: 'les_bases_rag',
  description:
    'Recherche dans nos ressources de médiation numérique. ' +
    'Utilise ce tool pour toutes les questions en rapport avec la médiation numérique ou le numérique d’intéret général pour trouver des ressources de médiation numérique et de numérique d’intéret général présent sur les site lesbases.anct.gouv.fr',
  parameters: lesBasesRagToolParameters,
  function: async ({ query }) => {
    const ragResult = await getRagChunksForQuery(query, {
      sources: [ragSources.lesBases],
    })
    return ragResult
  },
} satisfies ZodFunctionOptions<typeof lesBasesRagToolParameters>

export const lesBasesRagTool = zodFunction(lesBasesRagToolOptions)
