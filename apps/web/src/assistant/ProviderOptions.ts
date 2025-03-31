// Custom provider options for the AI SDK
import type { JSONValue } from '@ai-sdk/provider'

type AiSdkProviderOptionsType = Record<string, Record<string, JSONValue>>

export type ProviderOptions = AiSdkProviderOptionsType
