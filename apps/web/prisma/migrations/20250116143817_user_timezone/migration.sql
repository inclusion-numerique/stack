-- AlterTable
ALTER TABLE "users" ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Europe/Paris';

-- CreateIndex
CREATE INDEX "rag_document_chunks_document_md5_idx" ON "rag_document_chunks"("document_md5");
