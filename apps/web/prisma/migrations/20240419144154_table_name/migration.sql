/*
  Warnings:

  - You are about to drop the `Mutation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "mutation_name" ADD VALUE 'mise_a_jour_data_inclusion_structures';

-- DropForeignKey
ALTER TABLE "Mutation" DROP CONSTRAINT "Mutation_user_id_fkey";

-- DropTable
DROP TABLE "Mutation";

-- CreateTable
CREATE TABLE "mutations" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "nom" "mutation_name" NOT NULL,
    "duration" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mutations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mutations" ADD CONSTRAINT "mutations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
