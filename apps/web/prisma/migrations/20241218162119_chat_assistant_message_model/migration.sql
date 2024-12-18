/*
  Warnings:

  - You are about to drop the `AssistantChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssistantChatSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "assistant_chat_roles" AS ENUM ('system', 'user', 'assistant', 'tool', 'function');

-- DropForeignKey
ALTER TABLE "AssistantChatMessage" DROP CONSTRAINT "AssistantChatMessage_session_id_fkey";

-- DropForeignKey
ALTER TABLE "AssistantChatSession" DROP CONSTRAINT "AssistantChatSession_created_by_id_fkey";

-- DropTable
DROP TABLE "AssistantChatMessage";

-- DropTable
DROP TABLE "AssistantChatSession";

-- DropEnum
DROP TYPE "AssistantChatRole";

-- CreateTable
CREATE TABLE "assistant_chat_sessions" (
    "id" UUID NOT NULL,
    "created_by_id" UUID,
    "title" TEXT,
    "context" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assistant_chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistant_chat_messages" (
    "id" UUID NOT NULL,
    "role" "assistant_chat_roles" NOT NULL,
    "session_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "refusal" TEXT,
    "tool_calls" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "tool_call_id" TEXT,

    CONSTRAINT "assistant_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assistant_chat_sessions_created_by_id_idx" ON "assistant_chat_sessions"("created_by_id");

-- CreateIndex
CREATE INDEX "assistant_chat_messages_session_id_idx" ON "assistant_chat_messages"("session_id");

-- CreateIndex
CREATE INDEX "assistant_chat_messages_created_idx" ON "assistant_chat_messages"("created" ASC);

-- AddForeignKey
ALTER TABLE "assistant_chat_sessions" ADD CONSTRAINT "assistant_chat_sessions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_chat_messages" ADD CONSTRAINT "assistant_chat_messages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "assistant_chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
