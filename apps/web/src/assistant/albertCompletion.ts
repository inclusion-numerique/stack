import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import axios from 'axios'

const albertCompletionUrl = `${ServerWebAppConfig.Assistant.Albert.serviceUrl}completions`

export type AlbertCompletionResponse = {
  id: string
  choices: [
    {
      finish_reason: 'stop'
      index: 0
      logprobs: {
        text_offset: number[]
        token_logprobs: number[]
        tokens: string[]
        top_logprobs: [Record<string, number>]
      }
      text: string
    },
  ]
  created: number
  model: string
  object: 'text_completion'
  system_fingerprint: string
  usage: {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
    completion_tokens_details: {
      accepted_prediction_tokens: number
      audio_tokens: number
      reasoning_tokens: number
      rejected_prediction_tokens: number
    }
    prompt_tokens_details: {
      audio_tokens: number
      cached_tokens: number
    }
  }
}

export type AlbertCompletionInput = {
  prompt: string
  model: string
  best_of?: number
  echo?: boolean
  frequency_penalty?: number
  logit_bias?: {
    [key: string]: number
  }
  logprobs?: number
  max_tokens?: number
  n?: number
  presence_penalty?: number
  seed?: number
  stop?: string
  stream?: boolean
  suffix?: string
  temperature?: number
  top_p?: number
  user?: string
}

export const albertCompletion = async ({
  prompt,
  model = ServerWebAppConfig.Assistant.Albert.chatModel,
  ...rest
}: Omit<AlbertCompletionInput, 'model'> & { model?: string }) => {
  const result = await axios<AlbertCompletionResponse>({
    method: 'POST',
    url: albertCompletionUrl,
    data: {
      prompt,
      model,
      ...rest,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ServerWebAppConfig.Assistant.Albert.apiKey}`,
    },
  })

  return result.data.choices?.at(0)?.text ?? null
}
