import type { OpenAiTool } from '@app/web/assistant/openAiChat'
import { weatherTestTool } from '@app/web/assistant/tools/weatherTestTool'

export const tools = [weatherTestTool] satisfies OpenAiTool[]
