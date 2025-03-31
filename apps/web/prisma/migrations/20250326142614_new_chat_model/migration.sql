/*
  Warnings:

  - You are about to drop the column `finish_reason` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `refusal` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `tool_call_id` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `tool_calls` on the `assistant_chat_messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assistant_chat_messages" DROP COLUMN "finish_reason",
DROP COLUMN "name",
DROP COLUMN "refusal",
DROP COLUMN "tool_call_id",
DROP COLUMN "tool_calls",
ADD COLUMN     "parts" JSONB[] DEFAULT ARRAY[]::JSONB[];
