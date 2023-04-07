export const arrayFromEnvironmentVariable = (
  environmentVariable?: string,
  separator = ',',
): string[] =>
  environmentVariable
    ? environmentVariable
        .trim()
        .split(separator)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : []
