/*
  Warnings:

  - The `feature_flags` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "user_feature_flag" AS ENUM ('rdv-service-public', 'assistant');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "feature_flags",
ADD COLUMN     "feature_flags" "user_feature_flag"[] DEFAULT ARRAY[]::"user_feature_flag"[];

-- DropEnum
DROP TYPE "user_feature_flags";
