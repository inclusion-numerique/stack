-- CreateEnum
CREATE TYPE "user_feature_flags" AS ENUM ('rdv-service-public', 'assistant');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "feature_flags" "user_feature_flags"[] DEFAULT ARRAY[]::"user_feature_flags"[];
