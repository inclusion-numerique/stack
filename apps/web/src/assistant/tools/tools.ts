import type { OpenAiTool } from '@app/web/assistant/openAiChat'
import { generalWebSearchTool } from '@app/web/assistant/tools/generalWebSearchTool'
import { centreAideRagTool } from '@app/web/assistant/tools/centreAideRagTool'
import { administrationWebSearchTool } from '@app/web/assistant/tools/administrationWebSearchTool'
import { lesBasesRagTool } from '@app/web/assistant/tools/lesBasesRagTool'

export const tools = [
  generalWebSearchTool,
  administrationWebSearchTool,
  centreAideRagTool,
  lesBasesRagTool,
] satisfies OpenAiTool[]
