-- AlterTable
ALTER TABLE "resource_views" DROP CONSTRAINT "resource_views_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "resource_views_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "resource_views_hash_idx" ON "resource_views"("hash");
