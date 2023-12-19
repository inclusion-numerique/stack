/*
  Warnings:

  - You are about to drop the `BaseFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BaseFollow" DROP CONSTRAINT "BaseFollow_base_id_fkey";

-- DropForeignKey
ALTER TABLE "BaseFollow" DROP CONSTRAINT "BaseFollow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFollow" DROP CONSTRAINT "ProfileFollow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileFollow" DROP CONSTRAINT "ProfileFollow_profile_id_fkey";

-- DropTable
DROP TABLE "BaseFollow";

-- DropTable
DROP TABLE "ProfileFollow";

-- CreateTable
CREATE TABLE "base_follows" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "base_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "followed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "base_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_follows" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "profile_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "followed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_follows_legacy_id_key" ON "base_follows"("legacy_id");

-- CreateIndex
CREATE INDEX "base_follows_base_id_idx" ON "base_follows"("base_id");

-- CreateIndex
CREATE INDEX "base_follows_follower_id_idx" ON "base_follows"("follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "base_follows_base_id_follower_id_key" ON "base_follows"("base_id", "follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_follows_legacy_id_key" ON "profile_follows"("legacy_id");

-- CreateIndex
CREATE INDEX "profile_follows_profile_id_idx" ON "profile_follows"("profile_id");

-- CreateIndex
CREATE INDEX "profile_follows_follower_id_idx" ON "profile_follows"("follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_follows_profile_id_follower_id_key" ON "profile_follows"("profile_id", "follower_id");

-- AddForeignKey
ALTER TABLE "base_follows" ADD CONSTRAINT "base_follows_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_follows" ADD CONSTRAINT "base_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_follows" ADD CONSTRAINT "profile_follows_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_follows" ADD CONSTRAINT "profile_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
