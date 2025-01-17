/*
  Warnings:

  - You are about to drop the column `created_at` on the `rdv_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `rdv_accounts` table. All the data in the column will be lost.
  - Added the required column `updated` to the `rdv_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rdv_accounts" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "access_token" DROP NOT NULL;
