import { CleanOperation } from './clean-operation'

const replaceNewlineInWebsites = (field: string): CleanOperation => ({
  name: 'replace newline in websites',
  selector: /\n/,
  field,
  fix: (toFix: string): string => toFix.replace(/\n/, ''),
})

const replaceDoubleDotBySingleDotInWebsites = (
  field: string,
): CleanOperation => ({
  name: ': instead of . after www',
  selector: /www:/g,
  field,
  fix: (toFix: string): string => toFix.replace(/www:/g, 'www.'),
})

const removeWebsitesStartingWithAt = (field: string): CleanOperation => ({
  name: 'remove url starting by at',
  selector: /^@/,
  field,
})

const removeMissingExtensionWebsites = (field: string): CleanOperation => ({
  name: 'missing extension websites',
  selector: /^.*(?<!\.\w+\/?)$/,
  field,
})

const fixMissingHttpWebsitesWithMultipleUrl = (
  field: string,
): CleanOperation => ({
  name: 'missing http websites with multiple url',
  selector: /\|((?!http[s]?:\/\/)[^|]+)/g,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/\|((?!http[s]?:\/\/)[^|]+)/g, '|http://$1'),
})

const fixMissingHttpWebsites = (field: string): CleanOperation => ({
  name: 'missing http websites',
  selector: /^(?!http).*/,
  field,
  fix: (toFix: string): string => `http://${toFix}`,
})

const fixUppercaseWebsites = (field: string): CleanOperation => ({
  name: 'uppercase in websites',
  selector: /[A-Z]/,
  field,
  fix: (toFix: string): string => toFix.toLowerCase(),
})

const fixMisplacedColonInWebsite = (field: string): CleanOperation => ({
  name: 'missing colon websites',
  selector: /https\/\/:/,
  field,
  fix: (toFix: string): string => toFix.replace(/https\/\/:/, 'https://'),
})

const fixMissingColonWebsites = (field: string): CleanOperation => ({
  name: 'missing colon websites',
  selector: /(https?)(\/\/)/,
  field,
  fix: (toFix: string): string => toFix.replace(/(https?)(\/\/)/, '$1:$2'),
})

const fixMultipleUrlNotSeparatedWebsites = (field: string): CleanOperation => ({
  name: 'missing separator between url',
  selector: /(https?:\/\/[^|]+(?!\|))(https?:\/\/)/g,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/(https?:\/\/[^|]+(?!\|))(https?:\/\/)/g, '$1|$2'),
})

const fixDuplicateHttpWebsites = (field: string): CleanOperation => ({
  name: 'duplicate http websites',
  selector: /^https?:\/\/https?:\/\/.*/,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/^https?:\/\/https?:\/\//, 'https://'),
})

const fixWebsitesSeparator = (field: string): CleanOperation => ({
  name: 'websites separator',
  selector: /;|\s(?:ou|\/|;)\s/,
  field,
  fix: (toFix: string): string => toFix.replace(/;|\s(?:ou|\/|;)\s/, '|'),
})

const fixWebsitesWithSingleSlash = (field: string): CleanOperation => ({
  name: 'website without colon and slash',
  selector: /^https?:\/[a-zA-Z0-9]/,
  field,
  fix: (toFix: string): string => toFix.replace(/:\/([a-zA-Z0-9])/, '://$1'),
})

const fixWebsitesWithoutColonAndSlash = (field: string): CleanOperation => ({
  name: 'website without colon and slash',
  selector: /^https?\/www/,
  field,
  fix: (toFix: string): string => toFix.replace(/^https?\/www/, 'https://www'),
})

const fixWebsitesWithComaInsteadOfDot = (field: string): CleanOperation => ({
  name: 'website with coma instead of dot',
  selector: /^http:\/\/www,/,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/^http:\/\/www,/, 'http://www.'),
})

const fixWebsitesWithMissingSlashAfterHttp = (
  field: string,
): CleanOperation => ({
  name: 'website with coma instead of dot',
  selector: /^http:\/[^/]/,
  field,
  fix: (toFix: string): string => toFix.replace(/^http:\//, 'http://'),
})

const removeWebsitesWithSpaces = (field: string): CleanOperation => ({
  name: 'websites with spaces',
  selector: /\s/,
  field,
})

const fixWebsitesWithCodedSpacesAndParenthese = (
  field: string,
): CleanOperation => ({
  name: 'websites with coded spaces',
  selector: /[()]/g,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/[()]/g, (match: string): string =>
      match === '(' ? '%28' : '%29',
    ),
})

const cleanOperationIfAny = (
  cleanOperator: (colonne: string, codePostal?: string) => CleanOperation,
  url: string | null,
): CleanOperation[] => (url == null ? [] : [cleanOperator(url)])

export const cleanUrl = (siteWeb: string | null): CleanOperation[] => [
  ...cleanOperationIfAny(replaceNewlineInWebsites, siteWeb),
  ...cleanOperationIfAny(replaceDoubleDotBySingleDotInWebsites, siteWeb),
  ...cleanOperationIfAny(removeWebsitesStartingWithAt, siteWeb),
  ...cleanOperationIfAny(fixWebsitesSeparator, siteWeb),
  ...cleanOperationIfAny(fixDuplicateHttpWebsites, siteWeb),
  ...cleanOperationIfAny(fixUppercaseWebsites, siteWeb),
  ...cleanOperationIfAny(fixMultipleUrlNotSeparatedWebsites, siteWeb),
  ...cleanOperationIfAny(removeMissingExtensionWebsites, siteWeb),
  ...cleanOperationIfAny(fixWebsitesWithSingleSlash, siteWeb),
  ...cleanOperationIfAny(fixWebsitesWithoutColonAndSlash, siteWeb),
  ...cleanOperationIfAny(fixWebsitesWithComaInsteadOfDot, siteWeb),
  ...cleanOperationIfAny(fixWebsitesWithMissingSlashAfterHttp, siteWeb),
  ...cleanOperationIfAny(removeWebsitesWithSpaces, siteWeb),
  ...cleanOperationIfAny(fixWebsitesWithCodedSpacesAndParenthese, siteWeb),
  ...cleanOperationIfAny(fixMissingHttpWebsites, siteWeb),
  ...cleanOperationIfAny(fixMissingHttpWebsitesWithMultipleUrl, siteWeb),
  ...cleanOperationIfAny(fixMisplacedColonInWebsite, siteWeb),
  ...cleanOperationIfAny(fixMissingColonWebsites, siteWeb),
]

const canFixUrl = (
  url: string | null,
  cleanOperation: CleanOperation,
): url is string => url != null && cleanOperation.selector.test(url)

const applyOperation = (cleanOperation: CleanOperation) => (url: string) =>
  cleanOperation.fix ? cleanOperation.fix(url) : null

const toFixedUrl = (
  url: string | null,
  cleanOperation: CleanOperation,
): string | null =>
  canFixUrl(url, cleanOperation) ? applyOperation(cleanOperation)(url) : url

export const fixUrl = (url: string | null) =>
  cleanUrl(url).reduce(toFixedUrl, url)
