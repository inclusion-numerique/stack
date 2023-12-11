-- CreateTable
CREATE TABLE "saved_collection" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "saved_by_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "base_id" UUID,
    "saved" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_collection_legacy_id_key" ON "saved_collection"("legacy_id");

-- CreateIndex
CREATE INDEX "saved_collection_saved_by_id_idx" ON "saved_collection"("saved_by_id");

-- CreateIndex
CREATE INDEX "saved_collection_collection_id_idx" ON "saved_collection"("collection_id");

-- CreateIndex
CREATE INDEX "saved_collection_base_id_idx" ON "saved_collection"("base_id");

-- AddForeignKey
ALTER TABLE "saved_collection" ADD CONSTRAINT "saved_collection_saved_by_id_fkey" FOREIGN KEY ("saved_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_collection" ADD CONSTRAINT "saved_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_collection" ADD CONSTRAINT "saved_collection_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
