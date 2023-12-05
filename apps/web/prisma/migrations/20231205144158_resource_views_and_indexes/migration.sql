-- CreateTable
CREATE TABLE "resource_views" (
    "hash" TEXT NOT NULL,
    "legacy_id" INTEGER,
    "resource_id" UUID NOT NULL,
    "user_id" UUID,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_views_pkey" PRIMARY KEY ("hash")
);

-- CreateIndex
CREATE UNIQUE INDEX "resource_views_legacy_id_key" ON "resource_views"("legacy_id");

-- CreateIndex
CREATE INDEX "resource_views_user_id_idx" ON "resource_views"("user_id");

-- CreateIndex
CREATE INDEX "resource_views_resource_id_idx" ON "resource_views"("resource_id");

-- CreateIndex
CREATE INDEX "base_members_base_id_idx" ON "base_members"("base_id");

-- CreateIndex
CREATE INDEX "base_members_member_id_idx" ON "base_members"("member_id");

-- CreateIndex
CREATE INDEX "bases_owner_id_idx" ON "bases"("owner_id");

-- CreateIndex
CREATE INDEX "collection_resources_resource_id_idx" ON "collection_resources"("resource_id");

-- CreateIndex
CREATE INDEX "collection_resources_collection_id_idx" ON "collection_resources"("collection_id");

-- CreateIndex
CREATE INDEX "collections_base_id_idx" ON "collections"("base_id");

-- CreateIndex
CREATE INDEX "collections_owner_id_idx" ON "collections"("owner_id");

-- CreateIndex
CREATE INDEX "contents_resource_id_idx" ON "contents"("resource_id");

-- CreateIndex
CREATE INDEX "resource_contributors_resource_id_idx" ON "resource_contributors"("resource_id");

-- CreateIndex
CREATE INDEX "resource_contributors_contributor_id_idx" ON "resource_contributors"("contributor_id");

-- CreateIndex
CREATE INDEX "resource_events_resource_id_idx" ON "resource_events"("resource_id");

-- CreateIndex
CREATE INDEX "resources_base_id_idx" ON "resources"("base_id");

-- CreateIndex
CREATE INDEX "resources_created_by_id_idx" ON "resources"("created_by_id");

-- AddForeignKey
ALTER TABLE "resource_views" ADD CONSTRAINT "resource_views_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_views" ADD CONSTRAINT "resource_views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
