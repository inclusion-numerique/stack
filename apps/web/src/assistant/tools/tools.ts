import type { OpenAiTool } from '@app/web/assistant/openAiChat'
import { weatherTestTool } from '@app/web/assistant/tools/weatherTestTool'
import { webSearchTool } from '@app/web/assistant/tools/webSearchTool'
import { ragTool } from '@app/web/assistant/tools/ragTool'

export const tools = [
  weatherTestTool,
  webSearchTool,
  ragTool,
] satisfies OpenAiTool[]
