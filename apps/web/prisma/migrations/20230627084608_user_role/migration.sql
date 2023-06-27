-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Administrator', 'Demo', 'Prefect', 'User');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'User',
ADD COLUMN     "roleScope" TEXT;
