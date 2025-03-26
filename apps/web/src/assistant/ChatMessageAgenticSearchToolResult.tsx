import { ToolInvocation } from '@app/web/assistant/ToolInvocation'
import type { AgenticSearchToolYamlResult } from '@app/web/assistant/tools/agenticSearchTool'
import { parse } from 'yaml'

const _parseYamlToolContent = (content: string) => {
  try {
    return parse(content) as AgenticSearchToolYamlResult
  } catch {
    return null
  }
}

const ChatMessageAgenticSearchToolResult = ({
  toolInvocation: { result },
}: {
  toolInvocation: ToolInvocation & { state: 'result' }
}) => {
  //
  // const parsedToolContent = parseYamlToolContent(content)
  //
  // if (!parsedToolContent || typeof parsedToolContent !== 'object') {
  //   return null
  // }
  //
  // if ('error' in parsedToolContent) {
  //   return null
  // }
  //
  // const webResults = [
  //   ...(parsedToolContent.sources_sites_officiels ?? []),
  //   ...(parsedToolContent.sources_sites_web ?? []),
  // ]
  //
  // const ragResults = [
  //   ...(parsedToolContent.sources_centre_aide ?? []),
  //   ...(parsedToolContent.sources_les_bases ?? []),
  // ]

  return (
    <div className="fr-background-alt--green-archipel fr-text--xs fr-border-radius--8 fr-p-4v">
      TODO AGENTIC RESULT
      {JSON.stringify(result, null, 2)}
    </div>
  )

  /**
   * <div
   *         className={classNames(
   *           'fr-flex fr-flex-nowrap',
   *           styles.sourceCardsContainer,
   *         )}
   *       >
   *         {webResults.length > 0
   *           ? webResults.map((result) => (
   *               <div key={result.url} className={styles.sourceCard}>
   *                 <a href={result.url} target="_blank">
   *                   {result.title || result.url}
   *                 </a>
   *                 <p className="fr-text--xs fr-text-mention--grey fr-mt-4v">
   *                   {result.summary || result.description}
   *                 </p>
   *               </div>
   *             ))
   *           : null}
   *         {ragResults.length > 0
   *           ? ragResults.map((result) => (
   *               <div key={result.url} className={styles.sourceCard}>
   *                 {!!result.url && (
   *                   <a href={result.url} target="_blank">
   *                     {result.url}
   *                   </a>
   *                 )}
   *                 {!!result.content && (
   *                   <div
   *                     className="fr-mt-4v"
   *                     dangerouslySetInnerHTML={{
   *                       __html: marked.parse(result.content, { async: false }),
   *                     }}
   *                   />
   *                 )}
   *               </div>
   *             ))
   *           : null}
   *       </div>
   */
}

export default ChatMessageAgenticSearchToolResult
