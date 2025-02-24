/*
  Warnings:

  - A unique constraint covering the columns `[current_assistant_configuration_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "current_assistant_configuration_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "users_current_assistant_configuration_id_key" ON "users"("current_assistant_configuration_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_current_assistant_configuration_id_fkey" FOREIGN KEY ("current_assistant_configuration_id") REFERENCES "assistant_configurations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
