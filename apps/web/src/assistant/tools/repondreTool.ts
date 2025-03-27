import { repondreToolDescription } from '@app/web/assistant/tools/repondreToolConfig'
import { tool } from 'ai'
import z from 'zod'

export const repondreTool = tool({
  description: repondreToolDescription,
  parameters: z.object({
    objectif: z
      .string()
      .describe(
        'L’objectif de la réponse. Réfléchis à comment aider au maximum l’utilisateur dans le cadre de la coop de la médiation numérique.',
      ),
  }),
  execute: async ({ objectif }) =>
    `répond à l’utilisateur avec pour objectif : ${objectif}`,
})
