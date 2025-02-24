import type { OpenAiTool } from '@app/web/assistant/openAiChat'
import { administrationWebSearchTool } from '@app/web/assistant/tools/administrationWebSearchTool'
import { agenticSearchTool } from '@app/web/assistant/tools/agenticSearchTool'
import { centreAideRagTool } from '@app/web/assistant/tools/centreAideRagTool'
import { generalWebSearchTool } from '@app/web/assistant/tools/generalWebSearchTool'
import { lesBasesRagTool } from '@app/web/assistant/tools/lesBasesRagTool'

export const specializedTools = [
  generalWebSearchTool,
  administrationWebSearchTool,
  centreAideRagTool,
  lesBasesRagTool,
] satisfies OpenAiTool[]

export const tools = [agenticSearchTool] satisfies OpenAiTool[]
