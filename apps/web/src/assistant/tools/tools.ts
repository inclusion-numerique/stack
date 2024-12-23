import type { OpenAiTool } from '@app/web/assistant/openAiChat'
import { weatherTestTool } from '@app/web/assistant/tools/weatherTestTool'
import { webSearchTool } from '@app/web/assistant/tools/webSearchTool'

export const tools = [weatherTestTool, webSearchTool] satisfies OpenAiTool[]
