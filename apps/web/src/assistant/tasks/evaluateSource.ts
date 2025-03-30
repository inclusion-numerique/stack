import { OpenAiChatMessage } from '@app/web/assistant/openAiChat'
import {
  OpenAiClienChatModel,
  openAiClient,
} from '@app/web/assistant/openAiClient'

const defaultModel = OpenAiClienChatModel.Llama3_1_8bInstruct

export const evaluateSource = async ({
  content,
  objectif,
}: {
  content: string
  objectif: string
}) => {
  const completionMessages: OpenAiChatMessage[] = [
    {
      role: 'system',
      content: `Tu dois évaluer si le contenu qui va t’être donné est utile ou non pour être utilisé en source documentaire pour atteindre l’objectif. Le résultat sera directement donné à un LLM, répond uniquement avec la valeur "oui" ou "non". L’objectif est: ${objectif}`,
    },
    {
      role: 'user',
      content: `Voici la source à évaluer :
===============
${content}
      `,
    },
  ]

  const completionModel = defaultModel

  const result = await openAiClient.chat.completions.create({
    model: completionModel,
    messages: completionMessages,
    max_tokens: 5,
    stream: false,
    temperature: 0.2,
  })

  const evaluationString = result.choices.at(0)?.message.content ?? null

  if (!evaluationString) {
    return {
      text: null,
      evaluation: null,
    }
  }

  const evaluation = evaluationString.trim().toLowerCase() // should be "oui" or "non"

  return {
    text: evaluation,
    evaluation: evaluation === 'oui',
  }
}
