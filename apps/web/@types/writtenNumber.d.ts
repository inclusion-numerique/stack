declare module 'written-number' {
  interface WrittenNumberOptions {
    lang?: string
  }

  function writtenNumber(number: number, options?: WrittenNumberOptions): string

  export = writtenNumber
}
