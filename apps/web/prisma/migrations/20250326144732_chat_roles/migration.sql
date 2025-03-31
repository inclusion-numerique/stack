/*
  Warnings:

  - The values [function,developer] on the enum `assistant_chat_roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `content` on the `assistant_chat_messages` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "assistant_chat_roles_new" AS ENUM ('system', 'user', 'assistant', 'tool');
ALTER TABLE "assistant_chat_messages" ALTER COLUMN "role" TYPE "assistant_chat_roles_new" USING ("role"::text::"assistant_chat_roles_new");
ALTER TYPE "assistant_chat_roles" RENAME TO "assistant_chat_roles_old";
ALTER TYPE "assistant_chat_roles_new" RENAME TO "assistant_chat_roles";
DROP TYPE "assistant_chat_roles_old";
COMMIT;

-- AlterTable
ALTER TABLE "assistant_chat_messages" DROP COLUMN "content";
