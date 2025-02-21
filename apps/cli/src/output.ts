/**
 * Output fonction for CLI Commands.
 * Express the intent for CLI output instead of debug console.log that are
 * forbidden by our lint rules
 */
// biome-ignore lint/suspicious/noConsole: cli output
export const output = console.log
