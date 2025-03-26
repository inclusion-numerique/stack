// Utility type to cast our json values as message parts
import type { FilePart, TextPart, ToolCallPart, ToolResultPart } from 'ai'

export type MessagePart = TextPart | ToolCallPart | FilePart | ToolResultPart

export type MessageParts = MessagePart[]
