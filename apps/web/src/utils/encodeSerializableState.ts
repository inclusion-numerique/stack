import superjson from 'superjson'
import pako from 'pako'

/**
 * Utility functions to encode and decode form state for safe transmission via URL.
 *
 * This module provides two functions, `encodeSerializableState` and `decodeSerializableState`,
 * which are intended to be used for serializing form state to a compressed string
 * and deserializing it back to its original form. This is particularly useful for passing
 * non-sensitive form data through URLs, ensuring the data remains unreadable to users.
 *
 * Example use case:
 * - Encode form state into a compressed string and append it as a query parameter in a URL.
 * - Decode the compressed string from the URL to prefill the form with the original data.
 */

export type EncodedState<T> = string & { __encodedStateType: T }

/**
 * Converts a Uint8Array to a url safe Base64 string.
 */
const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  const binaryString = [...uint8Array]
    .map((byte) => String.fromCodePoint(byte))
    .join('')
  return btoa(binaryString)
    .replaceAll('+', '-') // Replace "+" with "-"
    .replaceAll('/', '_') // Replace "/" with "_"
    .replace(/=+$/, '') // Remove "=" padding
}

/**
 * Converts a url safe Base64 string back to a Uint8Array.
 */
const base64ToUint8Array = (base64String: string): Uint8Array => {
  const binaryString = atob(
    base64String
      .replaceAll('-', '+') // Replace "-" with "+"
      .replaceAll('_', '/'), // Replace "_" with "/"
  )
  return Uint8Array.from(binaryString, (char) => {
    const code = char.codePointAt(0)
    if (code === undefined) {
      throw new Error('Invalid character in Base64 string')
    }
    return code
  })
}

export const encodeSerializableState = <T>(state: T): EncodedState<T> => {
  const jsonString = superjson.stringify(state)
  const compressed = pako.deflate(jsonString)

  return uint8ArrayToBase64(compressed) as EncodedState<T> // Base64-URL-safe encoding
}

export const decodeSerializableState = <T>(
  encodedState: EncodedState<T>,
  defaultValue: T, // Needed if decoding fails
): T => {
  try {
    const compressed = base64ToUint8Array(encodedState) // Base64-URL-safe decoding
    const jsonString = pako.inflate(compressed, { to: 'string' })
    return superjson.parse<T>(jsonString)
  } catch {
    return defaultValue
  }
}
