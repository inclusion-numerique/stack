export const textToParagraphs = (text: string): string[] => text.split('\n').filter((paragraph) => !!paragraph.trim())
