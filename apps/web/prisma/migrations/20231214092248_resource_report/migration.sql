-- CreateEnum
CREATE TYPE "resource_report_reason" AS ENUM ('inappropriate', 'outdated', 'errors', 'duplicate');

-- CreateTable
CREATE TABLE "resource_reports" (
    "id" UUID NOT NULL,
    "resource_id" UUID NOT NULL,
    "sent_by_id" UUID,
    "reason" "resource_report_reason" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_reports_resource_id_idx" ON "resource_reports"("resource_id");

-- CreateIndex
CREATE INDEX "resource_reports_sent_by_id_idx" ON "resource_reports"("sent_by_id");

-- AddForeignKey
ALTER TABLE "resource_reports" ADD CONSTRAINT "resource_reports_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_reports" ADD CONSTRAINT "resource_reports_sent_by_id_fkey" FOREIGN KEY ("sent_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
