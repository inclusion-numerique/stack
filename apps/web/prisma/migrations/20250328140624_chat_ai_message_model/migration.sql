/*
  Warnings:

  - You are about to drop the column `provider_options` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - You are about to drop the `assistant_chat_sessions` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `assistant_chat_messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "assistant_chat_messages" DROP CONSTRAINT "assistant_chat_messages_session_id_fkey";

-- DropForeignKey
ALTER TABLE "assistant_chat_sessions" DROP CONSTRAINT "assistant_chat_sessions_assistant_configuration_id_fkey";

-- DropForeignKey
ALTER TABLE "assistant_chat_sessions" DROP CONSTRAINT "assistant_chat_sessions_created_by_id_fkey";

-- Remove all data from "assistant_chat_messages"
DELETE FROM "assistant_chat_messages";

-- AlterTable
ALTER TABLE "assistant_chat_messages" DROP COLUMN "provider_options",
ADD COLUMN     "annotations" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "attachments" JSONB[] DEFAULT ARRAY[]::JSONB[],
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "assistant_chat_sessions";

-- DropEnum
DROP TYPE "assistant_chat_roles";

-- CreateTable
CREATE TABLE "assistant_chat_threads" (
    "id" UUID NOT NULL,
    "created_by_id" UUID,
    "title" TEXT,
    "context" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),
    "assistant_configuration_id" UUID NOT NULL,

    CONSTRAINT "assistant_chat_threads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assistant_chat_threads_created_by_id_idx" ON "assistant_chat_threads"("created_by_id");

-- AddForeignKey
ALTER TABLE "assistant_chat_threads" ADD CONSTRAINT "assistant_chat_threads_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_chat_threads" ADD CONSTRAINT "assistant_chat_threads_assistant_configuration_id_fkey" FOREIGN KEY ("assistant_configuration_id") REFERENCES "assistant_configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_chat_messages" ADD CONSTRAINT "assistant_chat_messages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "assistant_chat_threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
