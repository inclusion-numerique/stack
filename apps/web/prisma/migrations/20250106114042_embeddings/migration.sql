-- CreateTable
CREATE TABLE "rag_document_chunks" (
    "id" UUID NOT NULL,
    "source" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "chunk" INTEGER NOT NULL,
    "url" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "embedding_model" TEXT NOT NULL,
    "embedding" vector NOT NULL,

    CONSTRAINT "rag_document_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rag_document_chunks_source_id_idx" ON "rag_document_chunks"("source_id");
