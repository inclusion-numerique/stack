/*
  Warnings:

  - You are about to drop the column `session_id` on the `assistant_chat_messages` table. All the data in the column will be lost.
  - Added the required column `thread_id` to the `assistant_chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assistant_chat_messages" DROP CONSTRAINT "assistant_chat_messages_session_id_fkey";

-- DropIndex
DROP INDEX "assistant_chat_messages_session_id_idx";

-- AlterTable
ALTER TABLE "assistant_chat_messages" DROP COLUMN "session_id",
ADD COLUMN     "thread_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "assistant_chat_messages_thread_id_idx" ON "assistant_chat_messages"("thread_id");

-- AddForeignKey
ALTER TABLE "assistant_chat_messages" ADD CONSTRAINT "assistant_chat_messages_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "assistant_chat_threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
