-- CreateTable
CREATE TABLE "BaseFollow" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "base_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "followed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BaseFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileFollow" (
    "id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "followed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileFollow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseFollow_legacy_id_key" ON "BaseFollow"("legacy_id");

-- CreateIndex
CREATE INDEX "BaseFollow_base_id_idx" ON "BaseFollow"("base_id");

-- CreateIndex
CREATE INDEX "BaseFollow_follower_id_idx" ON "BaseFollow"("follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "BaseFollow_base_id_follower_id_key" ON "BaseFollow"("base_id", "follower_id");

-- CreateIndex
CREATE INDEX "ProfileFollow_profile_id_idx" ON "ProfileFollow"("profile_id");

-- CreateIndex
CREATE INDEX "ProfileFollow_follower_id_idx" ON "ProfileFollow"("follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileFollow_profile_id_follower_id_key" ON "ProfileFollow"("profile_id", "follower_id");

-- AddForeignKey
ALTER TABLE "BaseFollow" ADD CONSTRAINT "BaseFollow_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseFollow" ADD CONSTRAINT "BaseFollow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileFollow" ADD CONSTRAINT "ProfileFollow_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileFollow" ADD CONSTRAINT "ProfileFollow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
