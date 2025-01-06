/*
  Warnings:

  - Added the required column `document_md5` to the `rag_document_chunks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rag_document_chunks" ADD COLUMN     "document_md5" TEXT NOT NULL;
