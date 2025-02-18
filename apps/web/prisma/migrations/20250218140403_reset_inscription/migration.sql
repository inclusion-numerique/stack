/*
  Warnings:

  - You are about to drop the `AssistantChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssistantChatSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "mutation_name" ADD VALUE 'reset_inscription';

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
